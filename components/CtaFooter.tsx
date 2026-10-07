"use client";

import { useState } from "react";
import { ArrowRight, Smartphone, QrCode, Sparkles, CheckCircle2, Shield, Heart, IndianRupee } from "lucide-react";
import Reveal from "./Reveal";

export default function CtaFooter() {
  // Interactive Money Score Simulator
  const [emergencyMonths, setEmergencyMonths] = useState(4);
  const [debtRatio, setDebtRatio] = useState(15);
  const [investRate, setInvestRate] = useState(20);
  const [hasInsurance, setHasInsurance] = useState(true);

  // Waitlist email form
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Compute live money score out of 100
  const scoreEmergency = Math.min(30, (emergencyMonths / 6) * 30);
  const scoreDebt = Math.max(0, 25 - (debtRatio / 50) * 25);
  const scoreInvest = Math.min(25, (investRate / 30) * 25);
  const scoreInsurance = hasInsurance ? 20 : 5;
  const totalScore = Math.round(scoreEmergency + scoreDebt + scoreInvest + scoreInsurance);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <section id="cta" className="mx-auto max-w-[1200px] px-5 md:px-8 pb-16 md:pb-24 scroll-mt-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-pine text-paper p-7 sm:p-10 md:p-14 shadow-pop border-2 border-ink">
            {/* Background texture & watermark */}
            <div
              className="absolute inset-0 opacity-[0.14] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="absolute -right-8 -bottom-10 font-display font-bold text-[200px] leading-none text-paper/[0.04] select-none hidden md:block">
              {totalScore}
            </div>

            <div className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
              {/* Left Column: Headline and Waitlist Input */}
              <div className="text-center lg:text-left">
                <p className="inline-flex items-center gap-1.5 rounded-full bg-paper/10 border border-paper/15 px-4 py-1.5 text-[12px] font-bold tracking-widest uppercase text-[#8FD0A3]">
                  <Sparkles className="h-3.5 w-3.5" /> Free Self-Diagnostic · 2 Minutes
                </p>
                <h2 className="mt-4 font-display font-semibold tracking-tight text-[36px] sm:text-[46px] md:text-[54px] leading-[1.02] text-paper">
                  What’s your money score <span className="italic text-[#8FD0A3]">out of 100?</span>
                </h2>
                <p className="mt-4 max-w-[480px] mx-auto lg:mx-0 text-[16px] leading-relaxed text-paper/75">
                  Emergency reserves, debt load, investing consistency, insurance shelter —
                  graded objectively with the top 3 mathematical moves to increase your score.
                </p>

                {/* Email Waitlist Form */}
                <div className="mt-8 max-w-[460px] mx-auto lg:mx-0">
                  {submitted ? (
                    <div className="rounded-2xl bg-paper/15 border border-[#8FD0A3]/50 p-4 text-paper flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-[#8FD0A3] shrink-0" />
                      <div className="text-left">
                        <p className="font-bold text-[15px]">You&apos;re on the priority waitlist!</p>
                        <p className="text-[12.5px] text-paper/70">
                          We&apos;ve reserved invite #41,208 for <b className="text-white">{email}</b>. Early access rollouts begin this month.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="flex-1 rounded-full px-5 py-3.5 text-[14.5px] text-ink bg-white outline-none placeholder:text-ink/40 shadow-sm"
                      />
                      <button
                        type="submit"
                        className="btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-[#8FD0A3] px-7 py-3.5 text-[14.5px] font-bold text-ink hover:bg-emerald-300 transition-colors shadow-sm shrink-0"
                      >
                        Join Waitlist <ArrowRight className="h-4 w-4" />
                      </button>
                    </form>
                  )}
                  <p className="mt-3 text-[12px] text-paper/60 flex items-center justify-center lg:justify-start gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-[#8FD0A3]" /> No spam ever. One-click unsubscribe.
                  </p>
                </div>
              </div>

              {/* Right Column: Live Interactive Score Card */}
              <div className="mx-auto w-full max-w-[340px] rounded-[28px] bg-paper text-ink p-6 shadow-2xl border-2 border-paper/20">
                <div className="flex items-center justify-between pb-3 border-b border-line">
                  <div>
                    <p className="text-[11px] font-bold tracking-widest uppercase text-moss">Live Scorecard</p>
                    <p className="text-[13px] font-bold text-ink">Your Diagnostic Rating</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-[15px] font-bold font-mono ${
                      totalScore >= 75
                        ? "bg-[#EAF5ED] text-leafdark"
                        : totalScore >= 50
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {totalScore} / 100
                  </span>
                </div>

                {/* Micro Sliders */}
                <div className="mt-4 space-y-3.5 text-[12.5px]">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-ink">Emergency Reserve</span>
                      <b className="font-mono text-moss">{emergencyMonths} months</b>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={12}
                      value={emergencyMonths}
                      onChange={(e) => setEmergencyMonths(+e.target.value)}
                      className="w-full accent-leaf"
                      aria-label="Emergency months"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-ink">Debt EMI to Income</span>
                      <b className="font-mono text-moss">{debtRatio}%</b>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={60}
                      value={debtRatio}
                      onChange={(e) => setDebtRatio(+e.target.value)}
                      className="w-full accent-gold"
                      aria-label="Debt percentage"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold text-ink">Monthly Investment</span>
                      <b className="font-mono text-moss">{investRate}% of pay</b>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={50}
                      value={investRate}
                      onChange={(e) => setInvestRate(+e.target.value)}
                      className="w-full accent-leaf"
                      aria-label="Investment rate"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-semibold text-ink">Term & Health Insurance</span>
                    <button
                      type="button"
                      onClick={() => setHasInsurance(!hasInsurance)}
                      className={`px-3 py-1 rounded-full text-[11.5px] font-bold border transition-colors ${
                        hasInsurance ? "bg-leaf text-white border-leaf" : "bg-cream text-moss border-line"
                      }`}
                    >
                      {hasInsurance ? "✓ Active" : "Missing"}
                    </button>
                  </div>
                </div>

                {/* Dynamic verdict note */}
                <div className="mt-4 pt-3 border-t border-line text-[12px] text-ink/80 bg-cream/70 rounded-xl p-3">
                  <b className="text-ink">Diagnosis: </b>
                  {totalScore >= 75
                    ? "Exceptional discipline! Your compounding runway is robust."
                    : totalScore >= 50
                    ? "Good foundation. Scale emergency reserve to 6 months to shield investments."
                    : "Action needed: Focus on trimming high-cost debt to stop wealth leakage."}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-ink/10 bg-white overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8 pt-12 pb-6">
          <div className="grid md:grid-cols-[1.1fr_2fr] gap-10">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-paper font-display font-bold text-xl rotate-[-3deg]">
                  F
                </span>
                <span>
                  <span className="block font-display font-semibold text-[20px] leading-none text-ink">
                    Fermor
                  </span>
                  <span className="block text-[11px] font-bold tracking-[0.14em] text-moss mt-1">
                    हर रुपया, साफ़ · Clarity for India
                  </span>
                </span>
              </div>
              <p className="mt-4 max-w-[320px] text-[14px] leading-relaxed text-ink/70">
                A calm financial ledger for the internet generation. Understand, act, and compound —
                in plain language that every Indian family trusts.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-[13.5px]">
              {(
                [
                  ["Products", ["Market Watch", "Portfolio Sync", "Ask Fermor ✦", "Wealth Forecast", "Fermor For Kids"]],
                  ["Tools", ["SIP & Step-up", "Home Loan EMI", "Quarterly FD", "Income Tax 87A", "Emergency Reserve"]],
                  ["Learn", ["Market Playbooks", "Tax Regime Guide", "UPI Explainers", "Compounding Math"]],
                  ["Company", ["About Fermor", "Careers (Hiring!)", "Security Whitepaper", "Privacy & RBI AA"]],
                ] as Array<[string, string[]]>
              ).map(([h, items]) => (
                <div key={h}>
                  <p className="font-bold text-[12px] uppercase tracking-[0.1em] text-moss">{h}</p>
                  <ul className="mt-3 space-y-2">
                    {items.map((it) => (
                      <li key={it}>
                        <a href="#top" className="hover:text-leaf transition-colors text-ink/80 font-medium">
                          {it}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Large Brand Watermark */}
          <div className="mt-10 select-none text-center font-display font-bold tracking-tight leading-none text-[18vw] md:text-[145px] text-ink/[0.05] pointer-events-none">
            FERMOR
          </div>
        </div>

        {/* Regulatory Disclaimers */}
        <div className="border-t border-line bg-paper">
          <div className="mx-auto max-w-[1200px] px-5 md:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[12px] text-moss text-center sm:text-left">
            <span>
              © 2026 Fermor Technologies Pvt Ltd · Educational platform only. Mutual funds are subject to market risks.
            </span>
            <span className="font-medium text-ink/70">
              Crafted with ledger-ink & turmeric · Next.js 14 App Router + Tailwind CSS
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
