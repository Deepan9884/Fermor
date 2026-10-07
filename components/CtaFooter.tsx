import { ArrowRight, Smartphone, QrCode, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

export default function CtaFooter() {
  return (
    <>
      <section id="cta" className="mx-auto max-w-[1200px] px-5 md:px-8 pb-16 md:pb-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-pine text-paper px-7 py-12 md:p-14 shadow-pop border-2 border-ink">
            <div className="absolute inset-0 opacity-[0.13]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <div className="absolute -right-8 -bottom-10 font-display font-bold text-[180px] leading-none text-paper/[0.06] select-none hidden md:block">
              100
            </div>
            <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
              <div className="text-center lg:text-left">
                <p className="inline-flex items-center gap-1.5 rounded-full bg-paper/10 border border-paper/15 px-4 py-1.5 text-[12.5px] font-bold tracking-widest uppercase text-[#8FD0A3]">
                  <Sparkles className="h-3.5 w-3.5" /> Free · 3 minutes · No card
                </p>
                <h2 className="mt-4 font-display font-semibold tracking-tight text-[36px] md:text-[54px] leading-[1.02]">
                  What’s your money score <span className="italic text-[#8FD0A3]">out of 100?</span>
                </h2>
                <p className="mt-4 max-w-[480px] mx-auto lg:mx-0 text-[16px] leading-relaxed text-paper/70">
                  Emergency fund, insurance, debt, investing — graded in plain words,
                  plus the 3 moves that lift your score fastest.
                </p>
                <div className="mt-7 flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
                  <a href="#top" className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-paper px-8 py-4 text-[15px] font-bold text-ink hover:bg-white">
                    Reveal my score <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#calculators" className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/25 px-8 py-4 text-[15px] font-semibold hover:border-paper/60">
                    <Smartphone className="h-4 w-4" /> Get the app
                  </a>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[300px] rounded-3xl bg-paper text-ink p-6 rotate-2 card-lift">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-bold tracking-widest uppercase text-moss">Sample report</p>
                  <span className="rounded-full bg-[#EAF5ED] px-2.5 py-1 text-[12px] font-bold text-leafdark">72 / 100</span>
                </div>
                <div className="mt-4 space-y-2.5 text-[13px] font-medium">
                  {[["Emergency safety", 80, "#15803D"], ["Debt load", 65, "#C08A2C"], ["Investing habit", 74, "#15803D"], ["Insurance cover", 45, "#B91C1C"]].map(([l, v, c]) => (
                    <div key={l as string}>
                      <div className="flex justify-between mb-1"><span>{l}</span><b>{v}</b></div>
                      <div className="h-2 rounded-full bg-cream overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${v}%`, background: c as string }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-dashed border-line p-3">
                  <QrCode className="h-10 w-10 shrink-0" />
                  <p className="text-[12.5px] leading-snug text-ink/70">Scan to start on phone — <b className="text-ink">waitlist skips the queue</b></p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="border-t-2 border-ink/10 bg-white overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8 pt-12">
          <div className="grid md:grid-cols-[1.1fr_2fr] gap-10">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-paper font-display font-bold text-xl rotate-[-3deg]">F</span>
                <span>
                  <span className="block font-display font-semibold text-[20px] leading-none">Fermor</span>
                  <span className="block text-[11px] font-bold tracking-[0.14em] text-moss mt-1">हर रुपया, साफ़</span>
                </span>
              </div>
              <p className="mt-4 max-w-[300px] text-[14.5px] leading-relaxed text-ink/65">
                A bahi-khata for the internet age. Understand, act and grow — in words your family gets.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-[14px]">
              {(
                [
                  ["Products", ["Market", "Portfolio", "Ask ✦", "Plan", "For Kids"]],
                  ["Tools", ["SIP calculator", "EMI calculator", "FD calculator", "Income tax", "Retirement"]],
                  ["Learn", ["Blogs", "Tax guides", "UPI explainers", "Market news"]],
                  ["Company", ["About", "Careers", "Contact", "Privacy"]],
                ] as Array<[string, string[]]>
              ).map(([h, items]) => (
                <div key={h}>
                  <p className="font-bold text-[12px] uppercase tracking-[0.1em] text-moss">{h}</p>
                  <ul className="mt-3 space-y-2.5">
                    {items.map((it) => (
                      <li key={it}><a href="#top" className="hover:underline underline-offset-4 text-ink/75 font-medium">{it}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 select-none text-center font-display font-bold tracking-tight leading-none text-[19vw] md:text-[150px] text-ink/[0.07]">
            FERMOR
          </div>
        </div>
        <div className="border-t border-line bg-paper">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-5 flex flex-col sm:flex-row justify-between gap-2 text-[12.5px] text-moss">
            <span>© 2026 Fermor · Education only, not financial advice. Mutual funds ride market risks — read all documents.</span>
            <span>Crafted with ledger-ink & turmeric · Next.js + Tailwind</span>
          </div>
        </div>
      </footer>
    </>
  );
}
