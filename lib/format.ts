export function formatINR(n: number, opts?: { decimals?: number }) {
  const d = opts?.decimals ?? 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: d,
    minimumFractionDigits: d,
  }).format(n);
}

export function formatCompactINR(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}k`;
  return formatINR(n);
}

export function sliderFill(min: number, max: number, value: number) {
  const pct = ((value - min) / (max - min)) * 100;
  return { "--fill": `${pct}%` } as React.CSSProperties;
}
