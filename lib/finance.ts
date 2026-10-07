// Pure finance math, India conventions.

export function sipFutureValue(
  monthly: number,
  annualRatePct: number,
  years: number
) {
  const i = annualRatePct / 12 / 100;
  const n = Math.round(years * 12);
  if (i <= 0) return { invested: monthly * n, gains: 0, total: monthly * n };
  const fv = monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const invested = monthly * n;
  return { invested, total: fv, gains: fv - invested };
}

export function emi(monthlyRateFromAnnual: number, principal: number, months: number) {
  const r = monthlyRateFromAnnual;
  if (r <= 0) return principal / months;
  const pow = Math.pow(1 + r, months);
  return (principal * r * pow) / (pow - 1);
}

export function fdMaturity(principal: number, annualRatePct: number, years: number) {
  // quarterly compounding, Indian banks standard
  const r = annualRatePct / 100;
  return principal * Math.pow(1 + r / 4, 4 * years);
}

export function projectWealth(
  current: number,
  monthlySip: number,
  annualRatePct: number,
  years: number
) {
  const r = annualRatePct / 100;
  const grown = current * Math.pow(1 + r, years);
  const sip = sipFutureValue(monthlySip, annualRatePct, years).total;
  return { grown, sip, total: grown + sip };
}

// New regime FY 2024-25 / AY 2025-26 approx slabs for resident individual
export function newRegimeTax(taxableIncome: number) {
  const slabs: Array<[number, number]> = [
    [300000, 0],
    [700000, 0.05],
    [1000000, 0.1],
    [1200000, 0.15],
    [1500000, 0.2],
    [Infinity, 0.3],
  ];
  // 87A rebate: up to 7L taxable -> zero tax (salaried up to 7.75L with std deduction)
  if (taxableIncome <= 700000) return { tax: 0, rebate: true, marginal: false };
  let tax = 0;
  let prev = 0;
  for (const [limit, rate] of slabs) {
    if (taxableIncome <= prev) break;
    const chunk = Math.min(taxableIncome, limit) - prev;
    if (chunk > 0) tax += chunk * rate;
    prev = limit;
  }
  // 4% cess
  tax = tax * 1.04;
  return { tax: Math.round(tax), rebate: false, marginal: false };
}
