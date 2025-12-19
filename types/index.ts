// Core Types for Grata Email Personalization Tool

export interface Company {
  id: string;
  name: string;
  description: string;
  industry: string;
  geography: string;
  website?: string;
  recentNews?: NewsItem[];
  management: ManagementMember[];
  strategicSignals: StrategicSignal[];
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
}

export interface ManagementMember {
  id: string;
  name: string;
  title: string;
  linkedIn?: string;
  background?: string; // Previous experience, education
  interests?: string[]; // Professional interests, focus areas
  recentActivity?: string; // Recent posts, speaking engagements, etc.
  tenure?: string; // How long at the company
}

export interface StrategicSignal {
  type: 'growth' | 'hiring' | 'ma' | 'expansion' | 'product_launch';
  description: string;
  date: string;
  source: string;
}

export interface SavedList {
  id: string;
  name: string;
  companies: Company[];
  createdAt: string;
  updatedAt: string;
}

export interface UserContext {
  id: string;
  type: 'thesis' | 'pitch_deck' | 'email_chain' | 'about_us' | 'deal_history';
  name: string;
  content: string;
  uploadedAt: string;
}

export interface EmailDraft {
  id: string;
  subject: string;
  body: string;
  angle: EmailAngle;
  citations: Citation[];
  isLocked?: boolean;
  lockedPhrases?: LockedPhrase[];
}

export type EmailAngle =
  | 'Strategy'
  | 'Portfolio Synergy'
  | 'Relationship'
  | 'Market Commentary'
  | 'Growth Partnership'
  | 'Acquisition Interest';

export interface Citation {
  id: string;
  text: string;
  source: CitationSource;
  startIndex: number;
  endIndex: number;
}

export interface CitationSource {
  type: 'company_profile' | 'user_upload' | 'news' | 'company_website';
  name: string;
  detail?: string;
  evidence?: string; // Brief excerpt or quote from the source
}

export interface LockedPhrase {
  text: string;
  startIndex: number;
  endIndex: number;
}

export interface OutreachConfig {
  objective: 'relationship' | 'buy_side' | 'sell_side';
  recipientPersona: 'founder' | 'ceo' | 'cfo' | 'business_lead';
  additionalContext?: string;
}

export interface RegenerationRequest {
  draftId: string;
  selectedText: string;
  direction?: string;
  startIndex: number;
  endIndex: number;
}
