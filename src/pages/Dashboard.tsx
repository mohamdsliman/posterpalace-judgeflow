import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Calendar, 
  ClipboardCheck, 
  Users, 
  Award,
  Settings,
  LogOut,
  ChevronRight,
  BarChart3,
  FolderOpen
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, profile, isAdmin, isJudge, isLoading, signOut } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-hero">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const judgeActions = [
    {
      icon: Calendar,
      title: "My Sessions",
      description: "View sessions you've registered for",
      href: "/my-sessions",
      color: "from-primary to-primary/80",
    },
    {
      icon: ClipboardCheck,
      title: "Evaluations",
      description: "Complete project evaluations",
      href: "/evaluations",
      color: "from-accent to-accent/80",
    },
    {
      icon: Award,
      title: "Register for Sessions",
      description: "Choose new sessions to participate in",
      href: "/sessions",
      color: "from-secondary to-secondary/80",
    },
  ];

  const adminActions = [
    {
      icon: Settings,
      title: "Manage Conferences",
      description: "Create and edit conferences and sessions",
      href: "/admin/conferences",
      color: "from-destructive to-destructive/80",
    },
    {
      icon: Users,
      title: "Manage Users",
      description: "View and edit user permissions",
      href: "/admin/users",
      color: "from-primary to-primary/80",
    },
    {
      icon: FolderOpen,
      title: "Manage Projects",
      description: "Create and organize projects",
      href: "/admin/projects",
      color: "from-accent to-accent/80",
    },
    {
      icon: BarChart3,
      title: "Reports",
      description: "View evaluation reports and statistics",
      href: "/admin/reports",
      color: "from-secondary to-secondary/80",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col gradient-hero">
      <Header />
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Welcome Section */}
          <div className="glass-card p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome, {profile?.full_name || user.email}!
                </h1>
                <p className="text-muted-foreground mt-2">
                  {isAdmin ? "System Administrator" : isJudge ? "Judge" : "User"}
                  {profile?.institution && ` • ${profile.institution}`}
                </p>
              </div>
              <Button variant="outline" onClick={handleSignOut} className="gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Judge Actions */}
          {isJudge && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Judge Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {judgeActions.map((action) => (
                  <Link
                    key={action.href}
                    to={action.href}
                    className="glass-card p-6 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                      {action.title}
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-muted-foreground text-sm">{action.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Admin Actions */}
          {isAdmin && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">System Administration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {adminActions.map((action) => (
                  <Link
                    key={action.href}
                    to={action.href}
                    className="glass-card p-6 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                      {action.title}
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-muted-foreground text-sm">{action.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
