export interface InvestmentAsset {
  sym: string;
  name: string;
  price: number;
  chg: number;
  initial: string;
  category: "stocks" | "mf" | "etf";
  subtitle: string;
  highlight: string;
}

export const investmentData: Record<"stocks" | "mf" | "etf", InvestmentAsset[]> = {
  stocks: [
    { sym: "HDFCBANK", name: "HDFC Bank Ltd", price: 1612.5, chg: 1.56, initial: "H", category: "stocks", subtitle: "Banking & Finance", highlight: "Q2 deposit growth +14.2% YoY" },
    { sym: "SBIN", name: "State Bank of India", price: 785.4, chg: 0.82, initial: "S", category: "stocks", subtitle: "Public Sector Bank", highlight: "Gross NPA down to 2.21%" },
    { sym: "TATAMOTORS", name: "Tata Motors Ltd", price: 928.6, chg: 2.14, initial: "T", category: "stocks", subtitle: "Automotive & EV", highlight: "EV market share 68% in India" },
    { sym: "RELIANCE", name: "Reliance Industries", price: 2987.1, chg: 0.64, initial: "R", category: "stocks", subtitle: "Energy & Telecom", highlight: "Jio subscriber base cross 490M" },
    { sym: "INFY", name: "Infosys Ltd", price: 1832.75, chg: -0.42, initial: "I", category: "stocks", subtitle: "Information Tech", highlight: "FY25 revenue guidance steady" },
  ],
  mf: [
    { sym: "PPFCF", name: "Parag Parikh Flexi Cap", price: 82.4, chg: 1.12, initial: "P", category: "mf", subtitle: "3Y CAGR 19.4% · TER 0.62%", highlight: "High conviction large + global tech" },
    { sym: "UTINIFTY", name: "UTI Nifty 50 Index Fund", price: 174.2, chg: 0.42, initial: "U", category: "mf", subtitle: "3Y CAGR 15.2% · TER 0.18%", highlight: "Zero fund-manager risk · Lowest tracking error" },
    { sym: "MIRAE", name: "Mirae Asset Large & Midcap", price: 138.9, chg: 0.85, initial: "M", category: "mf", subtitle: "3Y CAGR 17.8% · TER 0.54%", highlight: "Balanced risk across top 250 firms" },
    { sym: "QUANTSM", name: "Quant Small Cap Fund", price: 264.1, chg: 2.40, initial: "Q", category: "mf", subtitle: "3Y CAGR 26.3% · TER 0.77%", highlight: "High growth momentum model" },
    { sym: "ICICICORP", name: "ICICI Pru Corporate Bond", price: 34.6, chg: 0.18, initial: "I", category: "mf", subtitle: "3Y CAGR 7.6% · AAA Rated", highlight: "Stable debt pillar for emergency cash" },
  ],
  etf: [
    { sym: "NIFTYBEES", name: "Nippon India Nifty 50 BeES", price: 284.1, chg: 0.45, initial: "N", category: "etf", subtitle: "Index ETF · Daily Vol 1.2M", highlight: "Direct reflection of Nifty 50 basket" },
    { sym: "GOLDBEES", name: "Nippon India Gold BeES", price: 68.2, chg: 0.32, initial: "G", category: "etf", subtitle: "Gold ETF · 99.5% Purity", highlight: "Hedge against rupee depreciation & inflation" },
    { sym: "JUNIORBEES", name: "Nippon India Junior BeES", price: 742.8, chg: 0.78, initial: "J", category: "etf", subtitle: "Nifty Next 50 Basket", highlight: "Next wave of bluechips 51–100" },
    { sym: "MON100", name: "Motilal Oswal Nasdaq 100", price: 162.4, chg: 1.15, initial: "M", category: "etf", subtitle: "US Tech Top 100", highlight: "Direct exposure to Apple, Nvidia, Microsoft" },
    { sym: "SILVERBEES", name: "Nippon India Silver BeES", price: 92.6, chg: -0.15, initial: "S", category: "etf", subtitle: "Physical Silver Backed", highlight: "Industrial green-energy & solar demand" },
  ],
};

export const stocks = investmentData.stocks;

export const faqs = [
  {
    q: "Do I need to sign up to use the calculators?",
    a: "No. SIP, EMI, FD, tax, and retirement calculators work completely free without creating an account. Sign up only if you want to save custom scenarios, sync portfolio tracking, and receive smart rebalancing alerts.",
    category: "Calculators",
  },
  {
    q: "Is Fermor beginner-friendly?",
    a: "100%. We believe financial literacy shouldn't require an MBA. Every number has a plain-English explanation, formulas are visible in one tap, and we translate jargon into honest Hindi/Hinglish terms.",
    category: "General",
  },
  {
    q: "Is my financial data safe?",
    a: "Bank-grade 256-bit encryption. We operate on RBI-regulated Account Aggregator read-only protocols. We never hold custody of your funds, cannot execute trades without your UPI 2FA authorization, and you can erase your data with one click.",
    category: "Security",
  },
  {
    q: "How does Fermor differ from typical bank apps and brokers?",
    a: "Bank apps show a single account history with backward-looking statements. Brokers push volatile derivative trading because it yields commission. Fermor takes zero commissions, consolidates all bank accounts, MFs, EPF and gold, and provides actionable advice on what to do next.",
    category: "Product",
  },
  {
    q: "Is the math updated for Budget 2024–25 tax changes?",
    a: "Yes. Our tax engine incorporates the revised New Tax Regime slabs, the enhanced ₹75,000 standard deduction for salaried individuals, Section 87A rebate calculations (tax-free up to ₹7.75 Lakhs for salaried), and quarterly bank FD compounding.",
    category: "Calculators",
  },
  {
    q: "What is Fermor for Kids?",
    a: "It's an interactive money lab designed for children aged 8–16. Through gamified piggy-jar challenges, micro-SIPs of ₹100, and bite-sized stories, kids develop healthy financial intuition before they receive their first paycheck.",
    category: "Kids",
  },
];

export const posts = [
  {
    tag: "Stock Market",
    date: "Oct 2026",
    read: "8 min read",
    title: "Market corrections vs Bear markets: A retail investor playbook",
    excerpt:
      "Historical data from the 2008, 2020, and 2024 dips prove that continuing your automated SIP through red months generates 72% of long-term outperformance.",
  },
  {
    tag: "Tax Planning",
    date: "Sep 2026",
    read: "10 min read",
    title: "New Tax Regime vs Old Tax Regime: The exact mathematical crossover point",
    excerpt:
      "With the ₹75,000 standard deduction and revised slab boundaries, see at what exact deduction level (HRA, 80C, 80D) the Old Regime becomes beneficial for your salary.",
  },
  {
    tag: "Banking & UPI",
    date: "Sep 2026",
    read: "6 min read",
    title: "UPI Autopay & Liquid Funds: How to earn 7% on idle salary without locking money",
    excerpt:
      "Most savings accounts pay 2.7–3.5%. Learn how to park surplus salary in instant-redemption overnight and liquid funds with T+0 payout to your UPI handle.",
  },
];
