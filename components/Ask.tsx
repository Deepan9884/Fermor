"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Bot, User } from "lucide-react";
import Reveal from "./Reveal";

const canned: Record<string, string> = {
  performance:
    "Your portfolio is up 14.2% this year (₹6.6L gains on ₹46.4L invested). Large-cap funds did the heavy lifting at +16.8%. SBI (+0.82% today) helped; Maruti (−1.06%) dragged. You beat Nifty's +11.9% — mostly because your SIPs stayed regular in the June dip.",
  spending:
    "September: ₹48,320 total, down 12% vs August. Food ₹12,480 (26%) is the only head over budget. Transport fell ₹1,900 after you switched to metro. At this pace you free ₹6,200/month — enough to raise your Nifty index SIP from ₹10k to ₹16k.",
  save: "Three moves worth ₹9,400/month: 1) Move idle ₹1.8L savings (3.5%) to a liquid fund (~7%). 2) Prepay ₹50k of your 9.2% personal loan — saves ₹18k interest. 3) Shift Food overspend to home cooking twice a week. Want me to model it?",
  default:
    "Good question. Based on your connected accounts: net worth ₹53L, monthly surplus ~₹21k, emergency fund 80% done. Tell me the goal — save tax, buy a home, retire early — and I'll run the numbers in plain English with a next step.",
};

function answerFor(q: string) {
  const s = q.toLowerCase();
  if (s.includes("perform") || s.includes("invest") || s.includes("return"))
    return canned.performance;
  if (s.includes("spend") || s.includes("money going") || s.includes("where"))
    return canned.spending;
  if (s.includes("save") || s.includes("more") || s.includes("cut"))
    return canned.save;
  return canned.default;
}

export default function Ask() {
  const [msgs, setMsgs] = useState<Array<{ role: "bot" | "user"; text: string }>>([
    { role: "bot" as const, text: "Namaste! I'm Fermor Ask. Ask me anything about your money — I'll answer with your numbers, not gyaan." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setMsgs((m) => [...m, { role: "user" as const, text: q }]);
    setInput("");
    const full = answerFor(q);
    setTyping("");
    let i = 0;
    const t = setInterval(() => {
      i += 3;
      setTyping(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(t);
        setMsgs((m) => [...m, { role: "bot" as const, text: full }]);
        setTyping("");
      }
    }, 18);
  };

  return (
    <section id="ask" className="border-y border-line bg-[#F3EFE7]/60">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
        <Reveal>
          <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-leaf">
            02 — Ask anything
          </p>
          <h2 className="mt-3 font-display font-semibold tracking-tight text-[32px] md:text-[46px] leading-[1.08]">
            Answers grounded in your data. In seconds.
          </h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-ink/65 max-w-[480px]">
            No 40-minute videos. No “do your own research”. Ask like you’d ask a
            smart friend — get a clear answer with the math shown.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["How are my investments performing?", "Where is my money going?", "How can I save more?"].map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-ink/15 bg-white px-4 py-2 text-[13.5px] font-medium hover:border-ink/40 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
          <p className="mt-5 text-[13px] text-moss">
            Try it → type your own question in the chat. Works offline in this demo.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-[20px] border border-line bg-white shadow-pop overflow-hidden">
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-paper">
                <Bot className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-[14.5px] font-semibold leading-none">Fermor Ask</p>
                <p className="mt-1 flex items-center gap-1.5 text-[12.5px] text-leafdark">
                  <span className="h-1.5 w-1.5 rounded-full bg-leaf" /> Connected to 6 accounts
                </p>
              </div>
            </div>
            <div ref={boxRef} className="h-[320px] overflow-y-auto px-5 py-5 space-y-4 bg-[#FCFBF8]">
              {msgs.map((m, i) => (
                <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : ""}`}>
                  {m.role === "bot" && (
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#EAF5ED]">
                      <Bot className="h-3.5 w-3.5 text-leafdark" />
                    </span>
                  )}
                  <p
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-[14px] leading-[1.6] ${
                      m.role === "user"
                        ? "bg-ink text-paper rounded-br-md"
                        : "bg-white border border-line rounded-bl-md shadow-card"
                    }`}
                  >
                    {m.text}
                  </p>
                  {m.role === "user" && (
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cream">
                      <User className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#EAF5ED]">
                    <Bot className="h-3.5 w-3.5 text-leafdark" />
                  </span>
                  <p className="max-w-[82%] rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3 text-[14px] leading-[1.6] caret">
                    {typing}
                  </p>
                </div>
              )}
            </div>
            <form
              className="flex gap-2 border-t border-line p-3"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask: Should I prepay my loan or invest?"
                className="flex-1 rounded-full border border-line bg-[#FCFBF8] px-4 py-2.5 text-[14px] outline-none focus:border-leaf"
              />
              <button
                type="submit"
                className="grid h-10 w-10 place-items-center rounded-full bg-leaf text-white hover:bg-leafdark transition-colors"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
