import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Brain, TrendingUp, Users, MapPin, ArrowRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const teamMembers = [
  { name: "Abebe Girma", role: "Co-founder & CEO", bio: "Former McKinsey consultant, 10 years building Ethiopian startups.", initials: "AG" },
  { name: "Meron Tadesse", role: "Co-founder & CTO", bio: "Ex-Google engineer, MSc Computer Science from Addis Ababa University.", initials: "MT" },
  { name: "Yonas Bekele", role: "Head of Market Intelligence", bio: "Economist specialising in East African emerging markets.", initials: "YB" },
  { name: "Tigist Haile", role: "Head of Product", bio: "Built and scaled 3 tech products in the MENA and Africa region.", initials: "TH" },
];

const values = [
  { icon: Target, title: "Precision First", desc: "Every recommendation is grounded in real Ethiopian market data — never generic global advice." },
  { icon: Brain, title: "AI with Purpose", desc: "We apply machine intelligence to close the opportunity gap for African founders who lack access to elite networks." },
  { icon: TrendingUp, title: "Growth Obsessed", desc: "We measure success by how many founders we help move from idea to income." },
  { icon: Users, title: "Community Driven", desc: "We build with founders, not just for them. Our product roadmap is shaped by real users in Addis Ababa and beyond." },
];

export default function About() {
  return (
    <div className="min-h-[80vh] py-16 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Hero */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <Badge variant="outline" className="glass mb-4 py-1 px-3">
            <MapPin className="w-3 h-3 mr-1.5 text-primary" />
            Built in Addis Ababa, for Africa
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">
            We exist to turn African potential <br className="hidden md:block" /> into African prosperity.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            BizPath AI is an intelligence platform that gives Ethiopian entrepreneurs the same quality of strategic guidance previously reserved for MBA graduates and elite consulting clients.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div {...fadeUp(0.1)}>
          <Card className="glass border-primary/20 shadow-lg shadow-black/20 mb-12 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
            <CardContent className="p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">Our Mission</p>
                  <h2 className="text-2xl font-bold font-['Space_Grotesk'] mb-4">Close the founder knowledge gap in Africa.</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Most Ethiopian graduates have the intelligence, drive, and education to build great businesses — but lack access to market data, strategic frameworks, and business mentorship. BizPath AI solves this with technology.
                  </p>
                </div>
                <div>
                  <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-3">By the Numbers</p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: "12,000+", label: "Assessments completed" },
                      { value: "6", label: "East African countries" },
                      { value: "82%", label: "Avg. founder readiness" },
                      { value: "2023", label: "Founded in Addis Ababa" },
                    ].map((s, i) => (
                      <div key={i} className="p-3 rounded-lg bg-card border border-border/50">
                        <p className="text-2xl font-bold text-primary">{s.value}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Values */}
        <motion.div {...fadeUp(0.15)} className="mb-14">
          <h2 className="text-2xl font-bold font-['Space_Grotesk'] mb-6">What we stand for</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Card key={i} className="glass border-border/50 shadow-lg shadow-black/20 hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div {...fadeUp(0.2)} className="mb-14">
          <h2 className="text-2xl font-bold font-['Space_Grotesk'] mb-6">The team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {teamMembers.map((member, i) => (
              <Card key={i} className="glass border-border/50 shadow-lg shadow-black/20 hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                    {member.initials}
                  </div>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-xs text-primary mb-1">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeUp(0.25)}>
          <Card className="glass border-primary/20 shadow-lg shadow-black/20 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary/10" />
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold font-['Space_Grotesk'] mb-3">Ready to start your journey?</h2>
              <p className="text-sm text-muted-foreground mb-6">Take the free assessment and get your personalised roadmap in minutes.</p>
              <Button asChild className="glow-emerald gap-2" data-testid="button-cta-about">
                <Link href="/assessment">
                  Start Free Assessment
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
