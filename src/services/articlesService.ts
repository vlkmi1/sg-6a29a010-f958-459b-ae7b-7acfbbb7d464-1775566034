import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Category = Database["public"]["Tables"]["categories"]["Row"];
type Article = Database["public"]["Tables"]["articles"]["Row"];
type ArticleInsert = Database["public"]["Tables"]["articles"]["Insert"];
type ArticleUpdate = Database["public"]["Tables"]["articles"]["Update"];

export const articlesService = {
  // Categories
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");
    
    if (error) throw error;
    return data || [];
  },

  async createCategory(name: string, slug: string): Promise<Category> {
    const { data, error } = await supabase
      .from("categories")
      .insert({ name, slug })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Articles
  async getArticles(published?: boolean): Promise<Article[]> {
    let query = supabase
      .from("articles")
      .select("*, categories(name, slug)")
      .order("created_at", { ascending: false });
    
    if (published !== undefined) {
      query = query.eq("published", published);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  },

  async getArticleBySlug(slug: string): Promise<Article | null> {
    const { data, error } = await supabase
      .from("articles")
      .select("*, categories(name, slug)")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    
    if (error) {
      if (error.code === "PGRST116") return null;
      throw error;
    }
    return data;
  },

  async createArticle(article: Partial<ArticleInsert>): Promise<Article> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Uživatel není přihlášen");

    const { data, error } = await supabase
      .from("articles")
      .insert({ ...article, author_id: user.id } as ArticleInsert)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateArticle(id: string, updates: ArticleUpdate): Promise<Article> {
    const { data, error } = await supabase
      .from("articles")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteArticle(id: string): Promise<void> {
    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
  },

  // Utility functions
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
};