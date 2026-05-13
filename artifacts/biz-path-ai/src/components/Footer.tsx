import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground font-bold text-xs">
                BP
              </div>
              <span className="font-semibold text-lg font-['Space_Grotesk']">BizPath AI</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              The premier AI operating system for Ethiopian entrepreneurs. Turn your skills and degree into a scalable business.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-foreground">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/assessment" className="hover:text-primary transition-colors">AI Assessment</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Opportunities</Link></li>
              <li><Link href="/coach" className="hover:text-primary transition-colors">Business Coach</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} BizPath AI. All rights reserved.</p>
          <div className="flex items-center gap-2">
            Built for Ethiopian Founders <span className="text-sm">🇪🇹</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
