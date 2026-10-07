"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Bot, User, Sparkles, CheckCheck, Copy, ShieldCheck, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

interface ChatMessage {
  role: "bot" | "user";
  text: string;
  tag?: string;
  stats?: Array<{ label: string; val: string }>;
  actionStep?: string;
}

const detailedKnowledge: Record<string, ChatMessage> = {
  performance: {
    role: "bot",
    text: "Your portfolio is up +14.2% this year (+₹6.64L net gain on ₹46.4L invested). Large-cap index funds did the heavy lifting (+16.8%). SBI (+0.82% today) provided solid banking tailwinds. You outpaced Nifty's +11.9% return primarily because your automated SIP remained active throughout the June volatility.",
    tag: "Portfolio Audit",
    stats: [
      { label: "Total Invested", val: "₹46.40 Lakhs" },
      { label: "Current Value", val: "₹53.04 Lakhs" },
      { label: "Net Profit", val: "+₹6.64 Lakhs (+14.2%)" },
      { label: "Alpha vs Nifty", val: "+2.3% excess return" },
    ],
    actionStep: "Keep the 17th SIP active. Rebalance small-cap allocation once it crosses 25% threshold.",
  },
  spending: {
    role: "bot",
    text: "In September, your total outflow was ₹48,320 (down 12% vs August). Food & dining at ₹12,480 (26%) is your only category running over budget by ~₹2,100. Transport spending dropped by ₹1,900 after adopting the metro pass. At this run rate, you free ₹6,200 monthly — precisely enough to scale your index SIP from ₹10k to ₹16k.",
    tag: "Cashflow Intelligence",
    stats: [
      { label: "September Outflow", val: "₹48,320" },
      { label: "Change vs Aug", val: "−12% (Saved ₹6.5k)" },
      { label: "Top Discretionary", val: "Food & Dining (26%)" },
      { label: "Available Surplus", val: "₹21,680 / month" },
    ],
    actionStep: "Set an instant alert on food delivery orders exceeding ₹600 to lock in ₹2,400 monthly savings.",
  },
  save: {
    role: "bot",
    text: "Here are 3 mathematically verified moves that unlock ₹9,400/month immediately:\n1. Sweep idle ₹1.8L from your 3.2% savings account to an overnight/liquid fund (~7.05% yield) → earns ₹6,930/yr extra.\n2. Prepay ₹50,000 toward your 9.2% personal loan principal → cuts ₹18,400 in interest.\n3. Swap 2 weekly food deliveries for home dining → preserves ₹2,200/month for your emergency safety fund.",
    tag: "Optimization Playbook",
    stats: [
      { label: "Idle Cash Potential", val: "+₹6,930 / year" },
      { label: "Debt Interest Saved", val: "₹18,400" },
      { label: "Annual Wealth Lift", val: "+₹1,12,800" },
    ],
    actionStep: "Initiate an automated ₹50,000 prepayment before your next EMI billing cycle.",
  },
  ppf: {
    role: "bot",
    text: "PPF (7.1% EEE tax-free) vs Equity SIP (~12% historic return):\n• PPF offers zero risk, guaranteed return, and Section 80C rebate, but locks capital for 15 years.\n• Equity SIP easily beats inflation over 10+ years (₹10k/mo over 15Y becomes ~₹50L in equity vs ~₹31L in PPF).\nVerdict: Maintain ₹500/yr in PPF to keep the account active, and channel the core wealth growth into diversified equity index funds.",
    tag: "Asset Allocation",
    stats: [
      { label: "PPF 15Y (₹10k/mo)", val: "₹31.5 Lakhs (Safe)" },
      { label: "Equity SIP 15Y", val: "₹50.4 Lakhs (Growth)" },
      { label: "Compounding Delta", val: "+₹18.9 Lakhs in Equity" },
    ],
    actionStep: "Put ₹50,000 in PPF for baseline security, deploy remaining surplus in low-cost Nifty 50 Index.",
  },
  tax: {
    role: "bot",
    text: "Under the FY 2024–25 New Tax Regime (Budget 2024 update):\n• Salaried employees receive an enhanced standard deduction of ₹75,000.\n• With Section 87A rebate, gross salary up to ₹7,75,000 pays EXACTLY ZERO TAX.\n• For an income of ₹12,00,000, your total tax payable is ₹83,200 (effective rate of only 6.9%).",
    tag: "Budget 2024 Rules",
    stats: [
      { label: "Standard Deduction", val: "₹75,000 (Salaried)" },
      { label: "Zero-Tax Threshold", val: "₹7.75 Lakhs gross" },
      { label: "Tax on ₹12L Salary", val: "₹83,200 (6.9%)" },
      { label: "Net Take-Home", val: "₹11,16,800" },
    ],
    actionStep: "No need to lock money in inefficient ELSS lock-ins if New Regime gives lower tax without paperwork.",
  },
  default: {
    role: "bot",
    text: "Good question. Grounded in your financial snapshot: Net worth ₹53.4 Lakhs, monthly surplus ₹21,680, emergency reserve 80% funded. What's your immediate milestone — reduce tax, prepay home loan, or plan an early retirement SIP? I'll run the equations with full transparency.",
    tag: "Advisory Core",
  },
};

function answerFor(query: string): ChatMessage {
  const s = query.toLowerCase();
  if (s.includes("perform") || s.includes("invest") || s.includes("return") || s.includes("portfolio"))
    return detailedKnowledge.performance;
  if (s.includes("spend") || s.includes("money going") || s.includes("where") || s.includes("expense"))
    return detailedKnowledge.spending;
  if (s.includes("save") || s.includes("cut") || s.includes("more"))
    return detailedKnowledge.save;
  if (s.includes("ppf") || s.includes("fd") || s.includes("safe"))
    return detailedKnowledge.ppf;
  if (s.includes("tax") || s.includes("87a") || s.includes("regime") || s.includes("salary"))
    return detailedKnowledge.tax;
  return detailedKnowledge.default;
}

export default function Ask() {
  const [msgs, setMsgs] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Namaste! I'm Fermor Ask. Inquire about your spending, investments, tax, or loan prepayments — I calculate with your real numbers, never vague gyaan.",
      tag: "Advisor Live",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on updates
  useEffect(() => {
    boxRef.current?.scrollTo({ top: 99999, behavior: "smooth" });
  }, [msgs, typing]);

  // Listen for custom trigger from Understand section
  useEffect(() => {
    const handleAskEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        send(customEvent.detail);
      }
    };
    window.addEventListener("fermor:ask", handleAskEvent);
    return () => window.removeEventListener("fermor:ask", handleAskEvent);
  }, []);

  const send = (text: string) => {
    const q = text.trim();
    if (!q || typing) return;
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setInput("");

    const answerObj = answerFor(q);
    setTyping("");
    let i = 0;
    const fullText = answerObj.text;

    const t = setInterval(() => {
      i += 4;
      setTyping(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(t);
        setMsgs((m) => [...m, answerObj]);
        setTyping("");
      }
    }, 16);
  };

  const copyText = (text: string, idx: number) => {
    navigator.clipboard?.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <section id="ask" className="border-y border-line bg-[#F3EFE7]/70 scroll-mt-20">
      <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-16 md:py-24 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-center">
        {/* Left Column: Heading & Quick Prompts */}
        <Reveal>
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold tracking-[0.12em] uppercase text-leaf">
              02 — Ask anything
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#EAF5ED] text-leafdark px-2.5 py-0.5 text-[11.5px] font-bold">
              <ShieldCheck className="h-3.5 w-3.5" /> Private & Verified
            </span>
          </div>
          <h2 className="mt-3 font-display font-semibold tracking-tight text-[32px] sm:text-[40px] md:text-[46px] leading-[1.08] text-ink">
            Answers grounded in your data. In seconds.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-ink/75 max-w-[480px]">
            No 45-minute YouTube explainers. No generic “DYOR”. Ask like you’re consulting
            a sharp financial advisor who already knows your balance sheet.
          </p>

          <p className="mt-6 text-[12.5px] font-bold uppercase tracking-wider text-moss">
            Sample questions to test:
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {[
              "How are my investments performing?",
              "Where is my money going?",
              "How can I save more?",
              "PPF vs SIP: which is better?",
              "87A tax rebate for my salary",
            ].map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-ink/15 bg-white/90 px-3.5 py-1.5 text-[13px] font-medium text-ink hover:border-ink hover:bg-white transition-all shadow-xs active:scale-98"
              >
                {q}
              </button>
            ))}
          </div>

          <p className="mt-5 text-[12.5px] text-moss flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-leaf" /> Fully responsive client-side AI mock engine with genuine financial logic.
          </p>
        </Reveal>

        {/* Right Column: Chat Window UI */}
        <Reveal delay={120}>
          <div className="rounded-[24px] border-2 border-ink/10 bg-white shadow-pop overflow-hidden flex flex-col h-[520px]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-5 py-4 bg-paper/60 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-paper shadow-xs">
                  <Bot className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[15px] font-bold text-ink leading-none">Fermor Ask</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[12px] text-leafdark font-medium">
                    <span className="h-2 w-2 rounded-full bg-leaf animate-pulse" /> Connected to 6 accounts (HDFC, Zerodha, Groww, EPF)
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-cream text-moss border border-line">
                Offline Verified
              </span>
            </div>

            {/* Message Stream */}
            <div ref={boxRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-4 bg-[#FCFBF8]">
              {msgs.map((m, idx) => (
                <div key={idx} className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "bot" && (
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#EAF5ED]">
                      <Bot className="h-3.5 w-3.5 text-leafdark" />
                    </span>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-[14px] leading-[1.65] relative group ${
                      m.role === "user"
                        ? "bg-ink text-paper rounded-br-xs shadow-xs"
                        : "bg-white border border-line rounded-bl-xs shadow-card text-ink"
                    }`}
                  >
                    {m.tag && (
                      <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-line/60">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-leafdark bg-[#EAF5ED] px-2 py-0.5 rounded">
                          {m.tag}
                        </span>
                        <button
                          onClick={() => copyText(m.text, idx)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-moss hover:text-ink text-[11px] flex items-center gap-1"
                          title="Copy answer"
                        >
                          {copiedIdx === idx ? <CheckCheck className="h-3 w-3 text-leaf" /> : <Copy className="h-3 w-3" />}
                          {copiedIdx === idx ? "Copied" : "Copy"}
                        </button>
                      </div>
                    )}

                    <p className="whitespace-pre-line">{m.text}</p>

                    {/* Rich Stat Matrix */}
                    {m.stats && (
                      <div className="mt-3.5 grid grid-cols-2 gap-2 pt-2 border-t border-line/70">
                        {m.stats.map((st) => (
                          <div key={st.label} className="bg-cream/60 rounded-xl p-2 border border-line/50">
                            <span className="block text-[11px] text-moss">{st.label}</span>
                            <span className="block text-[13px] font-bold text-ink">{st.val}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Step */}
                    {m.actionStep && (
                      <div className="mt-3 bg-[#FAF8F5] rounded-xl p-2.5 border border-leaf/30 flex items-start gap-2 text-[12.5px] text-ink/80">
                        <ArrowRight className="h-3.5 w-3.5 text-leaf shrink-0 mt-0.5" />
                        <span><b className="text-leafdark">Next Step:</b> {m.actionStep}</span>
                      </div>
                    )}
                  </div>
                  {m.role === "user" && (
                    <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cream text-ink">
                      <User className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              ))}

              {/* Streaming typing animation */}
              {typing && (
                <div className="flex gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#EAF5ED]">
                    <Bot className="h-3.5 w-3.5 text-leafdark" />
                  </span>
                  <div className="max-w-[85%] rounded-2xl rounded-bl-xs border border-line bg-white p-4 text-[14px] leading-[1.65] text-ink caret shadow-xs">
                    <p className="whitespace-pre-line">{typing}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form
              className="flex gap-2 border-t border-line p-3 bg-white"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask: 'Should I prepay loan or invest in SIP?'"
                className="flex-1 rounded-full border border-line bg-[#FCFBF8] px-4 py-2.5 text-[14px] outline-none focus:border-leaf focus:bg-white transition-colors text-ink placeholder:text-ink/40"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="grid h-10 w-10 place-items-center rounded-full bg-ink text-paper hover:bg-pine disabled:opacity-40 disabled:hover:bg-ink transition-colors shadow-xs"
                aria-label="Send message"
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
