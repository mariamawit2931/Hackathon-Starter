'use client'
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Target, Zap, ArrowLeft, RefreshCw } from "lucide-react";

// --- Types ---
interface Opportunity {
  title: string;
  readiness: number;
  capital: string;
  market: string;
  permit: string;
}

interface BizPathAPIResponse {
  success: boolean;
  data?: {
    opportunities: Opportunity[];
  };
  error?: string;
}

export default function Results() {
  const [, setLocation] = useLocation();
  const [revealStep, setRevealStep] = useState(-1);
  const [analyzing, setAnalyzing] = useState(true);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Get the REAL choices the user made in the Assessment
        const savedProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");

        // 2. Fetch from your Backend
        const response = await fetch("http://localhost:3000/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            capital: savedProfile.capital || "ETB 25,000",
            background: savedProfile.background || "Student",
            skills: savedProfile.skills || "General",
            idea: savedProfile.idea || "Entrepreneurship",
            location: savedProfile.location || "Ethiopia"
          }),
        });

        if (!response.ok) throw new Error(`Server error: ${response.status}`);

        const result: BizPathAPIResponse = await response.json();

        // 3. Handle the Response wrapper
        if (result.success && result.data?.opportunities) {
          setOpportunities(result.data.opportunities);
        } else {
          setError(result.error || "The AI could not generate a roadmap at this time.");
        }

        // Keep the "Analyzing" vibe for a moment
        setTimeout(() => setAnalyzing(false), 2000);
      } catch (err) {
        console.error("Backend Connection Error:", err);
        setError("Could not reach the AI server. Please ensure the backend is running on port 3000.");
        setAnalyzing(false);
      }
    };

    fetchData();
  }, []);

  // Animation controller
  useEffect(() => {
    if (!analyzing && opportunities.length > 0) {
      const timers = [0, 600, 1200].map((delay, i) =>
        setTimeout(() => setRevealStep(i), delay)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [analyzing, opportunities]);

  // --- Loading State ---
  if (analyzing) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="mb-8"
        >
          <RefreshCw className="w-12 h-12 text-primary opacity-50" />
        </motion.div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground font-bold uppercase tracking-tighter">BizPath AI is Calculating...</span>
          </div>
          <div className="flex gap-2 justify-center">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="max-w-md border-destructive/50 bg-destructive/5">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold text-destructive mb-2">Connection Failed</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={() => setLocation("/assessment")} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // --- Main Results View ---
  return (
    <div className="py-10 px-4 max-w-5xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Badge variant="outline" className="mb-3 py-1 px-3 border-primary/30 text-primary">
            <Zap className="w-3 h-3 mr-1.5 fill-primary" />
            Market Intelligence Analysis
          </Badge>
          <h1 className="text-4xl font-bold font-['Space_Grotesk'] text-white">Your Business Roadmap</h1>
          <p className="text-muted-foreground mt-2">Personalized opportunities for the Ethiopian market.</p>
        </div>
        <Button variant="ghost" onClick={() => setLocation("/")} className="text-muted-foreground">
          New Search
        </Button>
      </header>

      {/* Top Opportunity */}
      <AnimatePresence>
        {revealStep >= 0 && opportunities[0] && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-primary/40 bg-primary/5 backdrop-blur-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4">
                 <Badge className="bg-primary text-black font-bold">TOP MATCH</Badge>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Target className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase">Optimized Selection</span>
                </div>
                <h2 className="text-4xl md:text-5xl font