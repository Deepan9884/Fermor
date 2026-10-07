"use client";

import { useState } from "react";
import { Plus, GraduationCap, Sparkles, Search, Bike, PiggyBank, Heart } from "lucide-react";
import { faqs } from "@/data/mock";
import { formatINR } from "@/lib/format";
import Reveal from "./Reveal";

export default function KidsFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [dailyKidSave, setDailyKidSave] = useState(25);

  const annualSaved = dailyKidSave * 365;

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="kids" className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24 grid lg:grid-cols-[0.92fr_1.08fr] gap-10 scroll-mt-20">
      {/* Left Column: Fermor for Kids Pitch & Interactive Habit Sim */}
      <Reveal>
        <div className="rounded-[26px] border border-line bg-goldsoft/90 p-7 md:p-9 relative overflow-hidden shadow-card flex flex-col justify-between">
          <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/40 pointer-events-none" />

          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full bg-ink text-paper px-3.5 py-1.5 text-[12.5px] font-semibold shadow-xs">
                <GraduationCap className="h-4 w-4 text-amber-300" /> Fermor for Kids
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-ink/60">
                Ages 8–16
              </span>
            </div>

            <h2 className="mt-4 font-display font-semibold text-[30px] sm:text-[36px] leading-[1.12] tracking-tight text-ink">
              Pocket money today, portfolio tomorrow.
            </h2>
            <p className="mt-3 text-[15.5px] leading-relaxed text-ink/75">
              Visual dibba-jars, bite-sized compounding games, and family challenges —
              so financial confidence starts early, not as a panic at 25.
            </p>

            {/* Interactive Kid Habit Sim */}
            <div className="mt-6 p-4 rounded-2xl bg-white/80 border border-ink/10 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-semibold text-ink flex items-center gap-1.5">
                  <PiggyBank className="h-4 w-4 text-leaf" /> Skip a snack/cold-drink a day:
                </span>
                <span className="text-[14px] font-bold font-mono text-ink">
                  ₹{dailyKidSave}/day
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={dailyKidSave}
                onChange={(e) => setDailyKidSave(+e.target.value)}
                className="w-full accent-leaf"
                aria-label="Daily savings"
              />
              <div className="mt-3 pt-3 border-t border-line/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#EAF5ED] text-leafdark">
                    <Bike className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="text-[11px] text-moss block leading-none">1 Year Habit Yields</span>
                    <span className="text-[16px] font-bold text-ink leading-tight">
                      {formatINR(annualSaved)}
                    </span>
                  </div>
                </div>
                <span className="text-[11.5px] font-bold bg-gold text-ink px-2.5 py-1 rounded-full">
                  = 1 Gear Bicycle 🚲
                </span>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="mt-5 grid grid-cols-3 gap-2.5 text-center">
              {[
                ["Save", "Virtual jars"],
                ["Grow", "₹100 micro-SIPs"],
                ["Learn", "5-min quizzes"],
              ].map(([a, b]) => (
                <div key={a} className="rounded-xl bg-white/60 border border-ink/10 py-3">
                  <p className="font-display font-semibold text-[17px] text-ink">{a}</p>
                  <p className="text-[11.5px] text-moss">{b}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-ink/10 flex items-center justify-between">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-bold text-paper hover:bg-pine transition-colors shadow-xs"
            >
              <span>Explore Kids Early Access</span>
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            </a>
            <span className="text-[12px] font-medium text-ink/60">Free with Fermor</span>
          </div>
        </div>
      </Reveal>

      {/* Right Column: Searchable FAQ Accordion */}
      <div>
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display font-semibold tracking-tight text-[28px] sm:text-[34px] text-ink">
              Fair questions, straight answers.
            </h2>
          </div>

          {/* Quick Search in FAQs */}
          <div className="mt-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-moss" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions: 'safe', 'tax', 'calculators', 'broker'..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-line bg-white text-[13.5px] outline-none focus:border-leaf shadow-xs transition-colors"
            />
          </div>
        </Reveal>

        <div className="mt-6 divide-y divide-line border-y border-line">
          {filteredFaqs.length === 0 ? (
            <div className="py-8 text-center text-moss text-[14px]">
              No questions matched &quot;{searchQuery}&quot;. Try asking Fermor Ask in the chat above!
            </div>
          ) : (
            filteredFaqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-4.5 text-left group"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-moss bg-cream px-2 py-0.5 rounded">
                        {f.category}
                      </span>
                      <span className="text-[15.5px] font-semibold text-ink group-hover:text-leafdark transition-colors">
                        {f.q}
                      </span>
                    </div>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all ${
                        isOpen
                          ? "bg-ink text-paper border-ink rotate-45"
                          : "border-line bg-white group-hover:border-ink/40"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                    }`}
                  >
                    <p className="overflow-hidden text-[14.5px] leading-relaxed text-ink/75 pr-6">
                      {f.a}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
