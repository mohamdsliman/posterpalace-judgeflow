import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Award, Mail, Lock, User, Building, ArrowLeft, Phone } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { z } from "zod";

const registerSchema = z.object({
  fullName: z.string().min(2, "שם מלא חייב להכיל לפחות 2 תווים").max(100),
  email: z.string().email("כתובת אימייל לא תקינה").max(255),
  password: z.string().min(8, "סיסמה חייבת להכיל לפחות 8 תווים"),
  phone: z.string().optional(),
  institution: z.string().min(2, "יש להזין שם מוסד").max(200),
});

const Register = () => {
  const navigate = useNavigate();
  const { signUp, user, isLoading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    institution: "",
    isExternal: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user && !authLoading) {
      navigate("/dashboard");
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = registerSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(formData.email, formData.password, {
      full_name: formData.fullName,
      phone: formData.phone || undefined,
      institution: formData.institution,
      is_external: formData.isExternal,
    });

    if (error) {
      if (error.message.includes("already registered")) {
        toast.error("כתובת האימייל כבר רשומה במערכת");
      } else {
        toast.error("שגיאה בהרשמה: " + error.message);
      }
      setIsLoading(false);
      return;
    }

    toast.success("נרשמת בהצלחה! מעביר אותך לדשבורד...");
    navigate("/dashboard");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-hero">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gradient-hero">
      <Header />
      <main className="flex-1 flex items-center justify-center pt-20 pb-8 px-4">
        <div className="w-full max-w-md animate-scale-in">
          <div className="glass-card p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
                <Award className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">הרשמה כשופט</h1>
              <p className="text-muted-foreground mt-2">הצטרפו לצוות השופטים בכנס</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName">שם מלא</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="ישראל ישראלי"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className={`pr-10 ${errors.fullName ? 'border-destructive' : ''}`}
                    required
                  />
                </div>
                {errors.fullName && (
                  <p className="text-sm text-destructive">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">כתובת אימייל</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`pr-10 ${errors.email ? 'border-destructive' : ''}`}
                    dir="ltr"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">סיסמה</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className={`pr-10 ${errors.password ? 'border-destructive' : ''}`}
                    dir="ltr"
                    required
                    minLength={8}
                  />
                </div>
                <p className="text-xs text-muted-foreground">מינימום 8 תווים</p>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">טלפון (אופציונלי)</Label>
                <div className="relative">
                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="050-0000000"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="pr-10"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="institution">ארגון / מוסד</Label>
                <div className="relative">
                  <Building className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="institution"
                    type="text"
                    placeholder="שם החברה או המוסד האקדמי"
                    value={formData.institution}
                    onChange={(e) =>
                      setFormData({ ...formData, institution: e.target.value })
                    }
                    className={`pr-10 ${errors.institution ? 'border-destructive' : ''}`}
                    required
                  />
                </div>
                {errors.institution && (
                  <p className="text-sm text-destructive">{errors.institution}</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="isExternal"
                  checked={formData.isExternal}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isExternal: checked as boolean })
                  }
                />
                <Label htmlFor="isExternal" className="text-sm cursor-pointer">
                  אני שופט חיצוני (לא מהמכללה)
                </Label>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "נרשם..." : "הרשמה"}
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                כבר יש לך חשבון?{" "}
                <Link to="/login" className="text-primary font-medium hover:underline">
                  התחברות
                </Link>
              </p>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center mt-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" />
              חזרה לדף הבית
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
