import { Company, SavedList, UserContext } from '@/types';

// Mock Companies
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechFlow Solutions',
    description: 'Cloud-based workflow automation platform for enterprise teams, specializing in AI-powered process optimization and integration with legacy systems.',
    industry: 'Enterprise Software',
    geography: 'San Francisco, CA',
    website: 'https://techflowsolutions.com',
    recentNews: [
      {
        id: 'n1',
        title: 'TechFlow Secures $45M Series B',
        summary: 'Led by Sequoia Capital, the round will fund expansion into European markets and AI capabilities.',
        date: '2025-11-15',
        source: 'TechCrunch'
      },
      {
        id: 'n2',
        title: 'Partnership with Salesforce Announced',
        summary: 'Strategic integration to bring workflow automation to Salesforce enterprise customers.',
        date: '2025-10-28',
        source: 'Company Website'
      }
    ],
    management: [
      {
        id: 'm1',
        name: 'Sarah Chen',
        title: 'CEO & Co-Founder',
        linkedIn: 'https://linkedin.com/in/sarahchen'
      },
      {
        id: 'm2',
        name: 'Michael Rodriguez',
        title: 'CFO',
        linkedIn: 'https://linkedin.com/in/mrodriguez'
      },
      {
        id: 'm3',
        name: 'Dr. James Park',
        title: 'CTO & Co-Founder'
      }
    ],
    strategicSignals: [
      {
        type: 'growth',
        description: 'Revenue grew 180% YoY, reaching $25M ARR',
        date: '2025-09-01',
        source: 'Grata Company Profile'
      },
      {
        type: 'hiring',
        description: 'Hiring 30+ engineers and 15 sales positions',
        date: '2025-11-01',
        source: 'LinkedIn Jobs'
      },
      {
        type: 'expansion',
        description: 'Opening London office in Q1 2026',
        date: '2025-10-15',
        source: 'Company Blog'
      }
    ]
  },
  {
    id: '2',
    name: 'HealthBridge Analytics',
    description: 'Healthcare data analytics platform helping hospitals optimize patient outcomes and operational efficiency through predictive modeling.',
    industry: 'Healthcare Technology',
    geography: 'Boston, MA',
    website: 'https://healthbridge.io',
    recentNews: [
      {
        id: 'n3',
        title: 'HealthBridge Expands to 50+ Hospital Systems',
        summary: 'Platform now serves over 200 hospitals across North America',
        date: '2025-11-20',
        source: 'Healthcare IT News'
      }
    ],
    management: [
      {
        id: 'm4',
        name: 'Dr. Emily Watson',
        title: 'CEO & Founder',
        linkedIn: 'https://linkedin.com/in/emilywatson'
      },
      {
        id: 'm5',
        name: 'David Kim',
        title: 'COO'
      }
    ],
    strategicSignals: [
      {
        type: 'ma',
        description: 'Acquired smaller competitor MedInsights for undisclosed sum',
        date: '2025-08-15',
        source: 'Business Wire'
      },
      {
        type: 'growth',
        description: 'Quadrupled customer base in 18 months',
        date: '2025-10-01',
        source: 'Grata Company Profile'
      }
    ]
  },
  {
    id: '3',
    name: 'GreenLogistics Inc',
    description: 'Sustainable last-mile delivery network using electric vehicles and route optimization AI to reduce carbon emissions.',
    industry: 'Logistics & Transportation',
    geography: 'Austin, TX',
    website: 'https://greenlogistics.com',
    recentNews: [
      {
        id: 'n4',
        title: 'GreenLogistics Raises $80M to Expand EV Fleet',
        summary: 'Series C round led by Climate Capital to deploy 500+ electric delivery vehicles',
        date: '2025-11-05',
        source: 'Reuters'
      }
    ],
    management: [
      {
        id: 'm6',
        name: 'Marcus Johnson',
        title: 'CEO',
        linkedIn: 'https://linkedin.com/in/marcusjohnson'
      },
      {
        id: 'm7',
        name: 'Lisa Tran',
        title: 'Chief Sustainability Officer'
      }
    ],
    strategicSignals: [
      {
        type: 'expansion',
        description: 'Expanding to 15 new metropolitan areas in 2026',
        date: '2025-11-01',
        source: 'Company Press Release'
      },
      {
        type: 'product_launch',
        description: 'Launched carbon tracking API for enterprise customers',
        date: '2025-09-20',
        source: 'Company Website'
      }
    ]
  },
  {
    id: '4',
    name: 'DataVault Security',
    description: 'Enterprise-grade cybersecurity platform specializing in zero-trust architecture and real-time threat detection.',
    industry: 'Cybersecurity',
    geography: 'New York, NY',
    website: 'https://datavault.security',
    management: [
      {
        id: 'm8',
        name: 'Rebecca Foster',
        title: 'CEO & Founder'
      },
      {
        id: 'm9',
        name: 'Alex Kumar',
        title: 'VP of Engineering'
      }
    ],
    strategicSignals: [
      {
        type: 'growth',
        description: 'Annual recurring revenue surpassed $50M milestone',
        date: '2025-10-10',
        source: 'Grata Company Profile'
      }
    ]
  },
  {
    id: '5',
    name: 'RetailOS',
    description: 'Point-of-sale and inventory management platform for omnichannel retailers with integrated payment processing.',
    industry: 'Retail Technology',
    geography: 'Seattle, WA',
    website: 'https://retailos.com',
    recentNews: [
      {
        id: 'n5',
        title: 'RetailOS Powers 10,000+ Store Locations',
        summary: 'Platform adoption accelerates among mid-market retailers',
        date: '2025-10-30',
        source: 'Retail TouchPoints'
      }
    ],
    management: [
      {
        id: 'm10',
        name: 'Jennifer Lee',
        title: 'CEO',
        linkedIn: 'https://linkedin.com/in/jenniferlee'
      }
    ],
    strategicSignals: [
      {
        type: 'hiring',
        description: 'Doubled engineering team to 120+ employees',
        date: '2025-09-15',
        source: 'LinkedIn'
      }
    ]
  }
];

// Mock Saved Lists
export const mockSavedLists: SavedList[] = [
  {
    id: 'list1',
    name: 'Enterprise SaaS Targets - Q4 2025',
    companies: mockCompanies,
    createdAt: '2025-10-01',
    updatedAt: '2025-11-25'
  }
];

// Mock User Context Documents
export const mockUserContext: UserContext[] = [
  {
    id: 'ctx1',
    type: 'about_us',
    name: 'Summit Capital - Firm Overview',
    content: `Summit Capital is a growth-stage private equity firm focused on B2B software, healthcare IT, and sustainable technology investments. With $2.5B in assets under management, we partner with exceptional founders to accelerate growth, optimize operations, and build category-leading companies.

Our investment thesis centers on companies with:
- $10-50M in revenue
- Strong unit economics and path to profitability
- Defensible market position
- Scalable business models

We bring operational expertise, strategic relationships, and patient capital to support long-term value creation.`,
    uploadedAt: '2025-09-01'
  },
  {
    id: 'ctx2',
    type: 'thesis',
    name: 'Healthcare IT Investment Thesis 2025',
    content: `We believe healthcare organizations are at an inflection point in adopting AI-powered analytics and workflow automation. Key trends driving our thesis:

1. Hospital systems facing margin pressure need solutions that demonstrably improve operational efficiency
2. Interoperability mandates create opportunities for data integration platforms
3. Value-based care models accelerate adoption of predictive analytics
4. Strong recurring revenue models with expansion potential

Target profile: Post-revenue companies serving 20+ hospital systems with proven ROI case studies and low customer churn.`,
    uploadedAt: '2025-10-15'
  },
  {
    id: 'ctx3',
    type: 'deal_history',
    name: 'Recent Portfolio Acquisition - WorkFlow Pro',
    content: `In Q2 2025, Summit Capital acquired WorkFlow Pro, an enterprise process automation platform, for $120M. The company had:

- $28M ARR with 140% net revenue retention
- 300+ enterprise customers including Fortune 500 companies
- Strong product-market fit in financial services and healthcare verticals

Post-acquisition, we've helped WorkFlow Pro expand into European markets and accelerate product development, resulting in 60% revenue growth.`,
    uploadedAt: '2025-11-01'
  }
];
