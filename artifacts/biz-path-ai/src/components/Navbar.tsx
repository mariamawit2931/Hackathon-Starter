import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold text-sm glow-emerald">
              BP
            </div>
            <span className="font-semibold text-lg tracking-tight font-['Space_Grotesk']">BizPath AI</span>
          </Link>
          <span className="hidden sm:inline-block ml-2 text-sm" title="Built for Ethiopian Founders">🇪🇹</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</Link>
          <Link href="/#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</Link>
          <Link href="/#trends" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Trends</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-sm" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="glow-emerald">
            <Link href="/assessment">Get Started</Link>
          </Button>
        </div>

        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background absolute w-full left-0 slide-in-from-top-2 animate-in duration-200">
          <div className="flex flex-col space-y-4 p-4">
            <Link href="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground p-2" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground p-2" onClick={() => setIsMobileMenuOpen(false)}>How It Works</Link>
            <Link href="/#trends" className="text-sm font-medium text-muted-foreground hover:text-foreground p-2" onClick={() => setIsMobileMenuOpen(false)}>Trends</Link>
            <div className="h-px bg-border/50 my-2" />
            <Button variant="ghost" className="w-full justify-start" asChild onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button className="w-full glow-emerald" asChild onClick={() => setIsMobileMenuOpen(false)}>
              <Link href="/assessment">Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
