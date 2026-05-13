export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      <h1 className="text-5xl font-bold mb-4 text-center">
        BizPath AI
      </h1>

      <p className="text-xl text-gray-300 text-center max-w-2xl">
        AI-powered platform that helps you discover realistic businesses you can start
        based on your budget, skills, education, and location.
      </p>

      <button className="mt-6 px-6 py-3 bg-white text-black rounded-xl font-semibold">
        Get Started
      </button>
    </main>
  )
}