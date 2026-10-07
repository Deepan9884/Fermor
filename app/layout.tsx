import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fermor — Clarity for every rupee",
  description:
    "Free calculators, honest insights, and tracking that explains your money in plain English — built for India. Understand, act and grow.",
  openGraph: {
    title: "Fermor — Clarity for every rupee",
    description:
      "Invest, track and plan in one place. Free SIP, EMI, FD, tax calculators + plain-English money answers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;600&family=Noto+Sans+Tamil:wght@400;600&family=Noto+Sans+Telugu:wght@400;600&family=Noto+Sans+Bengali:wght@400;600&family=Noto+Sans+Kannada:wght@400;600&family=Noto+Sans+Malayalam:wght@400;600&family=Noto+Sans+Gujarati:wght@400;600&family=Noto+Sans+Gurmukhi:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-paper text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
