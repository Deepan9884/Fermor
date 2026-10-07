import { ArrowUpRight } from "lucide-react";
import { posts } from "@/data/mock";
import Reveal from "./Reveal";

export default function Learn() {
  return (
    <section id="learn" className="border-y border-line bg-[#FCFBF8]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-leaf">
                06 — Learn
              </p>
              <h2 className="mt-3 font-display font-semibold tracking-tight text-[32px] md:text-[46px] leading-[1.08]">
                News that impacts your wallet.
              </h2>
            </div>
            <a href="#learn" className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-5 py-2.5 text-[14px] font-semibold hover:border-ink/30">
              View all <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <article className="group h-full rounded-[20px] border border-line bg-white overflow-hidden shadow-card hover:shadow-pop transition-shadow">
                <div className={`h-2 ${i === 0 ? "bg-red-800" : i === 1 ? "bg-leaf" : "bg-gold"}`} />
                <div className="p-6 flex flex-col h-full">
                  <p className="text-[12.5px] font-semibold text-moss">
                    {p.tag} · {p.date} · {p.read}
                  </p>
                  <h3 className="mt-2.5 font-display text-[20px] font-semibold leading-[1.3] group-hover:underline underline-offset-4">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink/65 flex-1">
                    {p.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-leafdark">
                    Read the analysis <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150}>
          <p className="mt-6 text-center text-[13.5px] text-moss">
            Written with sources (PIB, RBI, Business Standard) · 14–21 FAQs per guide · Also in Hindi, Marathi, Telugu, Punjabi
          </p>
        </Reveal>
      </div>
    </section>
  );
}
