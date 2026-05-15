'use client'
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, ArrowLeft, Zap, TrendingUp, CheckCircle } from "lucide-react";

const SKILLS = [
  "Digital Marketing", "Coding", "Writing", "Design", "Sales",
  "Customer Service", "Project Management", "Data Analysis",
  "Video Production", "Photography", "Teaching", "Accounting"
];

const PASSIONS = [
  "Technology", "Business", "Education", "Health", "Environment",
  "Fashion", "Food", "Entertainment", "Travel", "Finance",
  "Sports", "Arts & Culture"
];

const COUNTRIES = [
  "Ethiopia", "Kenya", "Nigeria", "South Africa", "Rwanda",
  "Uganda", "Tanzania", "Ghana", "Senegal", "Other"
];

const EDUCATION_LEVELS = [
  { label: "No Formal Degree", sub: "Hustle Mode — experience over credentials" },
  { label: "High School", sub: "Secondary school graduate" },
  { label: "Diploma / TVET", sub: "Technical or vocational training" },
  { label: "Bachelor's Degree", sub: "Undergraduate university degree" },
  { label: "Master's Degree", sub: "Graduate-level education" },
  { label: "PhD", sub: "Doctoral research level" },
];

const CAPITAL_PRESETS = [
  { label: "ETB 5K", value: 5000 },
  { label: "ETB 25K", value: 25000 },
  { label: "ETB 100K", value: 100000 },
  { label: "ETB 250K", value: 250000 },
];

const AI_STEPS = [
  "Understanding your entrepreneurial profile...",
  "Analyzing Ethiopian market demand...",
  "Matching your skills with real opportunities...",
  "Estimating profit potential...",
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

  const capitalInUSD = Math.round(capital / 50);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const togglePassion = (passion: string) => {
    setSelectedPassions(prev =>
      prev.includes(passion) ? prev.filter(p => p !== passion) : [...prev, passion]
    );
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(s => s + 1);
    } else {
      startProcessing();
    }
  };

  const startProcessing = () => {
    setIsProcessing(true);
    setActiveAiStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < AI_STEPS.length) {
        setActiveAiStep(step);
      } else {
        clearInterval(interval);
        setTimeout(() => setLocation("/results"), 800);
      }
    }, 750);
  };

  const canProceed = () => {
    if (currentStep === 2) return selectedSkills.length >= 2 && selectedPassions.length >= 2;
    return true;
  };

  const stepTitles = ["Capital", "Background", "Skills & Passion", "Review"];

  if (isProcessing) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md w-full"
        >
          <div className="relative w-24 h-24 mx-auto mb-8">
            <svg className="w-24 h-24 -rotate-90 absolute inset-0" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
              <motion.circle
                cx="48" cy="48" r="40" fill="none"
                stroke="hsl(var(--primary))" strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <TrendingUp className="w-10 h-10 text-primary ai-pulse" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-2 font-['Space_Grotesk']"> We found business opportunities tailored for you</h2>
          <p className="text-muted-foreground text-sm mb-10">Our AI is analyzing real Ethiopian market data and identifying the most viable business opportunities for your profile...</p>

          <div className="space-y-3 text-left">
            {AI_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: i <= activeAiStep ? 1 : 0.3, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/50"
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${
                  i < activeAiStep ? "bg-primary text-white" :
                  i === activeAiStep ? "bg-primary/30 border-2 border-primary" : "bg-muted"
                }`}>
                  {i < activeAiStep ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : i === activeAiStep ? (
                    <span className="w-2 h-2 rounded-full bg-primary ai-pulse block" />
                  ) : null}
                </div>
                <span className={`text-sm transition-colors duration-300 ${
                  i <= activeAiStep ? "text-foreground" : "text-muted-foreground"
                }`}>{step}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-12 px-4 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="glass mb-4 py-1 px-3">
            <Zap className="w-3 h-3 mr-1.5 text-primary" />
            AI Business Assessment
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] mb-2">Build Your Business Roadmap</h1>
          <p className="text-muted-foreground">Answer a few questions to discover businesses you can start today.</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex gap-1.5 mb-3">
            {[0,1,2,3].map(s => (
              <div
                key={s}
                className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
                  s <= currentStep ? "bg-primary shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-muted"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Step {currentStep + 1} of 4</span>
            <span className="text-primary font-medium">{stepTitles[currentStep]}</span>
          </div>
        </div>

        {/* Step Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="glass border-primary/20 shadow-lg shadow-black/20 min-h-[420px] mb-6">
              <CardContent className="p-6">

                {/* Step 0: Capital */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-1 font-['Space_Grotesk']">What capital do you have?</h2>
                      <p className="text-muted-foreground text-sm">This helps match you with businesses you can actually start right now.</p>
                    </div>

                    <div className="bg-card rounded-xl p-6 border border-border/50 shadow-lg shadow-black/20">
                      <div className="text-center mb-6">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Available Capital</p>
                        <div className="flex items-baseline justify-center gap-3">
                          <span className="text-5xl font-bold text-primary font-['Space_Grotesk']">ETB {capital.toLocaleString()}</span>
                          <span className="text-xl text-muted-foreground">(~${capitalInUSD.toLocaleString()})</span>
                        </div>
                      </div>

                      <Slider
                        value={[capital]}
                        onValueChange={v => setCapital(v[0])}
                        min={500}
                        max={500000}
                        step={500}
                        className="w-full mb-4"
                        data-testid="slider-capital"
                      />

                      <div className="flex justify-between text-xs text-muted-foreground mb-4">
                        <span>ETB 500</span>
                        <span>ETB 500,000+</span>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {CAPITAL_PRESETS.map(preset => (
                          <button
                            key={preset.value}
                            onClick={() => setCapital(preset.value)}
                            data-testid={`button-preset-${preset.label}`}
                            className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all duration-200 ${
                              capital === preset.value
                                ? "border-primary bg-primary/20 text-primary"
                                : "border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground bg-card/50 border border-border/50 rounded-lg p-3">
                      Include cash savings, family support, loans you can secure, or inventory you already own.
                    </p>
                  </div>
                )}

                {/* Step 1: Background */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-1 font-['Space_Grotesk']">Tell us about yourself</h2>
                      <p className="text-muted-foreground text-sm">Your background helps us match you with realistic opportunities.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-3">Country / Region</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {COUNTRIES.map(country => (
                          <button
                            key={country}
                            onClick={() => setSelectedCountry(country)}
                            data-testid={`button-country-${country}`}
                            className={`px-3 py-2.5 rounded-lg border text-sm transition-all duration-200 ${
                              selectedCountry === country
                                ? "border-primary bg-primary/15 text-primary font-semibold shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                                : "border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                            }`}
                          >
                            {country === "Ethiopia" ? "🇪🇹 " : ""}{country}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-3">Education / Experience Level</label>
                      <div className="space-y-2">
                        {EDUCATION_LEVELS.map(level => (
                          <button
                            key={level.label}
                            onClick={() => setSelectedEducation(level.label)}
                            data-testid={`button-education-${level.label}`}
                            className={`w-full px-4 py-3 rounded-lg border text-left transition-all duration-200 ${
                              selectedEducation === level.label
                                ? "border-primary bg-primary/15 shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                                : "border-border/50 hover:border-primary/30"
                            }`}
                          >
                            <p className={`text-sm font-medium ${selectedEducation === level.label ? "text-primary" : "text-foreground"}`}>{level.label}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{level.sub}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Skills & Passions */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-1 font-['Space_Grotesk']">Your skills & passions</h2>
                      <p className="text-muted-foreground text-sm">Select what you are good at and what you love doing (min. 2 each).</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-semibold">Skills</label>
                        <span className="text-xs text-muted-foreground">{selectedSkills.length} selected</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {SKILLS.map(skill => (
                          <button
                            key={skill}
                            onClick={() => toggleSkill(skill)}
                            data-testid={`chip-skill-${skill}`}
                            className={`px-3 py-1.5 rounded-full border text-sm transition-all duration-200 ${
                              selectedSkills.includes(skill)
                                ? "border-primary bg-primary/20 text-primary font-medium shadow-[0_0_8px_rgba(16,185,129,0.25)]"
                                : "border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                            }`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-semibold">Passions</label>
                        <span className="text-xs text-muted-foreground">{selectedPassions.length} selected</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {PASSIONS.map(passion => (
                          <button
                            key={passion}
                            onClick={() => togglePassion(passion)}
                            data-testid={`chip-passion-${passion}`}
                            className={`px-3 py-1.5 rounded-full border text-sm transition-all duration-200 ${
                              selectedPassions.includes(passion)
                                ? "border-primary bg-primary/20 text-primary font-medium shadow-[0_0_8px_rgba(16,185,129,0.25)]"
                                : "border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                            }`}
                          >
                            {passion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Review */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold mb-1 font-['Space_Grotesk']">Your AI business profile is ready</h2>
                      <p className="text-muted-foreground text-sm"> We are about to generate your personalized business opportunities and roadmap.</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border/50 shadow-lg shadow-black/20">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Capital Available</p>
                          <p className="text-xl font-bold text-primary">ETB {capital.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">~${capitalInUSD.toLocaleString()} USD</p>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary text-lg">💰</div>
                      </div>

                      <div className="p-4 rounded-lg bg-card border border-border/50 shadow-lg shadow-black/20">
                        <p className="text-xs text-muted-foreground mb-2">Background</p>
                        <div className="flex gap-3 flex-wrap">
                          <Badge variant="outline" className="border-border/50">{selectedCountry === "Ethiopia" ? "🇪🇹 " : ""}{selectedCountry}</Badge>
                          <Badge variant="outline" className="border-border/50">{selectedEducation}</Badge>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-card border border-border/50 shadow-lg shadow-black/20">
                        <p className="text-xs text-muted-foreground mb-2">Skills ({selectedSkills.length})</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedSkills.map(s => (
                            <Badge key={s} className="bg-primary/15 text-primary border-primary/30 text-xs">{s}</Badge>
                          ))}
                          {selectedSkills.length === 0 && <span className="text-xs text-muted-foreground">None selected</span>}
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-card border border-border/50 shadow-lg shadow-black/20">
                        <p className="text-xs text-muted-foreground mb-2">Passions ({selectedPassions.length})</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedPassions.map(p => (
                            <Badge key={p} className="bg-primary/15 text-primary border-primary/30 text-xs">{p}</Badge>
                          ))}
                          {selectedPassions.length === 0 && <span className="text-xs text-muted-foreground">None selected</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setCurrentStep(s => s - 1)}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
            data-testid="button-prev"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            size="lg"
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2 glow-emerald"
            data-testid="button-next"
          >
            {currentStep === 3 ? "Generate My Business Opportunities" : "Next Step"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => setLocation("/results")}
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
            data-testid="link-skip"
          >
            Skip to sample results
          </button>
        </div>
      </div>
    </div>
  );
}
