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
    title: "Session Management",
    description: "Define sessions by specialization, hours, and assigned projects",
    color: "primary",
  },
  {
    icon: ClipboardList,
    title: "Structured Evaluation",
    description: "Custom criteria with flexible scoring scales",
    color: "accent",
  },
  {
    icon: BarChart3,
    title: "Advanced Reports",
    description: "Export data by session, field, or other dimensions",
    color: "primary",
  },
  {
    icon: Bell,
    title: "Automatic Reminders",
    description: "Notifications to judges before the conference and for evaluation completion",
    color: "accent",
  },
  {
    icon: Shield,
    title: "Full Security",
    description: "Custom access permissions and guaranteed data backup",
    color: "primary",
  },
  {
    icon: Smartphone,
    title: "Full Accessibility",
    description: "Responsive interface for use on any device, anywhere",
    color: "accent",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need for a Successful Conference
          </h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive system for managing, judging, and reporting on academic projects
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
