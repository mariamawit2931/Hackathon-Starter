import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, DollarSign, Zap, BarChart3, MessageSquare } from "lucide-react";

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
};

const mockRecommendations: Recommendation[] = [
  { id: "1", name: "Freelance Writing", matchPercentage: 92, startupCost: "ETB 25K – 100K", riskLevel: "Low", profitPotential: "Medium", readinessScore: 85, description: "Leverage communication skills to build a writing business.", icon: "✍️" },
  { id: "2", name: "Digital Marketing Agency", matchPercentage: 88, startupCost: "ETB 100K – 400K", riskLevel: "Medium", profitPotential: "High", readinessScore: 72, description: "Help businesses grow their online presence.", icon: "📱" },
  { id: "3", name: "Photography Services", matchPercentage: 85, startupCost: "ETB 50K – 250K", riskLevel: "Low", profitPotential: "Medium", readinessScore: 78, description: "Offer photography for events, products, and more.", icon: "📸" },
  { id: "4", name: "Online Tutoring", matchPercentage: 82, startupCost: "ETB 25K – 150K", riskLevel: "Low", profitPotential: "Medium", readinessScore: 80, description: "Teach students online in your area of expertise.", icon: "📚" },
  { id: "5", name: "E-commerce Store", matchPercentage: 78, startupCost: "ETB 250K – 750K", riskLevel: "Medium", profitPotential: "High", readinessScore: 68, description: "Start selling products online.", icon: "🛍️" },
  { id: "6", name: "Social Media Management", matchPercentage: 75, startupCost: "ETB 50K – 200K", riskLevel: "Low", profitPotential: "Medium", readinessScore: 70, description: "Manage social media for small businesses.", icon: "📊" },
];

const CIRCUMFERENCE = 2 * Math.PI * 28;

function MatchRing({ value }: { value: number }) {
  const offset = CIRCUMFERENCE * (1 - value / 100);
  return (
    <div className="relative w-16 h-16">
      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--border))" strokeWidth="4" />
        <motion.circle
          cx="32" cy="32" r="28" fill="none"
          stroke="hsl(var(--primary))" strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={{ strokeDashoffset: offset }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold">{value}%</span>
      </div>
    </div>
  );
}

const riskColor = {
  Low: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  High: "bg-red-500/15 text-red-400 border-red-500/30",
};

const potentialColor = {
  Low: "bg-muted text-muted-foreground border-border/50",
  Medium: "bg-primary/15 text-primary border-primary/30",
  High: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

export default function Dashboard() {
  const [sortBy, setSortBy] = useState<"match" | "cost" | "readiness">("match");

  const sorted = [...mockRecommendations].sort((a, b) => {
    if (sortBy === "match") return b.matchPercentage - a.matchPercentage;
    if (sortBy === "readiness") return b.readinessScore - a.readinessScore;
    return a.startupCost.localeCompare(b.startupCost);
  });

  const summaryCards = [
    { label: "Overall Readiness", value: "82%", icon: Zap, color: "text-primary" },
    { label: "Opportunities", value: "12+", icon: TrendingUp, color: "text-emerald-400" },
    { label: "Avg. Startup Cost", value: "ETB 87K", icon: DollarSign, color: "text-amber-400" },
    { label: "Risk Assessment", value: "Medium", icon: BarChart3, color: "text-blue-400" },
  ];

  return (
    <div className="py-10 px-4 lg:px-8 min-h-[80vh]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold font-['Space_Grotesk'] mb-1">Your Business Matches</h1>
          <p className="text-muted-foreground text-sm">Based on your assessment — ranked by AI compatibility score.</p>
        </motion.div>

        {/* Summary Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {summaryCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="glass border-border/50 shadow-lg shadow-black/20 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{card.label}</p>
                        <p className="text-2xl font-bold">{card.value}</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center border border-border/50">
                        <Icon className={`w-5 h-5 ${card.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Sort by:</span>
          {[
            { value: "match" as const, label: "Best Match" },
            { value: "readiness" as const, label: "Readiness" },
            { value: "cost" as const, label: "Lowest Cost" },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setSortBy(opt.value)}
              data-testid={`button-sort-${opt.value}`}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
                sortBy === opt.value
                  ? "bg-primary/20 text-primary border-primary/40 shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                  : "border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
          {sorted.map((rec, i) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <Link href={`/business/${rec.id}`}>
                <Card
                  className="glass border-border/50 shadow-lg shadow-black/20 hover:border-primary/30 hover:shadow-primary/10 transition-all duration-300 cursor-pointer h-full"
                  data-testid={`card-recommendation-${rec.id}`}
                >
                  <CardContent className="p-6">
                    {/* Top row */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className="text-4xl">{rec.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-1">{rec.name}</h3>
                        <p className="text-sm text-muted-foreground leading-snug">{rec.description}</p>
                      </div>
                      <MatchRing value={rec.matchPercentage} />
                    </div>

                    {/* Readiness bar */}
                    <div className="mb-4 pb-4 border-b border-border/50">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-muted-foreground">Readiness Score</span>
                        <span className="text-xs font-bold text-primary">{rec.readinessScore}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${rec.readinessScore}%` }}
                          transition={{ delay: 0.5 + i * 0.06, duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Meta grid */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Startup Cost</p>
                        <p className="text-sm font-semibold text-primary">{rec.startupCost}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                        <Badge className={`text-xs border ${riskColor[rec.riskLevel]}`}>{rec.riskLevel}</Badge>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Match Score</p>
                        <p className="text-sm font-semibold">{rec.matchPercentage}% — Perfect Fit</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Profit Potential</p>
                        <Badge className={`text-xs border ${potentialColor[rec.profitPotential]}`}>{rec.profitPotential}</Badge>
                      </div>
                    </div>

                    <Button className="w-full gap-2 glow-emerald" data-testid={`button-view-${rec.id}`}>
                      View Details
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* AI Coach CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass border-primary/20 shadow-lg shadow-black/20 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary/10" />
            <CardContent className="p-8 text-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-['Space_Grotesk']">Need Help Deciding?</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                Our AI Business Coach can answer your questions and help you explore these opportunities in detail.
              </p>
              <Button asChild className="glow-emerald" data-testid="button-coach">
                <Link href="/coach">Chat with AI Coach</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
