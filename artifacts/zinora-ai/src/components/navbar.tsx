import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [, setLocation] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 font-bold text-xl cursor-pointer">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              Z
            </div>
            <span>Zinora AI</span>
          </div>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/features"><span className="cursor-pointer text-muted-foreground hover:text-primary transition-colors">Features</span></Link>
          <Link href="/pricing"><span className="cursor-pointer text-muted-foreground hover:text-primary transition-colors">Pricing</span></Link>
          <Link href="/about"><span className="cursor-pointer text-muted-foreground hover:text-primary transition-colors">About</span></Link>
          <Link href="/blog"><span className="cursor-pointer text-muted-foreground hover:text-primary transition-colors">Blog</span></Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setLocation("/login")}>Log in</Button>
          <Button onClick={() => setLocation("/signup")}>Get Started</Button>
        </div>
      </div>
    </header>
  );
}
