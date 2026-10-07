# Fermor — Clarity for every rupee

New homepage concept for Fermor (Founding SDE Intern assignment).

Fermor is building a simpler way for India to understand, act and grow financially.
This rebuild tells one story: **Understand → Act → Grow**, with working tools — not screenshots.

Live: _(add Vercel URL after deploy)_
Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + lucide-react

## Run it

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production check
```

## What's inside

- `app/page.tsx` — composes all homepage sections
- `components/Navbar.tsx` — sticky nav + mobile drawer
- `components/Hero.tsx` — headline + live SIP projector + market ticker
- `components/Understand.tsx` — spending / net-worth / goals tabs
- `components/Ask.tsx` — mock AI chat with typed answers (offline demo)
- `components/Invest.tsx` — stocks / MF / ETF tabs + SIP schedule widget
- `components/Forecast.tsx` — wealth projector (sliders + SVG chart)
- `components/Calculators.tsx` — working SIP / EMI / FD / Income-tax (new regime + 87A)
- `components/Learn.tsx` — blog cards from real Fermor topics
- `components/KidsFaq.tsx` — For Kids pitch + FAQ accordion
- `components/CtaFooter.tsx` — health-check CTA + footer
- `lib/finance.ts` — SIP FV, EMI, FD quarterly compounding, new-regime tax
- `lib/format.ts` — `en-IN` currency formatting
- `data/mock.ts` — demo stocks, posts, FAQs

## Key decisions

1. **Editorial trust over neon fintech.** Paper background `#FAF8F5`, ink `#10201A`, leaf green + gold accent, Fraunces serif display + Inter body. Avoids the generic purple-gradient AI look.
2. **Working math everywhere.** Every number is computed in-browser (SIP `FV = P·[((1+i)^n−1)/i]·(1+i)`, EMI standard amortisation, FD quarterly compounding, new-regime slabs with 87A). Sliders update instantly.
3. **India-first content.** Nifty/Sensex ticker, UPI MDR, 87A rebate, EPF/PPF, SIP on the 17th, Hindi/Marathi/Telugu note.
4. **Server components by default**, `'use client'` only on interactive leaves (Hero, tabs, chat, calculators).
5. **No chart lib.** Hand-rolled SVG keeps bundle small and looks custom.

## Responsiveness

Mobile-first. Hero stacks, tables become cards, nav collapses to drawer. Tested at 375 / 768 / 1440.

## What I'd add with more time

- Real market API + portfolio connect flow
- Full calculator pages (`/calculators/[slug]`) with shareable URLs
- Auth + saved plans, i18n (Hindi first)
