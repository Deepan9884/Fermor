import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Understand from "@/components/Understand";
import Ask from "@/components/Ask";
import Invest from "@/components/Invest";
import Forecast from "@/components/Forecast";
import Calculators from "@/components/Calculators";
import Learn from "@/components/Learn";
import Testimonials from "@/components/Testimonials";
import KidsFaq from "@/components/KidsFaq";
import CtaFooter from "@/components/CtaFooter";

export default function Page() {
  return (
    <main className="min-h-screen overflow-clip">
      <Navbar />
      <Hero />
      <Manifesto />
      <Understand />
      <Ask />
      <Invest />
      <Forecast />
      <Calculators />
      <Testimonials />
      <Learn />
      <KidsFaq />
      <CtaFooter />
    </main>
  );
}
