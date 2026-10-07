"use client";

import { useState } from "react";
import { Plus, GraduationCap } from "lucide-react";
import { faqs } from "@/data/mock";
import Reveal from "./Reveal";

export default function KidsFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="kids" className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24 grid lg:grid-cols-[0.95fr_1.05fr] gap-10">
      <Reveal>
        <div className="rounded-[24px] border border-line bg-goldsoft p-7 md:p-9 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/50" />
          <span className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-3.5 py-1.5 text-[12.5px] font-semibold">
            <GraduationCap className="h-4 w-4" /> Fermor for Kids
          </span>
          <h2 className="mt-4 font-display font-semibold text-[30px] md:text-[36px] leading-[1.12] tracking-tight">
            Pocket money today, portfolio tomorrow.
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink/70">
            Save jars, simple SIP stories, and challenges parents can do together —
            so money feels fun at 10, not scary at 25.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              ["Save", "jars & goals"],
              ["Grow", "₹100 SIPs"],
              ["Learn", "5-min games"],
            ].map(([a, b]) => (
              <div key={a} className="rounded-2xl bg-white/80 border border-ink/10 py-4">
                <p className="font-display font-semibold text-[18px]">{a}</p>
                <p className="text-[12.5px] text-moss">{b}</p>
              </div>
            ))}
          </div>
          <a href="#cta" className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-[14.5px] font-semibold text-paper hover:bg-pine">
            Explore Kids →
          </a>
        </div>
      </Reveal>

      <div>
        <Reveal>
          <h2 className="font-display font-semibold tracking-tight text-[28px] md:text-[34px]">
            Fair questions, straight answers.
          </h2>
        </Reveal>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[16px] font-semibold">{f.q}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all ${isOpen ? "bg-ink text-paper border-ink rotate-45" : "border-line"}`}>
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div className={`grid transition-all ${isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"}`}>
                  <p className="overflow-hidden text-[15px] leading-relaxed text-ink/65">
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
