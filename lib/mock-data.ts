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
  signals: string[]
): Company => ({
  id,
  name,
  description,
  industry,
  geography,
  website: `https://${name.toLowerCase().replace(/\s+/g, '')}.com`,
  management: [
    { id: `${id}-m1`, name: 'CEO Name', title: 'CEO' },
    { id: `${id}-m2`, name: 'CFO Name', title: 'CFO' }
  ],
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
  createCompany('1', 'TechFlow Solutions', 'Cloud-based workflow automation platform for enterprise teams', 'Enterprise Software', 'San Francisco, CA', '$25M ARR', '150', ['Raised $45M Series B led by Sequoia Capital', 'Expanding into European markets', 'Hiring 30+ engineers']),
  createCompany('2', 'HealthBridge Analytics', 'Healthcare data analytics platform for hospitals', 'Healthcare Technology', 'Boston, MA', '$18M ARR', '85', ['Serves 50+ hospital systems', 'Acquired MedInsights competitor', 'Quadrupled customer base']),
  createCompany('3', 'GreenLogistics Inc', 'Sustainable last-mile delivery with electric vehicles', 'Logistics & Transportation', 'Austin, TX', '$35M Revenue', '200', ['Raised $80M Series C', 'Expanding to 15 new markets', 'Launched carbon tracking API']),
  createCompany('4', 'DataVault Security', 'Enterprise cybersecurity with zero-trust architecture', 'Cybersecurity', 'New York, NY', '$50M ARR', '180', ['ARR surpassed $50M milestone', 'Opened EU headquarters', 'Partnership with AWS announced']),
  createCompany('5', 'RetailOS', 'Point-of-sale and inventory management for retailers', 'Retail Technology', 'Seattle, WA', '$22M ARR', '95', ['Powers 10,000+ store locations', 'Doubled engineering team', 'Integrated with Shopify']),

  createCompany('6', 'FinSync Payments', 'B2B payment processing and reconciliation platform', 'FinTech', 'Chicago, IL', '$30M ARR', '120', ['Processing $5B annually', 'Raised $60M Series B', 'Expanding to Canada']),
  createCompany('7', 'EduTech Academy', 'Online learning platform for corporate training', 'EdTech', 'Denver, CO', '$15M ARR', '75', ['500+ enterprise customers', 'Launched AI tutor feature', 'Growing 200% YoY']),
  createCompany('8', 'AgriSmart Systems', 'IoT and data analytics for precision agriculture', 'AgTech', 'Des Moines, IA', '$12M Revenue', '60', ['Deployed on 50,000+ acres', 'Partnership with John Deere', 'Raised $25M Series A']),
  createCompany('9', 'CloudOps Platform', 'DevOps automation and infrastructure management', 'Enterprise Software', 'San Jose, CA', '$40M ARR', '160', ['Manages $500M+ in cloud spend', 'Raised $70M Series C', 'Hiring 50+ engineers']),
  createCompany('10', 'MedSupply Chain', 'Supply chain optimization for medical devices', 'Healthcare Technology', 'Philadelphia, PA', '$28M Revenue', '110', ['Serves 100+ hospitals', 'Reduced costs by 30% avg', 'Expanding to EU']),

  createCompany('11', 'RealEstate Analytics Co', 'Commercial real estate data and insights platform', 'PropTech', 'New York, NY', '$20M ARR', '90', ['Covers 25M+ properties', 'Raised $45M Series B', 'Launched AI valuation tool']),
  createCompany('12', 'InsureTech Solutions', 'Insurance underwriting automation platform', 'InsurTech', 'Hartford, CT', '$18M ARR', '70', ['Processes 100K+ policies', 'Partnership with Zurich', 'Growing 150% YoY']),
  createCompany('13', 'FoodChain Logistics', 'Cold chain management for food distribution', 'Supply Chain Tech', 'Atlanta, GA', '$32M Revenue', '140', ['Reduced food waste by 40%', 'Expanding to West Coast', 'Raised $55M']),
  createCompany('14', 'LegalTech Pro', 'AI-powered contract review and management', 'LegalTech', 'Washington, DC', '$16M ARR', '65', ['500+ law firms using platform', 'Saves 70% review time', 'Launched compliance module']),
  createCompany('15', 'ManufactureIQ', 'Smart manufacturing and predictive maintenance', 'Industrial IoT', 'Detroit, MI', '$24M ARR', '100', ['200+ factories monitored', 'Reduced downtime 50%', 'Partnership with Siemens']),

  createCompany('16', 'HR Talent Suite', 'Recruiting and talent management platform', 'HR Tech', 'Austin, TX', '$19M ARR', '80', ['10,000+ companies using platform', 'Raised $40M Series B', 'AI matching engine launched']),
  createCompany('17', 'CyberGuard Pro', 'Managed security services for SMBs', 'Cybersecurity', 'Dallas, TX', '$26M ARR', '115', ['Protects 5,000+ companies', 'SOC 2 Type II certified', 'Expanding to EMEA']),
  createCompany('18', 'SupplyChain Vision', 'End-to-end supply chain visibility platform', 'Logistics Tech', 'Memphis, TN', '$21M Revenue', '95', ['Tracks $2B+ in shipments', 'Raised $35M', 'Real-time tracking launched']),
  createCompany('19', 'EnergySmart Grid', 'Smart grid management for utilities', 'Energy Tech', 'Houston, TX', '$38M Revenue', '150', ['Powers 2M+ homes', 'Reduces outages by 60%', 'Partnership with GE']),
  createCompany('20', 'MarketingOS', 'Marketing automation and attribution platform', 'MarTech', 'San Francisco, CA', '$23M ARR', '105', ['5,000+ marketers using platform', 'Raised $50M Series B', 'Integrated with major ad platforms']),

  createCompany('21', 'ConstructTech Suite', 'Construction project management software', 'Construction Tech', 'Portland, OR', '$17M ARR', '75', ['1,000+ projects managed', 'Reduced delays by 35%', 'Mobile app launched']),
  createCompany('22', 'FinanceFlow Analytics', 'Financial planning and analysis automation', 'FinTech', 'Boston, MA', '$14M ARR', '60', ['500+ finance teams', 'Cuts close time by 50%', 'Raised $30M']),
  createCompany('23', 'TeleMed Connect', 'Telemedicine platform for specialty care', 'HealthTech', 'Minneapolis, MN', '$22M Revenue', '90', ['2M+ patient visits', 'Partnership with Mayo Clinic', 'Expanding to rural markets']),
  createCompany('24', 'AutoFleet Manager', 'Fleet management and telematics platform', 'Transportation Tech', 'Indianapolis, IN', '$19M ARR', '85', ['Manages 50,000+ vehicles', 'Reduces fuel costs 20%', 'AI routing engine']),
  createCompany('25', 'DataLake Pro', 'Enterprise data warehouse and analytics', 'Data Infrastructure', 'Seattle, WA', '$33M ARR', '125', ['Processes 100TB+ daily', 'Raised $65M Series C', 'Fortune 500 customers']),

  createCompany('26', 'SocialListening AI', 'Social media monitoring and sentiment analysis', 'MarTech', 'Los Angeles, CA', '$13M ARR', '55', ['Monitors 50M+ posts daily', 'AI sentiment accuracy 95%', 'Raised $25M']),
  createCompany('27', 'ComplianceGuard', 'Regulatory compliance automation for finance', 'RegTech', 'Charlotte, NC', '$16M ARR', '70', ['300+ financial institutions', 'Cuts compliance costs 60%', 'EU expansion']),
  createCompany('28', 'WorkSpace Flex', 'Hybrid workplace management platform', 'PropTech', 'San Francisco, CA', '$18M ARR', '80', ['2,000+ companies', 'Manages 10M+ sq ft', 'Raised $40M']),
  createCompany('29', 'BioTech Analytics', 'Lab information management for research', 'LifeScience Tech', 'San Diego, CA', '$21M Revenue', '95', ['500+ research labs', 'Accelerates R&D by 40%', 'FDA compliant']),
  createCompany('30', 'CustomerSuccess Hub', 'Customer success and retention platform', 'SaaS', 'Raleigh, NC', '$15M ARR', '65', ['3,000+ CS teams', 'Reduces churn by 45%', 'Raised $35M Series A']),

  createCompany('31', 'InventoryFlow', 'Multi-channel inventory management', 'Retail Tech', 'Columbus, OH', '$12M ARR', '50', ['5,000+ retailers', 'Real-time sync across channels', 'Growing 180% YoY']),
  createCompany('32', 'SecurityOps Center', 'Security operations center as a service', 'Cybersecurity', 'Arlington, VA', '$29M ARR', '120', ['24/7 SOC monitoring', '10,000+ endpoints protected', 'Government contracts']),
  createCompany('33', 'FraudShield AI', 'Real-time fraud detection for e-commerce', 'FinTech', 'Miami, FL', '$17M ARR', '75', ['Blocks $500M+ fraud annually', 'ML accuracy 99.2%', 'Partnership with Stripe'])
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
