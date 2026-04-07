import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar } from "lucide-react";
import { articlesService } from "@/services/articlesService";
import type { Database } from "@/integrations/supabase/types";

type Article = Database["public"]["Tables"]["articles"]["Row"];

export function ArticlesPreview() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const data = await articlesService.getArticles(true);
      setArticles(data.slice(0, 3));
    } catch (error) {
      console.error("Error loading articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  return (
    <section className="section-padding bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Nejnovější články
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Praktické rady a tipy pro zdravé bydlení bez vlhkosti a plísní
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="aspect-video bg-muted rounded-lg mb-4" />
                  <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-full" />
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground">
                Zatím nejsou k dispozici žádné články
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card key={article.id} className="group hover:shadow-lg transition-all hover:border-primary/50">
                <CardHeader>
                  {article.image_url && (
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    <time>{formatDate(article.created_at)}</time>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={`/clanky/${article.slug}`} className="w-full">
                    <Button variant="ghost" className="w-full gap-2 group">
                      Číst více
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/clanky">
            <Button size="lg" variant="outline" className="gap-2">
              Zobrazit všechny články
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}