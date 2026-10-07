"use client";

import { useState } from "react";
import { Wallet, TrendingUp, Target } from "lucide-react";
import { formatINR } from "@/lib/format";
import Reveal from "./Reveal";

const spending = [
  { label: "Food", amt: 12480, pct: 26, color: "#15803D" },
  { label: "Shopping", amt: 8320, pct: 17, color: "#C08A2C" },
  { label: "Transport", amt: 6900, pct: 14, color: "#14342B" },
  { label: "Others", amt: 20620, pct: 43, color: "#D9CFBB" },
];

const goals = [
  { label: "Emergency fund", cur: 240000, target: 300000 },
  { label: "Japan trip", cur: 85000, target: 150000 },
  { label: "Home down payment", cur: 920000, target: 2000000 },
];

export default function Understand() {
  const [tab, setTab] = useState<"spending" | "networth" | "goals">("spending");

  return (
    <section id="understand" className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24">
      <Reveal variant="blur-up">
        <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-leaf">
          01 — Understand
        </p>
        <h2 className="mt-3 font-display font-semibold tracking-tight text-[32px] md:text-[46px] leading-[1.08] max-w-[640px]">
          See where every rupee goes, without the spreadsheet dread.
        </h2>
        <p className="mt-4 max-w-[560px] text-[16.5px] leading-relaxed text-ink/65">
          Investments, spending and savings in one view — with a one-line
          explanation for every number.
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-8 inline-flex rounded-full border border-line bg-white p-1.5 gap-1">
          {(
            [
              ["spending", "This month", Wallet],
              ["networth", "Net worth", TrendingUp],
              ["goals", "Goals", Target],
            ] as const
          ).map(([k, label, Icon]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold transition-all ${
                tab === k ? "bg-ink text-paper shadow" : "text-ink/60 hover:text-ink"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-6 grid lg:grid-cols-[1fr_380px] gap-5">
        <div className="rounded-[20px] border border-line bg-white p-6 md:p-8 shadow-card min-h-[340px]">
          {tab === "spending" && (
            <div>
              <div className="flex items-baseline justify-between flex-wrap gap-2">
                <div>
                  <p className="text-[13px] text-moss">Total spending · September</p>
                  <p className="font-display text-[34px] font-semibold">{formatINR(48320)}</p>
                </div>
                <span className="rounded-full bg-[#EAF5ED] px-3 py-1.5 text-[13px] font-semibold text-leafdark">
                  ↓ 12% vs last month
                </span>
              </div>
              <div className="mt-6 flex h-4 overflow-hidden rounded-full bg-cream">
                {spending.map((s) => (
                  <div key={s.label} style={{ width: `${s.pct}%`, background: s.color }} />
                ))}
              </div>
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {spending.map((s) => (
                  <div key={s.label} className="flex items-center justify-between rounded-xl border border-line px-4 py-3.5">
                    <span className="flex items-center gap-2.5 text-[14.5px] font-medium">
                      <span className="h-3 w-3 rounded-full" style={{ background: s.color }} />
                      {s.label}
                    </span>
                    <span className="text-[14.5px]">
                      <b>{formatINR(s.amt)}</b>{" "}
                      <span className="text-moss">{s.pct}%</span>
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-5 rounded-xl bg-cream px-4 py-3 text-[14px] leading-relaxed text-ink/75">
                <b className="text-ink">Fermor says:</b> Food is 26% of spend — ₹2,100 over
                your usual. One home-cooked swap a week covers half your SIP hike.
              </p>
            </div>
          )}

          {tab === "networth" && (
            <div>
              <div className="flex items-baseline justify-between flex-wrap gap-2">
                <div>
                  <p className="text-[13px] text-moss">Net worth · across 6 accounts</p>
                  <p className="font-display text-[34px] font-semibold">{formatINR(5340000)}</p>
                </div>
                <span className="rounded-full bg-[#EAF5ED] px-3 py-1.5 text-[13px] font-semibold text-leafdark">
                  +18.4% this year
                </span>
              </div>
              <svg viewBox="0 0 520 160" className="mt-6 w-full h-[160px]">
                <defs>
                  <linearGradient id="nw" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#15803D" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#15803D" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[30, 70, 110, 150].map((y) => (
                  <line key={y} x1="0" y1={y} x2="520" y2={y} stroke="#E7E0D5" strokeDasharray="4 6" />
                ))}
                <polygon
                  points="0,140 65,132 130,126 195,118 260,108 325,96 390,78 455,60 520,38 520,160 0,160"
                  fill="url(#nw)"
                />
                <polyline
                  points="0,140 65,132 130,126 195,118 260,108 325,96 390,78 455,60 520,38"
                  fill="none"
                  stroke="#10201A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="draw-path"
                />
                <circle cx="520" cy="38" r="6" fill="#15803D" stroke="#fff" strokeWidth="3" />
              </svg>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  ["Investments", "₹38.2L"],
                  ["Savings", "₹9.4L"],
                  ["EPF + PPF", "₹5.8L"],
                ].map(([l, v]) => (
                  <div key={l} className="rounded-xl bg-[#FCFBF8] border border-line py-3">
                    <p className="text-[12.5px] text-moss">{l}</p>
                    <p className="font-semibold text-[15px]">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "goals" && (
            <div className="space-y-4">
              {goals.map((g) => {
                const pct = Math.round((g.cur / g.target) * 100);
                return (
                  <div key={g.label} className="rounded-xl border border-line p-5">
                    <div className="flex justify-between items-baseline gap-3 flex-wrap">
                      <p className="font-semibold text-[15.5px]">{g.label}</p>
                      <p className="text-[13.5px] text-moss">
                        {formatINR(g.cur)} of {formatINR(g.target)} · {pct}%
                      </p>
                    </div>
                    <div className="mt-3 h-2.5 rounded-full bg-cream overflow-hidden">
                      <div
                        className="h-full rounded-full bg-leaf transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              <p className="rounded-xl bg-cream px-4 py-3 text-[14px] text-ink/75">
                <b className="text-ink">On track:</b> emergency fund finishes in 2
                months at current SIP. Then redirect ₹8,000 to home fund.
              </p>
            </div>
          )}
        </div>

        <aside className="rounded-[20px] bg-ink text-paper p-7 flex flex-col justify-between shadow-pop">
          <div>
            <p className="text-[13px] font-medium text-paper/60">Try asking</p>
            <div className="mt-3 space-y-2.5">
              {["How are my investments performing?", "Where is my money going?", "How can I save more?"].map(
                (q) => (
                  <a
                    key={q}
                    href="#ask"
                    className="block rounded-xl border border-paper/15 bg-paper/5 px-4 py-3 text-[14.5px] hover:bg-paper/10 transition-colors"
                  >
                    “{q}”
                  </a>
                )
              )}
            </div>
          </div>
          <p className="mt-6 text-[13.5px] leading-relaxed text-paper/60">
            Answers are grounded in your data — never generic tips. Takes seconds,
            reads like a friend who does math.
          </p>
        </aside>
      </div>
    </section>
  );
}
