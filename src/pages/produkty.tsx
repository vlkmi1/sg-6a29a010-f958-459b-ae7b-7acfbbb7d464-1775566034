import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Bell, Sparkles, Shield, Truck, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ProductsPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email notification
    setSubscribed(true);
    setEmail("");
  };

  const features = [
    {
      icon: Shield,
      title: "Ověřené produkty",
      description: "Pouze prověřené odvlhčovače od renomovaných výrobců"
    },
    {
      icon: CheckCircle2,
      title: "Nejlepší ceny",
      description: "Srovnáváme ceny a najdeme pro vás ty nejvýhodnější nabídky"
    },
    {
      icon: Truck,
      title: "Rychlé dodání",
      description: "Spolupracujeme s ověřenými prodejci s rychlým doručením"
    }
  ];

  return (
    <>
      <SEO
        title="Produkty - Přehled odvlhčovačů"
        description="Připravujeme pro vás komplexní přehled nejlepších odvlhčovačů na trhu. Buďte mezi prvními, kdo se dozví o spuštění."
      />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative overflow-hidden section-padding bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            
            <div className="container relative">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" />
                  Brzy k dispozici
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  Připravujeme
                  <span className="block text-primary mt-2">Přehled Produktů</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Pracujeme na komplexním katalogu nejlepších odvlhčovačů na českém trhu. 
                  Zanechte nám email a dáme vám vědět, jakmile bude vše připraveno.
                </p>

                {/* Email Notification Form */}
                {!subscribed ? (
                  <form onSubmit={handleNotify} className="max-w-md mx-auto">
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="váš@email.cz"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1"
                      />
                      <Button type="submit" size="lg">
                        <Bell className="w-4 h-4 mr-2" />
                        Upozornit mě
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="max-w-md mx-auto p-4 bg-primary/10 text-primary rounded-lg">
                    <div className="flex items-center gap-2 justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-medium">Děkujeme! Dáme vám vědět.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="section-padding">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Co vás čeká</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Připravujeme pro vás komplexní řešení pro výběr toho správného odvlhčovače
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                      <CardContent className="pt-6">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Coming Soon Timeline */}
          <section className="section-padding bg-muted/30">
            <div className="container">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                  <Package className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-4">Co pro vás připravujeme</h2>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">📊 Srovnání produktů</h3>
                      <p className="text-muted-foreground">
                        Detailní srovnání parametrů, cen a recenzí všech dostupných odvlhčovačů
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">⭐ Hodnocení a recenze</h3>
                      <p className="text-muted-foreground">
                        Skutečné recenze od uživatelů a naše expertní hodnocení
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">💰 Sledování cen</h3>
                      <p className="text-muted-foreground">
                        Aktuální ceny z různých e-shopů a upozornění na slevy
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-2">🎯 Doporučení na míru</h3>
                      <p className="text-muted-foreground">
                        Inteligentní systém doporučení podle vašich potřeb a rozpočtu
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}