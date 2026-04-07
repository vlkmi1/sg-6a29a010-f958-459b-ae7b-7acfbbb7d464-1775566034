import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Eye } from "lucide-react";
import { articlesService } from "@/services/articlesService";
import type { Database } from "@/integrations/supabase/types";
import Link from "next/link";

type Article = Database["public"]["Tables"]["articles"]["Row"];

export default function ArticlePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadArticle(slug as string);
    }
  }, [slug]);

  const loadArticle = async (articleSlug: string) => {
    try {
      const data = await articlesService.getArticleBySlug(articleSlug);
      if (data) {
        setArticle(data);
        await articlesService.updateArticle(data.id, {
          view_count: (data.view_count || 0) + 1
        });
      } else {
        router.push("/404");
      }
    } catch (error) {
      console.error("Error loading article:", error);
      router.push("/404");
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

  if (loading || !article) {
    return (
      <>
        <SEO title="Načítání..." />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Načítání...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt || undefined}
        image={article.featured_image || undefined}
        type="article"
        publishedTime={article.created_at}
        modifiedTime={article.updated_at}
      />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-1">
          <article>
            <header className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
              <div className="container">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                    {article.title}
                  </h1>
                  {article.excerpt && (
                    <p className="text-xl text-muted-foreground mb-6">
                      {article.excerpt}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <time>{formatDate(article.created_at)}</time>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{article.view_count || 0} zobrazení</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {article.featured_image && (
              <div className="container py-8">
                <div className="max-w-4xl mx-auto">
                  <div className="aspect-video rounded-xl overflow-hidden bg-muted">
                    <img
                      src={article.featured_image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            <section className="section-padding">
              <div className="container">
                <div className="max-w-3xl mx-auto">
                  <div 
                    className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:font-heading prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </div>
              </div>
            </section>
          </article>
        </main>
        
        <Footer />
      </div>
    </>
  );
}