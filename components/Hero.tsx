"use client";

import { useMemo, useState } from "react";
import { ArrowRight, ShieldCheck, Calculator, Star, BadgeCheck, IndianRupee } from "lucide-react";
import { sipFutureValue } from "@/lib/finance";
import { formatINR, formatCompactINR, sliderFill } from "@/lib/format";
import Reveal from "./Reveal";
import { Particles, Magnetic } from "./motion";
import { HeroLanguage } from "./LanguageRotate";

export default function Hero() {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const sip = useMemo(() => sipFutureValue(monthly, rate, years), [monthly, rate, years]);

  const points = useMemo(() => {
    const vals: number[] = [];
    for (let y = 1; y <= years; y++) vals.push(sipFutureValue(monthly, rate, y).total);
    const max = Math.max(...vals, 1);
    return vals
      .map((v, i) => `${(i / Math.max(vals.length - 1, 1)) * 260},${86 - (v / max) * 72}`)
      .join(" ");
  }, [monthly, rate, years]);

  return (
    <section id="top" className="relative overflow-hidden pt-[104px]">
      <div className="absolute inset-0 grain" />
      <Particles count={10} />
      <div className="absolute -top-24 right-[-120px] h-[460px] w-[460px] rounded-full bg-goldsoft blur-3xl opacity-80" />
      <div className="absolute top-52 left-[-160px] h-[420px] w-[420px] rounded-full bg-[#DDEEDF] blur-3xl opacity-80" />
      <div className="pointer-events-none select-none absolute top-[120px] left-1/2 -translate-x-1/2 font-display font-bold text-[26vw] leading-none text-ink/[0.035]">
        ₹
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8 pt-6 md:pt-10 pb-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          <div>
            <Reveal variant="up">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-semibold shadow-card">
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

            <Reveal delay={80} variant="up">
              <h1 className="mt-5 font-display font-semibold tracking-[-0.03em] leading-[0.98] text-[48px] md:text-[76px]">
                Clarity for
                <br />
                every{" "}
                <span className="relative inline-block">
                  <span className="italic font-bold">rupee.</span>
                  <svg viewBox="0 0 220 14" className="absolute -bottom-1 left-0 w-full" preserveAspectRatio="none">
                    <path d="M3 10 Q 60 3 110 8 T 217 6" fill="none" stroke="#C08A2C" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="mt-4 flex justify-center lg:justify-start">
                <HeroLanguage />
              </p>
            </Reveal>

            <Reveal delay={140} variant="up">
              <p className="mt-4 max-w-[530px] text-[17px] md:text-[18px] leading-[1.65] text-ink/70">
                Fermor brings investments, spending and goals into one calm{" "}
                <b className="text-ink">bahi-khata for the internet age</b> — with
                plain-English answers and math you can verify.
              </p>
            </Reveal>

            <Reveal delay={200} variant="up">
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Magnetic>
                  <a
                    href="#cta"
                    className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-[15px] font-semibold text-paper hover:bg-pine transition-colors shadow-pop"
                  >
                    Check my financial health <ArrowRight className="h-4 w-4" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <a
                    href="#calculators"
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink/12 bg-white px-7 py-4 text-[15px] font-semibold hover:border-ink transition-all"
                  >
                    <Calculator className="h-4 w-4" /> Try calculators — free
                  </a>
                </Magnetic>
              </div>
            </Reveal>

            <Reveal delay={260} variant="up">
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
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
                  <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-paper bg-white text-[10px] font-bold">
                    40k+
                  </span>
                </span>
                <span>
                  <span className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                    <b className="ml-1 text-[13.5px]">4.9</b>
                  </span>
                  <span className="text-[12.5px] text-moss">from early waitlist members</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-medium text-moss">
                  <ShieldCheck className="h-4 w-4 text-leaf" /> Read-only · delete anytime
                </span>
              </div>
            </Reveal>
          </div>

          {/* SIP card — stamp floats above the corner, clear of the LIVE pill */}
          <Reveal delay={160} variant="scale" className="relative mt-8 lg:mt-12">
            <div className="absolute -top-14 -right-4 z-10 h-16 w-16 animate-spin-slow pointer-events-none" aria-hidden>
              <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-lg">
                <defs>
                  <path id="circ" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <circle cx="50" cy="50" r="50" fill="#10201A" />
                <text fontSize="11.5" fill="#FAF8F5" fontWeight="700" letterSpacing="2">
                  <textPath href="#circ">HONEST MATH • NO JUMLAS •</textPath>
                </text>
                <text x="50" y="58" textAnchor="middle" fontSize="22" fontWeight="800" fill="#8FD0A3">₹</text>
              </svg>
            </div>

            <div className="tape relative rounded-[24px] border-2 border-ink/10 bg-white shadow-pop overflow-hidden card-lift">
                <div className="ledger-lines px-6 pt-8 pb-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-ink text-paper shrink-0">
                        <IndianRupee className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-[11px] font-bold tracking-[0.14em] text-moss uppercase leading-none">
                          Bahi-khata · SIP projector
                        </p>
                        <p className="font-display text-[21px] font-semibold mt-1 leading-none">
                          Start small. Build big.
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF5ED] px-3 py-1.5 text-[12.5px] font-bold text-leafdark shrink-0">
                      <span className="h-1.5 w-1.5 rounded-full bg-leaf animate-pulse" /> LIVE {rate}%
                    </span>
                  </div>

                  <svg viewBox="0 0 260 90" className="mt-3 w-full h-[108px]">
                    <defs>
                      <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#15803D" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#15803D" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <polygon className="draw-fill" points={`0,86 ${points} 260,86`} fill="url(#hg)" />
                    <polyline
                      key={points.length}
                      className="draw-path"
                      points={points}
                      fill="none"
                      stroke="#15803D"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex items-end justify-between gap-3 pb-3">
                    <div>
                      <p className="text-[12.5px] font-medium text-moss">In {years} years</p>
                      <p className="font-display text-[32px] font-semibold leading-none tracking-tight">
                        <span key={Math.round(sip.total)} className="num-pop">
                          {formatCompactINR(sip.total)}
                        </span>
                      </p>
                    </div>
                    <div className="text-right text-[13px] leading-[1.55] text-moss shrink-0">
                      <p>Put in <b className="text-ink">{formatCompactINR(sip.invested)}</b></p>
                      <p className="inline-block rounded-full bg-[#EAF5ED] px-2.5 py-0.5 font-bold text-leafdark">
                        Grew +{formatCompactINR(sip.gains)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 border-t-2 border-dashed border-line bg-[#FCFBF8] px-6 py-5">
                  <div>
                    <div className="flex justify-between text-[13.5px] font-medium mb-2">
                      <span>Monthly SIP <span className="text-moss">— skip a chai a day?</span></span>
                      <span className="font-bold">{formatINR(monthly)}</span>
                    </div>
                    <input type="range" min={500} max={100000} step={500} value={monthly}
                      onChange={(e) => setMonthly(+e.target.value)}
                      style={sliderFill(500, 100000, monthly)} aria-label="Monthly SIP" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-[13.5px] font-medium mb-2">
                        <span>Years</span><span className="font-bold">{years}Y</span>
                      </div>
                      <input type="range" min={1} max={30} value={years}
                        onChange={(e) => setYears(+e.target.value)}
                        style={sliderFill(1, 30, years)} aria-label="Years" />
                    </div>
                    <div>
                      <div className="flex justify-between text-[13.5px] font-medium mb-2">
                        <span>Returns</span><span className="font-bold">{rate}%</span>
                      </div>
                      <input type="range" min={6} max={15} value={rate}
                        onChange={(e) => setRate(+e.target.value)}
                        style={sliderFill(6, 15, rate)} aria-label="Returns" />
                    </div>
                  </div>
                </div>
              </div>

            <div className="mt-4 mx-auto w-fit rounded-2xl border-2 border-ink bg-goldsoft px-4 py-3 shadow-card rotate-[-1.5deg]">
              <p className="text-[11px] font-bold tracking-widest text-ink/60 uppercase">Stamped ✓ verified</p>
              <p className="text-[15px] font-bold">₹500/month is enough to start →</p>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative border-y-2 border-ink/10 bg-ink text-paper overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker py-3 text-[13.5px] font-semibold w-max">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-10 pr-10" aria-hidden={k === 1}>
              <span>Nifty 50 <b className="text-white">25,012</b> <b className="text-[#8FD0A3]">+0.42%</b></span>
              <span>Sensex <b className="text-white">81,940</b> <b className="text-[#8FD0A3]">+0.38%</b></span>
              <span className="text-paper/50">✦ SIP reminder: 17th is coming</span>
              <span>Gold 10g <b>₹98,400</b> <b className="text-red-300">−0.21%</b></span>
              <span>USD/INR <b>₹96.10</b></span>
              <span className="text-paper/50">✦ PPF rate 7.1% — review nominee?</span>
              <span>UPI in Sep <b>16.2B txns</b></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
