import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Award, 
  Target, 
  Users, 
  CheckCircle2, 
  ArrowLeft,
  GraduationCap,
  Lightbulb,
  Heart
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              אודות המערכת
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              מערכת שיפוט פוסטרים מתקדמת
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              פלטפורמה חכמה לניהול והערכת פרויקטים אקדמיים בכנסים ותערוכות, 
              המאפשרת לשופטים מהמכללה ומחוצה לה להשתתף בתהליך הערכה מקצועי ויעיל.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">המטרה שלנו</h3>
                <p className="text-muted-foreground leading-relaxed">
                  לייצר תהליך הערכה שקוף, מקצועי ויעיל לפרויקטי סיום בכנסים אקדמיים
                </p>
              </div>

              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">החזון</h3>
                <p className="text-muted-foreground leading-relaxed">
                  להוביל את המעבר לדיגיטציה של תהליכי הערכה אקדמיים בישראל
                </p>
              </div>

              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">הערכים</h3>
                <p className="text-muted-foreground leading-relaxed">
                  שקיפות, הוגנות, נגישות ומצוינות בכל פרט ותהליך
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">איך זה עובד?</h2>
              <p className="text-lg text-muted-foreground">
                תהליך פשוט בארבעה שלבים
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  step: 1,
                  title: "הרשמה כשופט",
                  description: "צרו חשבון במערכת והזינו את פרטי ההתמחות שלכם",
                },
                {
                  step: 2,
                  title: "בחירת מושב",
                  description: "בחרו את המושב המתאים לתחום ההתמחות ולזמינות שלכם",
                },
                {
                  step: 3,
                  title: "צפייה בפרויקטים",
                  description: "הכירו את הפרויקטים שיוצגו במושב שבחרתם",
                },
                {
                  step: 4,
                  title: "הערכה ומשוב",
                  description: "מלאו את טופס ההערכה לכל פרויקט לאחר ההצגה בכנס",
                },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="flex gap-6 items-start animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                    {item.step}
                  </div>
                  <div className="glass-card p-5 flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits for Judges */}
        <section className="bg-muted/30 py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  למה להיות שופט?
                </h2>
                <ul className="space-y-4">
                  {[
                    "חשיפה לפרויקטים חדשניים וטכנולוגיות מתקדמות",
                    "תרומה לדור הבא של מהנדסים ומפתחים",
                    "הרחבת רשת הקשרים המקצועית",
                    "תעודת הוקרה והכרה מהמכללה",
                    "חוויה מעשירה ומשמעותית",
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground">120+</div>
                    <div className="text-muted-foreground">שופטים פעילים</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Users className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground">85</div>
                    <div className="text-muted-foreground">פרויקטים השנה</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                מוכנים להצטרף?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                הירשמו עכשיו והיו חלק מכנס הפוסטרים
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/register" className="gap-2">
                  הרשמה כשופט
                  <ArrowLeft className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
