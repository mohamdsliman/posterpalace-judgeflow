import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Users, Tag, Search, Filter } from "lucide-react";

const allSessions = [
  {
    id: 1,
    name: "בינה מלאכותית ולמידת מכונה",
    time: "09:00 - 11:00",
    date: "15.01.2025",
    projectCount: 8,
    judgesNeeded: 4,
    spotsLeft: 2,
    field: "AI",
  },
  {
    id: 2,
    name: "פיתוח אפליקציות מובייל",
    time: "11:30 - 13:30",
    date: "15.01.2025",
    projectCount: 6,
    judgesNeeded: 3,
    spotsLeft: 1,
    field: "Mobile",
  },
  {
    id: 3,
    name: "אבטחת מידע וסייבר",
    time: "14:00 - 16:00",
    date: "15.01.2025",
    projectCount: 7,
    judgesNeeded: 4,
    spotsLeft: 3,
    field: "Security",
  },
  {
    id: 4,
    name: "מערכות מבוזרות וענן",
    time: "09:00 - 11:00",
    date: "16.01.2025",
    projectCount: 5,
    judgesNeeded: 3,
    spotsLeft: 2,
    field: "Cloud",
  },
  {
    id: 5,
    name: "עיבוד תמונה וראייה ממוחשבת",
    time: "11:30 - 13:30",
    date: "16.01.2025",
    projectCount: 6,
    judgesNeeded: 3,
    spotsLeft: 3,
    field: "AI",
  },
  {
    id: 6,
    name: "IoT ומערכות משובצות",
    time: "14:00 - 16:00",
    date: "16.01.2025",
    projectCount: 4,
    judgesNeeded: 2,
    spotsLeft: 1,
    field: "IoT",
  },
];

const Sessions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const fields = [...new Set(allSessions.map((s) => s.field))];

  const filteredSessions = allSessions.filter((session) => {
    const matchesSearch = session.name.includes(searchQuery);
    const matchesField = !selectedField || session.field === selectedField;
    return matchesSearch && matchesField;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              מושבי הכנס
            </h1>
            <p className="text-lg text-muted-foreground">
              בחרו את המושב המתאים לתחום ההתמחות שלכם והירשמו כשופטים
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="חיפוש מושב..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedField === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedField(null)}
              >
                <Filter className="w-4 h-4 ml-1" />
                הכל
              </Button>
              {fields.map((field) => (
                <Button
                  key={field}
                  variant={selectedField === field ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedField(field)}
                >
                  {field}
                </Button>
              ))}
            </div>
          </div>

          {/* Sessions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session, index) => (
              <div
                key={session.id}
                className="glass-card overflow-hidden group hover:shadow-glow transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-xs text-muted-foreground">{session.date}</span>
                      <h3 className="text-lg font-semibold text-foreground leading-tight mt-1">
                        {session.name}
                      </h3>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        session.spotsLeft <= 1
                          ? "bg-destructive/10 text-destructive"
                          : session.spotsLeft <= 2
                          ? "bg-accent/10 text-accent"
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

                  <Button className="w-full" disabled={session.spotsLeft === 0}>
                    {session.spotsLeft === 0 ? "המושב מלא" : "הרשמה למושב"}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredSessions.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">לא נמצאו מושבים התואמים לחיפוש</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sessions;
