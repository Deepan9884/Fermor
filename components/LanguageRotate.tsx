"use client";

import { useEffect, useState } from "react";

const SHORT = [
  "हर रुपया, साफ़",
  "ஒவ்வொரு ரூபாயும், தெளிவு",
  "ప్రతి రూపాయి, స్పష్టత",
  "প্রতিটি টাকা, স্পষ্ট",
  "प्रत्येक रुपया, स्पष्ट",
  "ಪ್ರತಿ ರೂಪಾಯಿ, ಸ್ಪಷ್ಟ",
  "ഓരോ രൂപയും, വ്യക്തം",
  "દરેક રૂપિયો, સ્પષ્ટ",
  "ਹਰ ਰੁਪਿਆ, ਸਾਫ਼",
];

const FULL = [
  "हर रुपया, साफ़ — समझो, करो, बढ़ो।",
  "ஒவ்வொரு ரூபாயும் தெளிவு — புரிந்து, செயல்பட்டு, வளருங்கள்.",
  "ప్రతి రూపాయి స్పష్టత — అర్థం చేసుకోండి, చేయండి, పెరగండి.",
  "প্রতিটি টাকা স্পষ্ট — বুঝুন, করুন, বাড়ুন।",
  "प्रत्येक रुपया स्पष्ट — समजा, करा, वाढा।",
  "ಪ್ರತಿ ರೂಪಾಯಿ ಸ್ಪಷ್ಟ — ತಿಳಿಯಿರಿ, ಮಾಡಿ, ಬೆಳೆಯಿರಿ.",
  "ഓരോ രൂപയും വ്യക്തം — മനസ്സിലാക്കൂ, പ്രവർത്തിക്കൂ, വളരൂ.",
  "દરેક રૂપિયો સ્પષ્ટ — સમજો, કરો, વધો.",
  "ਹਰ ਰੁਪਿਆ ਸਾਫ਼ — ਸਮਝੋ, ਕਰੋ, ਵਧੋ।",
];

function useRotate(len: number, interval: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % len), interval);
    return () => clearInterval(t);
  }, [len, interval]);
  return i;
}

/* Stacked slide: incoming rises from below, outgoing floats up */
function Stack({ items, index }: { items: string[]; index: number }) {
  const n = items.length;
  return (
    <span className="inline-grid overflow-hidden align-bottom text-left">
      {items.map((t, k) => {
        const active = k === index;
        const upcoming = k === (index + 1) % n;
        return (
          <span
            key={t}
            aria-hidden={!active}
            className="col-start-1 row-start-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
            style={{
              opacity: active ? 1 : 0,
              transform: active
                ? "translateY(0)"
                : upcoming
                  ? "translateY(110%)"
                  : "translateY(-110%)",
              filter: active ? "none" : "blur(2px)",
            }}
          >
            {t}
          </span>
        );
      })}
    </span>
  );
}

export function NavLanguage() {
  const i = useRotate(SHORT.length, 2400);
  return (
    <span className="block text-[10.5px] font-semibold text-moss tracking-[0.08em] min-h-[15px]">
      <Stack items={SHORT} index={i} />
    </span>
  );
}

export function HeroLanguage() {
  const i = useRotate(FULL.length, 2800);
  return (
    <span className="block">
      <span className="font-display italic text-[20px] md:text-[22px] text-ink/60">
        <Stack items={FULL} index={i} />
      </span>
    </span>
  );
}
