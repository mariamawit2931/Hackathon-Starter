// lib/ai.ts

import Anthropic from "@anthropic-ai/sdk";
import { BIZPATH_ARCHITECT_PROMPT } from "../prompts/bizpath-architect";
import { parseBizPathResponse, buildUserMessage } from "../utils/formatters";
import type { BizPathUserInput, BizPathOutput } from "../types/roadmap";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS = 1500;

export async function generateBusinessPlan(
  input: BizPathUserInput
): Promise<BizPathOutput> {
  const userMessage = buildUserMessage(input);

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    system: BIZPATH_ARCHITECT_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const raw = response.content
    .filter((block) => block.type === "text")
    .map((block) => (block as { type: "text"; text: string }).text)
    .join("");

  return parseBizPathResponse(raw);
}
