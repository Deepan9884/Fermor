"use client";

import { useMemo, useState } from "react";
import { sipFutureValue, emi, fdMaturity, newRegimeTax } from "@/lib/finance";
import { formatINR, sliderFill } from "@/lib/format";
import Reveal from "./Reveal";

type Key = "sip" | "emi" | "fd" | "tax";

export default function Calculators() {
  const [tab, setTab] = useState<Key>("sip");

  // sip state
  const [sSip, setSSip] = useState(10000);
  const [sYrs, setSYrs] = useState(10);
  const [sRate, setSRate] = useState(12);
  // emi state
  const [pEmi, setPEmi] = useState(2500000);
  const [rEmi, setREmi] = useState(8.5);
  const [nEmi, setNEmi] = useState(20);
  // fd state
  const [pFd, setPFd] = useState(500000);
  const [rFd, setRFd] = useState(7.1);
  const [tFd, setTFd] = useState(5);
  // tax state
  const [income, setIncome] = useState(1200000);

  const sip = useMemo(() => sipFutureValue(sSip, sRate, sYrs), [sSip, sRate, sYrs]);
  const emiVal = useMemo(() => emi(rEmi / 12 / 100, pEmi, nEmi * 12), [pEmi, rEmi, nEmi]);
  const fd = useMemo(() => fdMaturity(pFd, rFd, tFd), [pFd, rFd, tFd]);
  const tax = useMemo(() => newRegimeTax(income), [income]);

  return (
    <section id="calculators" className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24">
      <Reveal>
        <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-leaf">05 — Tools</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display font-semibold tracking-tight text-[32px] md:text-[46px] leading-[1.08] max-w-[560px]">
            Free calculators with honest math.
          </h2>
          <p className="max-w-[380px] text-[15.5px] text-ink/65 leading-relaxed">
            No sign-up, no ads. Every result shows invested vs gains — so you learn, not just calculate.
          </p>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-7 flex flex-wrap gap-2">
          {(
            [
              ["sip", "SIP"],
              ["emi", "EMI"],
              ["fd", "FD"],
              ["tax", "Income Tax"],
            ] as Array<[Key, string]>
          ).map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)}
              className={`rounded-full px-5 py-2.5 text-[14px] font-semibold border transition-all ${tab === k ? "bg-ink text-paper border-ink" : "bg-white border-line text-ink/65 hover:text-ink"}`}>
              {l}
            </button>
          ))}
          <span className="ml-1 self-center text-[13px] text-moss">+ Retirement, Home Loan & more inside the app →</span>
        </div>
      </Reveal>

      <Reveal delay={140}>
        <div className="mt-6 rounded-[20px] border border-line bg-white shadow-card p-6 md:p-8 grid lg:grid-cols-[1fr_340px] gap-8">
          {tab === "sip" && (
            <>
              <div className="space-y-5">
                <CalcRow label="Monthly investment" val={formatINR(sSip)} min={500} max={100000} step={500} value={sSip} set={setSSip} />
                <CalcRow label="Expected returns" val={`${sRate}% p.a.`} min={6} max={15} step={0.5} value={sRate} set={setSRate} />
                <CalcRow label="Time period" val={`${sYrs} years`} min={1} max={30} step={1} value={sYrs} set={setSYrs} />
              </div>
              <ResultCard rows={[
                ["Invested", formatINR(sip.invested)],
                ["Est. gains", formatINR(Math.round(sip.gains))],
                ["Total value", formatINR(Math.round(sip.total))],
              ]} note="Equity MFs averaged ~12% over long periods. Short-term will wobble." />
            </>
          )}
          {tab === "emi" && (
            <>
              <div className="space-y-5">
                <CalcRow label="Loan amount" val={formatINR(pEmi)} min={100000} max={10000000} step={50000} value={pEmi} set={setPEmi} />
                <CalcRow label="Interest rate" val={`${rEmi}% p.a.`} min={6} max={15} step={0.1} value={rEmi} set={setREmi} />
                <CalcRow label="Tenure" val={`${nEmi} years`} min={1} max={30} step={1} value={nEmi} set={setNEmi} />
              </div>
              <ResultCard rows={[
                ["Monthly EMI", formatINR(Math.round(emiVal))],
                ["Total interest", formatINR(Math.round(emiVal * nEmi * 12 - pEmi))],
                ["Total payable", formatINR(Math.round(emiVal * nEmi * 12))],
              ]} note="A 1% lower rate on ₹25L / 20Y saves ~₹3.2L interest. Negotiate or balance-transfer." />
            </>
          )}
          {tab === "fd" && (
            <>
              <div className="space-y-5">
                <CalcRow label="Deposit" val={formatINR(pFd)} min={10000} max={10000000} step={10000} value={pFd} set={setPFd} />
                <CalcRow label="Interest rate" val={`${rFd}% p.a.`} min={3} max={9} step={0.05} value={rFd} set={setRFd} />
                <CalcRow label="Period" val={`${tFd} years`} min={1} max={10} step={1} value={tFd} set={setTFd} />
              </div>
              <ResultCard rows={[
                ["Invested", formatINR(pFd)],
                ["Interest", formatINR(Math.round(fd - pFd))],
                ["Maturity", formatINR(Math.round(fd))],
              ]} note="Quarterly compounding (Indian banks). DICGC insures up to ₹5L per bank." />
            </>
          )}
          {tab === "tax" && (
            <>
              <div className="space-y-5">
                <CalcRow label="Taxable income (new regime)" val={formatINR(income)} min={300000} max={5000000} step={10000} value={income} set={setIncome} />
                <div className="rounded-xl bg-cream px-4 py-3.5 text-[14px] leading-relaxed text-ink/75">
                  Slabs: 0–3L nil · 3–7L 5% · 7–10L 10% · 10–12L 15% · 12–15L 20% · 15L+ 30% + 4% cess. 87A rebate to ₹7L.
                </div>
              </div>
              <ResultCard rows={[
                ["Tax payable", tax.tax === 0 ? "₹0 (rebate)" : formatINR(tax.tax)],
                ["Effective rate", tax.tax === 0 ? "0%" : `${((tax.tax / income) * 100).toFixed(1)}%`],
                ["In-hand (approx)", formatINR(income - tax.tax)],
              ]} note={tax.tax === 0 ? "You’re covered by 87A — no tax. Consider investing the surplus." : "Salaried? Add ₹50k standard deduction before this math."} />
            </>
          )}
        </div>
      </Reveal>
    </section>
  );
}

function CalcRow({ label, val, min, max, step, value, set }: {
  label: string; val: string; min: number; max: number; step: number; value: number; set: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-[14px] font-medium mb-2">
        <span className="text-ink/70">{label}</span>
        <span className="font-semibold">{val}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => set(+e.target.value)} style={sliderFill(min, max, value)} aria-label={label} />
    </div>
  );
}

function ResultCard({ rows, note }: { rows: Array<[string, string]>; note: string }) {
  return (
    <div className="rounded-2xl bg-ink text-paper p-6 h-fit">
      {rows.map(([k, v], i) => (
        <div key={k} className={`flex justify-between py-2.5 text-[14.5px] ${i < rows.length - 1 ? "border-b border-paper/10" : ""}`}>
          <span className="text-paper/65">{k}</span>
          <b className={i === rows.length - 1 ? "text-[18px] font-display" : ""}>{v}</b>
        </div>
      ))}
      <p className="mt-4 rounded-xl bg-paper/8 border border-paper/10 p-3.5 text-[13px] leading-relaxed text-paper/70">
        Fermor note: {note}
      </p>
    </div>
  );
}
