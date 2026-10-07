import { X, Check, Eye, HeartHandshake, Languages, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

const principles = [
  {
    icon: Eye,
    no: "01",
    tag: "Transparency",
    title: "Show the math, always",
    body: "Every number carries its formula. No black-box scores, no hidden assumptions. If we can't explain it in one line, we don't ship it.",
  },
  {
    icon: Languages,
    no: "02",
    tag: "Inclusivity",
    title: "English optional",
    body: "Hinglish first, Hindi-Marathi-Tamil-Telugu ready. 'Alpha' becomes 'bazaar se thoda extra'. Your family elder should understand it effortlessly.",
  },
  {
    icon: HeartHandshake,
    no: "03",
    tag: "Fiduciary",
    title: "Advice, not ads",
    body: "Zero commissions behind recommendations. Calculators are free forever without sign-up. We earn only if you opt for advanced portfolio tracking.",
  },
];

export default function Manifesto() {
  return (
    <section id="way" className="mx-auto max-w-[1200px] px-5 md:px-8 pt-16 md:pt-20 pb-6 scroll-mt-28">
      <Reveal variant="up">
        <div className="rounded-[28px] border-2 border-ink bg-cream p-7 md:p-12 relative shadow-card overflow-hidden">
          {/* Top Stamp */}
          <span className="absolute top-0 right-6 md:right-10 -translate-y-1/2 rounded-full bg-ink text-paper px-4 py-1.5 text-[12px] font-bold tracking-widest uppercase rotate-2 shadow-md flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-gold" /> The Fermor Standard
          </span>

          {/* Manifesto Quote */}
          <p className="font-display italic text-[22px] sm:text-[26px] md:text-[30px] text-ink/80 max-w-[850px] leading-snug">
            “Bank apps show you <s className="text-ink/40 decoration-2 decoration-ink/30">what already happened</s>. Brokers push you{" "}
            <s className="text-ink/40 decoration-2 decoration-ink/30">what earns them trading volume</s>. We tell you{" "}
            <span className="text-ink not-italic bg-goldsoft px-2.5 py-0.5 rounded-lg font-semibold inline-block my-1 border border-ink/10">
              what to do next
            </span>{" "}
            — with verifiable math.”
          </p>

          {/* 3 Principles */}
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.no}
                  className="rounded-2xl bg-white border border-line p-6 card-lift relative flex flex-col justify-between group"
                >
                  <span className="font-display font-bold text-[48px] leading-none text-line/60 absolute top-4 right-5 select-none transition-colors group-hover:text-goldsoft">
                    {p.no}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#EAF5ED] text-leafdark">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-[11.5px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-cream text-moss">
                        {p.tag}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-[21px] font-semibold text-ink">{p.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ink/70">{p.body}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contrast Comparison */}
          <div className="mt-8 grid md:grid-cols-2 gap-5 text-[14.5px]">
            <div className="rounded-2xl border border-red-200/80 bg-white/70 p-6 shadow-xs">
              <p className="font-bold text-red-800 uppercase tracking-widest text-[12px] flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-600" /> Typical money apps & brokers
              </p>
              <ul className="mt-4 space-y-3 text-ink/75">
                {[
                  "14 push notifications daily: 'F&O expiry today! Buy call option!'",
                  "SIP return shown as confusing CAGR without total money deposited",
                  "Automated support bot that points you to 40-page PDFs",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-red-100 text-red-700 shrink-0 mt-0.5">
                      <X className="h-3 w-3" />
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-ink text-paper p-6 relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 h-32 w-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <p className="font-bold text-[#8FD0A3] uppercase tracking-widest text-[12px] flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> The Fermor Way
              </p>
              <ul className="mt-4 space-y-3 text-paper/90">
                {[
                  "One calm weekly digest: '3 financial tasks that need your attention'",
                  "Every return breaks down invested rupee vs growth + exact formula",
                  "Ask questions in Hinglish or plain English; instant answer in 5 seconds",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-950 text-emerald-400 shrink-0 mt-0.5 border border-emerald-800">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
