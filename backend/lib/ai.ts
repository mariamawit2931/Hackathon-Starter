import Groq from "groq-sdk";
import { BIZPATH_ARCHITECT_PROMPT } from "../prompts/bizpath-architect";
import { parseBizPathResponse, buildUserMessage } from "../utils/formatters";
import { getLiveExchangeRate } from "../data/ethiopia"; 
import type { BizPathUserInput, BizPathOutput } from "../types/roadmap";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Ensure the word 'export' is here!
export async function generateBusinessPlan(input: BizPathUserInput): Promise<BizPathOutput> {
  try {
    const liveRate = await getLiveExchangeRate();
    const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    // Inject the live data into your prompt
    const dynamicPrompt = BIZPATH_ARCHITECT_PROMPT
      .replace("{{LIVE_EXCHANGE_RATE}}", liveRate.toString())
      .replace("{{CURRENT_DATE}}", today);

    const userMessage = buildUserMessage(input);

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: dynamicPrompt },
        { role: "user", content: userMessage }
      ],
      temperature: 0.6,
      max_tokens: 1800,
    });

    const rawText = response.choices[0]?.message?.content || "";
    const parsedData = parseBizPathResponse(rawText);

    // Return the data with metadata for the frontend
    return {
      ...parsedData,
      metadata: {
        exchangeRateUsed: `1 USD = ${liveRate} ETB`,
        generatedAt: new Date().toISOString()
      }
    } as BizPathOutput;
    
  } catch (error: any) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}