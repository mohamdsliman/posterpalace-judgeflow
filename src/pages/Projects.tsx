import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, BookOpen, Tag } from "lucide-react";

const allProjects = [
  {
    id: 1,
    title: "מערכת זיהוי רגשות בזמן אמת",
    field: "בינה מלאכותית",
    students: ["יעל כהן", "דן לוי"],
    session: "בינה מלאכותית ולמידת מכונה",
    description: "פיתוח מערכת לזיהוי רגשות מתמונות פנים בזמן אמת באמצעות רשתות נוירונים עמוקות.",
  },
  {
    id: 2,
    title: "אפליקציית ניווט לאנשים עם מוגבלות ראייה",
    field: "פיתוח מובייל",
    students: ["נועה ישראלי", "אורי דוד"],
    session: "פיתוח אפליקציות מובייל",
    description: "אפליקציה המשלבת AI וחיישנים לסיוע בניווט לאנשים עם מוגבלויות ראייה.",
  },
  {
    id: 3,
    title: "מערכת גילוי חדירות מבוססת ML",
    field: "אבטחת מידע",
    students: ["מיכל אברהם", "עידן שלום"],
    session: "אבטחת מידע וסייבר",
    description: "פיתוח מערכת לזיהוי התקפות סייבר בזמן אמת באמצעות אלגוריתמי למידת מכונה.",
  },
  {
    id: 4,
    title: "פלטפורמת ניתוח נתוני IoT",
    field: "מערכות משובצות",
    students: ["רון גולן", "שירה בן-דוד"],
    session: "IoT ומערכות משובצות",
    description: "פלטפורמה לאיסוף וניתוח נתונים מחיישני IoT עם לוח בקרה אינטראקטיבי.",
  },
  {
    id: 5,
    title: "מערכת ניהול משאבים בענן",
    field: "מערכות מבוזרות",
    students: ["אמיר וייס", "תמר לוין"],
    session: "מערכות מבוזרות וענן",
    description: "כלי אוטומציה לניהול וניטור משאבי ענן עם אופטימיזציה של עלויות.",
  },
  {
    id: 6,
    title: "מערכת סיווג אוטומטי של תמונות רפואיות",
    field: "ראייה ממוחשבת",
    students: ["ליאור כץ", "מאיה פרידמן"],
    session: "עיבוד תמונה וראייה ממוחשבת",
    description: "אלגוריתם לזיהוי וסיווג ממצאים בתמונות רפואיות לסיוע באבחון.",
  },
];

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);

  const fields = [...new Set(allProjects.map((p) => p.field))];

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      project.title.includes(searchQuery) ||
      project.students.some((s) => s.includes(searchQuery));
    const matchesField = !selectedField || project.field === selectedField;
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
              פרויקטי הכנס
            </h1>
            <p className="text-lg text-muted-foreground">
              צפו בפרויקטים המשתתפים בכנס לפי תחומים ומושבים
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="חיפוש לפי שם פרויקט או סטודנט..."
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

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="glass-card p-6 hover:shadow-glow transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground leading-tight">
                    {project.title}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium flex-shrink-0 mr-3">
                    {project.field}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{project.students.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="w-4 h-4" />
                    <span>{project.session}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">לא נמצאו פרויקטים התואמים לחיפוש</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
