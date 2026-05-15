// data/ethiopia.ts

export const ETHIOPIA_CONTEXT = {
  inflation: "11.7%",
  inflationDate: "April 2026",
  exchangeRate: 157,           // ETB per 1 USD
  contingencyBuffer: 0.25,     // 25% added on top of capital estimates

  challenges: [
    "forex shortages",
    "power outages",
    "licensing delays",
    "import difficulties",
    "youth unemployment",
  ],

  prioritySectors: [
    "Agrotech & Food Processing",
    "Fintech",
    "Renewable Energy",
    "Logistics",
    "Edtech",
    "Healthtech",
    "Small Manufacturing",
    "Import Substitution",
    "Services",
  ],

  capitalThresholds: {
    bootstrap: 500_000,   // ETB — below this, recommend service/digital/trading
  },

  majorCities: [
    "Addis Ababa",
    "Hawassa",
    "Bahir Dar",
    "Mekelle",
    "Dire Dawa",
    "Adama",
    "Gondar",
    "Jimma",
  ],
} as const;

// ─── Currency helpers ────────────────────────────────────────────────────────

export function etbToUsd(etb: number): number {
  return Math.round(etb / ETHIOPIA_CONTEXT.exchangeRate);
}

export function usdToEtb(usd: number): number {
  return Math.round(usd * ETHIOPIA_CONTEXT.exchangeRate);
}

export function withContingency(etb: number): number {
  return Math.round(etb * (1 + ETHIOPIA_CONTEXT.contingencyBuffer));
}
