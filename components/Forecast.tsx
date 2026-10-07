"use client";

import { useMemo, useState } from "react";
import { projectWealth } from "@/lib/finance";
import { formatINR, formatCompactINR, sliderFill } from "@/lib/format";
import Reveal from "./Reveal";

export default function Forecast() {
  const [current, setCurrent] = useState(5300000);
  const [sip, setSip] = useState(25000);
  const [years, setYears] = useState(10);

  const r = useMemo(() => projectWealth(current, sip, 12, years), [current, sip, years]);
  const gain = r.total - current - sip * years * 12;

  const pts = useMemo(() => {
    const arr: number[] = [];
    for (let y = 0; y <= years; y++) arr.push(projectWealth(current, sip, 12, y).total);
    const max = Math.max(...arr, 1);
    return arr
      .map((v, i) => `${(i / Math.max(arr.length - 1, 1)) * 560},${170 - (v / max) * 140}`)
      .join(" ");
  }, [current, sip, years]);

  return (
    <section id="forecast" className="border-y border-line bg-ink text-paper relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.14]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-center">
        <Reveal>
          <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#8FD0A3]">
            04 — Grow · Forecast your future
          </p>
          <h2 className="mt-3 font-display font-semibold tracking-tight text-[32px] md:text-[46px] leading-[1.08]">
            What if you stay consistent for {years} years?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-paper/65 max-w-[440px]">
            Model market shifts, SIP hikes and life goals. One slider at a time —
            with the math in the open.
          </p>

          <div className="mt-8 space-y-6 max-w-[440px]">
            <div>
              <div className="flex justify-between text-[14px] mb-2.5">
                <span className="text-paper/70">Wealth today</span>
                <b>{formatINR(current)}</b>
              </div>
              <input type="range" min={500000} max={20000000} step={100000} value={current}
                onChange={(e) => setCurrent(+e.target.value)}
                style={{ ...sliderFill(500000, 20000000, current), background: `linear-gradient(to right, #8FD0A3 var(--fill), rgba(255,255,255,0.15) var(--fill))` } as React.CSSProperties} />
            </div>
            <div>
              <div className="flex justify-between text-[14px] mb-2.5">
                <span className="text-paper/70">Monthly SIP</span>
                <b>{formatINR(sip)}</b>
              </div>
              <input type="range" min={0} max={200000} step={1000} value={sip}
                onChange={(e) => setSip(+e.target.value)}
                style={{ ...sliderFill(0, 200000, sip), background: `linear-gradient(to right, #8FD0A3 var(--fill), rgba(255,255,255,0.15) var(--fill))` } as React.CSSProperties} />
            </div>
            <div>
              <div className="flex justify-between text-[14px] mb-2.5">
                <span className="text-paper/70">Horizon</span>
                <b>{years} years</b>
              </div>
              <div className="flex gap-2">
                {[2, 5, 10, 15].map((y) => (
                  <button key={y} onClick={() => setYears(y)}
                    className={`flex-1 rounded-full py-2 text-[13.5px] font-semibold border transition-colors ${years === y ? "bg-paper text-ink border-paper" : "border-paper/20 text-paper/70 hover:border-paper/50"}`}>
                    {y}Y
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-[20px] bg-paper text-ink p-6 md:p-8 shadow-pop">
            <div className="flex flex-wrap gap-6 justify-between">
              <div>
                <p className="text-[13px] text-moss">Total wealth today</p>
                <p className="font-display text-[26px] font-semibold">{formatINR(current)}</p>
              </div>
              <div>
                <p className="text-[13px] text-moss">Projected in {years} years</p>
                <p className="font-display text-[26px] font-semibold text-leafdark">
                  <span key={Math.round(r.total)} className="num-pop">{formatCompactINR(r.total)}</span>
                </p>
              </div>
              <div className="rounded-xl bg-[#EAF5ED] px-4 py-2 self-center text-[13.5px] font-semibold text-leafdark">
                +{formatCompactINR(gain)} ({Math.round((gain / Math.max(current, 1)) * 100)}%)
              </div>
            </div>
            <svg viewBox="0 0 560 180" className="mt-6 w-full h-[190px]">
              <defs>
                <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#15803D" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#15803D" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon className="draw-fill" points={`0,175 ${pts} 560,175`} fill="url(#fg)" />
              <polyline points={pts} fill="none" stroke="#10201A" strokeWidth="3.5" strokeLinecap="round" className="draw-path" />
            </svg>
            <div className="mt-4 flex justify-between text-[12.5px] text-moss">
              <span>Now</span>
              <span>{years}Y · {formatCompactINR(r.total)}</span>
            </div>
            <div className="mt-5 grid sm:grid-cols-3 gap-3 text-[13.5px]">
              <div className="rounded-xl border border-line px-4 py-3">
                <p className="text-moss text-[12.5px]">Today compounds to</p>
                <p className="font-semibold">{formatCompactINR(r.grown)}</p>
              </div>
              <div className="rounded-xl border border-line px-4 py-3">
                <p className="text-moss text-[12.5px]">SIPs grow to</p>
                <p className="font-semibold">{formatCompactINR(r.sip)}</p>
              </div>
              <div className="rounded-xl bg-cream px-4 py-3">
                <p className="text-moss text-[12.5px]">Assumed returns</p>
                <p className="font-semibold">12% p.a.</p>
              </div>
            </div>
            <p className="mt-4 text-[12.5px] text-moss">Illustration only. Markets don’t move in straight lines — stay invested, review yearly.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
