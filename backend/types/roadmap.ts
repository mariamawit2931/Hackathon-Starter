// types/roadmap.ts

export interface BizPathCapital {
  minimum: string;
  ideal: string;
  aggressive: string;
  inflationNote: string;
}

export interface BizPathMaterialRequirements {
  capital: BizPathCapital;
  space: string;
  labor: string;
}

export interface BizPathNonMaterialRequirements {
  educationGaps: string[];
  topSoftSkills: string[];
}

export interface BizPathGrowthLadder {
  phase1_bootstrap: string;
  phase2_reinvestment: string;
  phase3_venture: string;
}

export interface BizPathOutput {
  businessModel: string;
  theBridge: string;
  materialRequirements: BizPathMaterialRequirements;
  nonMaterialRequirements: BizPathNonMaterialRequirements;
  growthLadder: BizPathGrowthLadder;
  localInsights: string;
  risks: string[];
  overallRecommendation: string;
}

export interface BizPathUserInput {
  background: string;   // Educational background or "No formal degree"
  skills: string;       // Work experience and practical skills
  capital: string;      // Available capital range in ETB
  sector?: string;      // Preferred sector (optional)
  location?: string;    // City/region in Ethiopia (defaults to Addis Ababa)
  idea?: string;        // Optional business idea
}

export interface BizPathAPIResponse {
  success: boolean;
  data?: BizPathOutput;
  error?: string;
}
