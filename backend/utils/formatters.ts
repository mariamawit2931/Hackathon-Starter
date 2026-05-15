import { BizPathUserInput } from "../types/roadmap";

/**
 * Validates that the user has provided all required fields.
 */
export function validateUserInput(input: any): string | null {
  if (!input.capital) return "Initial capital is required.";
  if (!input.background) return "Background information is required.";
  if (!input.skills) return "Skills are required.";
  if (!input.idea) return "Business idea or sector is required.";
  return null;
}

/**
 * Converts the user input object into a structured string for the AI.
 */
export function buildUserMessage(input: BizPathUserInput): string {
  return `
    USER BUSINESS PROFILE:
    - Target Idea/Sector: ${input.idea}
    - Initial Capital: ${input.capital}
    - Founder Background: ${input.background}
    - Core Skills: ${input.skills}
    
    Please architect a business model based on these parameters.
  `.trim();
}

/**
 * Safely parses the AI's response, handling common LLM formatting errors.
 */
export function parseBizPathResponse(rawText: string): any {
  try {
    // Extract everything between the first '{' and the last '}'
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Raw AI Output (No JSON found):", rawText);
      throw new Error("No JSON found in AI response");
    }
    
    let cleanedJson = jsonMatch[0];

    // Clean up trailing commas before closing braces/brackets which break JSON.parse
    cleanedJson = cleanedJson.replace(/,\s*([\]}])/g, '$1');

    return JSON.parse(cleanedJson);
  } catch (e) {
    console.error("Failed to parse AI output. Raw text was:", rawText);
    throw new Error("JSON_PARSE_ERROR");
  }
}