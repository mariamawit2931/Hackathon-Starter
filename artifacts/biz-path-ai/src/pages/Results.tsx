import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";
import {
  Download, RefreshCw, TrendingUp, Zap, Target,
  Brain, MapPin, GraduationCap, DollarSign, ArrowRight
} from "lucide-react";

const growthData = [
  { month: "M1", revenue: 2000 },
  { month: "M2", revenue: 3500 },
  { month: "M3", revenue: 5200 },
  { month: "M4", revenue: 7800 },
  { month: "M5", revenue: 11500 },
  { month: "M6", revenue: 15800 },
];

const capitalData = [
  { phase: "Phase 1", label: "Month 1", etb: 50000 },
  { phase: "Phase 2", label: "Month 3", etb: 75000 },
  { phase: "Phase 3", label: "Month 6", etb: 120000 },
];

const skillGaps = [
  { skill: "Business Planning", you: 60, required: 80 },
  { skill: "Customer Service", you: 75, required: 90 },
  { skill: "Financial Management", you: 45, required: 80 },
  { skill: "Digital Marketing", you: 80, required: 90 },
];

// IMPROVED: Added 'permit' and localized 'market' context
const opportunities = [
  { title: "Coffee Shop & Roastery", readiness: 92, capital: "ETB 45K – 80K", timeline: "3–6 months", skills: ["Management", "Service"], viability: "High", market: "Addis/Hubs", permit: "Health Permit" },
  { title: "Telegram Marketing Agency", readiness: 88, capital: "ETB 5K – 15K", timeline: "1 month", skills: ["Marketing", "Sales"], viability: "Very High", market: "Booming", permit: "Category C" },
  { title: "Export Logistics Support", readiness: 85, capital: "ETB 20K – 40K", timeline: "2 months", skills: ["Operations", "Sales"], viability: "High", market: "Growing", permit: "Trade License" },
  { title: "Freelance Software Dev", readiness: 90, capital: "ETB 2K – 10K", timeline: "Immediate", skills: ["Coding", "English"], viability: "Very High", market: "Very Hot", permit: "Freelance Cert" },
  { title: "Urban Poultry Tech", readiness: 82, capital: "ETB 30K – 50K", timeline: "3 months", skills: ["Technical", "Sales"], viability: "High", market: "Growing", permit: "Agri-Permit" },
  { title: "Event Tech Planning", readiness: 78, capital: "ETB 15K – 25K", timeline: "2 months", skills: ["Design", "Sales"], viability: "Medium", market: "Growing", permit: "Standard" },
];

// IMPROVED: Localized Ethiopian insights
const insightChips = [
  { emoji: "🇪🇹", text: "High demand in Addis Ababa & Regional Hubs" },
  { emoji: "📱", text: "Optimized for Telegram-based sales growth" },
  { emoji: "⚖️", text: "Simplified Category 'C' Tax compliance" },
  { emoji: "🏗️", text: "Aligned with Ethiopia's Digital 2025 Strategy" },
  { emoji: "📈", text: "Inflation-hedged revenue projections" },
];

const CIRCUMFERENCE = 2 * Math.PI * 54;

function FounderRing({ value }: { value: number }) {
  return (
    <div className="relative w-32 h-32">
      <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
        <motion.circle
          cx="60" cy="60" r="54" fill="none"
          stroke="hsl(var(--primary))" strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - value / 100) }}
          transition={{ delay: 0.5, duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-primary">{value}%</span>
        <span className="text-xs text-muted-foreground mt-0.5">Ready</span>
      </div>
    </div>
  );
}

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Results() {
  const [revealStep, setRevealStep] = useState(-1);
  const [analyzing, setAnalyzing] = useState(true);

  useEffect(() => {
    const t0 = setTimeout(() => setAnalyzing(false), 2000);
    return () => clearTimeout(t0);
  }, []);

  useEffect(() => {
    if (!analyzing) {
      const timers = [0, 800, 1600, 2400, 3200].map((delay, i) =>
        setTimeout(() => setRevealStep(i), delay)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [analyzing]);

  const tooltipStyle = {
    backgroundColor: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "8px",
    color: "hsl(var(--foreground))",
    fontSize: "12px",
  };

  if (analyzing) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Brain className="w-6 h-6 text-primary ai-pulse" />
            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">AI Analysis in Progress</span>
          </div>
          <div className="flex gap-1.5 justify-center">
            {[0,1,2,3,4].map(i => (
              <motion.div
                key={i}
                className="w-1.5 rounded-full bg-primary"
                animate={{ height: ["16px", "32px", "16px"] }}
                transition={{ duration: 0.9, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-6">Generating your personalized roadmap...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 lg:px-8 min-h-[80vh]">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge variant="outline" className="glass mb-3 py-1 px-3">
              <Zap className="w-3 h-3 mr-1.5 text-primary" />
              Your Personalized Roadmap
            </Badge>
            <h1 className="text-3xl font-bold font-['Space_Grotesk']">Your Personalized Business Intelligence Report</h1>
            <p className="text-sm text-muted-foreground mt-1">
              AI has analyzed your skills, capital, and local market conditions to generate these high-viability opportunities.
              <Badge className="ml-2 bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs">📊 April 2026 inflation adjusted</Badge>
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" className="gap-1.5 border-border/50">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" asChild className="gap-1.5 border-border/50">
              <Link href="/assessment">
                <RefreshCw className="w-4 h-4" />
                Reassess
              </Link>
            </Button>
          </div>
        </div>

        {/* ── SECTION 1: Founder Profile ── */}
        <AnimatePresence>
          {revealStep >= 0 && (
            <motion.div variants={sectionVariant} initial="hidden" animate="visible">
              <Card className="glass border-primary/20 shadow-lg shadow-black/20 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Brain className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">Founder Profile</h2>
                    <span className="w-2 h-2 rounded-full bg-primary ai-pulse ml-1" />
                  </div>

                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center gap-3 shrink-0">
                      <FounderRing value={82} />
                      <p className="text-xs text-muted-foreground text-center">Overall Readiness</p>
                    </div>

                    <div className="flex-1 grid grid-cols-2 gap-3">
                      {[
                        { icon: MapPin, label: "Location", value: "🇪🇹 Ethiopia" },
                        { icon: GraduationCap, label: "Education", value: "Bachelor's Degree" },
                        { icon: DollarSign, label: "Capital", value: "ETB 25,000" },
                        { icon: TrendingUp, label: "Top Skill", value: "Digital Marketing" },
                      ].map((attr, i) => {
                        const Icon = attr.icon;
                        return (
                          <div key={i} className="p-3 rounded-lg bg-card border border-border/50 shadow-lg shadow-black/20">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{attr.label}</span>
                            </div>
                            <p className="text-sm font-semibold">{attr.value}</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex flex-col gap-2 justify-center shrink-0">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Founder Strengths</p>
                      {["Analytical Thinker", "Market Aware", "Resource Efficient"].map(s => (
                        <Badge key={s} className="bg-primary/15 text-primary border-primary/30 justify-center">{s}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SECTION 2: Business Model (DYNAMICALLY LINKED) ── */}
        <AnimatePresence>
          {revealStep >= 1 && (
            <motion.div variants={sectionVariant} initial="hidden" animate="visible">
              <Card className="glass border-border/50 shadow-lg shadow-black/20">
                <CardHeader className="p-6 pb-0">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">Highest Confidence Business Match</h2>
                    <span className="w-2 h-2 rounded-full bg-primary ai-pulse ml-1" />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 p-4 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{opportunities[0].readiness}% Match</p>
                          <h3 className="text-2xl font-bold font-['Space_Grotesk']">{opportunities[0].title}</h3>
                        </div>
                        <span className="text-4xl">🚀</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        This opportunity is optimized for your skill alignment in {opportunities[0].skills[0]} and current market demand in {opportunities[0].market}.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {insightChips.slice(0, 3).map((chip, i) => (
                          <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary ai-pulse" />
                            {chip.emoji} {chip.text}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 md:w-56">
                      {[
                        { label: "Startup Cost", value: opportunities[0].capital, color: "text-primary" },
                        { label: "Timeline", value: opportunities[0].timeline, color: "text-foreground" },
                        { label: "License", value: opportunities[0].permit, color: "text-amber-400" },
                        { label: "Viability", value: "Very High", color: "text-emerald-400" },
                      ].map((m, i) => (
                        <div key={i} className="p-3 rounded-lg bg-card border border-border/50 shadow-lg shadow-black/20">
                          <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                          <p className={`text-sm font-bold ${m.color}`}>{m.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SECTION 3: Capital Requirements ── */}
        <AnimatePresence>
          {revealStep >= 2 && (
            <motion.div variants={sectionVariant} initial="hidden" animate="visible">
              <Card className="glass border-border/50 shadow-lg shadow-black/20">
                <CardHeader className="p-6 pb-0">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">Capital Requirements</h2>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {capitalData.map((d, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.15 }}
                        className="p-4 rounded-xl bg-card border border-border/50 shadow-lg shadow-black/20"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="text-sm font-semibold">{d.phase}</p>
                            <p className="text-xs text-muted-foreground">{d.label}</p>
                          </div>
                          <Badge className="bg-primary/15 text-primary border-primary/30 text-xs">Phase {i + 1}</Badge>
                        </div>
                        <p className="text-2xl font-bold text-primary">ETB {d.etb.toLocaleString()}</p>
                        <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-primary rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(d.etb / 120000) * 100}%` }}
                            transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SECTION 4: Growth Timeline ── */}
        <AnimatePresence>
          {revealStep >= 3 && (
            <motion.div variants={sectionVariant} initial="hidden" animate="visible">
              <Card className="glass border-border/50 shadow-lg shadow-black/20">
                <CardHeader className="p-6 pb-0">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold">6-Month Revenue Trajectory</h2>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={growthData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                      <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} tickFormatter={v => `${v/1000}K`} />
                      <Tooltip
                        contentStyle={tooltipStyle}
                        formatter={(v: number) => [`ETB ${v.toLocaleString()}`, "Revenue"]}
                      />
                      <Line
                        type="monotone" dataKey="revenue"
                        stroke="hsl(var(--primary))" strokeWidth={2.5}
                        dot={{ fill: "hsl(var(--primary))", r: 4 }}
                        activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SECTION 5: IMPROVED Risks & Insights ── */}
        <AnimatePresence>
          {revealStep >= 4 && (
            <motion.div variants={sectionVariant} initial="hidden" animate="visible">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass border-border/50 shadow-lg shadow-black/20">
                  <CardHeader className="p-6 pb-0">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      <h2 className="text-lg font-semibold">Skills Gap Analysis</h2>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={skillGaps} layout="vertical" margin={{ left: 0, right: 10 }}>
                        <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} />
                        <YAxis type="category" dataKey="skill" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 11 }} width={110} />
                        <Tooltip contentStyle={tooltipStyle} />
                        <Bar dataKey="you" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                        <Bar dataKey="required" fill="hsl(var(--border))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="glass border-border/50 shadow-lg shadow-black/20">
                  <CardHeader className="p-6 pb-0">
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-primary" />
                      <h2 className="text-lg font-semibold">AI Insights</h2>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-3">
                    {insightChips.map((chip, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border/50 shadow-lg shadow-black/20"
                      >
                        <span className="text-lg">{chip.emoji}</span>
                        <p className="text-sm font-medium">{chip.text}</p>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* IMPROVED: Recommendations with Permits and Skill Badges */}
              <Card className="glass border-border/50 shadow-lg shadow-black/20 mt-6">
                <CardHeader className="p-6 pb-0">
                  <h2 className="text-lg font-semibold">All 6 Recommended Opportunities</h2>
                  <p className="text-sm text-muted-foreground">Ranked by readiness and Ethiopian market demand</p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {opportunities.map((opp, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="p-4 rounded-xl bg-card border border-border/50 shadow-lg shadow-black/20 hover:border-primary/30 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-sm font-semibold leading-snug">{opp.title}</h3>
                          <div className="text-right">
                            <span className="text-xl font-bold text-primary ml-2 shrink-0">{opp.readiness}%</span>
                            <p className="text-[10px] text-emerald-400 font-medium">Skill Match</p>
                          </div>
                        </div>

                        <div className="space-y-1.5 mb-3 pb-3 border-b border-border/50">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Capital Required</span>
                            <span className="font-medium text-primary">{opp.capital}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Primary Permit</span>
                            <span className="font-medium text-amber-400">{opp.permit}</span>
                          </div>
                          <div className="flex justify-between text-xs items-center">
                            <span className="text-muted-foreground">Market Status</span>
                            <Badge className={`text-xs border ${
                              opp.market.includes("Booming") || opp.market.includes("Hot")
                                ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                : "bg-primary/15 text-primary border-primary/30"
                            }`}>{opp.market}</Badge>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {opp.skills.map(s => (
                            <Badge key={s} className="text-xs bg-muted/50 text-muted-foreground border-border/50">{s}</Badge>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Final CTA */}
              <Card className="glass border-primary/20 shadow-lg shadow-black/20 mt-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary/10" />
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-bold mb-3 font-['Space_Grotesk']">Ready to Start Your Journey?</h2>
                  <p className="text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
                    Get detailed implementation guides, market analysis, and step-by-step roadmaps for any of these businesses.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button asChild className="glow-emerald gap-2">
                      <Link href="/coach">
                        Start AI Coach Session
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="gap-2 border-border/50">
                      <Download className="w-4 h-4" />
                      Download Business Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}