/**
 * Fetches the real-time USD to ETB exchange rate from the stable Frankfurter mirror.
 * Uses 'no-store' to ensure calculations reflect the 2026 market floatation.
 */
export async function getLiveExchangeRate(): Promise<number> {
  // Switched to .app domain for production stability
  const API_URL = 'https://api.frankfurter.app/latest?from=USD&to=ETB';
  const FALLBACK_RATE = 156.86; // Live mid-market rate as of May 15, 2026

  try {
    const response = await fetch(API_URL, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Exchange rate API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Validate the response structure before returning
    if (data && data.rates && data.rates.ETB) {
      return data.rates.ETB;
    }

    throw new Error("Invalid API response structure");

  } catch (error: any) {
    // Graceful fallback prevents the entire AI generation from failing
    console.warn(`[Exchange Service] Using fallback (${FALLBACK_RATE}): ${error.message}`);
    return FALLBACK_RATE;
  }
}