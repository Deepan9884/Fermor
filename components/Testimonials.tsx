"use client";

import { useState } from "react";
import { Star, Quote, ShieldCheck, Heart } from "lucide-react";
import Reveal from "./Reveal";

const allTestimonials = [
  {
    name: "Ananya Sharma",
    role: "Teacher · Jaipur",
    category: "Salaried",
    text: "I finally understood my salary slips. The Section 87A explainer saved me ₹18,000 in wrong TDS deductions from my school account.",
    tag: "Tax 87A",
    verified: true,
  },
  {
    name: "Rohan Patil",
    role: "Delivery Partner · Pune",
    category: "Small Business",
    text: "₹500 SIP felt like too small to matter. 14 months later it's ₹9,400 and I genuinely understand power of compounding without fancy English.",
    tag: "Micro-SIP",
    verified: true,
  },
  {
    name: "Kavya Menon",
    role: "New Mother · Kochi",
    category: "Salaried",
    text: "Ask Fermor recommended pausing aggressive prepayments to finish our 6-month emergency reserve first. Not even my bank RM gave that candid advice.",
    tag: "Advisory",
    verified: true,
  },
  {
    name: "Jaspreet Singh",
    role: "Retail Shop Owner · Ludhiana",
    category: "Small Business",
    text: "FD vs liquid fund comparison on one clean screen. Moved idle working capital cash in 10 minutes and earned an extra 3.5% yield.",
    tag: "Liquid Cash",
    verified: true,
  },
  {
    name: "Meera Iyer",
    role: "Student (Class 10) · Chennai",
    category: "Kids",
    text: "The Kids section got me to run my own weekly allowance ledger. Now I explain compound interest and biscuit cost inflation to my parents!",
    tag: "For Kids",
    verified: true,
  },
  {
    name: "Arjun Desai",
    role: "Software Engineer · Bengaluru",
    category: "Salaried",
    text: "Net-worth consolidated across 5 accounts. One simple prompt showed me: 'you are 2 months from debt freedom'. That hit harder than any dashboard.",
    tag: "Net Worth",
    verified: true,
  },
];

export default function Testimonials() {
  const [filter, setFilter] = useState<string>("All");

  const filtered = filter === "All"
    ? allTestimonials
    : allTestimonials.filter((t) => t.category === filter);

  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-leaf">
                Community Voices
              </p>
              <h2 className="mt-2 font-display font-semibold tracking-tight text-[32px] sm:text-[40px] md:text-[44px] leading-tight text-ink">
                Loved in <span className="italic text-leafdark">lakhs of ghar-parivaars.</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-[13.5px] font-bold text-ink shadow-xs">
                <Star className="h-4 w-4 fill-gold text-gold" /> 4.9 · 40,000+ early waitlist
              </span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["All", "Salaried", "Small Business", "Kids"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold border transition-all ${
                  filter === cat
                    ? "bg-ink text-paper border-ink shadow-xs"
                    : "bg-white border-line text-ink/70 hover:border-ink/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Marquee Carousel with soft edge gradient masks */}
      <Reveal delay={100}>
        <div className="relative mt-8">
          {/* Left/Right Vignettes */}
          <div className="pointer-events-none absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-paper to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-paper to-transparent z-10" />

          <div className="flex gap-4 overflow-x-auto no-scrollbar px-5 md:px-8 pb-3 snap-x animate-marquee-fast w-max hover:[animation-play-state:paused]">
            {[...filtered, ...filtered].map((t, i) => (
              <figure
                key={`${t.name}-${i}`}
                className={`snap-start shrink-0 w-[310px] sm:w-[350px] rounded-[24px] border-2 p-6 text-left card-lift transition-all ${
                  i % 3 === 0
                    ? "bg-white border-line shadow-card"
                    : i % 3 === 1
                    ? "bg-goldsoft/90 border-ink/10 shadow-card"
                    : "bg-ink text-paper border-ink shadow-pop"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Quote className={`h-5 w-5 ${i % 3 === 2 ? "text-[#8FD0A3]" : "text-gold"}`} />
                  {t.verified && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-moss">
                      <ShieldCheck className="h-3.5 w-3.5 text-leaf" /> Verified Member
                    </span>
                  )}
                </div>

                <blockquote
                  className={`mt-3.5 text-[14.5px] leading-relaxed ${
                    i % 3 === 2 ? "text-paper/90" : "text-ink/80"
                  }`}
                >
                  “{t.text}”
                </blockquote>

                <figcaption className="mt-5 pt-3 border-t border-line/50 flex items-center justify-between">
                  <div>
                    <span
                      className={`block text-[14.5px] font-bold ${
                        i % 3 === 2 ? "text-paper" : "text-ink"
                      }`}
                    >
                      {t.name}
                    </span>
                    <span
                      className={`block text-[12px] ${
                        i % 3 === 2 ? "text-paper/60" : "text-moss"
                      }`}
                    >
                      {t.role}
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      i % 3 === 2 ? "bg-paper/15 text-[#8FD0A3]" : "bg-[#EAF5ED] text-leafdark"
                    }`}
                  >
                    {t.tag}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <p className="mt-4 text-center text-[12.5px] text-moss">
          Hover to pause carousel · Real early beta feedback from diverse Indian cities
        </p>
      </Reveal>
    </section>
  );
}
