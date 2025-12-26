import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-primary opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            הצטרפו אלינו
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            היו חלק מכנס הפוסטרים
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            שופטים מהמכללה ומחוצה לה מוזמנים להירשם ולתרום מניסיונם 
            להערכת הדור הבא של פרויקטים חדשניים
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/register" className="gap-2">
                הרשמה עכשיו
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="muted" size="xl" asChild>
              <Link to="/about">מידע נוסף</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
