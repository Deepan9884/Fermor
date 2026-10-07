"use client";

import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Check } from "lucide-react";
import { formatINR } from "@/lib/format";
import { stocks } from "@/data/mock";
import Reveal from "./Reveal";

export default function Invest() {
  const [tab, setTab] = useState<"stocks" | "mf" | "etf">("stocks");
  const [amt, setAmt] = useState("5000");
  const [done, setDone] = useState(false);

  const copy = {
    stocks: {
      title: "Stocks — see what moves, and why",
      body: "Nifty, Sensex and the stocks you actually hold, with a one-line reason for every move. No noise, no tips.",
    },
    mf: {
      title: "Mutual funds — small amounts, steadily",
      body: "Spread across 3–4 funds, auto-rebalanced yearly. ₹500 SIPs welcome. Time does the heavy lifting.",
    },
    etf: {
      title: "ETFs — the whole basket in one tap",
      body: "Nifty 50, gold, Nasdaq — diversify across indices and themes without picking 20 stocks.",
    },
  }[tab];

  return (
    <section id="invest" className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24">
      <Reveal>
        <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-leaf">
          03 — Act
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display font-semibold tracking-tight text-[32px] md:text-[46px] leading-[1.08] max-w-[600px]">
            So, what are you looking to invest in?
          </h2>
          <div className="inline-flex rounded-full border border-line bg-white p-1.5">
            {(
              [
                ["stocks", "Stocks"],
                ["mf", "Mutual funds"],
                ["etf", "ETFs"],
              ] as const
            ).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`rounded-full px-4 py-2 text-[13.5px] font-semibold transition-all ${
                  tab === k ? "bg-ink text-paper" : "text-ink/60"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-5">
        <Reveal>
          <div className="rounded-[20px] border border-line bg-white shadow-card overflow-hidden">
            <div className="px-6 pt-6 pb-2">
              <h3 className="font-display text-[22px] font-semibold">{copy.title}</h3>
              <p className="mt-1.5 text-[15px] text-ink/65 leading-relaxed">{copy.body}</p>
            </div>
            <div className="px-3 pb-3">
              {stocks.map((s) => (
                <div
                  key={s.sym}
                  className="flex items-center gap-4 rounded-2xl px-3 py-3.5 hover:bg-[#FCFBF8] transition-colors"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-cream font-display font-semibold text-[17px]">
                    {s.initial}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14.5px] font-semibold truncate">{s.name}</p>
                    <p className="text-[12.5px] text-moss">{s.sym}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[14.5px] font-semibold">{formatINR(s.price, { decimals: 2 })}</p>
                    <p
                      className={`inline-flex items-center gap-0.5 text-[13px] font-semibold ${
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
                  <button className="hidden sm:block rounded-full border border-line px-4 py-1.5 text-[13px] font-semibold hover:bg-ink hover:text-paper hover:border-ink transition-colors">
                    Invest
                  </button>
                </div>
              ))}
            </div>
            <p className="border-t border-line bg-[#FCFBF8] px-6 py-3 text-[12.5px] text-moss">
              Prices delayed 15 min · For education, not a recommendation.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-[20px] bg-pine text-paper p-7 md:p-8 shadow-pop h-full flex flex-col">
            <p className="text-[13px] font-medium text-paper/60 uppercase tracking-[0.1em]">
              Start a SIP in 2 minutes
            </p>
            <h3 className="mt-2 font-display text-[26px] font-semibold leading-tight">
              Start small.
              <br />
              Build big.
            </h3>
            <label className="mt-6 text-[13.5px] text-paper/70">Monthly amount</label>
            <div className="mt-2 flex items-center rounded-2xl bg-paper/10 border border-paper/15 px-4 focus-within:border-paper/40">
              <span className="text-[18px] font-semibold text-paper/70">₹</span>
              <input
                value={amt}
                onChange={(e) => {
                  setAmt(e.target.value.replace(/[^0-9]/g, ""));
                  setDone(false);
                }}
                inputMode="numeric"
                className="w-full bg-transparent px-2 py-3.5 text-[20px] font-semibold outline-none placeholder:text-paper/30"
                placeholder="5,000"
              />
              <span className="rounded-full bg-paper/10 px-3 py-1 text-[12.5px]">17th monthly</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {["500", "5000", "25000"].map((v) => (
                <button
                  key={v}
                  onClick={() => {
                    setAmt(v);
                    setDone(false);
                  }}
                  className={`rounded-full py-2 text-[13.5px] font-semibold border transition-colors ${
                    amt === v
                      ? "bg-paper text-ink border-paper"
                      : "border-paper/20 text-paper/80 hover:border-paper/50"
                  }`}
                >
                  ₹{Number(v).toLocaleString("en-IN")}
                </button>
              ))}
            </div>
            <button
              onClick={() => setDone(true)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-paper px-6 py-3.5 text-[15px] font-bold text-ink hover:bg-white transition-colors"
            >
              {done ? (
                <>
                  <Check className="h-4 w-4" /> SIP scheduled — see you on the 17th
                </>
              ) : (
                <>Invest now →</>
              )}
            </button>
            <p className="mt-4 text-[13px] leading-relaxed text-paper/55">
              {done
                ? `₹${Number(amt || 0).toLocaleString("en-IN")}/month locked. We’ll remind you before the debit and show the projection.`
                : "No lock-in on flexi funds. Pause or skip anytime. Takes ~2 min with UPI Autopay."}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
