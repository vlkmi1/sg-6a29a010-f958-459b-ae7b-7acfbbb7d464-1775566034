import Link from "next/link";
import { Droplets } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-6 w-6 text-primary" />
              <span className="font-heading font-bold text-xl">Bydlení bez plísně</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Váš průvodce světem odvlhčování a zdravého bydlení. 
              Odborné rady, recenze produktů a praktické tipy.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Navigace</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Domů
                </Link>
              </li>
              <li>
                <Link href="/clanky" className="text-muted-foreground hover:text-foreground transition-colors">
                  Články
                </Link>
              </li>
              <li>
                <Link href="/produkty" className="text-muted-foreground hover:text-foreground transition-colors">
                  Produkty
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-muted-foreground hover:text-foreground transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold mb-4">Informace</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/o-nas" className="text-muted-foreground hover:text-foreground transition-colors">
                  O nás
                </Link>
              </li>
              <li>
                <Link href="/ochrana-udaju" className="text-muted-foreground hover:text-foreground transition-colors">
                  Ochrana údajů
                </Link>
              </li>
              <li>
                <Link href="/podminky" className="text-muted-foreground hover:text-foreground transition-colors">
                  Podmínky použití
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {currentYear} Bydlení bez plísně. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
}