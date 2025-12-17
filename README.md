# Grata Email Personalization Tool (MVP)

An AI-powered email personalization feature for private equity, corporate development, and investment banking professionals to accelerate high-quality outreach drafting.

## Features

- **Company Saved Lists**: View and manage target companies from Grata
- **AI-Powered Email Generation**: Generate 6 personalized email drafts per company using Claude API
- **Multiple Angles**: Each draft uses a different angle (Strategy, Portfolio Synergy, Relationship, etc.)
- **Inline Editing**: Edit email drafts directly in the interface
- **Copy to Clipboard**: One-click copy of email drafts to paste into your email client
- **Configurable Outreach**: Customize by objective (relationship/buy-side/sell-side) and recipient persona
- **Source Citations**: All factual claims are backed by company data or user uploads

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **AI**: Anthropic Claude API (Claude 3.5 Sonnet)
- **State Management**: React hooks

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An Anthropic API key (get one at https://console.anthropic.com/)

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd grata-email-personalization-tool
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   - Open `.env.local` and replace `your_api_key_here` with your actual Anthropic API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **View Saved List**: On the homepage, you'll see a saved list of target companies
2. **Select Company**: Click "Start Outreach" on any company card
3. **Configure Outreach**: In the side panel, select:
   - Objective (Relationship Building, Buy-Side Interest, or Sell-Side Pitch)
   - Recipient persona (Founder, CEO, CFO, or Business Lead)
4. **Generate Drafts**: Click "Generate Drafts" to create 6 personalized email variations
5. **Edit & Copy**:
   - Click the edit icon to modify any draft
   - Click the copy icon to copy to clipboard
   - Use the drafts in your email client

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── generate-emails/    # Email generation API endpoint
│   │   └── regenerate-section/ # Section regeneration endpoint
│   ├── layout.tsx              # Root layout with Toaster
│   └── page.tsx                # Main application page
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── CompanyCard.tsx         # Company display card
│   ├── EmailDraftCard.tsx      # Email draft display & editing
│   ├── OutreachPanel.tsx       # Side panel for outreach
│   └── SavedListView.tsx       # Saved list container
├── lib/
│   ├── claude.ts               # Claude API integration
│   ├── mock-data.ts            # Mock company & context data
│   └── utils.ts                # Utility functions
├── types/
│   └── index.ts                # TypeScript type definitions
└── .env.local                  # Environment variables (API key)
```

## Mock Data

The MVP includes mock data for:
- **5 Companies**: TechFlow Solutions, HealthBridge Analytics, GreenLogistics Inc, DataVault Security, RetailOS
- **User Context Documents**: Firm overview, investment thesis, deal history

You can modify the mock data in `lib/mock-data.ts` to test with your own scenarios.

## Key Components

### OutreachPanel
The main interface for email generation. Features:
- Company context display
- Outreach configuration (objective & recipient)
- Draft generation trigger
- Scrollable draft list
- Copy count tracking

### EmailDraftCard
Individual draft display with:
- Subject line and body
- Angle badge (e.g., "Strategy", "Portfolio Synergy")
- Edit mode with textarea
- Copy to clipboard
- Text selection for future regeneration

### CompanyCard
Displays company information:
- Name, industry, and geography
- Recent strategic signals
- "Start Outreach" action button

## API Endpoints

### POST /api/generate-emails
Generates 6 personalized email drafts for a company.

**Request Body:**
```json
{
  "company": Company,
  "config": OutreachConfig,
  "userContexts": UserContext[]
}
```

**Response:**
```json
{
  "drafts": EmailDraft[]
}
```

### POST /api/regenerate-section
Regenerates a selected portion of an email draft.

**Request Body:**
```json
{
  "originalDraft": EmailDraft,
  "selectedText": string,
  "direction": string (optional),
  "company": Company,
  "config": OutreachConfig,
  "userContexts": UserContext[]
}
```

## Future Enhancements (Post-MVP)

- [ ] User upload functionality for context documents
- [ ] Source citation hover tooltips
- [ ] Phrase locking across regenerations
- [ ] Batch generation across multiple companies
- [ ] Email sending integration
- [ ] CRM integrations (Salesforce, HubSpot)
- [ ] Email tracking (opens, replies)
- [ ] Team analytics dashboard

## PRD Alignment

This MVP implements the core requirements from the Product Requirements Document:
- ✅ Email generation with multiple angles
- ✅ Personalization using company profile data
- ✅ User-uploaded context (mocked, upload UI pending)
- ✅ Inline editing
- ✅ Configurable outreach settings
- ✅ Copy to clipboard (primary success metric)
- ✅ Professional, relationship-building tone
- ✅ Source-backed factual claims

## License

Proprietary - Grata Internal Tool

## Support

For questions or issues, please contact the development team.
