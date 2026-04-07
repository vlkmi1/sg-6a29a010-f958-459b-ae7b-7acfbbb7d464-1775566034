import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ArticlesPreview } from "@/components/ArticlesPreview";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <SEO
        title="Bydlení bez plísně - Průvodce odvlhčováním a zdravým bydlením"
        description="Objevte účinná řešení pro odvlhčení domova. Odborné rady, recenze odvlhčovačů a praktické návody pro bydlení bez vlhkosti a plísní."
        url="https://bydlenibezplisne.cz"
      />
      
      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        <main className="flex-1">
          <Hero />
          <ArticlesPreview />
        </main>
        
        <Footer />
      </div>
    </>
  );
}