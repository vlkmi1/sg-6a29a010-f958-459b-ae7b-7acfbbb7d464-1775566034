import { Button } from "@/components/ui/button";
import { Shield, Droplets, Home } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/30 to-background">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
              <Shield className="h-4 w-4" />
              Váš partner pro zdravé bydlení
            </div>
            
            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight text-balance">
              Zbavte se vlhkosti a plísní{" "}
              <span className="text-primary">jednou provždy</span>
            </h1>
            
            <p className="text-lg text-muted-foreground text-balance max-w-2xl">
              Objevte účinná řešení pro odvlhčení vašeho domova. Odborné rady, 
              recenze produktů a praktické návody pro zdravé a suché bydlení.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/clanky">
                <Button size="lg" className="w-full sm:w-auto font-semibold">
                  Prohlédnout články
                </Button>
              </Link>
              <Link href="/produkty">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold">
                  Nejlepší produkty
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative lg:block animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <FeatureCard
                  icon={<Droplets className="h-6 w-6 text-primary" />}
                  title="Odvlhčovače"
                  description="Nejlepší řešení pro váš domov"
                />
                <FeatureCard
                  icon={<Home className="h-6 w-6 text-primary" />}
                  title="Odborné rady"
                  description="Praktické návody a tipy"
                />
              </div>
              <div className="space-y-4 pt-8">
                <FeatureCard
                  icon={<Shield className="h-6 w-6 text-primary" />}
                  title="Prevence"
                  description="Jak předejít problémům"
                />
                <div className="bg-primary/5 border border-primary/10 rounded-lg p-6 text-center">
                  <p className="text-3xl font-heading font-bold text-primary mb-1">100+</p>
                  <p className="text-sm text-muted-foreground">Spokojených čtenářů</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-3">{icon}</div>
      <h3 className="font-heading font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}