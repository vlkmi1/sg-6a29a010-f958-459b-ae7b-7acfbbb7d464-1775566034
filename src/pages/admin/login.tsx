import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Loader2 } from "lucide-react";
import { authService } from "@/services/authService";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const user = await authService.getCurrentUser();
    if (user) {
      router.push("/admin");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Chyba",
        description: "Vyplňte prosím email a heslo",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { user, error } = await authService.signIn(formData.email, formData.password);
      
      if (error) {
        toast({
          title: "Chyba přihlášení",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Úspěch",
        description: "Byli jste úspěšně přihlášeni"
      });
      
      router.push("/admin");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Chyba",
        description: "Nepodařilo se přihlásit",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Přihlášení - Admin"
        description="Přihlášení do administrace"
      />
      
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-primary mb-4">
              <Droplets className="w-8 h-8" />
              <span className="text-2xl font-bold">Bydlení bez plísně</span>
            </Link>
            <h1 className="text-3xl font-bold mt-4">Admin přihlášení</h1>
            <p className="text-muted-foreground mt-2">Přihlaste se ke správě obsahu</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Přihlášení</CardTitle>
              <CardDescription>Zadejte své přihlašovací údaje</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="vas@email.cz"
                    disabled={loading}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Heslo</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="••••••••"
                    disabled={loading}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Přihlašování...
                    </>
                  ) : (
                    "Přihlásit se"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors">
                  ← Zpět na web
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}