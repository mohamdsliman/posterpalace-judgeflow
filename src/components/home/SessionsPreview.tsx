import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock, Users, Tag, ArrowLeft } from "lucide-react";

const sampleSessions = [
  {
    id: 1,
    name: "בינה מלאכותית ולמידת מכונה",
    time: "09:00 - 11:00",
    projectCount: 8,
    judgesNeeded: 4,
    spotsLeft: 2,
  },
  {
    id: 2,
    name: "פיתוח אפליקציות מובייל",
    time: "11:30 - 13:30",
    projectCount: 6,
    judgesNeeded: 3,
    spotsLeft: 1,
  },
  {
    id: 3,
    name: "אבטחת מידע וסייבר",
    time: "14:00 - 16:00",
    projectCount: 7,
    judgesNeeded: 4,
    spotsLeft: 3,
  },
];

export function SessionsPreview() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              מושבים פתוחים להרשמה
            </h2>
            <p className="text-lg text-muted-foreground">
              בחרו את המושב המתאים לתחום ההתמחות שלכם
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/sessions" className="gap-2">
              כל המושבים
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleSessions.map((session, index) => (
            <div
              key={session.id}
              className="glass-card overflow-hidden group hover:shadow-glow transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground leading-tight">
                    {session.name}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      session.spotsLeft <= 1
                        ? "bg-destructive/10 text-destructive"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {session.spotsLeft} מקומות
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{session.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Tag className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{session.projectCount} פרויקטים</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm">{session.judgesNeeded} שופטים נדרשים</span>
                  </div>
                </div>

                <Button className="w-full group-hover:shadow-glow transition-shadow" asChild>
                  <Link to={`/sessions/${session.id}`}>
                    הרשמה למושב
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
