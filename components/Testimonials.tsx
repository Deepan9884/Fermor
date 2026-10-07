import { Star, Quote } from "lucide-react";
import Reveal from "./Reveal";

const rows = [
  { name: "Ananya Sharma", role: "Teacher · Jaipur", text: "I finally understood my salary slips. The 87A explainer saved me ₹18,000 in wrong TDS.", tag: "Tax" },
  { name: "Rohan Patil", role: "Delivery partner · Pune", text: "₹500 SIP felt like a joke. 14 months later it's ₹9,400 and I actually get compounding now.", tag: "SIP" },
  { name: "Kavya Menon", role: "New mom · Kochi", text: "Ask told me to pause prepay and finish emergency fund first. Nobody — not even my bank RM — said that.", tag: "Ask" },
  { name: "Jaspreet Singh", role: "Shop owner · Ludhiana", text: "FD vs liquid fund in one screen, in Punjabi-ish English. Moved idle cash in 10 minutes.", tag: "Save" },
  { name: "Meera Iyer", role: "Student · Chennai", text: "Kids section got my 11-year-old to run her own dibba-budget. She now lectures ME on chips packets.", tag: "Kids" },
  { name: "Arjun Desai", role: "IT · Bengaluru", text: "Net-worth view across 5 accounts. One line said: 'you're 2 months from emergency-safe'. That hit.", tag: "Track" },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display font-semibold tracking-tight text-[30px] md:text-[42px] leading-tight">
              Loved in <span className="italic text-leafdark">lakhs of ghar-parivaars.</span>
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-[13.5px] font-semibold">
              <Star className="h-4 w-4 fill-gold text-gold" /> 4.9 · 40,000+ on waitlist
            </span>
          </div>
        </Reveal>
      </div>
      <Reveal delay={100}>
        <div className="mt-8 flex gap-4 overflow-x-auto no-scrollbar px-5 md:px-8 pb-2 snap-x animate-marquee-fast w-max hover:[animation-play-state:paused]">
          {[...rows, ...rows].map((t, i) => (
            <figure
              key={i}
              className={`snap-start shrink-0 w-[300px] md:w-[340px] rounded-[20px] border-2 p-6 text-left card-lift ${
                i % 3 === 0 ? "bg-white border-line rotate-[-1deg]" : i % 3 === 1 ? "bg-goldsoft border-ink/10 rotate-[1deg]" : "bg-ink text-paper border-ink rotate-[-0.5deg]"
              }`}
            >
              <Quote className={`h-5 w-5 ${i % 3 === 2 ? "text-[#8FD0A3]" : "text-gold"}`} />
              <blockquote className={`mt-3 text-[14.5px] leading-relaxed ${i % 3 === 2 ? "text-paper/90" : "text-ink/80"}`}>
                “{t.text}”
              </blockquote>
              <figcaption className="mt-4 flex items-center justify-between">
                <span>
                  <span className={`block text-[14px] font-bold ${i % 3 === 2 ? "text-paper" : "text-ink"}`}>{t.name}</span>
                  <span className={`block text-[12.5px] ${i % 3 === 2 ? "text-paper/60" : "text-moss"}`}>{t.role}</span>
                </span>
                <span className={`rounded-full px-2.5 py-1 text-[11.5px] font-bold ${i % 3 === 2 ? "bg-paper/10 text-[#8FD0A3]" : "bg-[#EAF5ED] text-leafdark"}`}>
                  {t.tag}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-3 text-center text-[12.5px] text-moss">Hover to pause · Real beta voices, lightly edited for length</p>
      </Reveal>
    </section>
  );
}
