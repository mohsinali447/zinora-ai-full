import { Link } from "wouter";
import { Twitter, Linkedin, Github, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 relative border-t-0">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 md:px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-4 space-y-6">
            <Link href="/">
              <div className="flex items-center gap-2 font-bold text-2xl cursor-pointer text-white">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-700 text-white">
                  Z
                </div>
                <span className="tracking-tight">Zinora AI</span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The world's most trusted AI customer support platform for international enterprises. Deliver magical experiences at any scale.
            </p>
            <div className="space-y-3 pt-2">
              <p className="text-sm font-medium text-slate-200">Subscribe to our newsletter</p>
              <div className="flex gap-2 max-w-sm">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-slate-900 border border-slate-800 text-white text-sm rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-slate-500"
                />
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white shrink-0">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-5 gap-8">
            <div>
              <h3 className="font-semibold text-slate-100 mb-4 text-sm tracking-wide">Product</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/features"><span className="hover:text-primary transition-colors cursor-pointer">Features</span></Link></li>
                <li><Link href="/pricing"><span className="hover:text-primary transition-colors cursor-pointer">Pricing</span></Link></li>
                <li><Link href="/integrations"><span className="hover:text-primary transition-colors cursor-pointer">Integrations</span></Link></li>
                <li><Link href="/changelog"><span className="hover:text-primary transition-colors cursor-pointer">Changelog</span></Link></li>
                <li><Link href="/roadmap"><span className="hover:text-primary transition-colors cursor-pointer">Roadmap</span></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 mb-4 text-sm tracking-wide">Solutions</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/solutions/support"><span className="hover:text-primary transition-colors cursor-pointer">Customer Support</span></Link></li>
                <li><Link href="/solutions/ecommerce"><span className="hover:text-primary transition-colors cursor-pointer">E-commerce</span></Link></li>
                <li><Link href="/solutions/saas"><span className="hover:text-primary transition-colors cursor-pointer">SaaS</span></Link></li>
                <li><Link href="/solutions/enterprise"><span className="hover:text-primary transition-colors cursor-pointer">Enterprise</span></Link></li>
                <li><Link href="/solutions/startups"><span className="hover:text-primary transition-colors cursor-pointer">Startups</span></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 mb-4 text-sm tracking-wide">Company</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about"><span className="hover:text-primary transition-colors cursor-pointer">About</span></Link></li>
                <li><Link href="/blog"><span className="hover:text-primary transition-colors cursor-pointer">Blog</span></Link></li>
                <li><Link href="/careers"><span className="hover:text-primary transition-colors cursor-pointer">Careers</span></Link></li>
                <li><Link href="/press"><span className="hover:text-primary transition-colors cursor-pointer">Press</span></Link></li>
                <li><Link href="/partners"><span className="hover:text-primary transition-colors cursor-pointer">Partners</span></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 mb-4 text-sm tracking-wide">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/docs"><span className="hover:text-primary transition-colors cursor-pointer">Documentation</span></Link></li>
                <li><Link href="/api"><span className="hover:text-primary transition-colors cursor-pointer">API Reference</span></Link></li>
                <li><Link href="/community"><span className="hover:text-primary transition-colors cursor-pointer">Community</span></Link></li>
                <li><Link href="/status"><span className="hover:text-primary transition-colors cursor-pointer">Status</span></Link></li>
                <li><Link href="/support"><span className="hover:text-primary transition-colors cursor-pointer">Support</span></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 mb-4 text-sm tracking-wide">Legal</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacy"><span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span></Link></li>
                <li><Link href="/terms"><span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span></Link></li>
                <li><Link href="/cookies"><span className="hover:text-primary transition-colors cursor-pointer">Cookie Policy</span></Link></li>
                <li><Link href="/gdpr"><span className="hover:text-primary transition-colors cursor-pointer">GDPR</span></Link></li>
                <li><Link href="/security"><span className="hover:text-primary transition-colors cursor-pointer">Security</span></Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Zinora AI Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-primary transition-colors" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
