import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Target,
  LineChart,
  TrendingUp,
  Zap,
  ChevronRight,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-border/40 pt-24 pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }}></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "7s" }}></div>
          <div className="absolute inset-0 scan-line pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <Badge variant="outline" className="glass py-1.5 px-4">
                <span className="mr-2">🇪🇹</span> Built for African Founders
              </Badge>
            </motion.div>

            {/* HEADLINE (IMPROVED) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight font-['Space_Grotesk'] text-balance"
            >
              Turn your skills into a profitable business <br className="hidden md:block" />
              using AI in 5 minutes
            </motion.h1>

            {/* SUBTITLE (IMPROVED) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Get a personalized business idea, financial plan, and execution roadmap instantly based on your skills, capital, and market opportunity.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 glow-emerald" asChild>
                <Link href="/assessment">🚀 Start Free Assessment</Link>
              </Button>

              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 glass" asChild>
                <Link href="/#features">See Features</Link>
              </Button>
            </motion.div>

            {/* MINI PROOF */}
            <p className="text-sm text-muted-foreground mt-2">
              ⚡ Generates full business plan in under 5 minutes
            </p>

            {/* STATS CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-16 pt-8"
            >
              <Card className="glass border-primary/30 max-w-2xl mx-auto overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/20"></div>
                <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <Activity className="w-6 h-6" />
                    </div>

                    <div className="text-left">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        Live Market Analysis <span className="w-2 h-2 rounded-full bg-primary ai-pulse"></span>
                      </p>

                      <div className="flex items-end gap-2 h-6 mt-1">
                        <div className="w-1.5 bg-primary rounded-t" style={{ height: "60%" }}></div>
                        <div className="w-1.5 bg-primary rounded-t" style={{ height: "80%" }}></div>
                        <div className="w-1.5 bg-primary rounded-t" style={{ height: "40%" }}></div>
                        <div className="w-1.5 bg-primary rounded-t" style={{ height: "100%" }}></div>
                        <div className="w-1.5 bg-primary rounded-t" style={{ height: "70%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 text-center w-full md:w-auto">
                    <div>
                      <p className="text-3xl font-bold">82%</p>
                      <p className="text-xs text-muted-foreground uppercase mt-1">Success Match Rate</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold">12+</p>
                      <p className="text-xs text-muted-foreground uppercase mt-1">Business Ideas Generated</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-card/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold font-['Space_Grotesk'] mb-4">
              AI-Powered Startup Engine
            </h2>
            <p className="text-muted-foreground">
              Everything you need to go from idea → validated business → execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <Feature icon={<Target />} title="Smart Matching" desc="Find business ideas aligned with your skills, education, and capital." />
            <Feature icon={<Sparkles />} title="AI Business Coach" desc="Get real-time guidance for decisions, strategy, and execution." />
            <Feature icon={<LineChart />} title="Profit Forecasting" desc="See revenue projections, cost breakdowns, and ROI timelines." />
            <Feature icon={<TrendingUp />} title="Market Intelligence" desc="Discover high-growth opportunities in African markets." />
            <Feature icon={<Zap />} title="Execution Roadmap" desc="Step-by-step plan from idea to first customers." />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">Simple 4-step AI business generation process</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">

            {[
              ["1", "Input Profile", "Tell us your skills, capital, and interests"],
              ["2", "AI Analysis", "We analyze market opportunities instantly"],
              ["3", "Generate Ideas", "Get personalized business opportunities"],
              ["4", "Launch Plan", "Follow your step-by-step roadmap"]
            ].map(([step, title, desc]) => (
              <div key={step}>
                <div className="w-12 h-12 mx-auto rounded-full bg-primary text-white flex items-center justify-center font-bold mb-4">
                  {step}
                </div>
                <h4 className="font-semibold mb-2">{title}</h4>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* TRENDING */}
      <section className="py-24 bg-card/50 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Trending Opportunities</h2>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">

            {["AgriTech 🌾", "FinTech 💸", "Logistics 🚚", "EdTech 📚", "E-commerce 🛍️", "CleanTech ☀️"].map((item) => (
              <Card key={item} className="text-center p-4">
                <p className="font-medium">{item}</p>
              </Card>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
}

/* Helper component */
function Feature({ icon, title, desc }: any) {
  return (
    <Card className="p-6">
      <div className="w-10 h-10 mb-4 text-primary">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </Card>
  );
}