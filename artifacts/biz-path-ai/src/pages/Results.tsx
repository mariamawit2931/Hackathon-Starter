import React, { useEffect, useState } from 'react';

// 1. Updated Interface to match our new Backend
interface BizPathData {
  businessModel: string;
  marketAnalysis: string;
  growthLadder: {
    phase1: string;
    phase2: string;
    phase3: string;
  };
}

interface BizPathAPIResponse {
  success: boolean;
  data?: BizPathData;
  error?: string;
}

export default function ResultPage() {
  const [businessData, setBusinessData] = useState<BizPathData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const generateRoadmap = async () => {
      try {
        // 2. FIXED: Using relative path for the merge/production
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // Assuming user inputs are stored in localStorage from the previous step
          body: localStorage.getItem("bizpath_inputs") 
        });

        const result: BizPathAPIResponse = await response.json();

        if (result.success && result.data) {
          // 3. FIXED: Storing the full object with our new structure
          setBusinessData(result.data);
        } else {
          setError(result.error || "The AI could not generate a roadmap.");
        }
      } catch (err) {
        setError("Network error: Could not connect to the BizPath engine.");
      } finally {
        setLoading(false);
      }
    };

    generateRoadmap();
  }, []);

  if (loading) return <div>Analyzing the Addis market... please wait.</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your BizPath Roadmap</h1>
      
      {/* 4. Displaying the New Structure */}
      <section className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold">The Strategy</h2>
        <p className="mt-2 text-gray-700">{businessData?.businessModel}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow-sm">
          <h3 className="font-bold text-blue-600">Phase 1: Launch</h3>
          <p>{businessData?.growthLadder.phase1}</p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h3 className="font-bold text-blue-600">Phase 2: Growth</h3>
          <p>{businessData?.growthLadder.phase2}</p>
        </div>
        <div className="p-4 border rounded shadow-sm">
          <h3 className="font-bold text-blue-600">Phase 3: Scale</h3>
          <p>{businessData?.growthLadder.phase3}</p>
        </div>
      </div>
    </div>
  );
}