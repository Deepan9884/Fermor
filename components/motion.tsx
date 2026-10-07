"use client";

import { useEffect, useRef, useState } from "react";

/* Animated number that counts up when scrolled into view */
export function CountUp({
  to,
  format,
  duration = 1200,
  className = "",
}: {
  to: number;
  format: (n: number) => string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setVal(to);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  // re-animate on value change after first run
  useEffect(() => {
    if (!started.current) return;
    setVal(to);
  }, [to]);

  return (
    <span ref={ref} className={className}>
      {format(Math.round(val))}
    </span>
  );
}

/* Subtle 3D tilt on hover (desktop only) */
export function Tilt({
  children,
  className = "",
  max = 7,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

/* Magnetic pull toward cursor for CTAs */
export function Magnetic({
  children,
  strength = 0.25,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`magnetic inline-block ${className}`}>
      {children}
    </div>
  );
}

/* Floating ₹ / ✦ particles rising in hero */
export function Particles({ count = 10 }: { count?: number }) {
  const items = Array.from({ length: count }).map((_, i) => {
    const left = (i * 97) % 100;
    const delay = (i * 1.37) % 7;
    const dur = 6 + ((i * 1.9) % 6);
    const size = 13 + ((i * 7) % 12);
    const char = i % 3 === 0 ? "₹" : i % 3 === 1 ? "✦" : "●";
    const color = i % 3 === 0 ? "#15803D" : i % 3 === 1 ? "#C08A2C" : "#10201A";
    return { left, delay, dur, size, char, color, i };
  });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((p) => (
        <span
          key={p.i}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: "8%",
            fontSize: p.size,
            color: p.color,
            opacity: 0,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}
