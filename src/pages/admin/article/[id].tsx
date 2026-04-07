import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { articlesService } from "@/services/articlesService";
import { authService } from "@/services/authService";
import { RichTextEditor } from "@/components/RichTextEditor";
import type { Database } from "@/integrations/supabase/types";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

type Article = Database["public"]["Tables"]["articles"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];

export default function ArticleEditPage() {
  const router = useRouter();
  const { id } = router.query;
  const { toast } = useToast();
  const isNew = id === "new";

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category_id: "",
    featured_image: "",
    published: false
  });

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!checkingAuth) {
      loadCategories();
      if (!isNew && id) {
        loadArticle(id as string);
      }
    }
  }, [id, isNew, checkingAuth]);

  const checkAuth = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (!user) {
        router.push("/admin/login");
        return;
      }
    } catch (error) {
      console.error("Auth check error:", error);
      router.push("/admin/login");
    } finally {
      setCheckingAuth(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await articlesService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const loadArticle = async (articleId: string) => {
    try {
      const articles = await articlesService.getArticles();
      const article = articles.find(a => a.id === articleId);
      
      if (article) {
        setFormData({
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt || "",
          content: article.content,
          category_id: article.category_id || "",
          featured_image: article.featured_image || "",
          published: article.published || false
        });
      }
    } catch (error) {
      console.error("Error loading article:", error);
      toast({
        title: "Chyba",
        description: "Nepodařilo se načíst článek",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: articlesService.generateSlug(title)
    }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Chyba",
        description: "Vyplňte prosím název a obsah článku",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    try {
      if (isNew) {
        await articlesService.createArticle({
          ...formData,
          category_id: formData.category_id || null,
          featured_image: formData.featured_image || null
        } as any);
        toast({
          title: "Úspěch",
          description: "Článek byl vytvořen"
        });
      } else {
        await articlesService.updateArticle(id as string, {
          ...formData,
          category_id: formData.category_id || null,
          featured_image: formData.featured_image || null
        });
        toast({
          title: "Úspěch",
          description: "Článek byl uložen"
        });
      }
      router.push("/admin");
    } catch (error) {
      console.error("Error saving article:", error);
      toast({
        title: "Chyba",
        description: "Nepodařilo se uložit článek",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (checkingAuth || loading) {
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
        title={isNew ? "Nový článek" : "Upravit článek"}
        description="Editor článků"
      />
      
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        
        <main className="flex-1 section-padding">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <Link href="/admin">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                </Link>
                <div className="flex-1">
                  <h1 className="text-4xl font-bold">
                    {isNew ? "Nový článek" : "Upravit článek"}
                  </h1>
                </div>
                <Button onClick={handleSave} disabled={saving} size="lg" className="gap-2">
                  <Save className="w-5 h-5" />
                  {saving ? "Ukládám..." : "Uložit"}
                </Button>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Základní informace</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Název článku *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Zadejte název článku"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slug">URL adresa</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="url-adresa-clanku"
                      />
                      <p className="text-sm text-muted-foreground">
                        Automaticky generováno z názvu
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Krátký popis</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                        placeholder="Stručný popis článku (zobrazí se v náhledech)"
                        rows={3}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Kategorie</Label>
                        <Select
                          value={formData.category_id}
                          onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
                        >
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Vyberte kategorii" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat.id} value={cat.id}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="image">URL obrázku</Label>
                        <Input
                          id="image"
                          value={formData.featured_image}
                          onChange={(e) => setFormData(prev => ({ ...prev, featured_image: e.target.value }))}
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <Label htmlFor="published" className="text-base">Publikovat článek</Label>
                        <p className="text-sm text-muted-foreground">
                          Článek bude viditelný na webu
                        </p>
                      </div>
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Obsah článku *</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RichTextEditor
                      value={formData.content}
                      onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                      placeholder="Začněte psát svůj článek..."
                    />
                    <p className="text-sm text-muted-foreground mt-4">
                      Použijte editor pro formátování textu. Podporuje nadpisy, odkazy, seznamy a další.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}