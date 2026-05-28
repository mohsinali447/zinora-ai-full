import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-12 md:py-16">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-xl mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              Z
            </div>
            <span>Zinora AI</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            The world's most trusted AI customer support platform for international enterprises.
          </p>
        </div>
        <div>
          <h3 className="font-medium mb-4">Product</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/integrations">Integrations</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Zinora AI. All rights reserved.
      </div>
    </footer>
  );
}
