"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, BadgePercent } from "lucide-react";
import { NavLanguage } from "./LanguageRotate";

const links = [
  { label: "Products", href: "#invest" },
  { label: "Ask", href: "#ask" },
  { label: "Plan", href: "#forecast" },
  { label: "Calculators", href: "#calculators" },
  { label: "Learn", href: "#learn" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-ink text-paper text-center text-[12.5px] font-medium tracking-wide px-4 py-2 flex items-center justify-center gap-2">
        <BadgePercent className="h-3.5 w-3.5 text-[#8FD0A3]" />
        <span className="truncate">
          Tax season special — free 87A + new-regime guide inside. No sign-up.
        </span>
        <a href="#learn" className="underline underline-offset-4 text-[#8FD0A3] shrink-0">
          Read →
        </a>
      </div>

      <div
        className={`transition-all ${
          scrolled ? "bg-paper/85 backdrop-blur-md border-b border-line shadow-[0_8px_30px_-18px_rgba(16,32,26,0.4)]" : "bg-paper/60 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="flex h-[64px] items-center justify-between">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-paper font-display font-bold text-lg leading-none rotate-[-3deg]">
                F
              </span>
              <span className="leading-none">
                <span className="block font-display font-semibold text-[19px] tracking-tight">
                  Fermor
                </span>
                <NavLanguage />
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-7 text-[14.5px] font-medium text-ink/80">
              {links.map((l) => (
                <a key={l.label} href={l.href} className="hover:text-ink transition-colors relative group">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-leaf transition-all group-hover:w-full" />
                </a>
              ))}
              <a href="#kids" className="rounded-full border border-line bg-white/70 px-3.5 py-1.5 text-[13px] font-semibold hover:rotate-2 transition-transform">
                ✳ For Kids
              </a>
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <a href="#cta" className="text-[14.5px] font-medium text-ink/70 hover:text-ink">
                Log in
              </a>
              <a
                href="#cta"
                className="btn-shine group inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-[14px] font-semibold text-paper hover:bg-pine transition-colors"
              >
                Get started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            <button
              className="lg:hidden grid h-10 w-10 place-items-center rounded-lg border border-line bg-white"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div className="h-[2.5px] bg-line/60">
          <div className="h-full bg-leaf transition-[width]" style={{ width: `${progress}%` }} />
        </div>

        {open && (
          <div className="lg:hidden border-t border-line bg-paper px-5 py-4">
            <div className="flex flex-col gap-1">
              {[...links, { label: "For Kids ✳", href: "#kids" }].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-[16px] font-medium hover:bg-cream"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[15px] font-semibold text-paper"
              >
                Get started <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
