"use client";

import { useMemo, useState } from "react";
import { sipFutureValue, emi, fdMaturity, newRegimeTax } from "@/lib/finance";
import { formatINR, formatCompactINR, sliderFill } from "@/lib/format";
import Reveal from "./Reveal";
import { Calculator, ArrowRight, ShieldCheck, Sparkles, TrendingUp, Info } from "lucide-react";

type Key = "sip" | "emi" | "fd" | "tax";

export default function Calculators() {
  const [tab, setTab] = useState<Key>("sip");

  // SIP state
  const [sSip, setSSip] = useState(10000);
  const [sYrs, setSYrs] = useState(10);
  const [sRate, setSRate] = useState(12);
  const [stepUp, setStepUp] = useState(0);

  // EMI state
  const [pEmi, setPEmi] = useState(3500000);
  const [rEmi, setREmi] = useState(8.6);
  const [nEmi, setNEmi] = useState(20);

  // FD state
  const [pFd, setPFd] = useState(500000);
  const [rFd, setRFd] = useState(7.1);
  const [tFd, setTFd] = useState(5);
  const [isSenior, setIsSenior] = useState(false);

  // Tax state
  const [income, setIncome] = useState(1200000);
  const [isSalaried, setIsSalaried] = useState(true);

  // Calculations
  const sip = useMemo(() => sipFutureValue(sSip, sRate, sYrs, stepUp), [sSip, sRate, sYrs, stepUp]);
  const emiVal = useMemo(() => emi(rEmi / 12 / 100, pEmi, nEmi * 12), [pEmi, rEmi, nEmi]);
  const totalEmiPayment = emiVal * nEmi * 12;
  const totalInterest = Math.max(0, totalEmiPayment - pEmi);

  const fdVal = useMemo(() => fdMaturity(pFd, rFd, tFd, isSenior), [pFd, rFd, tFd, isSenior]);
  const tax = useMemo(() => newRegimeTax(income, isSalaried), [income, isSalaried]);

  return (
    <section id="calculators" className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24 scroll-mt-20">
      <Reveal>
        <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-leaf">
          05 — Calculators & Tools
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display font-semibold tracking-tight text-[32px] sm:text-[40px] md:text-[46px] leading-[1.08] max-w-[580px] text-ink">
            Free calculators with honest math.
          </h2>
          <p className="max-w-[420px] text-[15.5px] text-ink/70 leading-relaxed">
            No forced sign-ups, no ads. Every calculator displays invested rupees vs compound gains —
            so you learn the mechanics, not just a number.
          </p>
        </div>
      </Reveal>

      {/* Tabs */}
      <Reveal delay={100}>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {(
            [
              ["sip", "SIP & Step-up"],
              ["emi", "Home Loan EMI"],
              ["fd", "Fixed Deposit (FD)"],
              ["tax", "Income Tax (Budget 2024)"],
            ] as Array<[Key, string]>
          ).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`rounded-full px-5 py-2.5 text-[14px] font-semibold border transition-all ${
                tab === k
                  ? "bg-ink text-paper border-ink shadow-sm"
                  : "bg-white border-line text-ink/70 hover:text-ink hover:bg-cream"
              }`}
            >
              {l}
            </button>
          ))}
          <span className="ml-2 text-[12.5px] font-medium text-moss hidden sm:inline">
            + EPF, NPS & Goal Planners in app
          </span>
        </div>
      </Reveal>

      {/* Calculator Body */}
      <Reveal delay={140}>
        <div className="mt-6 rounded-[24px] border border-line bg-white shadow-card p-6 md:p-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          {/* SIP Tab */}
          {tab === "sip" && (
            <>
              <div className="space-y-5">
                <CalcRow
                  label="Monthly SIP Amount"
                  val={formatINR(sSip)}
                  min={500}
                  max={100000}
                  step={500}
                  value={sSip}
                  set={setSSip}
                />
                <CalcRow
                  label="Expected Annual Return"
                  val={`${sRate}% p.a.`}
                  min={6}
                  max={15}
                  step={0.5}
                  value={sRate}
                  set={setSRate}
                />
                <CalcRow
                  label="Investment Horizon"
                  val={`${sYrs} years`}
                  min={1}
                  max={30}
                  step={1}
                  value={sYrs}
                  set={setSYrs}
                />

                {/* Step-up selector */}
                <div className="pt-2">
                  <div className="flex justify-between text-[13.5px] font-medium mb-2 text-ink">
                    <span>Annual Step-up: <b className="text-leafdark">{stepUp}%</b></span>
                    <span className="text-[12px] text-moss">Increase monthly SIP each year</span>
                  </div>
                  <div className="flex gap-2">
                    {[0, 5, 10, 15].map((pct) => (
                      <button
                        key={pct}
                        onClick={() => setStepUp(pct)}
                        className={`flex-1 py-1.5 rounded-lg text-[13px] font-semibold border transition-colors ${
                          stepUp === pct
                            ? "bg-ink text-paper border-ink"
                            : "border-line text-ink/70 hover:border-ink/40"
                        }`}
                      >
                        {pct === 0 ? "None" : `+${pct}% / yr`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <ResultCard
                rows={[
                  ["Total Invested", formatINR(sip.invested)],
                  ["Estimated Returns", formatINR(sip.gains)],
                  ["Maturity Corpus", formatINR(sip.total)],
                ]}
                ratio={{
                  labelA: "Invested",
                  valA: sip.invested,
                  colorA: "#10201A",
                  labelB: "Wealth Gain",
                  valB: sip.gains,
                  colorB: "#15803D",
                }}
                note={
                  stepUp > 0
                    ? `A ${stepUp}% yearly step-up added +${formatCompactINR(sip.total - sipFutureValue(sSip, sRate, sYrs, 0).total)} to your final wealth!`
                    : "Equity funds historically delivered ~12% over 7+ year periods in India. Enable Step-up to beat lifestyle inflation."
                }
              />
            </>
          )}

          {/* EMI Tab */}
          {tab === "emi" && (
            <>
              <div className="space-y-5">
                <CalcRow
                  label="Loan Principal Amount"
                  val={formatINR(pEmi)}
                  min={500000}
                  max={15000000}
                  step={100000}
                  value={pEmi}
                  set={setPEmi}
                />
                <CalcRow
                  label="Interest Rate"
                  val={`${rEmi}% p.a.`}
                  min={7.0}
                  max={15.0}
                  step={0.1}
                  value={rEmi}
                  set={setREmi}
                />
                <CalcRow
                  label="Loan Tenure"
                  val={`${nEmi} years`}
                  min={1}
                  max={30}
                  step={1}
                  value={nEmi}
                  set={setNEmi}
                />
              </div>

              <ResultCard
                rows={[
                  ["Monthly EMI", formatINR(Math.round(emiVal))],
                  ["Total Interest", formatINR(Math.round(totalInterest))],
                  ["Total Amount Payable", formatINR(Math.round(totalEmiPayment))],
                ]}
                ratio={{
                  labelA: "Principal",
                  valA: pEmi,
                  colorA: "#10201A",
                  labelB: "Interest",
                  valB: totalInterest,
                  colorB: "#C08A2C",
                }}
                note="Pro tip: Prepaying just 1 extra EMI per year can reduce your 20-year home loan duration to under 15.5 years."
              />
            </>
          )}

          {/* FD Tab */}
          {tab === "fd" && (
            <>
              <div className="space-y-5">
                <CalcRow
                  label="Deposit Principal"
                  val={formatINR(pFd)}
                  min={10000}
                  max={10000000}
                  step={25000}
                  value={pFd}
                  set={setPFd}
                />
                <CalcRow
                  label="Interest Rate"
                  val={`${rFd}% p.a.`}
                  min={4.0}
                  max={9.0}
                  step={0.1}
                  value={rFd}
                  set={setRFd}
                />
                <CalcRow
                  label="Deposit Period"
                  val={`${tFd} years`}
                  min={1}
                  max={10}
                  step={1}
                  value={tFd}
                  set={setTFd}
                />

                <div className="pt-2 flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-line">
                  <div>
                    <p className="text-[13.5px] font-semibold text-ink">Senior Citizen Rate (+0.50%)</p>
                    <p className="text-[12px] text-moss">Special rate for age 60+ (Indian banks standard)</p>
                  </div>
                  <button
                    onClick={() => setIsSenior(!isSenior)}
                    className={`px-3 py-1.5 rounded-lg text-[12.5px] font-bold border transition-colors ${
                      isSenior
                        ? "bg-leaf text-white border-leaf"
                        : "bg-white border-line text-ink/70"
                    }`}
                  >
                    {isSenior ? "✓ Active (+0.5%)" : "Enable"}
                  </button>
                </div>
              </div>

              <ResultCard
                rows={[
                  ["Initial Deposit", formatINR(pFd)],
                  ["Total Interest Earned", formatINR(Math.round(fdVal - pFd))],
                  ["Maturity Payout", formatINR(Math.round(fdVal))],
                ]}
                ratio={{
                  labelA: "Deposit",
                  valA: pFd,
                  colorA: "#10201A",
                  labelB: "Interest",
                  valB: fdVal - pFd,
                  colorB: "#15803D",
                }}
                note="Compounded quarterly as per Indian banking guidelines. Up to ₹5 Lakhs per bank is 100% insured by RBI's DICGC."
              />
            </>
          )}

          {/* Income Tax Tab */}
          {tab === "tax" && (
            <>
              <div className="space-y-5">
                <CalcRow
                  label="Gross Annual Income (New Tax Regime)"
                  val={formatINR(income)}
                  min={300000}
                  max={5000000}
                  step={25000}
                  value={income}
                  set={setIncome}
                />

                {/* Salaried Toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-cream border border-line">
                  <div>
                    <p className="text-[14px] font-semibold text-ink">
                      Employment Category
                    </p>
                    <p className="text-[12px] text-moss">
                      {isSalaried ? "Salaried: ₹75,000 standard deduction applied" : "Self-employed / Consultant: No std deduction"}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSalaried(!isSalaried)}
                    className={`px-3.5 py-1.5 rounded-lg text-[13px] font-bold border transition-colors ${
                      isSalaried
                        ? "bg-ink text-paper border-ink"
                        : "bg-white border-line text-ink"
                    }`}
                  >
                    {isSalaried ? "Salaried (₹75k deduction)" : "Self-employed"}
                  </button>
                </div>

                <div className="rounded-xl bg-[#FAF8F5] border border-line p-3 text-[13px] leading-relaxed text-ink/75">
                  <p className="font-semibold text-ink">Budget 2024–25 New Regime Slabs:</p>
                  <p className="text-[12px] text-moss mt-0.5">
                    0–3L: Nil · 3–7L: 5% · 7–10L: 10% · 10–12L: 15% · 12–15L: 20% · &gt;15L: 30% (+4% cess).
                    Section 87A provides 100% rebate for taxable income up to ₹7,00,000 (tax-free up to ₹7.75L for salaried).
                  </p>
                </div>
              </div>

              <ResultCard
                rows={[
                  ["Standard Deduction", formatINR(tax.stdDeduction)],
                  ["Taxable Income", formatINR(tax.taxableIncome)],
                  ["Total Tax (incl. 4% cess)", tax.tax === 0 ? "₹0 (Rebate 87A)" : formatINR(tax.tax)],
                  ["Effective Tax Rate", `${tax.effectiveRate}%`],
                  ["In-hand Annual Take-Home", formatINR(income - tax.tax)],
                ]}
                note={
                  tax.tax === 0
                    ? "🎉 You pay ZERO tax under Section 87A! Your entire income is retained. Put the surplus into an automated SIP."
                    : `Your effective tax rate is only ${tax.effectiveRate}%. Monthly take-home is approximately ${formatINR(Math.round((income - tax.tax) / 12))}.`
                }
              />
            </>
          )}
        </div>
      </Reveal>
    </section>
  );
}

function CalcRow({
  label,
  val,
  min,
  max,
  step,
  value,
  set,
}: {
  label: string;
  val: string;
  min: number;
  max: number;
  step: number;
  value: number;
  set: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between items-center text-[13.5px] font-medium mb-2">
        <span className="text-ink font-semibold">{label}</span>
        <span className="font-bold text-[15px] font-mono text-ink bg-cream/70 px-2 py-0.5 rounded border border-line">
          {val}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(+e.target.value)}
        style={sliderFill(min, max, value)}
        aria-label={label}
      />
    </div>
  );
}

function ResultCard({
  rows,
  note,
  ratio,
}: {
  rows: Array<[string, string]>;
  note: string;
  ratio?: {
    labelA: string;
    valA: number;
    colorA: string;
    labelB: string;
    valB: number;
    colorB: string;
  };
}) {
  const total = ratio ? ratio.valA + ratio.valB : 0;
  const pctA = total > 0 ? Math.round((ratio!.valA / total) * 100) : 50;
  const pctB = 100 - pctA;

  return (
    <div className="rounded-[22px] bg-ink text-paper p-6 h-fit shadow-pop flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-paper/10">
          <span className="text-[12px] font-bold text-[#8FD0A3] uppercase tracking-wider">
            Verified Calculation
          </span>
          <span className="text-[11px] text-paper/50">en-IN Standard</span>
        </div>

        {/* Breakdown bar if available */}
        {ratio && total > 0 && (
          <div className="mt-4 mb-4">
            <div className="flex justify-between text-[11.5px] text-paper/70 mb-1.5">
              <span>{ratio.labelA}: <b>{pctA}%</b></span>
              <span>{ratio.labelB}: <b>{pctB}%</b></span>
            </div>
            <div className="h-3 rounded-full bg-paper/20 overflow-hidden flex">
              <div style={{ width: `${pctA}%`, background: ratio.colorA }} className="border-r border-paper/30" />
              <div style={{ width: `${pctB}%`, background: ratio.colorB }} />
            </div>
          </div>
        )}

        <div className="divide-y divide-paper/10">
          {rows.map(([k, v], i) => (
            <div key={k} className="flex justify-between items-center py-2.5 text-[14px]">
              <span className="text-paper/70">{k}</span>
              <b className={i === rows.length - 1 ? "text-[18px] font-mono text-white" : "font-mono text-paper"}>
                {v}
              </b>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-paper/10 border border-paper/15 p-3.5 text-[12.5px] leading-relaxed text-paper/80 flex items-start gap-2">
        <Sparkles className="h-4 w-4 text-[#8FD0A3] shrink-0 mt-0.5" />
        <span><b className="text-white">Fermor Note:</b> {note}</span>
      </div>
    </div>
  );
}
