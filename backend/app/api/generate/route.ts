// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateBusinessPlan } from '@/lib/ai';
import { validateUserInput } from '@/utils/formatters';
import type { BizPathUserInput, BizPathAPIResponse } from '@/types/roadmap';

export async function POST(request: NextRequest) {
  try {
    const body: Partial<BizPathUserInput> = await request.json();

    const validationError = validateUserInput(body);
    if (validationError) {
      return NextResponse.json({
        success: false,
        error: validationError,
      }, { status: 400 });
    }

    const result = await generateBusinessPlan(body as BizPathUserInput);

    return NextResponse.json({
      success: true,
      data: result,
    });

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to generate business plan. Please try again.",
      details: error.message
    }, { status: 500 });
  }
}