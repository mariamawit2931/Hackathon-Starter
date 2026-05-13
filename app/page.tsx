"use client"

import { useState } from "react"

export default function Home() {
  const [idea, setIdea] = useState("")
  const [result, setResult] = useState<null | { score: number; message: string }>(null)

  const analyzeIdea = () => {
    if (!idea) return

    // simple MVP logic (fake AI for hackathon)
    const score = Math.floor(Math.random() * 40) + 50

    const message =
      score > 75
        ? "Strong business potential. Good chance of success in your area."
        : "Needs improvement. Consider starting small and testing demand first."

    setResult({ score, message })
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">

      <h1 className="text-5xl font-bold mb-4 text-center">
        BizPath AI
      </h1>

      <p className="text-xl text-gray-300 text-center max-w-2xl">
        AI-powered platform that helps you validate business ideas instantly.
      </p>

      {/* INPUT */}
      <input
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Enter your business idea..."
        className="mt-6 px-4 py-3 w-full max-w-md rounded-lg text-black"
      />

      {/* BUTTON */}
      <button
        onClick={analyzeIdea}
        className="mt-4 px-6 py-3 bg-white text-black rounded-xl font-semibold"
      >
        Analyze Idea
      </button>

      {/* RESULT */}
      {result && (
        <div className="mt-6 bg-gray-900 p-4 rounded-xl max-w-md w-full">
          <p className="text-lg font-bold">
            AI Score: {result.score}%
          </p>
          <p className="text-gray-400 mt-2">
            {result.message}
          </p>
        </div>
      )}

    </main>
  )
}