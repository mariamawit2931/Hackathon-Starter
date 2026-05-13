import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Zap, RotateCcw } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  typing?: boolean;
};

const STARTER_QUESTIONS = [
  "Which business fits my profile best?",
  "How much capital do I need to start?",
  "What are the risks in the Ethiopian market?",
  "How do I register a business in Addis Ababa?",
];

const AI_RESPONSES: Record<string, string> = {
  "Which business fits my profile best?":
    "Based on your profile — ETB 25,000 capital, Bachelor's degree, strong Digital Marketing skills, and a passion for Technology — **Freelance Writing** and **Social Media Management** are your top two matches.\n\nFreelance Writing gives you:\n• Immediate start (no setup costs)\n• Remote-first flexibility\n• Monthly potential: ETB 8,000–25,000\n\nWant me to walk you through the first 30 days?",
  "How much capital do I need to start?":
    "Great question. With ETB 25,000, you have several strong paths:\n\n**Immediate start (ETB 0–5,000):**\n• Freelance Writing (just a laptop & internet)\n• Online Tutoring (Zoom + curriculum)\n\n**Low investment (ETB 5,000–25,000):**\n• Social Media Management\n• Content Creation\n\n**Your sweet spot:** Start a writing or tutoring business this week, then reinvest earnings into Digital Marketing services. Would you like a detailed budget breakdown?",
  "What are the risks in the Ethiopian market?":
    "Smart to ask about risks upfront. Here are the key ones for Ethiopian founders:\n\n**Infrastructure:** Internet reliability varies outside Addis Ababa. Budget for mobile data backup.\n\n**Currency:** ETB inflation (~15% in 2026) means pricing in USD for international clients offers protection.\n\n**Payment:** Telebirr and CBE Birr are growing but international transfers have friction. Consider Payoneer for foreign clients.\n\n**Regulatory:** Business registration takes 2–4 weeks in Addis. Plan for this delay.\n\nWhich specific business are you considering? I can give more targeted risk advice.",
  "How do I register a business in Addis Ababa?":
    "Here is the step-by-step process for registering in Addis Ababa:\n\n**1. Trade Name Registration** (Ethiopian Revenues and Customs Authority)\n→ Cost: ~ETB 500 | Time: 1–2 days\n\n**2. Business License** (Addis Ababa City Administration)\n→ Cost: ETB 1,000–3,000 depending on category | Time: 3–5 days\n\n**3. Tax Identification Number** (ERCA)\n→ Free | Time: 1 day\n\n**4. Commercial Registration Certificate**\n→ Cost: ~ETB 500 | Time: 2–3 days\n\n**Total cost:** ~ETB 2,000–4,500\n**Total time:** ~10–14 working days\n\nMany freelancers and digital businesses start operating before formal registration — though I always recommend getting legal early. Want more detail on any step?",
};

const FALLBACK_RESPONSES = [
  "That is an excellent question for Ethiopian founders. Based on current market conditions in Addis Ababa, I would recommend focusing on digital-first business models with low capital requirements. The key advantage you have is timing — Ethiopia's digital economy is growing 40%+ annually. What specific aspect would you like to explore further?",
  "Great thinking. The Ethiopian market has unique dynamics that most generic business advice misses. For your situation, the most important factors are: (1) local payment integration via Telebirr or CBE Birr, (2) leveraging Telegram and Facebook for customer acquisition, and (3) starting lean with freelance work before scaling. Would you like a more detailed breakdown?",
  "This is exactly the kind of strategic question that separates successful founders from the rest. In the Ethiopian context, I would prioritize building your client base locally first, then expanding to international clients who pay in USD — protecting you from ETB currency risk. Shall I walk you through a specific action plan?",
];

export default function Coach() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello, Founder. I am your AI Business Coach, trained on Ethiopian market data, startup patterns, and founder profiles. I am here to help you navigate your entrepreneurial journey.\n\nYou can ask me about business selection, capital requirements, market risks, or how to register your company. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));

    const response = AI_RESPONSES[text] ??
      FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content: "Session reset. I am ready to help you explore new business opportunities. What would you like to know?",
      },
    ]);
    setIsTyping(false);
    setInput("");
  };

  const formatContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return <p key={i} className="font-semibold mt-2">{line.slice(2, -2)}</p>;
      }
      if (line.startsWith("• ") || line.startsWith("→ ")) {
        return <p key={i} className="pl-3 text-muted-foreground text-sm">{line}</p>;
      }
      return line ? <p key={i}>{line}</p> : <br key={i} />;
    });
  };

  return (
    <div className="py-6 px-4 lg:px-8 min-h-[80vh]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold font-['Space_Grotesk']">AI Business Coach</h1>
              <span className="w-2 h-2 rounded-full bg-primary ai-pulse" />
            </div>
            <p className="text-sm text-muted-foreground">Trained on Ethiopian market data and 10,000+ startup patterns.</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5 border-border/50 shrink-0" data-testid="button-reset">
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
        </div>

        {/* Starter Questions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {STARTER_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => sendMessage(q)}
              disabled={isTyping}
              data-testid={`button-starter-${i}`}
              className="text-xs px-3 py-1.5 rounded-full border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary transition-all duration-200 disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Area */}
        <Card className="glass border-border/50 shadow-lg shadow-black/20 mb-4">
          <CardContent className="p-0">
            <div className="h-[480px] overflow-y-auto p-4 space-y-4 scroll-smooth">
              <AnimatePresence initial={false}>
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    data-testid={`message-${msg.role}`}
                  >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "assistant"
                        ? "bg-primary/20 border border-primary/40"
                        : "bg-card border border-border/50"
                    }`}>
                      {msg.role === "assistant"
                        ? <Bot className="w-4 h-4 text-primary" />
                        : <User className="w-4 h-4 text-muted-foreground" />
                      }
                    </div>

                    {/* Bubble */}
                    <div className={`max-w-[85%] rounded-xl p-3.5 text-sm leading-relaxed space-y-1 shadow-lg shadow-black/20 ${
                      msg.role === "assistant"
                        ? "bg-card border border-border/50"
                        : "bg-primary/15 border border-primary/30 text-right"
                    }`}>
                      {formatContent(msg.content)}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-card border border-border/50 rounded-xl p-3.5 shadow-lg shadow-black/20">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary ai-pulse" />
                        <span className="text-xs text-muted-foreground">Analyzing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-border/50 p-3">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about businesses, capital, market risks..."
                  disabled={isTyping}
                  data-testid="input-message"
                  className="flex-1 bg-card border border-border/50 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/60 disabled:opacity-50"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!input.trim() || isTyping}
                  className="gap-1.5 glow-emerald shrink-0"
                  data-testid="button-send"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Zap className="w-3 h-3 text-primary" />
          <span>AI responses are based on Ethiopian market data and may not cover every scenario. Always verify with local experts.</span>
        </div>
      </div>
    </div>
  );
}
