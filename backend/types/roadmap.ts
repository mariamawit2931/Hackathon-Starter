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
  timestamp?: string;           // Added for tracking
}

export interface BizPathUserInput {
  capital: string;              // Required: e.g. "500000 ETB" or "5000 USD"
  background?: string;          // Education or "No formal degree"
  education?: string;           // Alternative field name
  skills: string;               // Required
  sector?: string;
  idea?: string;
  location?: string;
  experience?: string;          // For no-degree users
}

export interface BizPathAPIResponse {
  success: boolean;
  data?: BizPathOutput;
  error?: string;
  details?: string;             // For debugging
}