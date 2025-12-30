import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck, ArrowRight, Settings2 } from "lucide-react";
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
    document.title = "Admin Setup | PosterJudge";
    setMetaTag(
      "description",
      "Securely set up administrator permissions for your PosterJudge account."
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
      toast.error("This account is not authorized to become an administrator");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("grant-admin");
      if (error) {
        toast.error(error.message || "Error activating admin permission");
        return;
      }

      await refreshProfile();
      toast.success("Admin permission activated successfully");
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
              <h1 className="text-2xl font-bold text-foreground">Admin Setup</h1>
              <p className="text-muted-foreground mt-2">
                One-time action to make your account an administrator.
              </p>
            </header>

            <section className="space-y-4">
              <div className="rounded-xl border bg-card/40 p-4">
                <div className="flex items-start gap-3">
                  <Settings2 className="w-5 h-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-foreground">
                      You are currently logged in as:
                      <span className="font-semibold"> {user.email}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Only authorized addresses can activate admin permissions.
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
                {isSubmitting ? "Activating..." : "Make Me an Administrator"}
              </Button>

              {!isAllowed && (
                <p className="text-sm text-destructive text-center">
                  This account is not authorized to become an administrator.
                </p>
              )}
            </section>
          </article>

          <div className="text-center mt-6">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back to Dashboard
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminSetup;
