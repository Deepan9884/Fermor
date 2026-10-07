import { X, Check, Eye, HeartHandshake, Languages } from "lucide-react";
import Reveal from "./Reveal";

const principles = [
  {
    icon: Eye,
    no: "01",
    title: "Show the math, always",
    body: "Every number carries its formula. No black-box scores, no hidden assumptions. If we can't explain it in one line, we don't ship it.",
  },
  {
    icon: Languages,
    no: "02",
    title: "English optional",
    body: "Hinglish first, Hindi-Marathi-Telugu ready. 'Alpha' becomes 'bazaar se thoda extra'. Your dadi should get it too.",
  },
  {
    icon: HeartHandshake,
    no: "03",
    title: "Advice, not ads",
    body: "No commissions behind recommendations. Calculators are free forever — we earn only if you choose Pro tracking.",
  },
];

export default function Manifesto() {
  return (
    <section id="way" className="mx-auto max-w-[1200px] px-5 md:px-8 pt-12 md:pt-16 pb-4 scroll-mt-28">
      <Reveal variant="up">
        <div className="pt-5">
        <div className="rounded-[28px] border-2 border-ink bg-cream p-7 md:p-12 relative">
          <span className="absolute top-0 right-8 -translate-y-1/2 rounded-full bg-ink text-paper px-4 py-1.5 text-[12px] font-bold tracking-widest rotate-2 shadow-card">
            THE FERMOR WAY ✦
          </span>
          <p className="font-display italic text-[20px] md:text-[24px] text-ink/70 max-w-[760px] leading-snug">
            “Bank apps show you <s className="text-ink/40 decoration-2 decoration-ink/30">what happened</s>. Brokers push you{" "}
            <s className="text-ink/40 decoration-2 decoration-ink/30">what earns them commission</s>. We tell you{" "}
            <b className="text-ink not-italic bg-goldsoft px-2 rounded">what to do next</b> — with proof.”
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {principles.map((p) => (
              <div key={p.no} className="rounded-2xl bg-white border border-line p-6 card-lift relative">
                <span className="font-display font-bold text-[44px] leading-none text-line absolute top-4 right-5 select-none">
                  {p.no}
                </span>
                <p.icon className="h-6 w-6 text-leaf" />
                <h3 className="mt-3 font-display text-[20px] font-semibold">{p.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-ink/65">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4 text-[14.5px]">
            <div className="rounded-2xl border border-ink/10 bg-white/60 p-6">
              <p className="font-bold text-moss uppercase tracking-widest text-[12px]">Typical money app</p>
              <ul className="mt-3 space-y-2.5 text-ink/60">
                {["12 notifications a day: 'Nifty up! Buy now!'", "SIP return shown without invested amount", "Support that replies in 6 days"].map((t) => (
                  <li key={t} className="flex gap-2.5"><X className="h-4 w-4 mt-1 shrink-0 text-red-700" /> {t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-ink text-paper p-6 relative overflow-hidden">
              <p className="font-bold text-[#8FD0A3] uppercase tracking-widest text-[12px]">Fermor instead</p>
              <ul className="mt-3 space-y-2.5">
                {["One calm digest: '3 things need you today'", "Every return shows invested vs gains + formula", "Ask in Hinglish, answer in 10 seconds"].map((t) => (
                  <li key={t} className="flex gap-2.5"><Check className="h-4 w-4 mt-1 shrink-0 text-[#8FD0A3]" /> {t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        </div>
      </Reveal>
    </section>
  );
}
