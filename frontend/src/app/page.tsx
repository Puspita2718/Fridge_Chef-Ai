import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FAQ />
        
        {/* Final CTA Section */}
        <section className="py-24 px-4 md:px-10">
          <div className="max-w-[1200px] mx-auto rounded-[40px] bg-card border border-border p-12 md:p-24 text-center overflow-hidden relative shadow-lg">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
                Ready to transform <br className="hidden md:block" /> your kitchen?
              </h2>
              <p className="text-xl mb-12 text-muted-foreground max-w-2xl mx-auto">
                Join 100,000+ chefs saving time and the planet with AI-driven culinary intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-transform">
                  Get Started for Free
                </button>
                <button className="bg-muted text-foreground border border-border px-10 py-5 rounded-2xl font-bold hover:bg-muted/80 transition-all">
                  Download App
                </button>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]"></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
