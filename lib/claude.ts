import Anthropic from '@anthropic-ai/sdk';
import { Company, UserContext, EmailDraft, OutreachConfig, EmailAngle, Citation, CitationSource } from '@/types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const EMAIL_ANGLES: EmailAngle[] = [
  'Strategy',
  'Portfolio Synergy',
  'Relationship',
  'Market Commentary',
  'Growth Partnership',
  'Acquisition Interest'
];

export async function generateEmailDrafts(
  company: Company,
  config: OutreachConfig,
  userContexts: UserContext[]
): Promise<EmailDraft[]> {
  const systemPrompt = buildSystemPrompt(config);
  const userPrompt = buildUserPrompt(company, userContexts, config);

  try {
    const drafts: EmailDraft[] = [];

    // Generate 6 drafts with different angles
    for (let i = 0; i < 6; i++) {
      const angle = EMAIL_ANGLES[i % EMAIL_ANGLES.length];

      const message = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1500,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `${userPrompt}\n\nGenerate an email with the "${angle}" angle. Ensure it's distinct from other angles and tailored to this specific approach.`
          }
        ]
      });

      const content = message.content[0];
      if (content.type === 'text') {
        const parsed = parseEmailResponse(content.text, angle, i);
        console.log(`[${angle}] Parsed ${parsed.citations.length} citations`);
        if (parsed.citations.length > 0) {
          console.log('Citations:', parsed.citations.map(c => ({
            text: c.text.substring(0, 50) + '...',
            type: c.source.type,
            found: c.startIndex !== -1
          })));
        }
        drafts.push(parsed);
      }
    }

    return drafts;
  } catch (error) {
    console.error('Error generating email drafts:', error);
    throw error;
  }
}

export async function regenerateEmailSection(
  originalDraft: EmailDraft,
  selectedText: string,
  direction: string | undefined,
  company: Company,
  config: OutreachConfig,
  userContexts: UserContext[]
): Promise<string> {
  const systemPrompt = buildSystemPrompt(config);

  const regenerationPrompt = `
Original email draft:
${originalDraft.body}

The user has selected this text to regenerate:
"${selectedText}"

${direction ? `Direction from user: ${direction}` : 'Please provide an improved version of this section.'}

Company context:
${JSON.stringify(company, null, 2)}

User contexts:
${userContexts.map(ctx => `[${ctx.type}] ${ctx.name}:\n${ctx.content}`).join('\n\n')}

Please regenerate ONLY the selected section, maintaining the same overall tone and structure. Return only the regenerated text without any additional formatting or explanation.
`;

  try {
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 500,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: regenerationPrompt
        }
      ]
    });

    const content = message.content[0];
    if (content.type === 'text') {
      return content.text.trim();
    }

    return selectedText; // Fallback to original if something went wrong
  } catch (error) {
    console.error('Error regenerating email section:', error);
    throw error;
  }
}

function buildSystemPrompt(config: OutreachConfig): string {
  return `You are an expert email copywriter for private equity and investment banking professionals. Your task is to generate personalized outreach emails that are:

1. WARM AND PROFESSIONAL: Relationship-building focused, never overly aggressive or salesy
2. CREDIBLE: Every factual claim must be directly supported by provided data sources
3. CONCISE: Get to the point quickly while maintaining professionalism
4. PERSONALIZED: Reference specific company details, recent news, or strategic initiatives
5. APPROPRIATE TO CONTEXT: Match the tone to the objective (${config.objective}) and recipient (${config.recipientPersona})

CRITICAL RULES:
- NEVER make up facts or statistics not present in the provided data
- NEVER reference deal rumors or unconfirmed M&A activity
- NEVER make speculative financial performance claims
- NEVER reference competitors unless explicitly mentioned in user uploads
- When citing facts, note the source (e.g., "according to your recent Series B announcement" or "based on your company's growth trajectory")
- Avoid overly direct acquisition language unless objective is explicitly "buy_side"
- Keep emails to 150-250 words for the body

STRUCTURE:
- Subject line: Compelling, specific, professional (under 60 characters)
- Opening: Reference something specific about the company
- Body: Clearly state purpose while building credibility
- Close: Clear, low-pressure call to action

Return your response in this exact format:
SUBJECT: [subject line]

BODY:
[email body with inline footnote markers like [1], [2], etc. Place the footnote marker immediately after any fact, statistic, or claim that comes from a source.]

FOOTNOTES:
[1] SOURCE_TYPE: [company_profile | user_upload | news | company_website] | SOURCE_NAME: [name] | DETAIL: [optional detail] | EVIDENCE: [1 sentence quote or paraphrase from source]
[2] SOURCE_TYPE: [type] | SOURCE_NAME: [name] | DETAIL: [detail] | EVIDENCE: [evidence]

Example:
SUBJECT: Partnership Opportunity with TechCorp

BODY:
I was impressed to learn about your recent $45M Series B raise.[1] Your expansion into European markets[2] aligns well with our investment thesis in B2B software companies.[3]

FOOTNOTES:
[1] SOURCE_TYPE: news | SOURCE_NAME: Company Website - Series B Announcement | DETAIL: March 15, 2024 | EVIDENCE: TechCorp announced $45M Series B funding led by Sequoia Capital
[2] SOURCE_TYPE: company_profile | SOURCE_NAME: Grata Company Profile | DETAIL: Strategic expansion plans | EVIDENCE: Company is expanding operations into Germany, France, and UK markets
[3] SOURCE_TYPE: user_upload | SOURCE_NAME: Summit Capital Investment Thesis 2025 | DETAIL: B2B software focus | EVIDENCE: We focus on B2B software companies with $10-50M revenue and strong unit economics`;
}

function buildUserPrompt(
  company: Company,
  userContexts: UserContext[],
  config: OutreachConfig
): string {
  return `
TARGET COMPANY PROFILE:
Name: ${company.name}
Description: ${company.description}
Industry: ${company.industry}
Geography: ${company.geography}

Management Team:
${company.management.map(m => `- ${m.name}, ${m.title}`).join('\n')}

Recent News:
${company.recentNews?.map(n => `- ${n.title} (${n.date}): ${n.summary} [Source: ${n.source}]`).join('\n') || 'None'}

Strategic Signals:
${company.strategicSignals.map(s => `- ${s.type.toUpperCase()}: ${s.description} (${s.date}) [Source: ${s.source}]`).join('\n')}

USER CONTEXT DOCUMENTS:
${userContexts.map(ctx => `
[${ctx.type.toUpperCase()}] ${ctx.name}:
${ctx.content}
`).join('\n')}

OUTREACH CONFIGURATION:
Objective: ${config.objective}
Recipient Persona: ${config.recipientPersona}
${config.additionalContext ? `Additional Context: ${config.additionalContext}` : ''}

Generate a personalized outreach email based on the above information.
`;
}

function parseEmailResponse(response: string, angle: EmailAngle, index: number): EmailDraft {
  const lines = response.split('\n');
  let subject = '';
  let body = '';
  let inBody = false;
  let inFootnotes = false;
  const footnotes: Map<string, CitationSource> = new Map();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('SUBJECT:')) {
      subject = line.replace('SUBJECT:', '').trim();
    } else if (line.startsWith('BODY:')) {
      inBody = true;
      inFootnotes = false;
    } else if (line.startsWith('FOOTNOTES:')) {
      inBody = false;
      inFootnotes = true;
    } else if (inBody && !line.startsWith('FOOTNOTES:')) {
      body += line + '\n';
    } else if (inFootnotes) {
      // Parse footnote format: [1] SOURCE_TYPE: news | SOURCE_NAME: name | DETAIL: detail | EVIDENCE: evidence
      const footnoteMatch = line.match(/^\[(\d+)\]\s*SOURCE_TYPE:\s*([^|]+)\s*\|\s*SOURCE_NAME:\s*([^|]+)(?:\s*\|\s*DETAIL:\s*([^|]+))?(?:\s*\|\s*EVIDENCE:\s*(.+))?/);

      if (footnoteMatch) {
        const [, number, sourceType, sourceName, sourceDetail, evidence] = footnoteMatch;
        footnotes.set(number, {
          type: sourceType.trim() as CitationSource['type'],
          name: sourceName.trim(),
          detail: sourceDetail?.trim(),
          evidence: evidence?.trim()
        });
      }
    }
  }

  // Now find all footnote markers in the body and create citations
  const citations: Citation[] = [];
  const bodyText = body.trim();
  const footnoteRegex = /\[(\d+)\]/g;
  let match;

  while ((match = footnoteRegex.exec(bodyText)) !== null) {
    const footnoteNumber = match[1];
    const source = footnotes.get(footnoteNumber);

    if (source) {
      const startIndex = match.index;
      const endIndex = match.index + match[0].length;

      citations.push({
        id: `citation-${footnoteNumber}`,
        text: match[0], // The [1], [2], etc. marker itself
        source,
        startIndex,
        endIndex
      });
    }
  }

  console.log(`[${angle}] Parsed ${citations.length} citations from ${footnotes.size} footnotes`);

  return {
    id: `draft-${index}-${Date.now()}`,
    subject: subject || 'Exploring Partnership Opportunities',
    body: bodyText,
    angle,
    citations,
    isLocked: false,
    lockedPhrases: []
  };
}
