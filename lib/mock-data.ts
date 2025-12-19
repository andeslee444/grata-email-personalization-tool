import { Company, SavedList, UserContext } from '@/types';

// Helper function to generate company data
const createCompany = (
  id: string,
  name: string,
  description: string,
  industry: string,
  geography: string,
  revenue: string,
  employees: string,
  signals: string[],
  management: any[]
): Company => ({
  id,
  name,
  description,
  industry,
  geography,
  website: `https://${name.toLowerCase().replace(/\s+/g, '')}.com`,
  management,
  recentNews: signals.slice(0, 2).map((signal, idx) => ({
    id: `${id}-n${idx}`,
    title: signal,
    summary: signal,
    date: '2025-11-01',
    source: 'Company Website'
  })),
  strategicSignals: signals.map((signal, idx) => ({
    type: idx % 2 === 0 ? 'growth' : 'hiring' as any,
    description: signal,
    date: '2025-11-01',
    source: 'Grata Company Profile'
  }))
});

// Mock Companies - 30+ Target Companies
export const mockCompanies: Company[] = [
  createCompany('1', 'TechFlow Solutions', 'Cloud-based workflow automation platform for enterprise teams', 'Enterprise Software', 'San Francisco, CA', '$25M ARR', '150',
    ['Raised $45M Series B led by Sequoia Capital', 'Expanding into European markets', 'Hiring 30+ engineers'],
    [
      {
        id: '1-ceo',
        name: 'Sarah Chen',
        title: 'CEO & Co-Founder',
        background: 'Former VP of Product at Salesforce, MBA from Stanford GSB',
        interests: ['Enterprise SaaS scaling', 'International expansion', 'Product-led growth'],
        recentActivity: 'Keynote at SaaStr Annual on "Building for Enterprise Scale"',
        tenure: '5 years (founded 2020)',
        linkedInActivity: [
          {
            date: '2025-11-15',
            content: 'Excited to announce our expansion into European markets! Our mission to transform enterprise workflows is going global. Looking forward to connecting with teams in London, Paris, and Berlin.',
            engagement: '243 likes, 47 comments'
          },
          {
            date: '2025-11-08',
            content: 'Just wrapped up an incredible SaaStr Annual. Key takeaway: Enterprise customers don\'t just buy software—they buy transformation. Grateful to share our learnings on building for scale.',
            engagement: '189 likes, 32 comments'
          },
          {
            date: '2025-10-28',
            content: 'Hiring is our #1 priority right now. We\'re looking for 30+ engineers who are passionate about enterprise SaaS and want to solve hard problems at scale. DM me if interested!',
            engagement: '156 likes, 64 comments'
          }
        ]
      },,
      {
        id: '1-cfo',
        name: 'Michael Torres',
        title: 'CFO',
        background: 'Former CFO at DocuSign, CPA with 15 years in SaaS finance',
        interests: ['Unit economics optimization', 'IPO preparation', 'International tax strategy'],
        recentActivity: 'Recently closed $45M Series B, preparing for profitability',
        tenure: '2 years'
      },
      {
        id: '1-cto',
        name: 'Alex Kim',
        title: 'CTO & Co-Founder',
        background: 'Former Tech Lead at Google, specializes in distributed systems',
        interests: ['Engineering culture', 'System scalability', 'AI/ML integration'],
        recentActivity: 'Building engineering team for European expansion',
        tenure: '5 years (founded 2020)'
      }
    ]
  ),
  createCompany('2', 'HealthBridge Analytics', 'Healthcare data analytics platform for hospitals', 'Healthcare Technology', 'Boston, MA', '$18M ARR', '85',
    ['Serves 50+ hospital systems', 'Acquired MedInsights competitor', 'Quadrupled customer base'],
    [
      {
        id: '2-ceo',
        name: 'Dr. James Rodriguez',
        title: 'CEO & Founder',
        background: 'Former Chief Medical Officer at Mass General, MD from Johns Hopkins',
        interests: ['Healthcare IT interoperability', 'Value-based care', 'Clinical workflow optimization'],
        recentActivity: 'Published whitepaper on AI in hospital operations, speaking at HIMSS',
        tenure: '6 years (founded 2019)',
        linkedInActivity: [
          {
            date: '2025-11-20',
            content: 'Thrilled to share our new whitepaper on AI-driven hospital operations. We analyzed data from 50+ hospital systems and the results are transformative. Download link in comments.',
            engagement: '312 likes, 89 comments'
          },
          {
            date: '2025-11-10',
            content: 'Healthcare interoperability isn\'t just a technical challenge—it\'s a patient care imperative. Proud that our platform now serves 50+ hospital systems, improving outcomes for millions of patients.',
            engagement: '276 likes, 54 comments'
          },
          {
            date: '2025-11-01',
            content: 'Looking forward to speaking at HIMSS next month. Will be discussing how value-based care models are driving innovation in healthcare analytics. See you there!',
            engagement: '198 likes, 41 comments'
          }
        ]
      },,
      {
        id: '2-cfo',
        name: 'Emily Watson',
        title: 'CFO',
        background: 'Former VP Finance at Epic Systems, focus on healthcare SaaS metrics',
        interests: ['Healthcare reimbursement models', 'M&A strategy', 'Customer success metrics'],
        recentActivity: 'Led acquisition of MedInsights, targeting 3x revenue growth',
        tenure: '3 years'
      },
      {
        id: '2-vp',
        name: 'Robert Chang',
        title: 'VP of Sales',
        background: '20 years selling to hospital systems, former RVP at Cerner',
        interests: ['Hospital system relationships', 'Clinical champion development', 'Value selling'],
        recentActivity: 'Expanded from 12 to 50+ hospital customers in 18 months',
        tenure: '4 years'
      }
    ]
  ),
  createCompany('3', 'GreenLogistics Inc', 'Sustainable last-mile delivery with electric vehicles', 'Logistics & Transportation', 'Austin, TX', '$35M Revenue', '200',
    ['Raised $80M Series C', 'Expanding to 15 new markets', 'Launched carbon tracking API'],
    [
      {
        id: '3-ceo',
        name: 'Maria Gonzalez',
        title: 'CEO & Founder',
        background: 'Former Operations Director at UPS, passionate about sustainability',
        interests: ['Supply chain sustainability', 'EV fleet management', 'Last-mile optimization'],
        recentActivity: 'Featured in Forbes "30 Under 30" for Supply Chain, Series C announcement',
        tenure: '7 years (founded 2018)',
        linkedInActivity: [
          {
            date: '2025-11-18',
            content: 'Honored to be named to Forbes 30 Under 30 for Supply Chain! This recognition belongs to our entire team who\'s working tirelessly to make logistics more sustainable. The future is electric! ⚡',
            engagement: '892 likes, 156 comments'
          },
          {
            date: '2025-11-12',
            content: 'Big news: We just closed our $80M Series C led by Sequoia! This funding will help us expand to 15 new markets and accelerate our mission to electrify last-mile delivery. Excited for what\'s next!',
            engagement: '1,243 likes, 234 comments'
          },
          {
            date: '2025-10-30',
            content: 'Our carbon tracking API is now live! Companies can now monitor and reduce their delivery carbon footprint in real-time. Sustainability starts with measurement.',
            engagement: '567 likes, 98 comments'
          }
        ]
      },,
      {
        id: '3-cfo',
        name: 'David Park',
        title: 'CFO',
        background: 'Former CFO at logistics startup acquired by FedEx, deep network in industry',
        interests: ['Fleet financing', 'Network expansion', 'Sustainability metrics'],
        recentActivity: 'Closed $80M Series C led by Sequoia, planning 15-market expansion',
        tenure: '2 years'
      },
      {
        id: '3-coo',
        name: 'Jennifer Adams',
        title: 'COO',
        background: 'Former VP Operations at DoorDash, expert in logistics networks',
        interests: ['Operations scaling', 'Route optimization', 'Driver experience'],
        recentActivity: 'Leading expansion into 15 new markets with carbon tracking API',
        tenure: '3 years'
      }
    ]
  ),
  createCompany('4', 'DataVault Security', 'Enterprise cybersecurity with zero-trust architecture', 'Cybersecurity', 'New York, NY', '$50M ARR', '180',
    ['ARR surpassed $50M milestone', 'Opened EU headquarters', 'Partnership with AWS announced'],
    [
      {
        id: '4-ceo',
        name: 'Marcus Williams',
        title: 'CEO & Founder',
        background: 'Former CISO at JPMorgan Chase, 20 years in enterprise security',
        interests: ['Zero-trust architecture', 'Compliance automation', 'Security as a service'],
        recentActivity: 'Announced AWS partnership at re:Invent, expanding EU presence',
        tenure: '8 years (founded 2017)',
        linkedInActivity: [
          {
            date: '2025-11-22',
            content: 'Excited to announce our partnership with AWS! DataVault is now available on AWS Marketplace, bringing zero-trust security to thousands of enterprises. This is a game-changer for cloud security.',
            engagement: '567 likes, 94 comments'
          },
          {
            date: '2025-11-14',
            content: 'We just crossed $50M ARR! Grateful to our customers who trust us to protect their most critical assets. Zero-trust isn\'t just a buzzword—it\'s a necessity in today\'s threat landscape.',
            engagement: '892 likes, 156 comments'
          },
          {
            date: '2025-11-05',
            content: 'Opening our EU headquarters in London next month. As data privacy regulations evolve, having local presence is critical. We\'re hiring across security engineering and compliance.',
            engagement: '423 likes, 67 comments'
          }
        ]
      },,
      {
        id: '4-cfo',
        name: 'Rachel Levine',
        title: 'CFO',
        background: 'Former VP Finance at Palo Alto Networks, expertise in security SaaS scaling',
        interests: ['SaaS metrics optimization', 'Strategic partnerships', 'International expansion'],
        recentActivity: 'Led $50M ARR milestone achievement, opening EU headquarters',
        tenure: '3 years'
      },
      {
        id: '4-cto',
        name: 'Dmitri Petrov',
        title: 'CTO',
        background: 'Former Principal Engineer at FireEye, PhD in Cryptography from MIT',
        interests: ['Zero-trust frameworks', 'Threat detection AI', 'Cloud security'],
        recentActivity: 'Launched AWS integration, building EU engineering team',
        tenure: '5 years'
      }
    ]
  ),
  createCompany('5', 'RetailOS', 'Point-of-sale and inventory management for retailers', 'Retail Technology', 'Seattle, WA', '$22M ARR', '95',
    ['Powers 10,000+ store locations', 'Doubled engineering team', 'Integrated with Shopify'],
    [
      {
        id: '5-ceo',
        name: 'Jennifer Lee',
        title: 'CEO & Co-Founder',
        background: 'Former VP Retail at Square, expertise in omnichannel commerce',
        interests: ['Retail innovation', 'Omnichannel strategy', 'SMB empowerment'],
        recentActivity: 'Announced Shopify integration, keynote at NRF Big Show',
        tenure: '6 years (founded 2019)',
        linkedInActivity: [
          {
            date: '2025-11-19',
            content: 'Big news! RetailOS now integrates seamlessly with Shopify. Retailers can now sync inventory across 10,000+ stores in real-time. The future of omnichannel is here.',
            engagement: '734 likes, 128 comments'
          },
          {
            date: '2025-11-09',
            content: 'Thrilled to be keynoting at NRF Big Show next month! Will be sharing how we\'ve helped 10,000+ retailers transform their operations. The retail revolution is powered by great software.',
            engagement: '456 likes, 72 comments'
          },
          {
            date: '2025-10-28',
            content: 'We just doubled our engineering team! If you\'re passionate about retail tech and want to build tools that empower SMBs, we\'re hiring across the stack.',
            engagement: '298 likes, 89 comments'
          }
        ]
      },,
      {
        id: '5-cfo',
        name: 'Thomas Reynolds',
        title: 'CFO',
        background: 'Former Finance Director at Toast, focus on retail SaaS economics',
        interests: ['Retail metrics', 'Partner ecosystem strategy', 'Payment processing'],
        recentActivity: 'Scaling to 10,000+ locations, managing rapid team expansion',
        tenure: '2 years'
      },
      {
        id: '5-vp',
        name: 'Carlos Martinez',
        title: 'VP of Product',
        background: 'Former Product Lead at Shopify, 12 years in retail technology',
        interests: ['POS innovation', 'Inventory optimization', 'Merchant experience'],
        recentActivity: 'Led Shopify integration launch, expanding product roadmap',
        tenure: '4 years'
      }
    ]
  ),

  createCompany('6', 'FinSync Payments', 'B2B payment processing and reconciliation platform', 'FinTech', 'Chicago, IL', '$30M ARR', '120',
    ['Processing $5B annually', 'Raised $60M Series B', 'Expanding to Canada'],
    [
      {
        id: '6-ceo',
        name: 'Andrew Sullivan',
        title: 'CEO & Founder',
        background: 'Former VP Payments at Stripe, MBA from Wharton',
        interests: ['B2B payments innovation', 'Cross-border transactions', 'API-first platforms'],
        recentActivity: 'Announced $60M Series B and Canada expansion at FinTech Connect',
        tenure: '7 years (founded 2018)',
        linkedInActivity: [
          {
            date: '2025-11-17',
            content: 'Thrilled to announce our $60M Series B and expansion into Canada! FinSync now processes $5B annually across North America. The future of B2B payments is API-first.',
            engagement: '1,124 likes, 203 comments'
          },
          {
            date: '2025-11-07',
            content: 'Cross-border payments are still too slow and expensive. That\'s why we built our new rails to enable same-day settlement internationally. Game-changing for B2B commerce.',
            engagement: '687 likes, 134 comments'
          },
          {
            date: '2025-10-25',
            content: 'Speaking at FinTech Connect next week on the future of B2B payments. Would love to connect with others thinking about API-first payment infrastructure.',
            engagement: '412 likes, 56 comments'
          }
        ]
      },,
      {
        id: '6-cfo',
        name: 'Lisa Chang',
        title: 'CFO',
        background: 'Former Finance Director at PayPal, CPA with fintech expertise',
        interests: ['Payment economics', 'Regulatory compliance', 'International expansion'],
        recentActivity: 'Scaling to $5B annual processing volume, leading Canada launch',
        tenure: '3 years'
      },
      {
        id: '6-cto',
        name: 'Rahul Patel',
        title: 'CTO',
        background: 'Former Engineering Lead at Plaid, specializes in financial APIs',
        interests: ['Payment infrastructure', 'API design', 'Financial data security'],
        recentActivity: 'Building cross-border payment rails, expanding engineering team',
        tenure: '4 years'
      }
    ]
  ),
  createCompany('7', 'EduTech Academy', 'Online learning platform for corporate training', 'EdTech', 'Denver, CO', '$15M ARR', '75',
    ['500+ enterprise customers', 'Launched AI tutor feature', 'Growing 200% YoY'],
    [
      {
        id: '7-ceo',
        name: 'Dr. Patricia Moore',
        title: 'CEO & Co-Founder',
        background: 'Former Chief Learning Officer at LinkedIn Learning, PhD in Education Technology',
        interests: ['Corporate learning', 'AI in education', 'Skills development'],
        recentActivity: 'Launched AI tutor feature, speaking at ATD International Conference',
        tenure: '5 years (founded 2020)',
        linkedInActivity: [
          {
            date: '2025-11-21',
            content: 'Just launched our AI tutor feature! Corporate learners can now get personalized coaching 24/7. Early results show 3x improvement in course completion rates. AI is transforming L&D.',
            engagement: '923 likes, 187 comments'
          },
          {
            date: '2025-11-11',
            content: 'Proud to share we\'re now serving 500+ enterprise customers and growing 200% YoY. The demand for better corporate learning solutions has never been higher.',
            engagement: '645 likes, 112 comments'
          },
          {
            date: '2025-10-30',
            content: 'Speaking at ATD International Conference next month on "AI-Powered Learning at Scale". Would love to connect with fellow L&D leaders working on this transformation.',
            engagement: '387 likes, 64 comments'
          }
        ]
      },,
      {
        id: '7-cfo',
        name: 'Kevin Zhang',
        title: 'CFO',
        background: 'Former VP Finance at Coursera, expertise in EdTech business models',
        interests: ['LMS economics', 'Enterprise sales strategy', 'Product-led growth'],
        recentActivity: 'Managing 200% YoY growth, expanding to 500+ enterprise customers',
        tenure: '2 years'
      }
    ]
  ),
  createCompany('8', 'AgriSmart Systems', 'IoT and data analytics for precision agriculture', 'AgTech', 'Des Moines, IA', '$12M Revenue', '60',
    ['Deployed on 50,000+ acres', 'Partnership with John Deere', 'Raised $25M Series A'],
    [
      {
        id: '8-ceo',
        name: 'Robert Johnson',
        title: 'CEO & Founder',
        background: 'Third-generation farmer, BS in Agricultural Engineering from Iowa State',
        interests: ['Precision agriculture', 'Sustainable farming', 'IoT deployment'],
        recentActivity: 'Announced John Deere partnership, closed $25M Series A',
        tenure: '6 years (founded 2019)',
        linkedInActivity: [
          {
            date: '2025-11-16',
            content: 'Excited to announce our partnership with John Deere! AgriSmart is now integrated with their equipment, bringing precision agriculture to 50,000+ acres. This is farming\'s future.',
            engagement: '1,567 likes, 298 comments'
          },
          {
            date: '2025-11-06',
            content: 'Just closed our $25M Series A! As a third-generation farmer, I never imagined building a tech company. But sustainable farming needs better data—and that\'s exactly what we\'re delivering.',
            engagement: '892 likes, 167 comments'
          },
          {
            date: '2025-10-27',
            content: 'Our IoT sensors are helping farmers reduce water usage by 30% while increasing yields. Technology and sustainability can go hand in hand. Proud of what we\'re building.',
            engagement: '634 likes, 89 comments'
          }
        ]
      },,
      {
        id: '8-cfo',
        name: 'Michelle Barnes',
        title: 'CFO',
        background: 'Former Finance Director at Climate Corporation, expertise in AgTech',
        interests: ['AgTech unit economics', 'Strategic partnerships', 'Rural market development'],
        recentActivity: 'Led $25M Series A raise, expanding to 50,000+ acres',
        tenure: '2 years'
      },
      {
        id: '8-cto',
        name: 'Dr. Priya Sharma',
        title: 'CTO',
        background: 'Former IoT Lead at Monsanto, PhD in Agricultural Data Science',
        interests: ['Sensor technology', 'Predictive analytics', 'Farm automation'],
        recentActivity: 'Integrating with John Deere equipment, building data platform',
        tenure: '4 years'
      }
    ]
  ),
  createCompany('9', 'CloudOps Platform', 'DevOps automation and infrastructure management', 'Enterprise Software', 'San Jose, CA', '$40M ARR', '160',
    ['Manages $500M+ in cloud spend', 'Raised $70M Series C', 'Hiring 50+ engineers'],
    [
      {
        id: '9-ceo',
        name: 'Nina Patel',
        title: 'CEO & Co-Founder',
        background: 'Former Director of Engineering at HashiCorp, pioneered DevOps automation',
        interests: ['Cloud cost optimization', 'DevOps culture', 'Infrastructure as code'],
        recentActivity: 'Raised $70M Series C, managing $500M+ in customer cloud spend',
        tenure: '7 years (founded 2018)',
        linkedInActivity: [
          {
            date: '2025-11-20',
            content: 'CloudOps just raised $70M Series C! We now manage $500M+ in cloud spend for enterprises. The FinOps movement is real, and we\'re leading the charge on cost optimization.',
            engagement: '1,234 likes, 234 comments'
          },
          {
            date: '2025-11-13',
            content: 'Hiring 50+ engineers! If you\'re passionate about infrastructure automation and want to work on problems at massive scale, DM me. We\'re building the future of cloud operations.',
            engagement: '876 likes, 189 comments'
          },
          {
            date: '2025-11-02',
            content: 'Infrastructure as Code isn\'t enough anymore. You need automated cost optimization, security compliance, and governance at scale. That\'s what we\'re building at CloudOps.',
            engagement: '543 likes, 97 comments'
          }
        ]
      },,
      {
        id: '9-cfo',
        name: 'Steven Wu',
        title: 'CFO',
        background: 'Former VP Finance at Datadog, deep expertise in infrastructure SaaS',
        interests: ['Cloud economics', 'Consumption-based pricing', 'Enterprise expansion'],
        recentActivity: 'Scaling to $40M ARR, hiring 50+ engineers post Series C',
        tenure: '3 years'
      },
      {
        id: '9-cto',
        name: 'Alexei Volkov',
        title: 'CTO & Co-Founder',
        background: 'Former Principal Engineer at Google Cloud, Kubernetes contributor',
        interests: ['Cloud automation', 'Kubernetes orchestration', 'FinOps practices'],
        recentActivity: 'Building next-gen automation platform, expanding engineering team',
        tenure: '7 years (founded 2018)'
      }
    ]
  ),
  createCompany('10', 'MedSupply Chain', 'Supply chain optimization for medical devices', 'Healthcare Technology', 'Philadelphia, PA', '$28M Revenue', '110',
    ['Serves 100+ hospitals', 'Reduced costs by 30% avg', 'Expanding to EU'],
    [
      {
        id: '10-ceo',
        name: 'Dr. Katherine Brooks',
        title: 'CEO & Founder',
        background: 'Former COO at Cardinal Health, MBA and MD from Penn',
        interests: ['Healthcare supply chain', 'Cost reduction', 'Hospital operations'],
        recentActivity: 'Expanding to 100+ hospital systems, launching EU operations',
        tenure: '8 years (founded 2017)',
        linkedInActivity: [
          {
            date: '2025-11-19',
            content: 'MedSupply Chain now serves 100+ hospital systems! We\'ve helped reduce medical device costs by an average of 30%. Healthcare deserves better supply chain efficiency.',
            engagement: '678 likes, 134 comments'
          },
          {
            date: '2025-11-09',
            content: 'Excited to announce our EU expansion! Opening operations in London and Frankfurt to bring our supply chain optimization to European hospitals. Healthcare is global.',
            engagement: '512 likes, 87 comments'
          },
          {
            date: '2025-10-29',
            content: 'As both a physician and supply chain expert, I see daily how inefficiencies hurt patient care. That\'s why we built MedSupply—to make healthcare better through smarter operations.',
            engagement: '823 likes, 156 comments'
          }
        ]
      },,
      {
        id: '10-cfo',
        name: 'James O\'Connor',
        title: 'CFO',
        background: 'Former Finance VP at McKesson, expertise in healthcare distribution',
        interests: ['Healthcare economics', 'International expansion', 'Value-based care'],
        recentActivity: 'Achieved 30% avg cost reduction for hospitals, planning EU launch',
        tenure: '4 years'
      }
    ]
  ),

  createCompany('11', 'RealEstate Analytics Co', 'Commercial real estate data and insights platform', 'PropTech', 'New York, NY', '$20M ARR', '90',
    ['Covers 25M+ properties', 'Raised $45M Series B', 'Launched AI valuation tool'],
    [
      {
        id: '11-ceo',
        name: 'Victoria Zhang',
        title: 'CEO & Co-Founder',
        background: 'Former Managing Director at CBRE Tech, MBA from Columbia',
        interests: ['Commercial real estate', 'PropTech innovation', 'AI in real estate'],
        recentActivity: 'Launched AI valuation tool, raised $45M Series B from Andreessen Horowitz',
        tenure: '6 years (founded 2019)',
        linkedInActivity: [
          {
            date: '2025-11-23',
            content: 'Thrilled to announce our $45M Series B led by Andreessen Horowitz! Our AI valuation tool now covers 25M+ properties. The future of commercial real estate is data-driven.',
            engagement: '1,456 likes, 287 comments'
          },
          {
            date: '2025-11-14',
            content: 'Just launched our AI-powered valuation tool. It analyzes thousands of data points in seconds to provide accurate property valuations. PropTech is transforming CRE.',
            engagement: '934 likes, 178 comments'
          },
          {
            date: '2025-11-03',
            content: 'Commercial real estate needs better data infrastructure. That\'s why we built a platform that gives investors real-time insights on 25M+ properties. Game-changing for the industry.',
            engagement: '612 likes, 94 comments'
          }
        ]
      },,
      {
        id: '11-cfo',
        name: 'Gregory Martinez',
        title: 'CFO',
        background: 'Former Finance VP at CoStar Group, expertise in real estate data',
        interests: ['Real estate SaaS metrics', 'Data monetization', 'Strategic M&A'],
        recentActivity: 'Expanding coverage to 25M+ properties, managing Series B capital',
        tenure: '3 years'
      },
      {
        id: '11-cto',
        name: 'Dr. Yuki Tanaka',
        title: 'CTO & Co-Founder',
        background: 'Former ML Lead at Zillow, PhD in Computer Vision from Stanford',
        interests: ['Property valuation AI', 'Computer vision', 'Geospatial analytics'],
        recentActivity: 'Building AI valuation models, scaling data infrastructure',
        tenure: '6 years (founded 2019)'
      }
    ]
  ),
  createCompany('12', 'InsureTech Solutions', 'Insurance underwriting automation platform', 'InsurTech', 'Hartford, CT', '$18M ARR', '70',
    ['Processes 100K+ policies', 'Partnership with Zurich', 'Growing 150% YoY'],
    [
      {
        id: '12-ceo',
        name: 'Daniel Foster',
        title: 'CEO & Founder',
        background: 'Former Chief Underwriter at AIG, 25 years in insurance industry',
        interests: ['Insurance automation', 'Risk assessment AI', 'Underwriting efficiency'],
        recentActivity: 'Announced Zurich partnership, processing 100K+ policies annually',
        tenure: '5 years (founded 2020)'
      },
      {
        id: '12-cfo',
        name: 'Sophia Lee',
        title: 'CFO',
        background: 'Former Finance Director at Lemonade Insurance, InsurTech specialist',
        interests: ['Insurance economics', 'Partner channel strategy', 'Growth metrics'],
        recentActivity: 'Managing 150% YoY growth, building partner ecosystem',
        tenure: '2 years'
      }
    ]
  ),
  createCompany('13', 'FoodChain Logistics', 'Cold chain management for food distribution', 'Supply Chain Tech', 'Atlanta, GA', '$32M Revenue', '140',
    ['Reduced food waste by 40%', 'Expanding to West Coast', 'Raised $55M'],
    [
      {
        id: '13-ceo',
        name: 'Marcus Thompson',
        title: 'CEO & Founder',
        background: 'Former VP Operations at Sysco, expertise in food distribution',
        interests: ['Sustainable supply chain', 'Cold chain technology', 'Food waste reduction'],
        recentActivity: 'Raised $55M led by Breakthrough Energy Ventures, expanding West Coast',
        tenure: '7 years (founded 2018)'
      },
      {
        id: '13-cfo',
        name: 'Amanda Chen',
        title: 'CFO',
        background: 'Former Finance VP at US Foods, expertise in food logistics',
        interests: ['Supply chain economics', 'Sustainability metrics', 'Regional expansion'],
        recentActivity: 'Achieved 40% food waste reduction, managing West Coast expansion',
        tenure: '3 years'
      },
      {
        id: '13-coo',
        name: 'Tyler Washington',
        title: 'COO',
        background: 'Former Director at C.H. Robinson, 15 years in logistics operations',
        interests: ['Cold chain optimization', 'IoT sensors', 'Route efficiency'],
        recentActivity: 'Leading West Coast expansion, deploying new sensor technology',
        tenure: '4 years'
      }
    ]
  ),
  createCompany('14', 'LegalTech Pro', 'AI-powered contract review and management', 'LegalTech', 'Washington, DC', '$16M ARR', '65',
    ['500+ law firms using platform', 'Saves 70% review time', 'Launched compliance module'],
    [
      {
        id: '14-ceo',
        name: 'Jennifer Lawson',
        title: 'CEO & Co-Founder',
        background: 'Former partner at Latham & Watkins, JD from Harvard Law',
        interests: ['Legal AI', 'Contract automation', 'Law firm innovation'],
        recentActivity: 'Launched compliance module, serving 500+ law firms',
        tenure: '6 years (founded 2019)'
      },
      {
        id: '14-cfo',
        name: 'Michael Roberts',
        title: 'CFO',
        background: 'Former Finance Director at LexisNexis, expertise in legal tech',
        interests: ['Legal SaaS metrics', 'Law firm sales cycles', 'Product expansion'],
        recentActivity: 'Achieving 70% review time savings, expanding product suite',
        tenure: '2 years'
      }
    ]
  ),
  createCompany('15', 'ManufactureIQ', 'Smart manufacturing and predictive maintenance', 'Industrial IoT', 'Detroit, MI', '$24M ARR', '100',
    ['200+ factories monitored', 'Reduced downtime 50%', 'Partnership with Siemens'],
    [
      {
        id: '15-ceo',
        name: 'David Schmidt',
        title: 'CEO & Founder',
        background: 'Former VP Manufacturing at General Motors, 30 years in automotive',
        interests: ['Industry 4.0', 'Predictive maintenance', 'Manufacturing automation'],
        recentActivity: 'Announced Siemens partnership, monitoring 200+ factories globally',
        tenure: '8 years (founded 2017)'
      },
      {
        id: '15-cfo',
        name: 'Laura Mitchell',
        title: 'CFO',
        background: 'Former Finance VP at Rockwell Automation, industrial IoT expert',
        interests: ['Industrial SaaS economics', 'OEM partnerships', 'Global expansion'],
        recentActivity: 'Achieved 50% downtime reduction for customers, scaling with Siemens',
        tenure: '4 years'
      },
      {
        id: '15-cto',
        name: 'Dr. Kenji Yamamoto',
        title: 'CTO',
        background: 'Former Engineering Director at ABB, PhD in Industrial Engineering',
        interests: ['Predictive analytics', 'Edge computing', 'Digital twins'],
        recentActivity: 'Building Siemens integration, deploying edge AI for factories',
        tenure: '5 years'
      }
    ]
  ),

  createCompany('16', 'HR Talent Suite', 'Recruiting and talent management platform', 'HR Tech', 'Austin, TX', '$19M ARR', '80',
    ['10,000+ companies using platform', 'Raised $40M Series B', 'AI matching engine launched'],
    [
      {
        id: '16-ceo',
        name: 'Rebecca Park',
        title: 'CEO & Co-Founder',
        background: 'Former VP Talent at LinkedIn, expertise in HR technology',
        interests: ['Talent acquisition', 'AI recruiting', 'People analytics'],
        recentActivity: 'Launched AI matching engine, raised $40M Series B from Sequoia',
        tenure: '6 years (founded 2019)'
,
        linkedInActivity: [
          {
            date: '2025-11-19',
            content: 'HR Talent Suite raised $40M Series B from Sequoia! Our AI matching engine now serves 10,000+ companies. The future of recruiting is intelligent automation.',
            engagement: '1,345 likes, 267 comments'
          },
          {
            date: '2025-11-10',
            content: 'Just launched our AI matching engine—it\'s like having a top recruiter working 24/7. Early customers report 50% faster time-to-hire. Talent acquisition will never be the same.',
            engagement: '876 likes, 154 comments'
          },
          {
            date: '2025-11-01',
            content: 'We\'re democratizing access to top recruiting tech. 10,000+ companies now use our platform, from startups to Fortune 500. Excited for what\'s next!',
            engagement: '654 likes, 98 comments'
          }
        ]
      },,
      {
        id: '16-cfo',
        name: 'Nathan Cooper',
        title: 'CFO',
        background: 'Former Finance Director at Workday, HR SaaS specialist',
        interests: ['HR tech metrics', 'SMB to enterprise expansion', 'Marketplace economics'],
        recentActivity: 'Scaling to 10,000+ companies, managing Series B growth capital',
        tenure: '3 years'
      }
    ]
  ),
  createCompany('17', 'CyberGuard Pro', 'Managed security services for SMBs', 'Cybersecurity', 'Dallas, TX', '$26M ARR', '115',
    ['Protects 5,000+ companies', 'SOC 2 Type II certified', 'Expanding to EMEA'],
    [
      {
        id: '17-ceo',
        name: 'Christopher Hayes',
        title: 'CEO & Founder',
        background: 'Former CISO at Dell, 22 years in enterprise security',
        interests: ['SMB security', 'Managed services', 'Security compliance'],
        recentActivity: 'Achieved SOC 2 Type II certification, protecting 5,000+ SMBs',
        tenure: '7 years (founded 2018)'
,
        linkedInActivity: [
          {
            date: '2025-11-18',
            content: 'CyberGuard Pro achieved SOC 2 Type II certification! We now protect 5,000+ SMBs with enterprise-grade security. Security shouldn\'t be just for large enterprises.',
            engagement: '789 likes, 134 comments'
          },
          {
            date: '2025-11-09',
            content: 'Expanding to EMEA! SMBs everywhere deserve access to managed security services. Our 24/7 SOC is now going global.',
            engagement: '567 likes, 87 comments'
          },
          {
            date: '2025-10-30',
            content: 'After 22 years in enterprise security, I founded CyberGuard to bring that same protection to SMBs. $26M ARR proves the market needs this.',
            engagement: '445 likes, 67 comments'
          }
        ]
      },,
      {
        id: '17-cfo',
        name: 'Priya Desai',
        title: 'CFO',
        background: 'Former VP Finance at CrowdStrike, cybersecurity SaaS expert',
        interests: ['Security SaaS economics', 'EMEA expansion', 'Partner channels'],
        recentActivity: 'Planning EMEA launch, scaling to $26M ARR',
        tenure: '3 years'
      },
      {
        id: '17-coo',
        name: 'Daniel Kim',
        title: 'COO',
        background: 'Former Operations Director at Rapid7, SOC operations specialist',
        interests: ['SOC operations', 'Service delivery', 'Customer retention'],
        recentActivity: 'Building EMEA operations, expanding SOC capacity',
        tenure: '4 years'
      }
    ]
  ),
  createCompany('18', 'SupplyChain Vision', 'End-to-end supply chain visibility platform', 'Logistics Tech', 'Memphis, TN', '$21M Revenue', '95',
    ['Tracks $2B+ in shipments', 'Raised $35M', 'Real-time tracking launched'],
    [
      {
        id: '18-ceo',
        name: 'Angela Rodriguez',
        title: 'CEO & Founder',
        background: 'Former VP Supply Chain at FedEx, 20 years in logistics',
        interests: ['Supply chain visibility', 'Real-time tracking', 'Logistics optimization'],
        recentActivity: 'Launched real-time tracking, raised $35M from Maersk Growth',
        tenure: '6 years (founded 2019)'
,
        linkedInActivity: [
          {
            date: '2025-11-17',
            content: 'SupplyChain Vision raised $35M and launched real-time tracking! We now monitor $2B+ in shipments. Visibility is the future of logistics.',
            engagement: '1,023 likes, 189 comments'
          },
          {
            date: '2025-11-08',
            content: 'After 20 years at FedEx, I knew supply chain visibility was broken. That\'s why we built end-to-end tracking that actually works. No more black boxes.',
            engagement: '734 likes, 128 comments'
          },
          {
            date: '2025-10-29',
            content: 'Real-time tracking just went live! Shippers can now see exactly where their $2B+ in goods are at any moment. Game-changing for supply chain management.',
            engagement: '612 likes, 94 comments'
          }
        ]
      },,
      {
        id: '18-cfo',
        name: 'Brian Walsh',
        title: 'CFO',
        background: 'Former Finance VP at project44, supply chain tech specialist',
        interests: ['Logistics SaaS metrics', 'Network effects', 'International freight'],
        recentActivity: 'Tracking $2B+ in shipments, managing growth capital',
        tenure: '2 years'
      }
    ]
  ),
  createCompany('19', 'EnergySmart Grid', 'Smart grid management for utilities', 'Energy Tech', 'Houston, TX', '$38M Revenue', '150',
    ['Powers 2M+ homes', 'Reduces outages by 60%', 'Partnership with GE'],
    [
      {
        id: '19-ceo',
        name: 'Samuel Patterson',
        title: 'CEO & Founder',
        background: 'Former VP Grid Operations at Duke Energy, electrical engineer',
        interests: ['Smart grid technology', 'Renewable integration', 'Grid reliability'],
        recentActivity: 'Announced GE partnership, powering 2M+ homes with smart grid',
        tenure: '9 years (founded 2016)'
,
        linkedInActivity: [
          {
            date: '2025-11-16',
            content: 'Thrilled to announce our partnership with GE! EnergySmart Grid now powers 2M+ homes and reduces outages by 60%. The smart grid revolution is here.',
            engagement: '1,567 likes, 312 comments'
          },
          {
            date: '2025-11-07',
            content: 'Smart grid technology isn\'t future-tech anymore—it\'s here. We\'ve proven we can cut outages by 60% while integrating more renewables. Utilities take note.',
            engagement: '923 likes, 178 comments'
          },
          {
            date: '2025-10-28',
            content: 'After spending 25 years in grid operations, I started EnergySmart to fix the problems I saw every day. 2M+ homes later, we\'re making a real difference.',
            engagement: '678 likes, 112 comments'
          }
        ]
      },,
      {
        id: '19-cfo',
        name: 'Maria Hernandez',
        title: 'CFO',
        background: 'Former Finance Director at Schneider Electric, energy tech expert',
        interests: ['Utility economics', 'Strategic partnerships', 'Infrastructure investment'],
        recentActivity: 'Achieved 60% outage reduction, scaling GE partnership',
        tenure: '4 years'
      },
      {
        id: '19-cto',
        name: 'Dr. Wei Chen',
        title: 'CTO',
        background: 'Former Principal Engineer at Siemens Energy, PhD in Electrical Engineering',
        interests: ['Grid automation', 'IoT sensors', 'Predictive maintenance'],
        recentActivity: 'Integrating with GE systems, deploying advanced grid analytics',
        tenure: '6 years'
      }
    ]
  ),
  createCompany('20', 'MarketingOS', 'Marketing automation and attribution platform', 'MarTech', 'San Francisco, CA', '$23M ARR', '105',
    ['5,000+ marketers using platform', 'Raised $50M Series B', 'Integrated with major ad platforms'],
    [
      {
        id: '20-ceo',
        name: 'Jessica Taylor',
        title: 'CEO & Co-Founder',
        background: 'Former VP Marketing at HubSpot, pioneer in marketing automation',
        interests: ['Marketing attribution', 'Growth marketing', 'MarTech stack integration'],
        recentActivity: 'Raised $50M Series B, integrated with Google, Meta, and LinkedIn',
        tenure: '7 years (founded 2018)'
,
        linkedInActivity: [
          {
            date: '2025-11-15',
            content: 'MarketingOS raised $50M Series B! We now serve 5,000+ marketers with true attribution across all platforms. No more marketing in the dark.',
            engagement: '1,234 likes, 245 comments'
          },
          {
            date: '2025-11-06',
            content: 'Just integrated with Google, Meta, and LinkedIn! MarketingOS now provides unified attribution across the entire ad ecosystem. This is what marketers have been waiting for.',
            engagement: '845 likes, 156 comments'
          },
          {
            date: '2025-10-27',
            content: 'Attribution has been marketing\'s unsolved problem for decades. Not anymore. Our platform finally shows marketers exactly what\'s driving ROI.',
            engagement: '589 likes, 98 comments'
          }
        ]
      },,
      {
        id: '20-cfo',
        name: 'Ryan Miller',
        title: 'CFO',
        background: 'Former Finance VP at Marketo, MarTech SaaS specialist',
        interests: ['Marketing SaaS economics', 'Platform expansion', 'Enterprise sales'],
        recentActivity: 'Scaling to 5,000+ marketers, managing Series B capital',
        tenure: '3 years'
      }
    ]
  ),

  createCompany('21', 'ConstructTech Suite', 'Construction project management software', 'Construction Tech', 'Portland, OR', '$17M ARR', '75',
    ['1,000+ projects managed', 'Reduced delays by 35%', 'Mobile app launched'],
    [
      {
        id: '21-ceo',
        name: 'Matthew Anderson',
        title: 'CEO & Founder',
        background: 'Former Project Director at Turner Construction, 18 years in construction',
        interests: ['Construction technology', 'Project efficiency', 'Mobile-first tools'],
        recentActivity: 'Launched mobile app, managing 1,000+ active projects',
        tenure: '6 years (founded 2019)'
,
        linkedInActivity: [
          {
            date: '2025-11-14',
            content: 'ConstructTech Suite now manages 1,000+ active projects! We\'ve reduced construction delays by 35% through better project management. The industry is finally going digital.',
            engagement: '678 likes, 123 comments'
          },
          {
            date: '2025-11-05',
            content: 'Just launched our mobile app! Contractors can now manage projects from the field. After 18 years in construction, I know how game-changing this is.',
            engagement: '456 likes, 78 comments'
          },
          {
            date: '2025-10-26',
            content: 'Construction delays cost billions annually. Our platform cuts that by 35% through better coordination and real-time updates. Tech is transforming construction.',
            engagement: '389 likes, 56 comments'
          }
        ]
      },,
      {
        id: '21-cfo',
        name: 'Sarah Johnson',
        title: 'CFO',
        background: 'Former Finance Director at Procore, construction tech specialist',
        interests: ['Construction SaaS metrics', 'Contractor relationships', 'Field adoption'],
        recentActivity: 'Achieved 35% delay reduction for customers, expanding product suite',
        tenure: '3 years'
      }
    ]
  ),
  createCompany('22', 'FinanceFlow Analytics', 'Financial planning and analysis automation', 'FinTech', 'Boston, MA', '$14M ARR', '60',
    ['500+ finance teams', 'Cuts close time by 50%', 'Raised $30M'],
    [
      {
        id: '22-ceo',
        name: 'Elizabeth Morgan',
        title: 'CEO & Co-Founder',
        background: 'Former VP FP&A at Workday, CPA and MBA from MIT Sloan',
        interests: ['Financial automation', 'FP&A best practices', 'Enterprise finance'],
        recentActivity: 'Raised $30M Series A from Bessemer, serving 500+ finance teams',
        tenure: '5 years (founded 2020)'
,
        linkedInActivity: [
          {
            date: '2025-11-13',
            content: 'FinanceFlow raised $30M Series A from Bessemer! We now serve 500+ finance teams and cut close time by 50%. FP&A automation is the future of finance.',
            engagement: '892 likes, 167 comments'
          },
          {
            date: '2025-11-04',
            content: 'After years as VP of FP&A at Workday, I saw the same manual processes everywhere. That\'s why we built FinanceFlow—to automate what shouldn\'t be manual.',
            engagement: '634 likes, 112 comments'
          },
          {
            date: '2025-10-25',
            content: 'Our customers are closing their books 50% faster. Finance teams shouldn\'t spend weeks on manual consolidation. Automation unlocks strategic value.',
            engagement: '478 likes, 89 comments'
          }
        ]
      },,
      {
        id: '22-cfo',
        name: 'David Liu',
        title: 'CFO',
        background: 'Former Finance VP at Anaplan, FP&A software expert',
        interests: ['Financial SaaS economics', 'CFO buying journey', 'Product expansion'],
        recentActivity: 'Achieving 50% close time reduction, managing Series A capital',
        tenure: '2 years'
      }
    ]
  ),
  createCompany('23', 'TeleMed Connect', 'Telemedicine platform for specialty care', 'HealthTech', 'Minneapolis, MN', '$22M Revenue', '90',
    ['2M+ patient visits', 'Partnership with Mayo Clinic', 'Expanding to rural markets'],
    [
      {
        id: '23-ceo',
        name: 'Dr. Robert Anderson',
        title: 'CEO & Founder',
        background: 'Former Chief of Telemedicine at Mayo Clinic, MD from Johns Hopkins',
        interests: ['Telehealth innovation', 'Specialty care access', 'Rural healthcare'],
        recentActivity: 'Announced Mayo Clinic partnership, 2M+ patient visits completed',
        tenure: '7 years (founded 2018)'
,
        linkedInActivity: [
          {
            date: '2025-11-12',
            content: 'TeleMed Connect partnership with Mayo Clinic is live! We\'ve completed 2M+ patient visits and are now expanding to rural markets. Healthcare access for all.',
            engagement: '1,456 likes, 289 comments'
          },
          {
            date: '2025-11-03',
            content: 'Published our latest whitepaper on specialty telemedicine. Early data shows patients in rural areas get care 10x faster. This is why we built TeleMed.',
            engagement: '823 likes, 145 comments'
          },
          {
            date: '2025-10-24',
            content: 'As a physician, I saw too many patients who couldn\'t access specialty care. Telemedicine isn\'t just convenient—it\'s life-changing for underserved communities.',
            engagement: '967 likes, 178 comments'
          }
        ]
      },,
      {
        id: '23-cfo',
        name: 'Karen Thompson',
        title: 'CFO',
        background: 'Former Finance Director at Teladoc, telehealth economics expert',
        interests: ['Healthcare reimbursement', 'Provider network expansion', 'Rural markets'],
        recentActivity: 'Expanding to rural markets, scaling Mayo partnership',
        tenure: '3 years'
      }
    ]
  ),
  createCompany('24', 'AutoFleet Manager', 'Fleet management and telematics platform', 'Transportation Tech', 'Indianapolis, IN', '$19M ARR', '85',
    ['Manages 50,000+ vehicles', 'Reduces fuel costs 20%', 'AI routing engine'],
    [
      {
        id: '24-ceo',
        name: 'Thomas Garcia',
        title: 'CEO & Founder',
        background: 'Former VP Fleet Operations at Ryder, 25 years in fleet management',
        interests: ['Fleet optimization', 'Telematics', 'Sustainability'],
        recentActivity: 'Launched AI routing engine, managing 50,000+ vehicles',
        tenure: '8 years (founded 2017)'
,
        linkedInActivity: [
          {
            date: '2025-11-11',
            content: 'AutoFleet Manager now optimizes 50,000+ vehicles! Our AI routing engine reduces fuel costs by 20%. Fleet management just entered the AI era.',
            engagement: '789 likes, 134 comments'
          },
          {
            date: '2025-11-02',
            content: 'Just launched our AI routing engine! After 25 years in fleet management, I\'ve never seen technology deliver 20% cost savings this consistently.',
            engagement: '567 likes, 98 comments'
          },
          {
            date: '2025-10-23',
            content: 'Managing a fleet shouldn\'t be guesswork. Our telematics platform gives real-time visibility into every vehicle, driver, and route. Data-driven fleet management.',
            engagement: '445 likes, 67 comments'
          }
        ]
      },,
      {
        id: '24-cfo',
        name: 'Michelle Lee',
        title: 'CFO',
        background: 'Former Finance VP at Samsara, IoT and fleet tech specialist',
        interests: ['Fleet SaaS economics', 'Hardware + software models', 'SMB to enterprise'],
        recentActivity: 'Achieving 20% fuel cost reduction for customers, scaling operations',
        tenure: '3 years'
      }
    ]
  ),
  createCompany('25', 'DataLake Pro', 'Enterprise data warehouse and analytics', 'Data Infrastructure', 'Seattle, WA', '$33M ARR', '125',
    ['Processes 100TB+ daily', 'Raised $65M Series C', 'Fortune 500 customers'],
    [
      {
        id: '25-ceo',
        name: 'Dr. Amanda Wu',
        title: 'CEO & Co-Founder',
        background: 'Former Engineering Director at Snowflake, PhD in Distributed Systems',
        interests: ['Data infrastructure', 'Cloud data warehousing', 'Enterprise data strategy'],
        recentActivity: 'Raised $65M Series C from Sequoia, processing 100TB+ daily',
        tenure: '7 years (founded 2018)'
,
        linkedInActivity: [
          {
            date: '2025-11-10',
            content: 'DataLake Pro raised $65M Series C from Sequoia! We now process 100TB+ daily for Fortune 500 customers. The future of data infrastructure is here.',
            engagement: '1,567 likes, 312 comments'
          },
          {
            date: '2025-11-01',
            content: 'After years building BigQuery at Google, I started DataLake to make enterprise-grade data warehousing accessible. Processing 100TB+ daily proves the need.',
            engagement: '1,123 likes, 234 comments'
          },
          {
            date: '2025-10-22',
            content: 'Data warehousing is transforming. Cloud-native, consumption-priced, infinitely scalable. That\'s what Fortune 500 companies need, and that\'s what we deliver.',
            engagement: '876 likes, 156 comments'
          }
        ]
      },,
      {
        id: '25-cfo',
        name: 'Jason Park',
        title: 'CFO',
        background: 'Former VP Finance at Databricks, data infrastructure specialist',
        interests: ['Consumption pricing', 'Enterprise expansion', 'Data economics'],
        recentActivity: 'Scaling to Fortune 500 customers, managing Series C capital',
        tenure: '4 years'
      },
      {
        id: '25-cto',
        name: 'Sergey Ivanov',
        title: 'CTO & Co-Founder',
        background: 'Former Principal Engineer at Google Cloud, BigQuery contributor',
        interests: ['Distributed databases', 'Query optimization', 'Data governance'],
        recentActivity: 'Building next-gen data warehouse, scaling infrastructure',
        tenure: '7 years (founded 2018)'
      }
    ]
  ),

  createCompany('26', 'SocialListening AI', 'Social media monitoring and sentiment analysis', 'MarTech', 'Los Angeles, CA', '$13M ARR', '55',
    ['Monitors 50M+ posts daily', 'AI sentiment accuracy 95%', 'Raised $25M'],
    [
      {
        id: '26-ceo',
        name: 'Nicole Adams',
        title: 'CEO & Co-Founder',
        background: 'Former VP Product at Sprinklr, pioneered social analytics',
        interests: ['Social media analytics', 'Sentiment AI', 'Brand intelligence'],
        recentActivity: 'Raised $25M Series A from Insight Partners, 95% AI accuracy',
        tenure: '5 years (founded 2020)'
,
        linkedInActivity: [
          {
            date: '2025-11-09',
            content: 'SocialListening AI raised $25M! We now monitor 50M+ posts daily with 95% sentiment accuracy. Social intelligence at scale.',
            engagement: '892 likes, 167 comments'
          },
          {
            date: '2025-10-31',
            content: 'Our AI achieves 95% sentiment accuracy across 50M+ posts daily. That\'s not just better analytics—it\'s a competitive advantage for brands.',
            engagement: '678 likes, 123 comments'
          },
          {
            date: '2025-10-21',
            content: 'After pioneering social analytics at Sprinklr, I knew AI could transform brand intelligence. We\'re proving it with unprecedented accuracy.',
            engagement: '534 likes, 89 comments'
          }
        ]
      },,
      {
        id: '26-cfo',
        name: 'Carlos Mendez',
        title: 'CFO',
        background: 'Former Finance Director at Brandwatch, social tech specialist',
        interests: ['MarTech economics', 'Enterprise marketing budgets', 'AI product pricing'],
        recentActivity: 'Monitoring 50M+ posts daily, managing Series A capital',
        tenure: '2 years'
      }
    ]
  ),
  createCompany('27', 'ComplianceGuard', 'Regulatory compliance automation for finance', 'RegTech', 'Charlotte, NC', '$16M ARR', '70',
    ['300+ financial institutions', 'Cuts compliance costs 60%', 'EU expansion'],
    [
      {
        id: '27-ceo',
        name: 'Richard Hamilton',
        title: 'CEO & Founder',
        background: 'Former Chief Compliance Officer at Bank of America, JD from Duke',
        interests: ['Regulatory compliance', 'Financial automation', 'RegTech innovation'],
        recentActivity: 'Serving 300+ financial institutions, expanding to EU markets',
        tenure: '7 years (founded 2018)'
,
        linkedInActivity: [
          {
            date: '2025-11-08',
            content: 'ComplianceGuard now serves 300+ financial institutions! We cut compliance costs by 60% through automation. RegTech is transforming finance.',
            engagement: '789 likes, 145 comments'
          },
          {
            date: '2025-10-30',
            content: 'As former Chief Compliance Officer at Bank of America, I lived through manual compliance hell. That\'s why we built automation that actually works.',
            engagement: '634 likes, 112 comments'
          },
          {
            date: '2025-10-20',
            content: 'Announcing our EU expansion! Financial institutions globally deserve better compliance tools. 60% cost reduction speaks for itself.',
            engagement: '478 likes, 78 comments'
          }
        ]
      },,
      {
        id: '27-cfo',
        name: 'Angela Kim',
        title: 'CFO',
        background: 'Former Finance VP at ComplyAdvantage, RegTech specialist',
        interests: ['Compliance economics', 'Financial services sales', 'International expansion'],
        recentActivity: 'Achieving 60% compliance cost reduction, planning EU launch',
        tenure: '3 years'
      }
    ]
  ),
  createCompany('28', 'WorkSpace Flex', 'Hybrid workplace management platform', 'PropTech', 'San Francisco, CA', '$18M ARR', '80',
    ['2,000+ companies', 'Manages 10M+ sq ft', 'Raised $40M'],
    [
      {
        id: '28-ceo',
        name: 'Kevin Patel',
        title: 'CEO & Co-Founder',
        background: 'Former VP Real Estate at WeWork, MBA from Berkeley Haas',
        interests: ['Hybrid workplace', 'Office utilization', 'Employee experience'],
        recentActivity: 'Raised $40M Series B from JLL Spark, managing 10M+ sq ft',
        tenure: '5 years (founded 2020)'
,
        linkedInActivity: [
          {
            date: '2025-11-07',
            content: 'WorkSpace Flex raised $40M Series B from JLL Spark! We now manage 10M+ sq ft for 2,000+ companies. The hybrid workplace is here to stay.',
            engagement: '1,234 likes, 245 comments'
          },
          {
            date: '2025-10-29',
            content: 'Hybrid work isn\'t a trend—it\'s the new normal. That\'s why we built tools to optimize office utilization. 2,000+ companies agree.',
            engagement: '845 likes, 156 comments'
          },
          {
            date: '2025-10-19',
            content: 'After years at WeWork, I saw the need for smarter workplace management. Now we\'re helping companies optimize 10M+ sq ft of space.',
            engagement: '567 likes, 98 comments'
          }
        ]
      },,
      {
        id: '28-cfo',
        name: 'Rachel Green',
        title: 'CFO',
        background: 'Former Finance Director at Robin Powered, workplace tech expert',
        interests: ['PropTech SaaS metrics', 'Real estate tech', 'Hybrid work economics'],
        recentActivity: 'Scaling to 2,000+ companies, managing Series B capital',
        tenure: '2 years'
      }
    ]
  ),
  createCompany('29', 'BioTech Analytics', 'Lab information management for research', 'LifeScience Tech', 'San Diego, CA', '$21M Revenue', '95',
    ['500+ research labs', 'Accelerates R&D by 40%', 'FDA compliant'],
    [
      {
        id: '29-ceo',
        name: 'Dr. Catherine Morgan',
        title: 'CEO & Founder',
        background: 'Former VP R&D at Illumina, PhD in Molecular Biology from UCSD',
        interests: ['Lab automation', 'Research efficiency', 'Life sciences IT'],
        recentActivity: 'Serving 500+ research labs, FDA compliance achieved',
        tenure: '8 years (founded 2017)'
,
        linkedInActivity: [
          {
            date: '2025-11-06',
            content: 'BioTech Analytics now serves 500+ research labs! We\'ve accelerated R&D by 40% and achieved FDA compliance. Life sciences tech is critical.',
            engagement: '892 likes, 167 comments'
          },
          {
            date: '2025-10-28',
            content: 'FDA compliance achieved! Our platform now helps 500+ labs move faster while staying compliant. This is what life sciences tech should be.',
            engagement: '678 likes, 123 comments'
          },
          {
            date: '2025-10-18',
            content: 'After years in R&D at Illumina, I knew lab workflows were broken. Accelerating R&D by 40% proves better software makes better science.',
            engagement: '534 likes, 89 comments'
          }
        ]
      },,
      {
        id: '29-cfo',
        name: 'Jonathan Wright',
        title: 'CFO',
        background: 'Former Finance VP at Benchling, life sciences SaaS expert',
        interests: ['Life sciences economics', 'Research institution sales', 'Compliance'],
        recentActivity: 'Accelerating R&D by 40% for customers, scaling operations',
        tenure: '4 years'
      }
    ]
  ),
  createCompany('30', 'CustomerSuccess Hub', 'Customer success and retention platform', 'SaaS', 'Raleigh, NC', '$15M ARR', '65',
    ['3,000+ CS teams', 'Reduces churn by 45%', 'Raised $35M Series A'],
    [
      {
        id: '30-ceo',
        name: 'Samantha Davis',
        title: 'CEO & Co-Founder',
        background: 'Former VP Customer Success at Gainsight, CS methodology pioneer',
        interests: ['Customer success operations', 'Churn reduction', 'CS automation'],
        recentActivity: 'Raised $35M Series A from Battery Ventures, serving 3,000+ CS teams',
        tenure: '6 years (founded 2019)'
,
        linkedInActivity: [
          {
            date: '2025-11-05',
            content: 'CustomerSuccess Hub raised $35M from Battery Ventures! 3,000+ CS teams now use our platform and reduce churn by 45%. Customer success is revenue.',
            engagement: '1,123 likes, 212 comments'
          },
          {
            date: '2025-10-27',
            content: '45% churn reduction isn\'t magic—it\'s data-driven customer success. Our platform gives CS teams the insights they need to drive retention.',
            engagement: '823 likes, 145 comments'
          },
          {
            date: '2025-10-17',
            content: 'After pioneering CS methodologies at Gainsight, I built CustomerSuccess Hub to make best practices accessible to every CS team.',
            engagement: '634 likes, 98 comments'
          }
        ]
      },,
      {
        id: '30-cfo',
        name: 'William Chen',
        title: 'CFO',
        background: 'Former Finance Director at ChurnZero, CS SaaS specialist',
        interests: ['CS tech economics', 'Retention metrics', 'Product-led growth'],
        recentActivity: 'Achieving 45% churn reduction for customers, managing Series A capital',
        tenure: '2 years'
      }
    ]
  ),

  createCompany('31', 'InventoryFlow', 'Multi-channel inventory management', 'Retail Tech', 'Columbus, OH', '$12M ARR', '50',
    ['5,000+ retailers', 'Real-time sync across channels', 'Growing 180% YoY'],
    [
      {
        id: '31-ceo',
        name: 'Brandon Mitchell',
        title: 'CEO & Founder',
        background: 'Former Director at BigCommerce, expertise in retail technology',
        interests: ['Omnichannel retail', 'Inventory optimization', 'SMB retail'],
        recentActivity: 'Serving 5,000+ retailers with real-time inventory sync',
        tenure: '5 years (founded 2020)'
,
        linkedInActivity: [
          {
            date: '2025-11-04',
            content: 'InventoryFlow now serves 5,000+ retailers with real-time multi-channel sync! Growing 180% YoY. Retail tech is having its moment.',
            engagement: '789 likes, 134 comments'
          },
          {
            date: '2025-10-26',
            content: 'Real-time inventory sync across channels shouldn\'t be hard. That\'s why 5,000+ retailers trust InventoryFlow. Growing 180% YoY.',
            engagement: '567 likes, 98 comments'
          },
          {
            date: '2025-10-16',
            content: 'After years at BigCommerce, I saw retailers struggle with inventory management. Now we\'re solving it for 5,000+ stores.',
            engagement: '445 likes, 67 comments'
          }
        ]
      },,
      {
        id: '31-cfo',
        name: 'Diana Lopez',
        title: 'CFO',
        background: 'Former Finance VP at Cin7, retail SaaS specialist',
        interests: ['Retail tech metrics', 'Channel partner strategy', 'High-growth scaling'],
        recentActivity: 'Managing 180% YoY growth, expanding product capabilities',
        tenure: '2 years'
      }
    ]
  ),
  createCompany('32', 'SecurityOps Center', 'Security operations center as a service', 'Cybersecurity', 'Arlington, VA', '$29M ARR', '120',
    ['24/7 SOC monitoring', '10,000+ endpoints protected', 'Government contracts'],
    [
      {
        id: '32-ceo',
        name: 'Colonel James Patterson',
        title: 'CEO & Founder',
        background: 'Former CISO at Department of Defense, 25 years in cybersecurity',
        interests: ['SOC operations', 'Government security', 'Threat intelligence'],
        recentActivity: 'Protecting 10,000+ endpoints, expanding government contracts',
        tenure: '9 years (founded 2016)'
,
        linkedInActivity: [
          {
            date: '2025-11-03',
            content: 'SecurityOps Center protects 10,000+ endpoints with 24/7 monitoring! Our government contracts prove the value of SOC-as-a-service.',
            engagement: '892 likes, 167 comments'
          },
          {
            date: '2025-10-25',
            content: 'After 25 years at Department of Defense, I brought that same security rigor to businesses. 24/7 SOC monitoring for everyone.',
            engagement: '678 likes, 123 comments'
          },
          {
            date: '2025-10-15',
            content: '10,000+ endpoints protected, 24/7 monitoring, government-grade security. That\'s what every business deserves.',
            engagement: '534 likes, 89 comments'
          }
        ]
      },,
      {
        id: '32-cfo',
        name: 'Patricia Anderson',
        title: 'CFO',
        background: 'Former Finance VP at Booz Allen Hamilton, GovCon specialist',
        interests: ['Government contracting', 'Security service economics', 'Compliance'],
        recentActivity: 'Scaling 24/7 SOC operations, growing government portfolio',
        tenure: '5 years'
      },
      {
        id: '32-coo',
        name: 'Robert Martinez',
        title: 'COO',
        background: 'Former Director at Mandiant, SOC operations expert',
        interests: ['Security operations', 'Incident response', 'Team scaling'],
        recentActivity: 'Building 24/7 SOC capacity, hiring security analysts',
        tenure: '6 years'
      }
    ]
  ),
  createCompany('33', 'FraudShield AI', 'Real-time fraud detection for e-commerce', 'FinTech', 'Miami, FL', '$17M ARR', '75',
    ['Blocks $500M+ fraud annually', 'ML accuracy 99.2%', 'Partnership with Stripe'],
    [
      {
        id: '33-ceo',
        name: 'Dr. Sophia Ramirez',
        title: 'CEO & Co-Founder',
        background: 'Former ML Lead at PayPal Fraud Detection, PhD in Machine Learning',
        interests: ['Fraud detection AI', 'E-commerce security', 'Real-time ML'],
        recentActivity: 'Announced Stripe partnership, blocking $500M+ fraud annually',
        tenure: '6 years (founded 2019)'
,
        linkedInActivity: [
          {
            date: '2025-11-02',
            content: 'FraudShield AI partnership with Stripe is live! We now block $500M+ in fraud annually with 99.2% accuracy. Real-time fraud detection at scale.',
            engagement: '1,345 likes, 267 comments'
          },
          {
            date: '2025-10-24',
            content: 'Our ML model achieves 99.2% accuracy in fraud detection. After years at PayPal\'s fraud team, I knew AI could transform fraud prevention.',
            engagement: '923 likes, 178 comments'
          },
          {
            date: '2025-10-14',
            content: 'Blocking $500M+ in fraud annually. E-commerce deserves better fraud protection. That\'s what we built at FraudShield.',
            engagement: '734 likes, 134 comments'
          }
        ]
      },,
      {
        id: '33-cfo',
        name: 'Eric Johnson',
        title: 'CFO',
        background: 'Former Finance Director at Sift, fraud prevention specialist',
        interests: ['FinTech economics', 'Payment partnerships', 'ML product pricing'],
        recentActivity: 'Achieving 99.2% ML accuracy, scaling Stripe integration',
        tenure: '3 years'
      },
      {
        id: '33-cto',
        name: 'Dr. Raj Kumar',
        title: 'CTO & Co-Founder',
        background: 'Former Senior Engineer at Google Payments, ML infrastructure expert',
        interests: ['Real-time ML', 'Fraud patterns', 'Payment security'],
        recentActivity: 'Building Stripe integration, scaling ML infrastructure',
        tenure: '6 years (founded 2019)'
      }
    ]
  )
];

// Mock Saved Lists
export const mockSavedLists: SavedList[] = [
  {
    id: 'list1',
    name: 'Q4 2025 Target List - Growth Stage SaaS & Tech',
    companies: mockCompanies,
    createdAt: '2025-10-01',
    updatedAt: '2025-12-17'
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
