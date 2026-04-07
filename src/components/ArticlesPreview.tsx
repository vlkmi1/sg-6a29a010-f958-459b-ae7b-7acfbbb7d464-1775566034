import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock data - bude nahrazeno Supabase daty
const mockArticles = [
  {
    id: 1,
    title: "Jak vybrat správný odvlhčovač pro váš domov",
    excerpt: "Kompletní průvodce výběrem odvlhčovače podle velikosti místnosti a míry vlhkosti.",
    category: "Průvodce",
    date: "2026-04-05",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
  },
  {
    id: 2,
    title: "5 tipů jak předejít plísním v bytě",
    excerpt: "Jednoduché a účinné metody prevence vzniku plísní ve vašem domově.",
    category: "Prevence",
    date: "2026-04-03",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
  },
  {
    id: 3,
    title: "Nejlepší odvlhčovače roku 2026",
    excerpt: "Recenze a srovnání top odvlhčovačů na trhu. Najděte ten nejlepší pro vaše potřeby.",
    category: "Recenze",
    date: "2026-04-01",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
];

export function ArticlesPreview() {
  return (
    <section className="bg-muted/30 section-padding">
      <div className="container-custom">
        <div className="text-center mb-12 space-y-4">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl">
            Nejnovější články
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Objevte odborné rady, tipy a recenze produktů pro zdravé bydlení
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mockArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{article.category}</Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.date).toLocaleDateString("cs-CZ")}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-xl leading-tight">
                  {article.title}
                </h3>
              </CardHeader>
              
              <CardContent>
                <p className="text-muted-foreground line-clamp-2">
                  {article.excerpt}
                </p>
              </CardContent>
              
              <CardFooter>
                <Link href={`/clanek/${article.id}`} className="w-full">
                  <Button variant="ghost" className="w-full group/btn">
                    Číst více
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/clanky">
            <Button size="lg" variant="outline" className="font-semibold">
              Zobrazit všechny články
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}