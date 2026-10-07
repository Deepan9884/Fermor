"use client";

import { useState } from "react";
import { Wallet, TrendingUp, Target, ArrowUpRight, ArrowDownRight, ArrowRight, Sparkles, Building, PieChart, CheckCircle2 } from "lucide-react";
import { formatINR, formatCompactINR } from "@/lib/format";
import Reveal from "./Reveal";

interface SpendingCategory {
  label: string;
  amt: number;
  pct: number;
  color: string;
  topMerchant: string;
  insight: string;
}

const spendingData: SpendingCategory[] = [
  { label: "Food & Dining", amt: 12480, pct: 26, color: "#15803D", topMerchant: "Swiggy / Blinkit", insight: "₹2,100 above usual · 4 late night orders" },
  { label: "Shopping & Lifestyle", amt: 8320, pct: 17, color: "#C08A2C", topMerchant: "Amazon India", insight: "Festive sale purchases · within budget" },
  { label: "Transport & Fuel", amt: 6900, pct: 14, color: "#14342B", topMerchant: "Metro & Uber", insight: "Dropped ₹1,900 after weekly metro pass" },
  { label: "Utilities & Others", amt: 20620, pct: 43, color: "#8E9E94", topMerchant: "Rent & Electricity", insight: "Fixed recurring essentials" },
];

const goalsData = [
  { label: "Emergency Safety Fund", cur: 240000, target: 300000, monthlySave: 20000, color: "#15803D" },
  { label: "Japan Autumn Trip", cur: 85000, target: 150000, monthlySave: 10000, color: "#C08A2C" },
  { label: "Home Down Payment", cur: 920000, target: 2000000, monthlySave: 45000, color: "#14342B" },
];

const networthHistory = [
  { month: "Jan", val: 4500000 },
  { month: "Mar", val: 4680000 },
  { month: "May", val: 4820000 },
  { month: "Jul", val: 5040000 },
  { month: "Sep", val: 5340000 },
];

export default function Understand() {
  const [tab, setTab] = useState<"spending" | "networth" | "goals">("spending");
  const [selectedSpend, setSelectedSpend] = useState<number>(0);
  const [hoverMonth, setHoverMonth] = useState<number | null>(null);

  const handleAskPrompt = (q: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("fermor:ask", { detail: q }));
      const askEl = document.getElementById("ask");
      if (askEl) {
        askEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="understand" className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24 scroll-mt-20">
      <Reveal variant="blur-up">
        <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-leaf">
          01 — Understand
        </p>
        <h2 className="mt-3 font-display font-semibold tracking-tight text-[32px] sm:text-[40px] md:text-[46px] leading-[1.08] max-w-[680px] text-ink">
          See where every rupee goes, without the spreadsheet dread.
        </h2>
        <p className="mt-4 max-w-[560px] text-[16.5px] leading-relaxed text-ink/75">
          Investments, spending and savings united in one calm view — with a plain-English
          explanation for every single transaction.
        </p>
      </Reveal>

      {/* Segment switcher */}
      <Reveal delay={100}>
        <div className="mt-8 inline-flex rounded-full border border-line bg-white/90 p-1.5 gap-1 shadow-xs">
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
                tab === k
                  ? "bg-ink text-paper shadow-sm"
                  : "text-ink/65 hover:text-ink hover:bg-cream"
              }`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Main interactive showcase */}
      <div className="mt-6 grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="rounded-[24px] border border-line bg-white p-6 md:p-8 shadow-card min-h-[380px] flex flex-col justify-between">
          {tab === "spending" && (
            <div>
              <div className="flex items-baseline justify-between flex-wrap gap-3">
                <div>
                  <p className="text-[13px] font-semibold text-moss">Total spending · September</p>
                  <p className="font-display text-[34px] sm:text-[38px] font-semibold text-ink">
                    {formatINR(48320)}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF5ED] px-3 py-1.5 text-[13px] font-bold text-leafdark">
                  <ArrowDownRight className="h-4 w-4" /> 12% vs last month
                </span>
              </div>

              {/* Interactive stacked bar */}
              <div className="mt-6 flex h-4 overflow-hidden rounded-full bg-cream cursor-pointer gap-0.5 p-0.5">
                {spendingData.map((s, idx) => (
                  <div
                    key={s.label}
                    onClick={() => setSelectedSpend(idx)}
                    className={`h-full rounded-full transition-all duration-200 ${
                      selectedSpend === idx ? "scale-y-125 ring-2 ring-ink" : "opacity-85 hover:opacity-100"
                    }`}
                    style={{ width: `${s.pct}%`, background: s.color }}
                    title={`${s.label}: ${s.pct}%`}
                  />
                ))}
              </div>

              {/* Categories Grid */}
              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {spendingData.map((s, idx) => (
                  <div
                    key={s.label}
                    onClick={() => setSelectedSpend(idx)}
                    className={`flex items-center justify-between rounded-xl border p-3.5 cursor-pointer transition-all ${
                      selectedSpend === idx
                        ? "border-ink bg-cream/70 shadow-xs"
                        : "border-line hover:border-ink/30 bg-white"
                    }`}
                  >
                    <span className="flex items-center gap-2.5 text-[14px] font-medium text-ink">
                      <span className="h-3 w-3 rounded-full shrink-0" style={{ background: s.color }} />
                      <span className="truncate">{s.label}</span>
                    </span>
                    <span className="text-[14px] shrink-0">
                      <b className="text-ink">{formatINR(s.amt)}</b>{" "}
                      <span className="text-moss text-[12.5px]">({s.pct}%)</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Active Category Detail Pill */}
              <div className="mt-5 rounded-2xl bg-[#FAF8F5] border border-line p-4 text-[14px] leading-relaxed text-ink/80 flex items-start gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-leaf text-white shrink-0 mt-0.5">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-semibold text-ink">
                    Fermor insight on {spendingData[selectedSpend].label}:
                  </p>
                  <p className="text-moss text-[13.5px] mt-0.5">
                    {spendingData[selectedSpend].insight}. Top merchant: <b className="text-ink font-semibold">{spendingData[selectedSpend].topMerchant}</b>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {tab === "networth" && (
            <div>
              <div className="flex items-baseline justify-between flex-wrap gap-3">
                <div>
                  <p className="text-[13px] font-semibold text-moss">Net worth · across 6 connected accounts</p>
                  <p className="font-display text-[34px] sm:text-[38px] font-semibold text-ink">
                    {formatINR(5340000)}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF5ED] px-3 py-1.5 text-[13px] font-bold text-leafdark">
                  <ArrowUpRight className="h-4 w-4" /> +18.4% this year
                </span>
              </div>

              {/* Net worth SVG interactive chart */}
              <div className="relative mt-4">
                <svg
                  viewBox="0 0 520 150"
                  className="w-full h-[150px] cursor-crosshair"
                  onMouseLeave={() => setHoverMonth(null)}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const idx = Math.max(0, Math.min(networthHistory.length - 1, Math.round((x / rect.width) * (networthHistory.length - 1))));
                    setHoverMonth(idx);
                  }}
                >
                  <defs>
                    <linearGradient id="nwGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#15803D" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#15803D" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {[30, 65, 100, 135].map((y) => (
                    <line key={y} x1="0" y1={y} x2="520" y2={y} stroke="#E7E0D5" strokeDasharray="4 6" />
                  ))}
                  <polygon
                    points="0,135 130,118 260,98 390,65 520,32 520,150 0,150"
                    fill="url(#nwGrad)"
                  />
                  <polyline
                    points="0,135 130,118 260,98 390,65 520,32"
                    fill="none"
                    stroke="#10201A"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="draw-path"
                  />
                  {networthHistory.map((m, i) => {
                    const cx = i * 130;
                    const cy = [135, 118, 98, 65, 32][i];
                    const isHovered = hoverMonth === i;
                    return (
                      <circle
                        key={m.month}
                        cx={cx}
                        cy={cy}
                        r={isHovered ? 7 : 5}
                        fill={isHovered ? "#C08A2C" : "#15803D"}
                        stroke="#fff"
                        strokeWidth="2.5"
                      />
                    );
                  })}
                </svg>

                {hoverMonth !== null && (
                  <div className="text-center mt-1 text-[13px] font-semibold text-leafdark">
                    {networthHistory[hoverMonth].month}: {formatINR(networthHistory[hoverMonth].val)}
                  </div>
                )}
              </div>

              {/* Asset Class breakdown pills */}
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {[
                  ["Investments (MF + Stocks)", "₹38.2L", "+21.4%"],
                  ["Liquid Savings & FD", "₹9.4L", "+6.8%"],
                  ["Retirement (EPF + PPF)", "₹5.8L", "+8.25%"],
                ].map(([l, v, c]) => (
                  <div key={l} className="rounded-xl bg-[#FCFBF8] border border-line p-3">
                    <p className="text-[12px] text-moss truncate">{l}</p>
                    <p className="font-bold text-[16px] text-ink mt-0.5">{v}</p>
                    <span className="text-[11.5px] font-semibold text-leafdark">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "goals" && (
            <div className="space-y-4">
              {goalsData.map((g) => {
                const pct = Math.round((g.cur / g.target) * 100);
                const remaining = g.target - g.cur;
                const monthsLeft = Math.ceil(remaining / g.monthlySave);
                return (
                  <div key={g.label} className="rounded-2xl border border-line p-4 md:p-5 bg-white shadow-xs">
                    <div className="flex justify-between items-baseline gap-3 flex-wrap">
                      <div>
                        <p className="font-semibold text-[16px] text-ink">{g.label}</p>
                        <p className="text-[12.5px] text-moss mt-0.5">
                          Saving {formatINR(g.monthlySave)}/mo · ~{monthsLeft} months to completion
                        </p>
                      </div>
                      <p className="text-[14px] font-bold text-ink">
                        {formatINR(g.cur)}{" "}
                        <span className="text-moss font-normal text-[12.5px]">/ {formatINR(g.target)}</span>
                        <span className="ml-2 rounded-full bg-[#EAF5ED] text-leafdark px-2 py-0.5 text-[11.5px] font-bold">
                          {pct}%
                        </span>
                      </p>
                    </div>
                    <div className="mt-3 h-2.5 rounded-full bg-cream overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: g.color }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="rounded-xl bg-cream px-4 py-3 text-[13.5px] text-ink/80 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-leaf shrink-0" />
                <span>
                  <b className="text-ink">Next move:</b> Emergency fund reaches 100% in 3 months. Fermor will automatically suggest redirecting ₹20,000/mo to your Home fund.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Interactive Prompt Triggers */}
        <aside className="rounded-[24px] bg-ink text-paper p-7 flex flex-col justify-between shadow-pop relative overflow-hidden">
          <div className="absolute top-0 right-0 h-40 w-40 bg-white/[0.04] rounded-full blur-2xl pointer-events-none" />
          <div>
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-[#8FD0A3] uppercase tracking-wider">
                Ask your data
              </p>
              <span className="text-[11px] text-paper/50">Tap to run in chat</span>
            </div>
            <div className="mt-4 space-y-2.5">
              {[
                "How are my investments performing?",
                "Where is my money going?",
                "How can I save more?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => handleAskPrompt(q)}
                  className="w-full text-left rounded-xl border border-paper/15 bg-paper/5 px-4 py-3 text-[14px] text-paper/90 hover:bg-paper/15 hover:border-paper/30 transition-all group flex items-center justify-between"
                >
                  <span>“{q}”</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#8FD0A3] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-paper/10">
            <p className="text-[13px] leading-relaxed text-paper/65">
              Answers are computed strictly on your verified transactions — never generic GPT templates.
              Reads like a friend who calculates with precision.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
