"use client";

import { useMemo, useState } from "react";
import { projectWealth } from "@/lib/finance";
import { formatINR, formatCompactINR, sliderFill } from "@/lib/format";
import Reveal from "./Reveal";
import { TrendingUp, Flame, Shield, Sparkles } from "lucide-react";

export default function Forecast() {
  const [current, setCurrent] = useState(5300000);
  const [sip, setSip] = useState(25000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const [adjustInflation, setAdjustInflation] = useState(false);
  const [hoverYear, setHoverYear] = useState<number | null>(null);

  const inflationRate = adjustInflation ? 6 : 0;
  const r = useMemo(() => projectWealth(current, sip, rate, years, inflationRate), [current, sip, rate, years, inflationRate]);
  const gain = r.total - current - sip * years * 12;

  // Chart data
  const chartPointsData = useMemo(() => {
    const arr: Array<{ year: number; total: number; nominal: number }> = [];
    for (let y = 0; y <= years; y++) {
      const res = projectWealth(current, sip, rate, y, inflationRate);
      arr.push({ year: y, total: res.total, nominal: res.nominalTotal });
    }
    return arr;
  }, [current, sip, rate, years, inflationRate]);

  const maxVal = useMemo(() => {
    return Math.max(...chartPointsData.map((d) => d.total), 1);
  }, [chartPointsData]);

  const pts = useMemo(() => {
    return chartPointsData
      .map((d, i) => `${(i / Math.max(chartPointsData.length - 1, 1)) * 560},${170 - (d.total / maxVal) * 140}`)
      .join(" ");
  }, [chartPointsData, maxVal]);

  const activeDisplay = useMemo(() => {
    if (hoverYear !== null && hoverYear >= 0 && hoverYear <= years) {
      return chartPointsData[hoverYear];
    }
    return { year: years, total: r.total, nominal: r.nominalTotal };
  }, [hoverYear, years, chartPointsData, r]);

  return (
    <section id="forecast" className="border-y border-line bg-ink text-paper relative overflow-hidden scroll-mt-20">
      <div
        className="absolute inset-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24 grid lg:grid-cols-[0.88fr_1.12fr] gap-10 items-center">
        {/* Left: Interactive Controls */}
        <Reveal>
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#8FD0A3]">
              04 — Grow · Wealth Projector
            </span>
          </div>
          <h2 className="mt-3 font-display font-semibold tracking-tight text-[32px] sm:text-[40px] md:text-[46px] leading-[1.08] text-white">
            What if you stay consistent for {years} years?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-paper/70 max-w-[450px]">
            Model compound growth across market cycles, SIP step-ups, and inflation.
            Every curve backed by continuous compounding equations.
          </p>

          <div className="mt-8 space-y-5 max-w-[460px]">
            {/* Wealth today */}
            <div>
              <div className="flex justify-between text-[14px] mb-2 font-medium">
                <span className="text-paper/70">Current accumulated wealth</span>
                <b className="font-mono text-white text-[15px]">{formatINR(current)}</b>
              </div>
              <input
                type="range"
                min={100000}
                max={20000000}
                step={100000}
                value={current}
                onChange={(e) => setCurrent(+e.target.value)}
                style={sliderFill(100000, 20000000, current)}
                className="accent-[#8FD0A3]"
                aria-label="Current wealth"
              />
            </div>

            {/* Monthly SIP */}
            <div>
              <div className="flex justify-between text-[14px] mb-2 font-medium">
                <span className="text-paper/70">Monthly SIP allocation</span>
                <b className="font-mono text-white text-[15px]">{formatINR(sip)}</b>
              </div>
              <input
                type="range"
                min={0}
                max={200000}
                step={2500}
                value={sip}
                onChange={(e) => setSip(+e.target.value)}
                style={sliderFill(0, 200000, sip)}
                aria-label="Monthly SIP"
              />
            </div>

            {/* Expected Returns Selector */}
            <div>
              <div className="flex justify-between text-[13.5px] mb-2 text-paper/70">
                <span>Expected CAGR: <b className="text-white">{rate}%</b></span>
                <span className="text-[12px] text-paper/50">
                  {rate <= 8 ? "Debt / Conservative" : rate <= 11 ? "Balanced Hybrid" : "Equity Index"}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[8, 10, 12, 14].map((rVal) => (
                  <button
                    key={rVal}
                    onClick={() => setRate(rVal)}
                    className={`py-1.5 rounded-lg text-[13px] font-bold border transition-colors ${
                      rate === rVal
                        ? "bg-[#8FD0A3] text-ink border-[#8FD0A3]"
                        : "border-paper/20 text-paper/75 hover:border-paper/40"
                    }`}
                  >
                    {rVal}%
                  </button>
                ))}
              </div>
            </div>

            {/* Horizon & Inflation Toggle */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-paper/70 text-[13px] block mb-1.5">Horizon</span>
                <div className="flex gap-2">
                  {[3, 5, 10, 15, 20].map((y) => (
                    <button
                      key={y}
                      onClick={() => setYears(y)}
                      className={`px-3 py-1 rounded-full text-[12.5px] font-semibold border transition-colors ${
                        years === y
                          ? "bg-paper text-ink border-paper"
                          : "border-paper/20 text-paper/70 hover:border-paper/50"
                      }`}
                    >
                      {y}Y
                    </button>
                  ))}
                </div>
              </div>

              {/* Inflation toggle */}
              <button
                onClick={() => setAdjustInflation(!adjustInflation)}
                className={`mt-4 px-3 py-1.5 rounded-xl border text-[12px] font-bold flex items-center gap-1.5 transition-all ${
                  adjustInflation
                    ? "bg-amber-400 text-ink border-amber-400"
                    : "border-paper/20 text-paper/70 hover:border-paper/40"
                }`}
                title="Adjust for 6% inflation to see real purchasing power in today's rupee"
              >
                <Flame className="h-3.5 w-3.5" />
                {adjustInflation ? "6% Inflation Discounted" : "Adjust for 6% Inflation?"}
              </button>
            </div>
          </div>
        </Reveal>

        {/* Right: Compounding Graph & Milestone Readout */}
        <Reveal delay={120}>
          <div className="rounded-[26px] bg-paper text-ink p-6 md:p-8 shadow-pop relative overflow-hidden">
            <div className="flex flex-wrap gap-5 justify-between items-baseline border-b border-line pb-4">
              <div>
                <p className="text-[12.5px] font-semibold text-moss">Principal today</p>
                <p className="font-display text-[24px] font-semibold text-ink">{formatINR(current)}</p>
              </div>
              <div>
                <p className="text-[12.5px] font-semibold text-moss">
                  Projected in {activeDisplay.year} {activeDisplay.year === 1 ? "year" : "years"}
                  {adjustInflation && <span className="text-amber-700 font-bold ml-1">(Real Value)</span>}
                </p>
                <p className="font-display text-[32px] sm:text-[36px] font-bold text-leafdark">
                  <span key={Math.round(activeDisplay.total)} className="num-pop">
                    {formatCompactINR(activeDisplay.total)}
                  </span>
                </p>
              </div>
              <div className="rounded-xl bg-[#EAF5ED] px-3.5 py-1.5 text-[13px] font-bold text-leafdark flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                +{formatCompactINR(gain)}
              </div>
            </div>

            {/* Scrubbable SVG Compounding Curve */}
            <div className="relative mt-4">
              <svg
                viewBox="0 0 560 170"
                className="w-full h-[180px] cursor-crosshair"
                onMouseLeave={() => setHoverYear(null)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const idx = Math.max(0, Math.min(years, Math.round((x / rect.width) * years)));
                  setHoverYear(idx);
                }}
              >
                <defs>
                  <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#15803D" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#15803D" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <polygon className="draw-fill" points={`0,170 ${pts} 560,170`} fill="url(#forecastGrad)" />
                <polyline
                  points={pts}
                  fill="none"
                  stroke="#10201A"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="draw-path"
                />

                {/* Hover line and marker */}
                {hoverYear !== null && (
                  <>
                    <line
                      x1={(hoverYear / years) * 560}
                      y1="0"
                      x2={(hoverYear / years) * 560}
                      y2="170"
                      stroke="#15803D"
                      strokeDasharray="3 3"
                      strokeWidth="2"
                    />
                    <circle
                      cx={(hoverYear / years) * 560}
                      cy={170 - (activeDisplay.total / maxVal) * 140}
                      r="6"
                      fill="#15803D"
                      stroke="#fff"
                      strokeWidth="3"
                    />
                  </>
                )}
              </svg>
            </div>

            <div className="mt-3 flex justify-between text-[12px] font-semibold text-moss">
              <span>Day 1: {formatCompactINR(current)}</span>
              <span>Year {years}: {formatCompactINR(r.total)}</span>
            </div>

            {/* Mathematical Breakdown Cards */}
            <div className="mt-5 grid sm:grid-cols-3 gap-3 text-[13px]">
              <div className="rounded-xl border border-line p-3 bg-white">
                <p className="text-moss text-[12px]">Lump sum grows to</p>
                <p className="font-bold text-[15px] text-ink">{formatCompactINR(r.grown)}</p>
              </div>
              <div className="rounded-xl border border-line p-3 bg-white">
                <p className="text-moss text-[12px]">SIP deposits grow to</p>
                <p className="font-bold text-[15px] text-leafdark">{formatCompactINR(r.sip)}</p>
              </div>
              <div className="rounded-xl bg-cream p-3 border border-line/60">
                <p className="text-moss text-[12px]">Compounding factor</p>
                <p className="font-bold text-[15px] text-ink">
                  {((r.total / Math.max(current + sip * years * 12, 1))).toFixed(1)}x return
                </p>
              </div>
            </div>

            {adjustInflation && (
              <p className="mt-3 text-[12px] text-amber-800 bg-amber-50 rounded-lg p-2 border border-amber-200">
                ℹ️ Showing real purchasing power discounted at 6% p.a. Nominal bank total would be <b>{formatCompactINR(r.nominalTotal)}</b>.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
