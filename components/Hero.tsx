"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ShieldCheck, Calculator, Star, BadgeCheck, IndianRupee, Sparkles, TrendingUp } from "lucide-react";
import { sipFutureValue } from "@/lib/finance";
import { formatINR, formatCompactINR, sliderFill } from "@/lib/format";
import Reveal from "./Reveal";
import { Particles, Magnetic } from "./motion";
import { HeroLanguage } from "./LanguageRotate";

const SIP_PRESETS = [2500, 5000, 10000, 25000, 50000];

export default function Hero() {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const [hoverYear, setHoverYear] = useState<number | null>(null);

  const sip = useMemo(() => sipFutureValue(monthly, rate, years), [monthly, rate, years]);

  // Projected points across all years
  const yearData = useMemo(() => {
    const arr = [];
    for (let y = 1; y <= years; y++) {
      const res = sipFutureValue(monthly, rate, y);
      arr.push({ year: y, ...res });
    }
    return arr;
  }, [monthly, rate, years]);

  const maxVal = useMemo(() => {
    return Math.max(...yearData.map((d) => d.total), 1);
  }, [yearData]);

  const points = useMemo(() => {
    return yearData
      .map((d, i) => `${(i / Math.max(yearData.length - 1, 1)) * 280},${88 - (d.total / maxVal) * 74}`)
      .join(" ");
  }, [yearData, maxVal]);

  const activeDisplay = useMemo(() => {
    if (hoverYear !== null && hoverYear >= 1 && hoverYear <= years) {
      return yearData[hoverYear - 1];
    }
    return sip;
  }, [hoverYear, years, yearData, sip]);

  const activeYearLabel = hoverYear !== null ? hoverYear : years;

  return (
    <section id="top" className="relative overflow-hidden pt-[110px] md:pt-[124px]">
      <div className="absolute inset-0 grain" />
      <Particles count={12} />
      <div className="absolute -top-24 right-[-100px] h-[500px] w-[500px] rounded-full bg-goldsoft/80 blur-3xl pointer-events-none" />
      <div className="absolute top-52 left-[-160px] h-[450px] w-[450px] rounded-full bg-[#DDEEDF]/75 blur-3xl pointer-events-none" />
      <div className="pointer-events-none select-none absolute top-[90px] left-1/2 -translate-x-1/2 font-display font-bold text-[28vw] leading-none text-ink/[0.025]">
        ₹
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8 pt-4 md:pt-8 pb-12">
        <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Prop & Messaging */}
          <div>
            <Reveal variant="up">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/90 px-3.5 py-1.5 text-[13px] font-semibold shadow-xs">
                  <span className="relative flex h-2 w-2 text-leaf">
                    <span className="ping-soft absolute inline-flex h-full w-full" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
                  </span>
                  LIVE · Built for India
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-ink text-paper px-3.5 py-1.5 text-[12.5px] font-semibold">
                  <BadgeCheck className="h-3.5 w-3.5 text-[#8FD0A3]" /> No jargon. No jumlas.
                </span>
              </div>
            </Reveal>

            <Reveal delay={60} variant="up">
              <h1 className="mt-5 font-display font-semibold tracking-[-0.035em] leading-[1.02] text-[44px] sm:text-[56px] md:text-[76px] text-ink">
                Clarity for
                <br />
                every{" "}
                <span className="relative inline-block whitespace-nowrap">
                  <span className="italic font-bold text-leafdark">rupee.</span>
                  <svg viewBox="0 0 220 14" className="absolute -bottom-1.5 left-0 w-full" preserveAspectRatio="none">
                    <path d="M3 10 Q 60 2 110 8 T 217 5" fill="none" stroke="#C08A2C" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <div className="mt-4 flex justify-start text-left">
                <HeroLanguage />
              </div>
            </Reveal>

            <Reveal delay={120} variant="up">
              <p className="mt-4 max-w-[530px] text-[16.5px] md:text-[18px] leading-[1.65] text-ink/75">
                Fermor brings investments, spending and goals into one calm{" "}
                <b className="text-ink font-semibold">bahi-khata for the internet age</b> — with
                plain-English answers and math you can verify down to the paisa.
              </p>
            </Reveal>

            <Reveal delay={180} variant="up">
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Magnetic>
                  <a
                    href="#cta"
                    className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-[15px] font-semibold text-paper hover:bg-pine transition-all shadow-pop"
                  >
                    Check my financial health <ArrowRight className="h-4 w-4" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <a
                    href="#calculators"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink/15 bg-white/80 px-7 py-4 text-[15px] font-semibold hover:border-ink hover:bg-white transition-all shadow-xs"
                  >
                    <Calculator className="h-4 w-4 text-leaf" /> Try calculators — free
                  </a>
                </Magnetic>
              </div>
            </Reveal>

            <Reveal delay={240} variant="up">
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 pt-2 border-t border-line/60">
                <span className="flex -space-x-2.5">
                  {["AS", "PR", "KM", "JN"].map((t, i) => (
                    <span
                      key={t}
                      className={`grid h-9 w-9 place-items-center rounded-full border-2 border-paper text-[11px] font-bold text-paper ${
                        ["bg-pine", "bg-leafdark", "bg-gold", "bg-ink"][i]
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                  <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-paper bg-white text-[10px] font-bold text-ink">
                    40k+
                  </span>
                </span>
                <div>
                  <span className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                    <b className="ml-1 text-[13.5px] font-bold">4.9</b>
                  </span>
                  <span className="block text-[12px] text-moss">from early waitlist members</span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-moss bg-cream/70 px-3 py-1 rounded-full border border-line">
                  <ShieldCheck className="h-4 w-4 text-leaf shrink-0" /> Read-only · RBI AA safe · delete anytime
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Live SIP Projector Card */}
          <Reveal delay={120} variant="scale" className="relative mt-4 lg:mt-0">
            {/* Spinning trust badge */}
            <div className="absolute -top-10 -right-2 sm:-right-4 z-20 h-16 w-16 animate-spin-slow pointer-events-none drop-shadow-md" aria-hidden>
              <svg viewBox="0 0 100 100" className="h-full w-full">
                <defs>
                  <path id="circ" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <circle cx="50" cy="50" r="50" fill="#10201A" />
                <text fontSize="11" fill="#FAF8F5" fontWeight="700" letterSpacing="1.8">
                  <textPath href="#circ">HONEST MATH • NO JUMLAS •</textPath>
                </text>
                <text x="50" y="58" textAnchor="middle" fontSize="22" fontWeight="800" fill="#8FD0A3">₹</text>
              </svg>
            </div>

            <div className="tape relative rounded-[26px] border-2 border-ink/10 bg-white shadow-pop overflow-hidden card-lift">
              {/* Header inside card */}
              <div className="ledger-lines px-6 pt-7 pb-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-paper shrink-0">
                      <IndianRupee className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.14em] text-moss uppercase leading-none">
                        Bahi-khata · SIP projector
                      </p>
                      <p className="font-display text-[20px] font-semibold mt-1 leading-none text-ink">
                        Start small. Build big.
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF5ED] px-3 py-1 text-[12.5px] font-bold text-leafdark shrink-0">
                    <span className="h-1.5 w-1.5 rounded-full bg-leaf animate-pulse" /> LIVE {rate}%
                  </span>
                </div>

                {/* SVG interactive compounding curve */}
                <div className="relative mt-2">
                  <svg
                    viewBox="0 0 280 90"
                    className="w-full h-[110px] cursor-crosshair"
                    onMouseLeave={() => setHoverYear(null)}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const fraction = Math.max(0, Math.min(1, x / rect.width));
                      const yr = Math.max(1, Math.round(fraction * years));
                      setHoverYear(yr);
                    }}
                  >
                    <defs>
                      <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#15803D" stopOpacity="0.32" />
                        <stop offset="100%" stopColor="#15803D" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>
                    <polygon className="draw-fill" points={`0,88 ${points} 280,88`} fill="url(#heroGrad)" />
                    <polyline
                      key={`${monthly}-${rate}-${years}`}
                      className="draw-path"
                      points={points}
                      fill="none"
                      stroke="#15803D"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Active hover indicator on chart */}
                    {hoverYear !== null && (
                      <>
                        <line
                          x1={(Math.max(hoverYear - 1, 0) / Math.max(years - 1, 1)) * 280}
                          y1="0"
                          x2={(Math.max(hoverYear - 1, 0) / Math.max(years - 1, 1)) * 280}
                          y2="88"
                          stroke="#10201A"
                          strokeDasharray="2 3"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx={(Math.max(hoverYear - 1, 0) / Math.max(years - 1, 1)) * 280}
                          cy={88 - (activeDisplay.total / maxVal) * 74}
                          r="5"
                          fill="#15803D"
                          stroke="#fff"
                          strokeWidth="2.5"
                        />
                      </>
                    )}
                  </svg>
                </div>

                {/* Values Readout */}
                <div className="flex items-end justify-between gap-3 pb-3 pt-1 border-b border-dashed border-line">
                  <div>
                    <p className="text-[12px] font-semibold text-moss">
                      In {activeYearLabel} {activeYearLabel === 1 ? "year" : "years"}
                      {hoverYear !== null && <span className="text-leafdark font-bold ml-1">(Scrubbing)</span>}
                    </p>
                    <p className="font-display text-[32px] sm:text-[36px] font-semibold leading-none tracking-tight text-ink">
                      <span key={Math.round(activeDisplay.total)} className="num-pop">
                        {formatCompactINR(activeDisplay.total)}
                      </span>
                    </p>
                  </div>
                  <div className="text-right text-[12.5px] leading-[1.5] text-moss shrink-0">
                    <p>Put in <b className="text-ink">{formatCompactINR(activeDisplay.invested)}</b></p>
                    <p className="inline-block rounded-full bg-[#EAF5ED] px-2.5 py-0.5 font-bold text-leafdark">
                      Grew +{formatCompactINR(activeDisplay.gains)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sliders & Quick Presets */}
              <div className="space-y-4 bg-[#FCFBF8] px-6 py-5">
                <div>
                  <div className="flex justify-between items-center text-[13.5px] font-medium mb-1.5">
                    <span className="text-ink font-semibold">Monthly SIP <span className="text-moss font-normal">— skip a chai a day?</span></span>
                    <span className="font-bold text-[15px] font-mono text-ink">{formatINR(monthly)}</span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={100000}
                    step={500}
                    value={monthly}
                    onChange={(e) => setMonthly(+e.target.value)}
                    style={sliderFill(500, 100000, monthly)}
                    aria-label="Monthly SIP Amount"
                  />
                  {/* Preset chips */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {SIP_PRESETS.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setMonthly(preset)}
                        className={`text-[11.5px] px-2.5 py-0.5 rounded-md font-semibold border transition-all ${
                          monthly === preset
                            ? "bg-ink text-paper border-ink"
                            : "bg-white text-ink/70 border-line hover:border-ink/40"
                        }`}
                      >
                        ₹{preset.toLocaleString("en-IN")}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <div className="flex justify-between text-[13.5px] font-medium mb-1.5">
                      <span>Years</span><span className="font-bold">{years}Y</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={30}
                      value={years}
                      onChange={(e) => setYears(+e.target.value)}
                      style={sliderFill(1, 30, years)}
                      aria-label="Duration in Years"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-[13.5px] font-medium mb-1.5">
                      <span>Returns</span><span className="font-bold">{rate}%</span>
                    </div>
                    <input
                      type="range"
                      min={6}
                      max={15}
                      value={rate}
                      onChange={(e) => setRate(+e.target.value)}
                      style={sliderFill(6, 15, rate)}
                      aria-label="Expected Return Rate"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Clickable stamp micro-interaction */}
            <button
              onClick={() => {
                setMonthly(500);
                setYears(10);
                setRate(12);
              }}
              className="mt-3 mx-auto flex items-center justify-center gap-2 rounded-2xl border-2 border-ink bg-goldsoft px-4 py-2.5 shadow-card rotate-[-1.5deg] hover:rotate-0 hover:scale-[1.02] transition-all cursor-pointer group"
              title="Click to try ₹500/month scenario"
            >
              <Sparkles className="h-3.5 w-3.5 text-ink/70 group-hover:text-ink transition-colors" />
              <div className="text-left">
                <p className="text-[10px] font-bold tracking-widest text-ink/60 uppercase leading-none">Stamped ✓ verified</p>
                <p className="text-[13.5px] font-bold text-ink leading-tight">₹500/month is enough to start →</p>
              </div>
            </button>
          </Reveal>
        </div>
      </div>

      {/* Indian Financial Market Live Ticker Bar */}
      <div className="relative border-y-2 border-ink/10 bg-ink text-paper overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-ticker py-3 text-[13px] md:text-[13.5px] font-semibold w-max hover:[animation-play-state:paused]">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-8 md:gap-10 pr-8 md:pr-10 items-center" aria-hidden={k === 1}>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                NIFTY 50 <b className="text-white font-mono">25,012.30</b>{" "}
                <b className="text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded text-[12px]">+0.42%</b>
              </span>
              <span className="flex items-center gap-1.5">
                SENSEX <b className="text-white font-mono">81,940.15</b>{" "}
                <b className="text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded text-[12px]">+0.38%</b>
              </span>
              <span className="flex items-center gap-1.5 text-paper/70 font-normal">
                ✦ <b className="text-paper">SIP reminder:</b> 17th is approaching
              </span>
              <span className="flex items-center gap-1.5">
                GOLD 24K (10g) <b className="text-white font-mono">₹78,400</b>{" "}
                <b className="text-red-400 bg-red-950/80 px-1.5 py-0.5 rounded text-[12px]">−0.21%</b>
              </span>
              <span className="flex items-center gap-1.5">
                USD/INR <b className="text-white font-mono">₹83.92</b>
              </span>
              <span className="flex items-center gap-1.5 text-paper/70 font-normal">
                ✦ <b className="text-paper">PPF rate 7.1%:</b> Tax-free EEE maturity
              </span>
              <span className="flex items-center gap-1.5">
                UPI MONTHLY <b className="text-amber-300 font-mono">16.2B transactions</b>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
