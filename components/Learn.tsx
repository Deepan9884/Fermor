"use client";

import { useState } from "react";
import { ArrowUpRight, BookOpen, Clock, Tag, Share2, Check, Sparkles } from "lucide-react";
import { posts } from "@/data/mock";
import Reveal from "./Reveal";

export default function Learn() {
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  return (
    <section id="learn" className="border-y border-line bg-[#FCFBF8] scroll-mt-20">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-leaf">
                06 — Learn & Literacy
              </p>
              <h2 className="mt-3 font-display font-semibold tracking-tight text-[32px] sm:text-[40px] md:text-[46px] leading-[1.08] text-ink">
                News that impacts your wallet.
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-[13px] font-semibold text-moss">
              <BookOpen className="h-4 w-4 text-leaf" /> Sourced from RBI, SEBI, & Ministry of Finance
            </span>
          </div>
        </Reveal>

        {/* 3 Editorial Cards */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <article
                onClick={() => setSelectedArticle(selectedArticle === i ? null : i)}
                className={`group h-full rounded-[24px] border bg-white overflow-hidden shadow-card hover:shadow-pop transition-all cursor-pointer flex flex-col justify-between ${
                  selectedArticle === i ? "border-ink ring-2 ring-ink/10" : "border-line"
                }`}
              >
                <div>
                  <div
                    className={`h-2.5 ${
                      i === 0 ? "bg-red-700" : i === 1 ? "bg-leaf" : "bg-gold"
                    }`}
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between text-[12px] font-semibold text-moss mb-3">
                      <span className="bg-cream px-2 py-0.5 rounded text-ink font-bold">
                        {p.tag}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {p.read}
                      </span>
                    </div>

                    <h3 className="font-display text-[20px] font-semibold leading-[1.3] text-ink group-hover:text-leafdark transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-ink/75">
                      {p.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-line/40 mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[13.5px] font-bold text-leafdark">
                    {selectedArticle === i ? "Collapse summary ↑" : "Read key insight →"}
                  </span>
                  <span className="text-[12px] text-moss">{p.date}</span>
                </div>

                {/* Expanded takeaway */}
                {selectedArticle === i && (
                  <div className="px-6 pb-6 pt-2 bg-[#FAF8F5] border-t border-line text-[13px] text-ink/80 leading-relaxed animate-in fade-in duration-200">
                    <div className="flex items-center gap-1.5 font-bold text-ink mb-1">
                      <Sparkles className="h-3.5 w-3.5 text-gold" /> Key Takeaway for Retail Portfolios:
                    </div>
                    <p>
                      Automated rupee-cost averaging significantly outperforms market-timing attempts over 5-year rolling windows. Never halt a core equity SIP during negative market headlines.
                    </p>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-8 pt-6 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[13px] text-moss">
            <span>
              All guides written with verifiable sources (PIB, RBI Circulars, Income Tax Portal) · 100% ad-free
            </span>
            <span className="font-semibold text-ink">
              Available in: हिन्दी · मराठी · தமிழ் · తెలుగు · English
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
