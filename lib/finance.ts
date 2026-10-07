// Pure finance math, India conventions.

export function sipFutureValue(
  monthly: number,
  annualRatePct: number,
  years: number,
  stepUpPct: number = 0
) {
  const i = annualRatePct / 12 / 100;
  const n = Math.round(years * 12);
  if (i <= 0) return { invested: monthly * n, gains: 0, total: monthly * n };

  if (stepUpPct <= 0) {
    const fv = monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const invested = monthly * n;
    return { invested, total: fv, gains: fv - invested };
  }

  // Yearly step-up SIP calculation
  let totalInvested = 0;
  let totalFV = 0;
  let currentMonthly = monthly;

  for (let year = 1; year <= years; year++) {
    for (let month = 1; month <= 12; month++) {
      const remainingMonths = n - ((year - 1) * 12 + (month - 1));
      totalInvested += currentMonthly;
      totalFV += currentMonthly * Math.pow(1 + i, remainingMonths);
    }
    currentMonthly = currentMonthly * (1 + stepUpPct / 100);
  }

  return {
    invested: Math.round(totalInvested),
    total: Math.round(totalFV),
    gains: Math.round(totalFV - totalInvested),
  };
}

export function emi(monthlyRateFromAnnual: number, principal: number, months: number) {
  const r = monthlyRateFromAnnual;
  if (r <= 0) return principal / months;
  const pow = Math.pow(1 + r, months);
  return (principal * r * pow) / (pow - 1);
}

export function fdMaturity(
  principal: number,
  annualRatePct: number,
  years: number,
  isSeniorCitizen: boolean = false
) {
  // quarterly compounding, Indian banks standard (+0.5% for seniors)
  const effectiveRate = annualRatePct + (isSeniorCitizen ? 0.5 : 0);
  const r = effectiveRate / 100;
  return principal * Math.pow(1 + r / 4, 4 * years);
}

export function projectWealth(
  current: number,
  monthlySip: number,
  annualRatePct: number,
  years: number,
  inflationPct: number = 0
) {
  const r = annualRatePct / 100;
  const grown = current * Math.pow(1 + r, years);
  const sip = sipFutureValue(monthlySip, annualRatePct, years).total;
  const nominalTotal = grown + sip;

  if (inflationPct > 0) {
    const deflator = Math.pow(1 + inflationPct / 100, years);
    return {
      grown: Math.round(grown / deflator),
      sip: Math.round(sip / deflator),
      total: Math.round(nominalTotal / deflator),
      nominalTotal: Math.round(nominalTotal),
    };
  }

  return {
    grown: Math.round(grown),
    sip: Math.round(sip),
    total: Math.round(nominalTotal),
    nominalTotal: Math.round(nominalTotal),
  };
}

// New regime FY 2024-25 / Budget 2024 slabs for resident individual
// Slabs: 0-3L Nil, 3-7L 5%, 7-10L 10%, 10-12L 15%, 12-15L 20%, >15L 30%
// Salaried standard deduction: Rs 75,000
// Section 87A rebate: taxable income <= 7,00,000 -> tax is 0 (up to 7.75L for salaried)
export function newRegimeTax(grossIncome: number, isSalaried: boolean = true) {
  const stdDeduction = isSalaried ? 75000 : 0;
  const taxableIncome = Math.max(0, grossIncome - stdDeduction);

  const slabs: Array<[number, number]> = [
    [300000, 0],
    [700000, 0.05],
    [1000000, 0.1],
    [1200000, 0.15],
    [1500000, 0.2],
    [Infinity, 0.3],
  ];

  // 87A rebate: if taxable income is <= 7L, full rebate
  if (taxableIncome <= 700000) {
    return {
      tax: 0,
      rebate: true,
      stdDeduction,
      taxableIncome,
      effectiveRate: 0,
    };
  }

  let tax = 0;
  let prev = 0;
  for (const [limit, rate] of slabs) {
    if (taxableIncome <= prev) break;
    const chunk = Math.min(taxableIncome, limit) - prev;
    if (chunk > 0) tax += chunk * rate;
    prev = limit;
  }

  // Marginal relief check near 7L
  const excessOver7L = taxableIncome - 700000;
  if (excessOver7L > 0 && tax > excessOver7L) {
    tax = excessOver7L;
  }

  // 4% health & education cess
  const cess = tax * 0.04;
  const totalTax = Math.round(tax + cess);

  return {
    tax: totalTax,
    rebate: false,
    stdDeduction,
    taxableIncome,
    effectiveRate: Number(((totalTax / grossIncome) * 100).toFixed(1)),
  };
}
