import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Award, 
  Target, 
  Users, 
  CheckCircle2, 
  ArrowRight,
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
              About the System
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Advanced Poster Judging System
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A smart platform for managing and evaluating academic projects at conferences and exhibitions, 
              enabling judges from the college and beyond to participate in a professional and efficient evaluation process.
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
                <h3 className="text-xl font-semibold text-foreground mb-3">Our Goal</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Create a transparent, professional, and efficient evaluation process for final projects at academic conferences
                </p>
              </div>

              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Lead the transition to digitization of academic evaluation processes
                </p>
              </div>

              <div className="glass-card p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Our Values</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Transparency, fairness, accessibility, and excellence in every detail and process
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground">
                A simple four-step process
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  step: 1,
                  title: "Register as a Judge",
                  description: "Create an account and enter your expertise details",
                },
                {
                  step: 2,
                  title: "Choose a Session",
                  description: "Select the session that matches your expertise and availability",
                },
                {
                  step: 3,
                  title: "View Projects",
                  description: "Get to know the projects that will be presented in your chosen session",
                },
                {
                  step: 4,
                  title: "Evaluate & Provide Feedback",
                  description: "Complete the evaluation form for each project after the conference presentation",
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
                  Why Become a Judge?
                </h2>
                <ul className="space-y-4">
                  {[
                    "Exposure to innovative projects and advanced technologies",
                    "Contribute to the next generation of engineers and developers",
                    "Expand your professional network",
                    "Certificate of appreciation from the college",
                    "A rewarding and meaningful experience",
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
                    <div className="text-muted-foreground">Active Judges</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Users className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-foreground">85</div>
                    <div className="text-muted-foreground">Projects This Year</div>
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
                Ready to Join?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Register now and be part of the poster conference
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/register" className="gap-2">
                  Register as Judge
                  <ArrowRight className="w-5 h-5" />
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
