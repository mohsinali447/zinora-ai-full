import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-primary text-primary-foreground py-2 px-4 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-50 mix-blend-overlay" />
            <div className="container mx-auto flex items-center justify-center text-sm font-medium relative z-10 text-center flex-wrap gap-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" /> Zinora AI 2.0 launched — Now with GPT-4 Turbo
              </span>
              <Link href="/blog">
                <span className="underline underline-offset-2 hover:text-white/80 transition-colors ml-2 cursor-pointer">
                  Learn more →
                </span>
              </Link>
              <button 
                onClick={() => setShowBanner(false)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-md transition-colors mr-2"
                aria-label="Dismiss banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.header
        className={`sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300 ${
          isScrolled 
            ? "bg-background/80 backdrop-blur-md border-border/50 shadow-sm" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/">
            <div className="flex items-center gap-2 font-bold text-xl cursor-pointer group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-700 text-primary-foreground shadow-sm group-hover:shadow-md transition-all">
                Z
              </div>
              <span className="tracking-tight text-foreground">Zinora AI</span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {[
              { label: 'Features', href: '/features' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Integrations', href: '/integrations' },
              { label: 'About', href: '/about' },
              { label: 'Blog', href: '/blog' }
            ].map((item) => (
              <Link key={item.label} href={item.href}>
                <span className="relative group cursor-pointer text-muted-foreground hover:text-foreground transition-colors py-2">
                  {item.label}
                  <span className="absolute left-0 bottom-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                </span>
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground font-medium" onClick={() => setLocation("/login")} data-testid="nav-login">
              Log in
            </Button>
            <div className="w-[1px] h-4 bg-border" />
            <Button className="font-medium group shadow-sm" onClick={() => setLocation("/signup")} data-testid="nav-signup">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t bg-background/95 backdrop-blur-lg shadow-lg"
            >
              <nav className="flex flex-col p-4 gap-4">
                {[
                  { label: 'Features', href: '/features' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'Integrations', href: '/integrations' },
                  { label: 'About', href: '/about' },
                  { label: 'Blog', href: '/blog' }
                ].map((item) => (
                  <Link key={item.label} href={item.href}>
                    <span 
                      className="block p-2 text-base font-medium text-foreground hover:bg-muted rounded-md cursor-pointer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </span>
                  </Link>
                ))}
                <div className="h-[1px] bg-border my-2" />
                <Button variant="outline" className="w-full justify-center" onClick={() => { setLocation("/login"); setMobileMenuOpen(false); }}>
                  Log in
                </Button>
                <Button className="w-full justify-center" onClick={() => { setLocation("/signup"); setMobileMenuOpen(false); }}>
                  Get Started
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
