import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, DollarSign, Clock, Target, CheckCircle, AlertTriangle, MessageSquare } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";

type Recommendation = {
  id: string;
  name: string;
  matchPercentage: number;
  startupCost: string;
  riskLevel: "Low" | "Medium" | "High";
  profitPotential: "Low" | "Medium" | "High";
  readinessScore: number;
  description: string;
  icon: string;
  longDescription: string;
  steps: string[];
  risks: string[];
  timeline: string;
  market: string;
};

const businesses: Record<string, Recommendation> = {
  "1": {
    id: "1", name: "Freelance Writing", matchPercentage: 92, startupCost: "ETB 25K – 100K",
    riskLevel: "Low", profitPotential: "Medium", readinessScore: 85,
    icon: "✍️",
    description: "Leverage communication skills to build a writing business.",
    longDescription: "Build a professional writing service targeting Ethiopian businesses, startups, and international clients who need quality content. This business can be started from home with minimal equipment and scaled rapidly through content platforms and direct client acquisition.",
    steps: ["Set up professional portfolio website", "Join platforms (Upwork, Fiverr, PeoplePerHour)", "Target local Ethiopian startups and NGOs", "Build long-term retainer clients", "Hire junior writers to scale output"],
    risks: ["Income inconsistency in first 3 months", "Competition from global writers", "Exchange rate volatility"],
    timeline: "2–4 weeks to first client",
    market: "Growing fast (+28% YoY)",
  },
  "2": {
    id: "2", name: "Digital Marketing Agency", matchPercentage: 88, startupCost: "ETB 100K – 400K",
    riskLevel: "Medium", profitPotential: "High", readinessScore: 72,
    icon: "📱",
    description: "Help businesses grow their online presence.",
    longDescription: "Ethiopian businesses are rapidly moving online but lack the expertise to market effectively. A digital marketing agency can fill this gap by offering social media management, SEO, Google Ads, and content strategy to local SMEs.",
    steps: ["Build a portfolio with 2–3 free/discounted clients", "Register business legally (Addis Ababa)", "Hire a part-time graphic designer", "Price packages: ETB 3K–15K/month retainer", "Expand to Instagram, TikTok advertising"],
    risks: ["Client acquisition takes 1–2 months", "Requires staying current on platform changes", "Managing multiple client expectations"],
    timeline: "2–3 months to consistent revenue",
    market: "Booming (+32% YoY)",
  },
  "3": {
    id: "3", name: "Photography Services", matchPercentage: 85, startupCost: "ETB 50K – 250K",
    riskLevel: "Low", profitPotential: "Medium", readinessScore: 78,
    icon: "📸",
    description: "Offer photography for events, products, and more.",
    longDescription: "Professional photography is in high demand across Ethiopia for weddings, corporate events, product photography for e-commerce, and social media content creation. A skilled photographer can earn ETB 5,000–25,000 per event.",
    steps: ["Invest in camera equipment (entry-level DSLR + lens)", "Build Instagram portfolio", "Partner with wedding planners and event companies", "Offer product photography for local e-commerce sellers", "Create photography packages for different budgets"],
    risks: ["High upfront equipment cost", "Seasonal demand for events", "Post-processing time investment"],
    timeline: "1–2 months",
    market: "Steadily growing",
  },
  "4": {
    id: "4", name: "Online Tutoring", matchPercentage: 82, startupCost: "ETB 25K – 150K",
    riskLevel: "Low", profitPotential: "Medium", readinessScore: 80,
    icon: "📚",
    description: "Teach students online in your area of expertise.",
    longDescription: "With Ethiopia's growing internet penetration and the post-COVID normalization of online learning, tutoring is a high-demand service. University entrance exam prep, English language teaching, and coding bootcamps are particularly lucrative.",
    steps: ["Identify your top subject expertise", "Create curriculum and lesson plans", "Set up on Zoom or Google Meet", "Market via Telegram groups and Facebook", "Build a website with booking system"],
    risks: ["Requires consistent student engagement", "Competition from larger tutoring platforms", "Infrastructure (internet reliability)"],
    timeline: "Immediate start possible",
    market: "Growing (+45% YoY)",
  },
  "5": {
    id: "5", name: "E-commerce Store", matchPercentage: 78, startupCost: "ETB 250K – 750K",
    riskLevel: "Medium", profitPotential: "High", readinessScore: 68,
    icon: "🛍️",
    description: "Start selling products online.",
    longDescription: "Ethiopia's e-commerce sector is booming, driven by smartphone penetration and growing middle class spending. Niches like fashion, electronics accessories, beauty products, and traditional Ethiopian crafts have strong demand.",
    steps: ["Choose a product niche with strong local demand", "Source suppliers (Merkato, Addis Ababa market)", "Build a Shopify or Wix store", "Set up Telebirr or CBE payment integration", "Market via Instagram, Facebook, and Telegram"],
    risks: ["Inventory management complexity", "Logistics and last-mile delivery challenges", "Returns and customer service demands"],
    timeline: "2–3 months to launch",
    market: "Booming (+28% YoY)",
  },
  "6": {
    id: "6", name: "Social Media Management", matchPercentage: 75, startupCost: "ETB 50K – 200K",
    riskLevel: "Low", profitPotential: "Medium", readinessScore: 70,
    icon: "📊",
    description: "Manage social media for small businesses.",
    longDescription: "Ethiopian small businesses need help building their online presence. A social media management service can handle content creation, posting schedules, community management, and advertising for multiple clients simultaneously.",
    steps: ["Build a sample content portfolio", "Target local restaurants, boutiques, and clinics", "Use Canva for content creation", "Price packages from ETB 2,000–8,000/month", "Scale by hiring content creators"],
    risks: ["Low perceived value by some clients", "Multiple client coordination", "Constant content creation demand"],
    timeline: "2–4 weeks to first client",
    market: "Growing steadily",
  },
};

const revenueData = [
  { month: "M1", revenue: 2000 },
  { month: "M2", revenue: 3500 },
  { month: "M3", revenue: 5200 },
  { month: "M4", revenue: 7800 },
  { month: "M5", revenue: 11500 },
  { month: "M6", revenue: 15800 },
];

export default function BusinessDetail() {
  const [, params] = useRoute("/business/:id");
  const biz = businesses[params?.id ?? "1"] ?? businesses["1"];

  const tooltipStyle = {
    backgroundColor: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "8px",
    color: "hsl(var(--foreground))",
    fontSize: "12px",
  };

  const riskColor = {
    Low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    High: "bg-red-500/15 text-red-400 border-red-500/30",
  };

  const CIRC = 2 * Math.PI * 36;

  return (
    <div className="py-10 px-4 lg:px-8 min-h-[80vh]">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/dashboard">
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6" data-testid="link-back">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </Link>

          {/* Hero */}
          <Card className="glass border-primary/20 shadow-lg shadow-black/20 mb-6 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="text-6xl shrink-0">{biz.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h1 className="text-3xl font-bold font-['Space_Grotesk']">{biz.name}</h1>
                    <Badge className={`border ${riskColor[biz.riskLevel]}`}>{biz.riskLevel} Risk</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{biz.longDescription}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { icon: Target, label: "Match", value: `${biz.matchPercentage}%` },
                      { icon: DollarSign, label: "Capital", value: biz.startupCost },
                      { icon: Clock, label: "Timeline", value: biz.timeline },
                      { icon: TrendingUp, label: "Market", value: biz.market },
                    ].map((m, i) => {
                      const Icon = m.icon;
                      return (
                        <div key={i} className="p-3 rounded-lg bg-card border border-border/50 shadow-lg shadow-black/20">
                          <div className="flex items-center gap-1.5 mb-1">
                            <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{m.label}</span>
                          </div>
                          <p className="text-sm font-semibold text-primary">{m.value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Readiness Ring */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="relative w-20 h-20">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="36" fill="none" stroke="hsl(var(--border))" strokeWidth="5" />
                      <motion.circle
                        cx="40" cy="40" r="36" fill="none"
                        stroke="hsl(var(--primary))" strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray={CIRC}
                        initial={{ strokeDashoffset: CIRC }}
                        animate={{ strokeDashoffset: CIRC * (1 - biz.readinessScore / 100) }}
                        transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-bold text-primary">{biz.readinessScore}%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 text-center">Readiness</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Steps */}
            <Card className="glass border-border/50 shadow-lg shadow-black/20">
              <CardHeader className="p-6 pb-0">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold">Launch Roadmap</h2>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {biz.steps.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                      data-testid={`step-${i}`}
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-sm">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risks */}
            <Card className="glass border-border/50 shadow-lg shadow-black/20">
              <CardHeader className="p-6 pb-0">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg font-semibold">Risks to Manage</h2>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {biz.risks.map((risk, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.12 }}
                      className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      <p className="text-sm">{risk}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Projection */}
          <Card className="glass border-border/50 shadow-lg shadow-black/20 mb-6">
            <CardHeader className="p-6 pb-0">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">6-Month Revenue Projection</h2>
                <span className="w-2 h-2 rounded-full bg-primary ai-pulse ml-1" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} />
                  <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} tickFormatter={v => `${v/1000}K`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`ETB ${v.toLocaleString()}`, "Revenue"]} />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2.5}
                    dot={{ fill: "hsl(var(--primary))", r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="flex flex-wrap gap-3">
            <Button asChild className="glow-emerald gap-2" data-testid="button-coach">
              <Link href="/coach">
                <MessageSquare className="w-4 h-4" />
                Discuss with AI Coach
              </Link>
            </Button>
            <Button variant="outline" asChild className="gap-2 border-border/50" data-testid="button-results">
              <Link href="/results">
                <ArrowLeft className="w-4 h-4" />
                Back to Full Results
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
