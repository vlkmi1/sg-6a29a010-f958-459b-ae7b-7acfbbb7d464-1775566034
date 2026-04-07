import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, LogOut } from "lucide-react";
import { articlesService } from "@/services/articlesService";
import { authService } from "@/services/authService";
import type { Database } from "@/integrations/supabase/types";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

type Article = Database["public"]["Tables"]["articles"]["Row"];

export default function AdminPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (!user) {
        router.push("/admin/login");
        return;
      }
      loadArticles();
    } catch (error) {
      console.error("Auth check error:", error);
      router.push("/admin/login");
    } finally {
      setCheckingAuth(false);
    }
  };

  const loadArticles = async () => {
    try {
      const data = await articlesService.getArticles();
      setArticles(data);
    } catch (error) {
      console.error("Error loading articles:", error);
      toast({
        title: "Chyba",
        description: "Nepodařilo se načíst články",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Opravdu chcete smazat tento článek?")) return;
    
    try {
      await articlesService.deleteArticle(id);
      toast({
        title: "Úspěch",
        description: "Článek byl smazán"
      });
      loadArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
      toast({
        title: "Chyba",
        description: "Nepodařilo se smazat článek",
        variant: "destructive"
      });
    }
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
      toast({
        title: "Odhlášení",
        description: "Byli jste úspěšně odhlášeni"
      });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Chyba",
        description: "Nepodařilo se odhlásit",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("cs-CZ", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  if (checkingAuth) {
    return (
      <>
        <SEO title="Načítání..." />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-muted-foreground">Ověřování přístupu...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Admin - Správa článků"
        description="Správa článků pro bydlenibezplisne.cz"
      />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-1 section-padding">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Správa článků</h1>
                  <p className="text-muted-foreground">Vytvářejte a spravujte své články</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleLogout} className="gap-2">
                    <LogOut className="w-4 h-4" />
                    Odhlásit
                  </Button>
                  <Link href="/admin/article/new">
                    <Button size="lg" className="gap-2">
                      <Plus className="w-5 h-5" />
                      Nový článek
                    </Button>
                  </Link>
                </div>
              </div>

              {loading ? (
                <div className="grid gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardHeader>
                        <div className="h-6 bg-muted rounded w-2/3 mb-2" />
                        <div className="h-4 bg-muted rounded w-1/3" />
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : articles.length === 0 ? (
                <Card>
                  <CardContent className="py-16 text-center">
                    <p className="text-muted-foreground mb-4">Zatím nemáte žádné články</p>
                    <Link href="/admin/article/new">
                      <Button>Vytvořit první článek</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {articles.map((article) => (
                    <Card key={article.id} className="hover:border-primary/50 transition-colors">
                      <CardHeader>
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-xl">{article.title}</CardTitle>
                              <Badge variant={article.published ? "default" : "secondary"}>
                                {article.published ? "Publikováno" : "Koncept"}
                              </Badge>
                            </div>
                            <CardDescription>
                              {article.excerpt}
                            </CardDescription>
                            <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
                              <span>Vytvořeno: {formatDate(article.created_at)}</span>
                              {article.published && (
                                <span>• {article.view_count || 0} zobrazení</span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {article.published && (
                              <Link href={`/clanky/${article.slug}`} target="_blank">
                                <Button variant="ghost" size="icon">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </Link>
                            )}
                            <Link href={`/admin/article/${article.id}`}>
                              <Button variant="ghost" size="icon">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(article.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}