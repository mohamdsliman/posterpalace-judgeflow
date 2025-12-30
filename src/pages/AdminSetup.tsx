import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowLeft, Settings2 } from "lucide-react";
import { toast } from "sonner";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

function setMetaTag(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="canonical"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

const AdminSetup = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading, refreshProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allowedEmails = useMemo(() => new Set(["admin@posterju.dge.com"]), []);

  useEffect(() => {
    document.title = "הגדרת מנהל מערכת | PosterJudge";
    setMetaTag(
      "description",
      "הגדרת הרשאת מנהל מערכת לחשבון PosterJudge בצורה מאובטחת."
    );
    setCanonical(`${window.location.origin}/admin-setup`);
  }, []);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login", { replace: true });
      return;
    }

    if (!isLoading && user && isAdmin) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, isAdmin, isLoading, navigate]);

  const handleGrant = async () => {
    if (!user) return;

    if (!allowedEmails.has(user.email ?? "")) {
      toast.error("החשבון הזה לא מורשה להפוך למנהל מערכת");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("grant-admin");
      if (error) {
        toast.error(error.message || "שגיאה בהפעלת הרשאת מנהל");
        return;
      }

      await refreshProfile();
      toast.success("הרשאת מנהל מערכת הופעלה בהצלחה");
      navigate("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-hero">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isAllowed = allowedEmails.has(user.email ?? "");

  return (
    <div className="min-h-screen flex flex-col gradient-hero">
      <Header />
      <main className="flex-1 flex items-center justify-center pt-16 px-4">
        <section className="w-full max-w-lg animate-scale-in">
          <article className="glass-card p-8">
            <header className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                <ShieldCheck className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">הגדרת מנהל מערכת</h1>
              <p className="text-muted-foreground mt-2">
                פעולה חד-פעמית כדי להפוך את החשבון שלך למנהל מערכת.
              </p>
            </header>

            <section className="space-y-4">
              <div className="rounded-xl border bg-card/40 p-4">
                <div className="flex items-start gap-3">
                  <Settings2 className="w-5 h-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-foreground">
                      אתה מחובר כעת עם:
                      <span className="font-semibold" dir="ltr"> {user.email}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      רק כתובות מורשות יכולות להפעיל הרשאת מנהל.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="button"
                className="w-full"
                size="lg"
                onClick={handleGrant}
                disabled={!isAllowed || isSubmitting}
              >
                {isSubmitting ? "מפעיל הרשאה..." : "הפוך אותי למנהל מערכת"}
              </Button>

              {!isAllowed && (
                <p className="text-sm text-destructive text-center">
                  החשבון הזה לא מורשה להפוך למנהל מערכת.
                </p>
              )}
            </section>
          </article>

          <div className="text-center mt-6">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" />
              חזרה לדשבורד
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminSetup;
