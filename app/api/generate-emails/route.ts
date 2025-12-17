import { NextRequest, NextResponse } from 'next/server';
import { generateEmailDrafts } from '@/lib/claude';
import { Company, OutreachConfig, UserContext } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { company, config, userContexts } = body as {
      company: Company;
      config: OutreachConfig;
      userContexts: UserContext[];
    };

    if (!company || !config) {
      return NextResponse.json(
        { error: 'Missing required fields: company and config' },
        { status: 400 }
      );
    }

    const drafts = await generateEmailDrafts(company, config, userContexts || []);

    return NextResponse.json({ drafts });
  } catch (error) {
    console.error('Error in generate-emails API:', error);
    return NextResponse.json(
      { error: 'Failed to generate email drafts' },
      { status: 500 }
    );
  }
}
