import { 
  Calendar, 
  ClipboardList, 
  BarChart3, 
  Bell, 
  Shield, 
  Smartphone 
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "ניהול מושבים",
    description: "הגדרת מושבים לפי תחומי התמחות, שעות ופרויקטים משויכים",
    color: "primary",
  },
  {
    icon: ClipboardList,
    title: "הערכה מובנית",
    description: "קריטריונים מותאמים אישית עם סולמות ציון גמישים",
    color: "accent",
  },
  {
    icon: BarChart3,
    title: "דוחות מתקדמים",
    description: "ייצוא נתונים לפי מושב, תחום או חיתוכים נוספים",
    color: "primary",
  },
  {
    icon: Bell,
    title: "תזכורות אוטומטיות",
    description: "הודעות לשופטים לפני הכנס ולהשלמת הערכות",
    color: "accent",
  },
  {
    icon: Shield,
    title: "אבטחה מלאה",
    description: "הרשאות גישה מותאמות וגיבוי נתונים מובטח",
    color: "primary",
  },
  {
    icon: Smartphone,
    title: "נגישות מלאה",
    description: "ממשק רספונסיבי לשימוש בכל מכשיר ובכל מקום",
    color: "accent",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            כל מה שצריך לכנס מוצלח
          </h2>
          <p className="text-lg text-muted-foreground">
            מערכת מקיפה לניהול, שיפוט ודיווח על פרויקטים אקדמיים
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-6 hover:shadow-glow transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                  feature.color === "primary" 
                    ? "bg-primary/10 text-primary" 
                    : "bg-accent/10 text-accent"
                }`}
              >
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
