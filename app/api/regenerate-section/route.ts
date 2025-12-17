import { NextRequest, NextResponse } from 'next/server';
import { regenerateEmailSection } from '@/lib/claude';
import { Company, EmailDraft, OutreachConfig, UserContext } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { originalDraft, selectedText, direction, company, config, userContexts } = body as {
      originalDraft: EmailDraft;
      selectedText: string;
      direction?: string;
      company: Company;
      config: OutreachConfig;
      userContexts: UserContext[];
    };

    if (!originalDraft || !selectedText || !company || !config) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const regeneratedText = await regenerateEmailSection(
      originalDraft,
      selectedText,
      direction,
      company,
      config,
      userContexts || []
    );

    return NextResponse.json({ regeneratedText });
  } catch (error) {
    console.error('Error in regenerate-section API:', error);
    return NextResponse.json(
      { error: 'Failed to regenerate section' },
      { status: 500 }
    );
  }
}
