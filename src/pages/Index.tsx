import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { SessionsPreview } from "@/components/home/SessionsPreview";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <HeroSection />
        <FeaturesSection />
        <SessionsPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
