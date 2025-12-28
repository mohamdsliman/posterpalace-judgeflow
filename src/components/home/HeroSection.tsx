import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Users, ClipboardCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center gradient-hero overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "-3s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            כנס הפוסטרים 2025
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6 animate-slide-up">
            מערכת שיפוט פוסטרים
            <span className="block text-gradient mt-2">מקצועית וחכמה</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            פלטפורמה מתקדמת לניהול והערכת פרויקטים אקדמיים. 
            רישום שופטים, בחירת מושבים, והערכה מובנית - הכל במקום אחד.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/register">
              <Button variant="hero" size="xl" className="gap-2">
                הרשמה כשופט
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/sessions">
              <Button variant="outline" size="xl">צפייה במושבים</Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">120+</div>
              <div className="text-sm text-muted-foreground">שופטים</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                <ClipboardCheck className="w-6 h-6 text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground">85</div>
              <div className="text-sm text-muted-foreground">פרויקטים</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-sm text-muted-foreground">מושבים</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
