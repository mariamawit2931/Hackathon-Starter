// utils/formatters.ts

import { etbToUsd } from "../../backend/public/data/ethiopia";
import type { BizPathUserInput, BizPathOutput } from "../types/roadmap";

// ─── Build the user message sent to the model ────────────────────────────────

export function buildUserMessage(input: BizPathUserInput): string {
  return `
Here is my profile:
- Educational Background / Degree: ${input.background || "No formal degree"}
- Skills & Work Experience: ${input.skills}
- Available Capital: ${input.capital}
- Preferred Sector (can ignore if you see a better fit): ${input.sector || "Open to suggestions"}
- Location in Ethiopia: ${input.location || "Addis Ababa"}
- Business Idea (optional): ${input.idea || "Open to AI recommendations"}

Please analyze my profile and design the most realistic, high-potential business model for me
as an Ethiopian entrepreneur in May 2026. Return ONLY valid JSON with no extra text.
`.trim();
}

// ─── Parse and validate the model's raw JSON response ───────────────────────

export function parseBizPathResponse(raw: string): BizPathOutput {
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  const parsed = JSON.parse(cleaned) as BizPathOutput;

  const required: (keyof BizPathOutput)[] = [
    "businessModel",
    "theBridge",
    "materialRequirements",
    "nonMaterialRequirements",
    "growthLadder",
    "localInsights",
    "risks",
    "overallRecommendation",
  ];

  for (const key of required) {
    if (!(key in parsed)) {
      throw new Error(`Missing required field in BizPath response: "${key}"`);
    }
  }

  return parsed;
}

// ─── Currency display formatters ─────────────────────────────────────────────

export function formatETB(amount: number): string {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatWithUSD(etb: number): string {
  return `${formatETB(etb)} (~$${etbToUsd(etb).toLocaleString()})`;
}

// ─── Input validation ────────────────────────────────────────────────────────

export function validateUserInput(input: Partial<BizPathUserInput>): string | null {
  if (!input.skills || input.skills.trim().length < 10) {
    return "Please describe your skills and experience (at least 10 characters).";
  }
  if (!input.capital || input.capital.trim() === "") {
    return "Please provide your available capital range.";
  }
  return null; // valid
}
