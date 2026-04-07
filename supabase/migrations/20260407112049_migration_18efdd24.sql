-- Create categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX articles_category_id_idx ON articles(category_id);
CREATE INDEX articles_author_id_idx ON articles(author_id);
CREATE INDEX articles_published_idx ON articles(published);
CREATE INDEX articles_slug_idx ON articles(slug);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Categories RLS Policies (T2 - Public read, authenticated write)
CREATE POLICY "public_read_categories" ON categories FOR SELECT USING (true);
CREATE POLICY "auth_insert_categories" ON categories FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_categories" ON categories FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_categories" ON categories FOR DELETE USING (auth.uid() IS NOT NULL);

-- Articles RLS Policies (T2 - Public can read published, authenticated can manage all)
CREATE POLICY "public_read_published" ON articles FOR SELECT USING (published = true OR auth.uid() IS NOT NULL);
CREATE POLICY "auth_insert_articles" ON articles FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "auth_update_articles" ON articles FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "auth_delete_articles" ON articles FOR DELETE USING (auth.uid() IS NOT NULL);

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
  ('Odvlhčení', 'odvlhceni', 'Články o odvlhčovačích a metodách odvlhčování'),
  ('Prevence plísní', 'prevence-plisni', 'Jak předcházet vzniku plísní v domácnosti'),
  ('Zdraví a bydlení', 'zdravi-a-bydleni', 'Vliv vlhkosti na zdraví a kvalitu bydlení'),
  ('Tipy a rady', 'tipy-a-rady', 'Praktické rady pro zdravé bydlení');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for articles updated_at
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();