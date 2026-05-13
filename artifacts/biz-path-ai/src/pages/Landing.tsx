import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Target, LineChart, TrendingUp, Zap, ChevronRight, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 pt-24 pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }}></div>
          <div className="absolute inset-0 scan-line pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <Badge variant="outline" className="glass py-1.5 px-4">
                <span className="mr-2">🇪🇹</span> Built for Ethiopian Founders
              </Badge>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight font-['Space_Grotesk'] text-balance"
            >
              Turn Your Degree <br className="hidden md:block" /> Into a Dynasty
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              The premium startup intelligence platform that matches your skills, capital, and background with high-growth business opportunities in Africa.
            </motion.p>
            
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
                <Link href="/#how-it-works">See How It Works</Link>
              </Button>
            </motion.div>

            {/* Demo Stats Card */}
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
                        Market Scan <span className="w-2 h-2 rounded-full bg-primary ai-pulse"></span>
                      </p>
                      <div className="flex items-end gap-2 h-6 mt-1">
                        <div className="w-1.5 bg-primary rounded-t animate-[pulse_1.5s_ease-in-out_infinite]" style={{height: '60%'}}></div>
                        <div className="w-1.5 bg-primary rounded-t animate-[pulse_2s_ease-in-out_infinite]" style={{height: '80%'}}></div>
                        <div className="w-1.5 bg-primary rounded-t animate-[pulse_1s_ease-in-out_infinite]" style={{height: '40%'}}></div>
                        <div className="w-1.5 bg-primary rounded-t animate-[pulse_2.5s_ease-in-out_infinite]" style={{height: '100%'}}></div>
                        <div className="w-1.5 bg-primary rounded-t animate-[pulse_1.2s_ease-in-out_infinite]" style={{height: '70%'}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block w-px h-12 bg-border"></div>
                  <div className="grid grid-cols-2 gap-8 text-center w-full md:w-auto">
                    <div>
                      <p className="text-3xl font-bold text-foreground">82%</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Avg Readiness</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-foreground">12+</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Matches Found</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-card/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold font-['Space_Grotesk'] mb-4">Intelligent Founder Tools</h2>
            <p className="text-muted-foreground">Everything you need to discover, evaluate, and launch a successful venture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="glass hover:border-primary/30 hover:shadow-primary/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Precision Matching</h3>
                <p className="text-sm text-muted-foreground">We align your unique background, education, and capital with businesses that fit you perfectly.</p>
              </CardContent>
            </Card>
            <Card className="glass hover:border-primary/30 hover:shadow-primary/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  AI Business Coach <span className="w-2 h-2 rounded-full bg-primary ai-pulse"></span>
                </h3>
                <p className="text-sm text-muted-foreground">Get 24/7 strategic advice, problem-solving, and guidance tailored to your specific venture.</p>
              </CardContent>
            </Card>
            <Card className="glass hover:border-primary/30 hover:shadow-primary/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4">
                  <LineChart className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Financial Projections</h3>
                <p className="text-sm text-muted-foreground">Detailed capital breakdowns, 6-month revenue forecasting, and ROI timelines.</p>
              </CardContent>
            </Card>
            <Card className="glass hover:border-primary/30 hover:shadow-primary/10 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Market Analysis</h3>
                <p className="text-sm text-muted-foreground">Real-time insights into the Ethiopian market, competitor landscapes, and growth trends.</p>
              </CardContent>
            </Card>
            <Card className="glass hover:border-primary/30 hover:shadow-primary/10 transition-all duration-300 lg:col-span-2">
              <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Execution Roadmap</h3>
                  <p className="text-sm text-muted-foreground">Step-by-step guides from registering your business in Addis Ababa to acquiring your first 100 customers.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold font-['Space_Grotesk'] mb-4">How It Works</h2>
            <p className="text-muted-foreground">A streamlined process to find your ideal business.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { step: "1", title: "Assessment", desc: "Share your capital, skills, and background." },
                { step: "2", title: "AI Analysis", desc: "Our engine processes 1,000+ data points." },
                { step: "3", title: "Matches", desc: "Review your tailored business opportunities." },
                { step: "4", title: "Execute", desc: "Follow the AI-generated roadmap to launch." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-card border-2 border-primary text-primary flex items-center justify-center font-bold text-xl mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    {item.step}
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ethiopian Trending */}
      <section id="trends" className="py-24 bg-card/50 border-t border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-2xl font-bold font-['Space_Grotesk'] mb-2 flex items-center gap-2">
                Trending in Ethiopia <span className="w-2 h-2 rounded-full bg-primary ai-pulse"></span>
              </h2>
              <p className="text-sm text-muted-foreground">High-growth sectors identified by our AI.</p>
            </div>
            <Button variant="ghost" className="gap-2">View All Sectors <ChevronRight className="w-4 h-4" /></Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "AgriTech", emoji: "🌾", trend: "+24%" },
              { name: "FinTech", emoji: "💸", trend: "+32%" },
              { name: "Logistics", emoji: "🚚", trend: "+18%" },
              { name: "EdTech", emoji: "📚", trend: "+45%" },
              { name: "E-commerce", emoji: "🛍️", trend: "+28%" },
              { name: "CleanTech", emoji: "☀️", trend: "+15%" }
            ].map((sector, i) => (
              <Card key={i} className="glass hover:border-primary/30 transition-colors text-center cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">{sector.emoji}</div>
                  <h4 className="font-medium text-sm mb-1">{sector.name}</h4>
                  <span className="text-xs text-primary font-semibold">{sector.trend}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
