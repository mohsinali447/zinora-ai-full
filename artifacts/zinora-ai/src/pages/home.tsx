import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layouts/public-layout";
import { ArrowRight, Bot, Zap, Globe, Shield, BarChart, ArrowUpRight, MessageSquare, Clock } from "lucide-react";
import heroImagePath from "@assets/image_1779982769367.png";
import { useListPlans } from "@workspace/api-client-react";

export default function Home() {
  const { data: plans } = useListPlans();

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-2" />
                  Zinora AI 2.0 is now available
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl xl:text-6xl/none">
                  AI Customer Support <br className="hidden sm:block" />
                  <span className="text-primary">Made Simple</span>
                </h1>
                <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl leading-relaxed">
                  The world's most trusted AI customer support platform for international enterprises. Resolve tickets instantly, reduce costs, and delight customers globally.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="h-12 px-8 text-base">
                    Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-background/50 backdrop-blur-sm">
                    Book Demo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted" />
                  ))}
                </div>
                <p>Trusted by 10,000+ support teams worldwide</p>
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-[600px] items-center justify-center lg:max-w-none relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <img
                src={heroImagePath}
                alt="Zinora AI Dashboard Interface"
                className="relative rounded-xl border border-border/50 bg-background shadow-2xl z-10"
              />
              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -left-6 z-20 rounded-xl border bg-background/95 backdrop-blur p-4 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">AI Resolution Rate</p>
                    <p className="text-2xl font-bold">98.4%</p>
                  </div>
                </div>
              </div>
              {/* Floating Stat Card 2 */}
              <div className="absolute -top-6 -right-6 z-20 rounded-xl border bg-background/95 backdrop-blur p-4 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                    <p className="text-2xl font-bold">2.3s</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="border-y bg-muted/30 py-10">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">POWERING WORLD-CLASS ENTERPRISES</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale transition-all hover:grayscale-0">
            {['Acme Corp', 'GlobalTech', 'Nexus', 'Stark Industries', 'Wayne Ent'].map((company) => (
              <div key={company} className="flex items-center gap-2 text-xl font-bold">
                <div className="h-6 w-6 bg-foreground rounded-sm" />
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Command Center for Customer Success</h2>
            <p className="text-lg text-muted-foreground">Everything you need to deliver exceptional support at scale, powered by advanced artificial intelligence.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Bot, title: "Autonomous AI Agent", desc: "Instantly resolve up to 80% of routine queries with human-like understanding." },
              { icon: Globe, title: "Multilingual Support", desc: "Native understanding and response in over 50 languages automatically." },
              { icon: Zap, title: "Real-time Processing", desc: "Sub-second response times keep your customers engaged and satisfied." },
              { icon: Shield, title: "Enterprise Security", desc: "Bank-grade encryption and compliance with global data protection standards." },
              { icon: BarChart, title: "Advanced Analytics", desc: "Deep insights into customer sentiment, agent performance, and ROI." },
              { icon: MessageSquare, title: "Omnichannel Inbox", desc: "Unify email, chat, social, and SMS into one breathtakingly fast interface." },
            ].map((feature, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl border bg-card p-8 hover:shadow-lg transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 bg-muted/30 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">Choose the perfect plan for your team's needs.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {plans?.map((plan) => (
              <div key={plan.id} className={`relative flex flex-col rounded-2xl border bg-card p-8 shadow-sm ${plan.isPopular ? 'border-primary ring-1 ring-primary' : ''}`}>
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/mo</span>
                </div>
                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/signup">
                  <Button className="w-full" variant={plan.isPopular ? "default" : "outline"}>
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold sm:text-5xl mb-6">Ready to transform your customer support?</h2>
          <p className="text-lg text-primary-foreground/80 mb-10">
            Join thousands of forward-thinking companies delivering world-class support experiences with Zinora AI.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg w-full sm:w-auto text-primary">
                Start your free trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground border-primary-foreground/20">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
