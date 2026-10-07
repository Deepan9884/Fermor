"use client";

import { useEffect, useRef } from "react";

type Variant = "up" | "blur-up" | "scale" | "left" | "right";

const variantClass: Record<Variant, string> = {
  up: "reveal-up",
  "blur-up": "reveal-blur",
  scale: "reveal-scale",
  left: "reveal-left",
  right: "reveal-right",
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    // Already in view on mount (e.g. back-scroll) → show immediately
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.92 && r.bottom > 0) {
      const t = setTimeout(() => el.classList.add("is-visible"), delay);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // wait for delay, then lock visible
            setTimeout(() => el.classList.add("is-visible"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 0px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${variantClass[variant]} ${className}`}>
      {children}
    </div>
  );
}
