'use client'
import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, ArrowLeft, Zap, TrendingUp, CheckCircle } from "lucide-react";

// --- Constants ---
const SKILLS = ["Digital Marketing", "Coding", "Writing", "Design", "Sales", "Customer Service", "Project Management", "Data Analysis", "Video Production", "Photography", "Teaching", "Accounting"];
const PASSIONS = ["Technology", "Business", "Education", "Health", "Environment", "Fashion", "Food", "Entertainment", "Travel", "Finance", "Sports", "Arts & Culture"];
const COUNTRIES = ["Ethiopia", "Kenya", "Nigeria", "South Africa", "Rwanda", "Uganda", "Tanzania", "Ghana", "Senegal", "Other"];

const EDUCATION_LEVELS = [
  { label: "No Formal Degree", sub: "Hustle Mode — experience over credentials" },
  { label: "High School", sub: "Secondary school graduate" },
  { label: "Diploma / TVET", sub: "Technical or vocational training" },
  { label: "Bachelor's Degree", sub: "Undergraduate university degree" },
  { label: "Master's Degree", sub: "Graduate-level education" },
];

const CAPITAL_PRESETS = [
  { label: "ETB 5K", value: 5000 },
  { label: "ETB 25K", value: 25000 },
  { label: "ETB 100K", value: 100000 },
  { label: "ETB 250K", value: 250000 },
];

const AI_STEPS = [
  "Understanding your entrepreneurial profile...",
  "Analyzing Addis Ababa market demand...",
  "Matching your skills with real opportunities...",
  "Estimating profit potential based on ETB rates...",
];

export default function Assessment() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [capital, setCapital] = useState(25000);
  const [selectedCountry, setSelectedCountry] = useState("Ethiopia");
  const [selectedEducation, setSelectedEducation] = useState("Bachelor's Degree");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedPassions, setSelectedPassions] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeAiStep, setActiveAiStep] = useState(-1);
  const [error, setError] = useState<string | null>(null);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const togglePassion = (passion: string) => {
    setSelectedPassions(prev => prev.includes(passion) ? prev.filter(p => p !== passion) : [...prev, passion]);
  };

  const startProcessing = async () => {
    const profileData = {
      capital: `ETB ${capital.toLocaleString()}`,
      background: selectedEducation,
      skills: selectedSkills.join(", "),
      idea: selectedPassions.join(", "),
      location: selectedCountry
    };

    setIsProcessing(true);
    setError(null);
    setActiveAiStep(0);

    try {
      // FIX 1: Using relative path for the merge and future hosting
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });

      const result = await response.json();

      if (result.success) {
        // FIX 2: Save the actual AI result data to localStorage 
        // This ensures result.tsx has the data ready before it even loads
        localStorage.setItem("bizpath_results", JSON.stringify(result.data));

        // Vibe animation for the judges
        for (let i = 1; i < AI_STEPS.length; i++) {
          setActiveAiStep(i);
          await new Promise(r => setTimeout(r, 800));
        }
        
        setTimeout(() => setLocation("/results"), 500);
      } else {
        throw new Error(result.error || "AI Generation failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Connection Failed. Check if the backend is running on Port 3000.");
      setIsProcessing(false);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(s => s + 1);
    else startProcessing();
  };

  if (isProcessing) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-black text-white">
        <div className="text-center max-w-md w-full">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <TrendingUp className="w-12 h-12 text-emerald-500 animate-pulse absolute inset-0 m-auto" />
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
              <motion.circle 
                cx="48" cy="48" r="40" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3 }}
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-6 font-['Space_Grotesk'] text-emerald-500">BizPath AI Analyzing...</h2>
          <div className="space-y-3 text-left">
            {AI_STEPS.map((step, i) => (
              <motion.div key={i} animate={{ opacity: i <= activeAiStep ? 1 : 0.2 }} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${i < activeAiStep ? "bg-emerald-500" : "bg-white/10"}`}>
                  {i < activeAiStep && <CheckCircle className="w-3 h-3 text-black" />}
                </div>
                <span className="text-sm">{step}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-12 px-4 bg-black">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 mb-4 px-4 py-1">
            <Zap className="w-3 h-3 mr-2 fill-current" /> AI-Driven Assessment
          </Badge>
          <h1 className="text-3xl font-bold text-white font-['Space_Grotesk']">Build Your Business Roadmap</h1>
          {error && <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">{error}</div>}
        </div>

        <Card className="bg-white/5 border-white/10 backdrop-blur-md mb-8">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <h2 className="text-2xl font-bold text-white text-center">Starting Capital</h2>
                  <div className="text-center py-6 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-5xl font-bold text-emerald-500">ETB {capital.toLocaleString()}</span>
                    <Slider value={[capital]} onValueChange={v => setCapital(v[0])} min={5000} max={500000} step={5000} className="my-10 px-6" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-4">
                      {CAPITAL_PRESETS.map(p => (
                        <Button key={p.value} variant={capital === p.value ? "default" : "outline"} onClick={() => setCapital(p.value)} className="text-xs">{p.label}</Button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Location & Education</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {COUNTRIES.map(c => (
                      <Button key={c} variant={selectedCountry === c ? "default" : "outline"} onClick={() => setSelectedCountry(c)} className={selectedCountry === c ? "bg-emerald-500" : ""}>{c === "Ethiopia" ? "🇪🇹 " : ""}{c}</Button>
                    ))}
                  </div>
                  <div className="space-y-2 mt-6">
                    {EDUCATION_LEVELS.map(e => (
                      <button key={e.label} onClick={() => setSelectedEducation(e.label)} className={`w-full p-4 rounded-xl border text-left transition-all ${selectedEducation === e.label ? "border-emerald-500 bg-emerald-500/10" : "border-white/10 hover:bg-white/5"}`}>
                        <p className="font-bold text-white text-sm">{e.label}</p>
                        <p className="text-xs text-white/40">{e.sub}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
                  <h2 className="text-2xl font-bold text-white">Skills & Passions</h2>
                  <div className="space-y-4">
                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Your Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {SKILLS.map(s => (
                        <Badge key={s} variant={selectedSkills.includes(s) ? "default" : "outline"} className={`cursor-pointer py-2 px-4 rounded-full ${selectedSkills.includes(s) ? "bg-emerald-500" : ""}`} onClick={() => toggleSkill(s)}>{s}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Your Passions</p>
                    <div className="flex flex-wrap gap-2">
                      {PASSIONS.map(p => (
                        <Badge key={p} variant={selectedPassions.includes(p) ? "secondary" : "outline"} className={`cursor-pointer py-2 px-4 rounded-full ${selectedPassions.includes(p) ? "bg-emerald-500/20 text-emerald-500" : ""}`} onClick={() => togglePassion(p)}>{p}</Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 text-center">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h2 className="text-3xl font-bold text-white font-['Space_Grotesk']">Ready for Analysis?</h2>
                  <p className="text-white/60">We've gathered your profile. Our AI is ready to map out your business roadmap for {selectedCountry}.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <Button variant="ghost" className="text-white/40 hover:text-white" onClick={() => setCurrentStep(s => s - 1)} disabled={currentStep === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold px-8 transition-all hover:scale-105" onClick={handleNext} disabled={currentStep === 2 && (selectedSkills.length < 1 || selectedPassions.length < 1)}>
            {currentStep === 3 ? "Generate My Roadmap" : "Continue"} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}