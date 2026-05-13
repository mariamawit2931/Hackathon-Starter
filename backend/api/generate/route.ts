// api/generate/route.ts
// Next.js App Router — POST /api/generate

import { NextRequest, NextResponse } from "next/server";
import { generateBusinessPlan } from "../../lib/ai";
import { validateUserInput } from "../../utils/formatters";
import type { BizPathUserInput, BizPathAPIResponse } from "../../types/roadmap";

export async function POST(req: NextRequest): Promise<NextResponse<BizPathAPIResponse>> {
  // ── 1. Parse body ──────────────────────────────────────────────────────────
  let body: Partial<BizPathUserInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  // ── 2. Validate input ──────────────────────────────────────────────────────
  const validationError = validateUserInput(body);
  if (validationError) {
    return NextResponse.json(
      { success: false, error: validationError },
      { status: 422 }
    );
  }

  // ── 3. Generate business plan ──────────────────────────────────────────────
  try {
    const data = await generateBusinessPlan(body as BizPathUserInput);
    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error("[BizPath] Generation error:", err);

    const message =
      err instanceof SyntaxError
        ? "The AI returned an unexpected format. Please try again."
        : "Failed to generate business plan. Please try again.";

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// ── Block non-POST methods ───────────────────────────────────────────────────
export function GET(): NextResponse {
  return NextResponse.json(
    { success: false, error: "Method not allowed. Use POST." },
    { status: 405 }
  );
}
