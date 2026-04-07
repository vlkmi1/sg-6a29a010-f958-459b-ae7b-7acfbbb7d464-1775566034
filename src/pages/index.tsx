import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ArticlesPreview } from "@/components/ArticlesPreview";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Home() {
  return (
    <>
      <SEO
        title="Bydlení bez plísně - Řešení problémů s vlhkostí"
        description="Profesionální poradenství a řešení pro odvlhčování domů, bytů a sklepů. Zbavte se plísní a vlhkosti efektivně." />
      
      
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-1">
          <Hero />
          <ArticlesPreview />
          
          {/* Contact Section */}
          <section id="kontakt" className="section-padding">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Kontaktujte nás
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Rádi vám poradíme s výběrem správného řešení
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Email</h3>
                      <p className="text-sm text-muted-foreground">
                        info@bydlenibezplisne.cz
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Telefon</h3>
                      <p className="text-sm text-muted-foreground">+420 723 300 141

                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Adresa</h3>
                      <p className="text-sm text-muted-foreground">Vodní 84, Kroměříž

                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center mt-12">
                  <Button size="lg" asChild>
                    <a href="mailto:info@bydlenibezplisne.cz">
                      Napište nám
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>);

}