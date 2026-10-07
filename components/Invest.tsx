"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Check, Calendar, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { formatINR } from "@/lib/format";
import { investmentData, InvestmentAsset } from "@/data/mock";
import Reveal from "./Reveal";

type TabKey = "stocks" | "mf" | "etf";

export default function Invest() {
  const [tab, setTab] = useState<TabKey>("mf");
  const [amt, setAmt] = useState("5000");
  const [selectedAsset, setSelectedAsset] = useState<string>("UTI Nifty 50 Index Fund");
  const [debitDay, setDebitDay] = useState<number>(17);
  const [stepUp, setStepUp] = useState<boolean>(true);
  const [done, setDone] = useState(false);

  const copy = {
    stocks: {
      title: "Direct Equity — see what moves, and why",
      body: "High-conviction Indian businesses you actually understand, with real-time fundamental highlights. No speculative call tips.",
    },
    mf: {
      title: "Mutual Funds — disciplined compounding",
      body: "Low-cost index and flexi-cap portfolios, auto-rebalanced without emotional friction. ₹500 SIPs welcome.",
    },
    etf: {
      title: "Exchange Traded Funds — diversified baskets",
      body: "Nifty 50, sovereign gold, Nasdaq tech — diversify across entire asset classes with intraday liquidity.",
    },
  }[tab];

  const currentList: InvestmentAsset[] = investmentData[tab];

  return (
    <section id="invest" className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24 scroll-mt-20">
      <Reveal>
        <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-leaf">
          03 — Act
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display font-semibold tracking-tight text-[32px] sm:text-[40px] md:text-[46px] leading-[1.08] max-w-[620px] text-ink">
            So, what are you looking to invest in?
          </h2>
          {/* Tab selector */}
          <div className="inline-flex rounded-full border border-line bg-white/90 p-1.5 shadow-xs">
            {(
              [
                ["mf", "Mutual funds"],
                ["stocks", "Direct stocks"],
                ["etf", "ETFs & Gold"],
              ] as const
            ).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`rounded-full px-4 py-2 text-[13.5px] font-semibold transition-all ${
                  tab === k ? "bg-ink text-paper shadow-xs" : "text-ink/65 hover:text-ink hover:bg-cream"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        {/* Left Column: Asset list based on active tab */}
        <Reveal>
          <div className="rounded-[24px] border border-line bg-white shadow-card overflow-hidden h-full flex flex-col justify-between">
            <div className="px-6 pt-6 pb-3 border-b border-line/60">
              <h3 className="font-display text-[22px] font-semibold text-ink">{copy.title}</h3>
              <p className="mt-1 text-[14.5px] text-ink/70 leading-relaxed">{copy.body}</p>
            </div>

            <div className="px-3 py-2 divide-y divide-line/40">
              {currentList.map((s) => (
                <div
                  key={s.sym}
                  onClick={() => {
                    setSelectedAsset(s.name);
                    setDone(false);
                  }}
                  className={`flex items-center gap-3.5 rounded-2xl px-4 py-3.5 transition-all cursor-pointer ${
                    selectedAsset === s.name ? "bg-cream/70 border border-line" : "hover:bg-[#FCFBF8]"
                  }`}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-cream font-display font-bold text-[17px] text-ink shrink-0">
                    {s.initial}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[14.5px] font-bold text-ink truncate">{s.name}</p>
                      <span className="text-[11px] font-semibold text-moss bg-paper px-1.5 py-0.5 rounded border border-line">
                        {s.sym}
                      </span>
                    </div>
                    <p className="text-[12.5px] text-moss truncate mt-0.5">{s.subtitle}</p>
                    <p className="text-[11.5px] text-leafdark font-medium truncate mt-0.5">
                      ✓ {s.highlight}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[14.5px] font-mono font-bold text-ink">
                      {formatINR(s.price, { decimals: 2 })}
                    </p>
                    <p
                      className={`inline-flex items-center gap-0.5 text-[12.5px] font-bold ${
                        s.chg >= 0 ? "text-leafdark" : "text-red-700"
                      }`}
                    >
                      {s.chg >= 0 ? (
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowDownRight className="h-3.5 w-3.5" />
                      )}
                      {s.chg >= 0 ? "+" : ""}
                      {s.chg}%
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAsset(s.name);
                      setDone(false);
                    }}
                    className={`hidden sm:block rounded-full px-3.5 py-1 text-[12.5px] font-semibold border transition-all ${
                      selectedAsset === s.name
                        ? "bg-ink text-paper border-ink"
                        : "border-line text-ink hover:border-ink hover:bg-cream"
                    }`}
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-line bg-[#FCFBF8] px-6 py-3 text-[12.5px] text-moss flex items-center justify-between">
              <span>Prices delayed 15 min · Educational demo</span>
              <span className="text-leafdark font-semibold">AMFI / SEBI Compliant</span>
            </div>
          </div>
        </Reveal>

        {/* Right Column: SIP Scheduler Widget */}
        <Reveal delay={120}>
          <div className="rounded-[24px] bg-pine text-paper p-7 md:p-8 shadow-pop h-full flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 h-48 w-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-paper/70 uppercase tracking-widest flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-[#8FD0A3]" /> Instant SIP Setup
                </span>
                <span className="text-[11px] font-bold bg-paper/15 text-[#8FD0A3] px-2.5 py-0.5 rounded-full">
                  Zero Commission Direct
                </span>
              </div>

              <h3 className="mt-2.5 font-display text-[26px] font-semibold leading-tight text-paper">
                Start small. Build big.
              </h3>
              <p className="text-[13.5px] text-paper/75 mt-1">
                Target: <b className="text-white">{selectedAsset}</b>
              </p>

              {/* Monthly Amount Input */}
              <div className="mt-5">
                <label className="text-[13px] font-medium text-paper/70">Monthly investment amount</label>
                <div className="mt-1.5 flex items-center rounded-2xl bg-paper/10 border border-paper/20 px-4 focus-within:border-paper/60 transition-colors">
                  <span className="text-[20px] font-bold text-paper/70">₹</span>
                  <input
                    value={amt}
                    onChange={(e) => {
                      setAmt(e.target.value.replace(/[^0-9]/g, ""));
                      setDone(false);
                    }}
                    inputMode="numeric"
                    className="w-full bg-transparent px-2.5 py-3 text-[22px] font-bold text-paper outline-none placeholder:text-paper/30 font-mono"
                    placeholder="5000"
                  />
                  <span className="rounded-full bg-paper/15 px-3 py-1 text-[12px] font-semibold text-paper shrink-0">
                    Day {debitDay}
                  </span>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="mt-3 flex flex-wrap gap-2">
                {["500", "2500", "5000", "10000", "25000"].map((v) => (
                  <button
                    key={v}
                    onClick={() => {
                      setAmt(v);
                      setDone(false);
                    }}
                    className={`rounded-full px-3 py-1 text-[12.5px] font-semibold border transition-all ${
                      amt === v
                        ? "bg-paper text-ink border-paper shadow-sm"
                        : "border-paper/20 text-paper/80 hover:border-paper/50"
                    }`}
                  >
                    ₹{Number(v).toLocaleString("en-IN")}
                  </button>
                ))}
              </div>

              {/* Day selector & Step-up toggle */}
              <div className="mt-5 pt-4 border-t border-paper/15 grid grid-cols-2 gap-4 text-[13px]">
                <div>
                  <label className="text-paper/70 text-[12px] block mb-1.5">Auto-debit day</label>
                  <div className="flex gap-1.5">
                    {[1, 5, 10, 17].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDebitDay(d)}
                        className={`flex-1 py-1 rounded-lg font-bold text-[12px] border transition-colors ${
                          debitDay === d
                            ? "bg-paper text-ink border-paper"
                            : "border-paper/20 text-paper/80 hover:border-paper/40"
                        }`}
                      >
                        {d}th
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-paper/70 text-[12px] block mb-1.5">Annual Step-up</label>
                  <button
                    onClick={() => setStepUp(!stepUp)}
                    className={`w-full py-1 rounded-lg font-bold text-[12px] border transition-colors flex items-center justify-center gap-1.5 ${
                      stepUp
                        ? "bg-[#8FD0A3] text-ink border-[#8FD0A3]"
                        : "border-paper/20 text-paper/80 hover:border-paper/40"
                    }`}
                  >
                    {stepUp ? "✓ +10% / year" : "Static amount"}
                  </button>
                </div>
              </div>
            </div>

            {/* CTA & Submission State */}
            <div className="mt-6">
              <button
                onClick={() => setDone(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-paper px-6 py-4 text-[15px] font-bold text-ink hover:bg-white transition-all shadow-md active:scale-98"
              >
                {done ? (
                  <>
                    <Check className="h-4 w-4 text-leaf" /> SIP scheduled — see you on the {debitDay}th!
                  </>
                ) : (
                  <>Schedule SIP with UPI Autopay →</>
                )}
              </button>

              <p className="mt-3 text-[12px] leading-relaxed text-paper/60 text-center">
                {done
                  ? `₹${Number(amt || 0).toLocaleString("en-IN")}/month allocated in ${selectedAsset}. Zero exit loads on flexi funds after 1 year.`
                  : "Pause, skip, or modify amount anytime. Instant verification via UPI 2FA."}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
