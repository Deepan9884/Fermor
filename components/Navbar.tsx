"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, BadgePercent, Sparkles, PieChart, MessageSquare, TrendingUp, Calculator, BookOpen, GraduationCap } from "lucide-react";
import { NavLanguage } from "./LanguageRotate";

const links = [
  { label: "Products", href: "#invest", id: "invest", icon: PieChart },
  { label: "Ask", href: "#ask", id: "ask", icon: MessageSquare },
  { label: "Forecast", href: "#forecast", id: "forecast", icon: TrendingUp },
  { label: "Calculators", href: "#calculators", id: "calculators", icon: Calculator },
  { label: "Learn", href: "#learn", id: "learn", icon: BookOpen },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);

      // Detect active section
      const sections = ["invest", "ask", "forecast", "calculators", "learn", "kids"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Announcement bar */}
      <div className="bg-ink text-paper text-center text-[12px] md:text-[13px] font-medium tracking-wide px-4 py-2 flex items-center justify-center gap-2 border-b border-paper/10">
        <BadgePercent className="h-3.5 w-3.5 text-[#8FD0A3] shrink-0" />
        <span className="hidden sm:inline">
          Tax season special — free 87A + new-regime guide inside. No sign-up required.
        </span>
        <span className="sm:hidden font-semibold">
          Tax special: Free 87A & new-regime guide
        </span>
        <a
          href="#learn"
          className="inline-flex items-center gap-1 font-bold text-[#8FD0A3] hover:text-white underline underline-offset-4 shrink-0 transition-colors ml-1"
        >
          Read guide <ArrowRight className="h-3 w-3" />
        </a>
      </div>

      {/* Main bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#FAF8F5]/90 backdrop-blur-md border-b border-line shadow-[0_8px_30px_-18px_rgba(16,32,26,0.35)] py-2"
            : "bg-[#FAF8F5]/70 backdrop-blur-sm py-3"
        }`}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="flex h-[52px] items-center justify-between">
            {/* Logo */}
            <a href="#top" className="flex items-center gap-2.5 group">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-paper font-display font-bold text-lg leading-none rotate-[-3deg] group-hover:rotate-0 transition-transform shadow-sm">
                F
              </span>
              <span className="leading-none">
                <span className="block font-display font-semibold text-[20px] tracking-tight text-ink group-hover:text-leaf transition-colors">
                  Fermor
                </span>
                <NavLanguage />
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 text-[14px] font-medium text-ink/80 bg-white/60 p-1 rounded-full border border-line shadow-xs">
              {links.map((l) => {
                const isActive = activeSection === l.id;
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                      isActive
                        ? "bg-ink text-paper font-semibold shadow-sm"
                        : "text-ink/70 hover:text-ink hover:bg-cream"
                    }`}
                  >
                    {l.label}
                  </a>
                );
              })}
              <a
                href="#kids"
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-all ${
                  activeSection === "kids"
                    ? "bg-gold text-ink font-bold shadow-sm"
                    : "bg-goldsoft/80 text-ink/90 hover:bg-goldsoft"
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5 text-ink" /> For Kids
              </a>
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#cta"
                className="text-[14px] font-semibold text-ink/75 hover:text-ink px-3 py-2 rounded-full hover:bg-cream transition-colors"
              >
                Log in
              </a>
              <a
                href="#cta"
                className="btn-shine group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-paper hover:bg-pine transition-all shadow-card"
              >
                <span>Get started</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden grid h-10 w-10 place-items-center rounded-xl border border-line bg-white shadow-xs active:scale-95 transition-transform"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5 text-ink" /> : <Menu className="h-5 w-5 text-ink" />}
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="h-[2px] bg-line/50 w-full overflow-hidden">
          <div
            className="h-full bg-leaf transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <div className="lg:hidden border-b border-line bg-paper/95 backdrop-blur-xl px-5 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1.5">
              {links.map((l) => {
                const Icon = l.icon;
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15.5px] font-medium text-ink hover:bg-cream transition-colors"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-cream">
                      <Icon className="h-4 w-4 text-leaf" />
                    </span>
                    <span>{l.label}</span>
                  </a>
                );
              })}
              <a
                href="#kids"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl bg-goldsoft/70 px-4 py-3 text-[15.5px] font-semibold text-ink hover:bg-goldsoft transition-colors mt-1"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/80">
                  <GraduationCap className="h-4 w-4 text-ink" />
                </span>
                <span>Fermor For Kids</span>
                <span className="ml-auto text-[11px] font-bold bg-white px-2 py-0.5 rounded-full border border-line">
                  New
                </span>
              </a>

              <div className="pt-4 mt-2 border-t border-line flex flex-col gap-2">
                <a
                  href="#cta"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-[15px] font-bold text-paper shadow-md"
                >
                  <span>Get started free</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
