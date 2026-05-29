import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { PublicLayout } from "@/components/layouts/public-layout";
import { ArrowRight, Bot, Zap, Globe, Shield, BarChart, MessageSquare, Clock, Check, TrendingUp, ArrowUpRight, Cpu } from "lucide-react";
import heroImagePath from "@assets/image_1779982769367.png";
import { useListPlans } from "@/lib/hooks";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

const testimonials = [
  { quote: "Zinora AI cut our support costs by 60% in just 2 weeks. The AI is incredibly accurate.", author: "Sarah Chen", title: "Head of Customer Success", company: "Stripe", rating: 5, initial: "SC", color: "from-purple-500 to-indigo-500" },
  { quote: "We went from 8-hour response times to 2 seconds. Our CSAT jumped from 3.2 to 4.9 overnight.", author: "Marcus Weber", title: "VP Operations", company: "Shopify", rating: 5, initial: "MW", color: "from-green-400 to-emerald-600" },
  { quote: "The multilingual support is a game changer. We now serve 40 countries with one AI agent.", author: "Priya Nair", title: "CTO", company: "Razorpay", rating: 5, initial: "PN", color: "from-blue-500 to-cyan-500" },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [, setLocation] = useLocation();
  const { data: plans, isLoading: plansLoading } = useListPlans();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  
  return (
    <PublicLayout>
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden bg-background pt-24 pb-32 lg:pt-32 lg:pb-40" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(217,91%,60%,0.3), transparent)' }}>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col justify-center space-y-8"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                  ✦ Trusted by 10,000+ Teams Worldwide
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl xl:text-7xl leading-[1.1]">
                  AI Customer Support <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-primary to-indigo-500">Made Simple</span>
                </h1>
                <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl leading-relaxed">
                  Zinora AI understands your customers, answers instantly, and helps your business grow effortlessly. Deploy in minutes, scale to millions.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button size="lg" className="h-14 px-8 text-base shadow-lg" onClick={() => setLocation("/signup")}>
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base bg-background/50 backdrop-blur-sm hover:bg-muted" onClick={() => setLocation("/contact")}>
                  Book a Demo
                </Button>
              </div>
              
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center gap-4 text-sm font-medium text-foreground mb-4">
                  <div className="flex -space-x-3">
                    {['from-orange-400 to-red-500', 'from-blue-400 to-indigo-500', 'from-emerald-400 to-teal-500', 'from-purple-400 to-pink-500'].map((grad, i) => (
                      <div key={i} className={`h-10 w-10 rounded-full border-2 border-background bg-gradient-to-br ${grad} flex items-center justify-center text-white text-xs font-bold`}>
                        {['A', 'K', 'J', 'M'][i]}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center text-yellow-500 mb-1">
                      {[1, 2, 3, 4, 5].map(i => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                    </div>
                    <span className="text-muted-foreground">Loved by 10,000+ teams</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground"><Zap className="h-3.5 w-3.5 text-primary" /> Instant Answers</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground"><MessageSquare className="h-3.5 w-3.5 text-primary" /> 24/7 Support</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground"><BarChart className="h-3.5 w-3.5 text-primary" /> Smart Insights</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mx-auto flex w-full items-center justify-center relative mt-10 lg:mt-0"
            >
              <img
                src={heroImagePath}
                alt="Zinora AI Dashboard"
                className="relative rounded-2xl border border-border bg-background/50 shadow-[0_0_80px_rgba(59,130,246,0.3)] z-10 w-full"
              />
              
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 z-20 rounded-xl border border-border/50 bg-background/80 backdrop-blur-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10 text-green-500">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Resolved</p>
                    <p className="text-xl font-bold">98%</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 z-20 rounded-xl border border-border/50 bg-background/80 backdrop-blur-xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Response Time</p>
                    <p className="text-xl font-bold">2.3s</p>
                  </div>
                </div>
              </motion.div>
              
              <div className="absolute -bottom-4 right-4 z-20 rounded-lg border border-border bg-background px-3 py-2 shadow-lg flex items-center gap-2">
                <BarChart className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">Active Chats: 1,248</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: METRICS TICKER */}
      <section className="bg-slate-950 py-12 border-y border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-800/0 md:divide-slate-800">
              <div className="text-center px-4">
                <p className="text-4xl font-bold text-white mb-2">10M+</p>
                <p className="text-sm text-slate-400 font-medium">Queries Resolved</p>
              </div>
              <div className="text-center px-4 md:border-l border-slate-800">
                <p className="text-4xl font-bold text-white mb-2">98%</p>
                <p className="text-sm text-slate-400 font-medium">Customer Satisfaction</p>
              </div>
              <div className="text-center px-4 md:border-l border-slate-800">
                <p className="text-4xl font-bold text-white mb-2">2.3s</p>
                <p className="text-sm text-slate-400 font-medium">Avg Response Time</p>
              </div>
              <div className="text-center px-4 md:border-l border-slate-800">
                <p className="text-4xl font-bold text-white mb-2">150+</p>
                <p className="text-sm text-slate-400 font-medium">Countries Served</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 3: TRUSTED BY */}
      <section className="bg-white py-16 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 mb-8">
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest">Powering Support Teams at World-Class Companies</p>
        </div>
        <div className="relative w-full overflow-hidden flex flex-col gap-8">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-[marquee_30s_linear_infinite] w-max gap-16 px-8 items-center">
            {['Shopify', 'Stripe', 'Notion', 'Airbnb', 'Figma', 'Shopify', 'Stripe', 'Notion', 'Airbnb', 'Figma'].map((company, i) => (
              <div key={i} className="flex items-center gap-2 text-2xl font-bold text-slate-800 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                <div className="h-8 w-8 bg-slate-800 rounded-lg flex items-center justify-center text-white text-xs">{company[0]}</div>
                {company}
              </div>
            ))}
          </div>
          <div className="flex animate-[marquee_35s_linear_infinite_reverse] w-max gap-16 px-8 items-center">
            {['Slack', 'HubSpot', 'Zendesk', 'Linear', 'Vercel', 'Slack', 'HubSpot', 'Zendesk', 'Linear', 'Vercel'].map((company, i) => (
              <div key={i} className="flex items-center gap-2 text-2xl font-bold text-slate-800 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                <div className="h-8 w-8 bg-slate-800 rounded-lg flex items-center justify-center text-white text-xs">{company[0]}</div>
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: PRODUCT SHOWCASE */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-20">
            {/* Feature A */}
            <FadeIn>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden p-1">
                  <div className="bg-slate-950 rounded-xl h-full flex flex-col">
                    <div className="p-4 border-b border-slate-800 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center text-white font-bold text-xs">Z</div>
                      <div>
                        <p className="text-white text-sm font-semibold flex items-center gap-2">Zinora AI <span className="w-2 h-2 rounded-full bg-green-500"></span></p>
                        <p className="text-slate-400 text-xs">Online</p>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col gap-4">
                      <div className="self-start bg-slate-800 text-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm text-sm max-w-[85%]">
                        Hi! I need help tracking my recent order #84930.
                      </div>
                      <div className="self-end bg-primary text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm max-w-[85%]">
                        Hello! I found your order. It's currently out for delivery and will arrive by 4 PM today. Would you like the tracking link?
                      </div>
                      <div className="self-start bg-slate-800 text-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm text-sm max-w-[85%]">
                        Yes please, that would be great.
                      </div>
                    </div>
                    <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                      <div className="bg-slate-800 rounded-full px-4 py-2 text-slate-400 text-sm flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-primary flex items-center gap-1">
                            AI is typing<span className="flex gap-0.5"><span className="w-1 h-1 bg-primary rounded-full animate-bounce"></span><span className="w-1 h-1 bg-primary rounded-full animate-bounce delay-75"></span><span className="w-1 h-1 bg-primary rounded-full animate-bounce delay-150"></span></span>
                          </span>
                        </div>
                        <Button size="icon" className="h-6 w-6 rounded-full bg-primary text-white hover:bg-primary/90"><ArrowRight className="h-3 w-3" /></Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2 space-y-6">
                  <div className="inline-flex items-center rounded-full bg-blue-100 text-primary px-3 py-1 text-sm font-semibold">
                    <Bot className="w-4 h-4 mr-2" /> AI Inbox
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                    Resolve Tickets in Seconds, Not Hours
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Our context-aware AI reads, understands, and resolves customer inquiries instantly across all your channels. Give your team their time back.
                  </p>
                  <ul className="space-y-3">
                    {['Understands complex multi-turn conversations', 'Executes actions via API integrations', 'Seamlessly hands off to human agents when needed'].map((text, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        {text}
                      </li>
                    ))}
                  </ul>
                  <Button variant="link" className="px-0 text-primary font-semibold hover:no-underline group">
                    See it in action <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </FadeIn>

            {/* Feature B */}
            <FadeIn delay={0.2}>
              <div className="grid lg:grid-cols-2 gap-12 items-center pt-12">
                <div className="space-y-6">
                  <div className="inline-flex items-center rounded-full bg-indigo-100 text-indigo-700 px-3 py-1 text-sm font-semibold">
                    <BarChart className="w-4 h-4 mr-2" /> Analytics
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                    Know Your Customers Better Than Ever
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Uncover deep insights into customer sentiment, trending topics, and team performance with beautiful, real-time dashboards.
                  </p>
                  <ul className="space-y-3">
                    {['Automated topic clustering and tagging', 'Real-time CSAT prediction', 'Agent performance and ROI tracking'].map((text, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-700 shrink-0">
                          <Check className="h-4 w-4" />
                        </div>
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 md:p-8 space-y-8">
                  <div className="flex items-end gap-2 h-40 border-b border-slate-800 pb-4">
                    {[40, 60, 45, 80, 50, 90, 70].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary transition-colors cursor-pointer relative group flex items-end justify-center" style={{ height: '100%' }}>
                        <div className="w-full bg-primary rounded-t-sm" style={{ height: `${h}%` }} />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-400">Satisfaction Score</p>
                      <p className="text-2xl font-bold text-white">4.8<span className="text-slate-500 text-lg">/5.0</span></p>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[96%]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-slate-400">Resolution Rate</p>
                      <p className="text-2xl font-bold text-white">98.4%</p>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[98.4%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SECTION 5: FEATURES GRID */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Everything You Need to Deliver World-Class Support</h2>
              <p className="text-lg text-slate-600">A complete toolset designed for modern, high-growth teams.</p>
            </div>
          </FadeIn>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Bot, title: "Autonomous AI Agent", desc: "Resolve up to 80% of queries automatically with human-like precision and empathy." },
              { icon: Globe, title: "Multilingual Support", desc: "Native understanding across 50+ languages with zero extra setup required." },
              { icon: Zap, title: "Instant Responses", desc: "Sub-second AI replies that keep customers engaged, satisfied, and loyal." },
              { icon: Shield, title: "Enterprise Security", desc: "Bank-grade encryption with SOC 2, GDPR, and HIPAA compliance built-in." },
              { icon: BarChart, title: "Smart Analytics", desc: "Deep insights into customer sentiment, trends, and team performance metrics." },
              { icon: MessageSquare, title: "Omnichannel Inbox", desc: "Unify email, chat, WhatsApp, Slack, and more in one beautiful interface." },
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 hover:shadow-xl hover:border-primary/50 transition-all duration-300 h-full">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: AUTOMATION SHOWCASE */}
      <section className="bg-slate-950 overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          <div className="bg-gradient-to-br from-primary to-blue-900 p-12 md:p-20 flex flex-col justify-center text-white relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            <div className="relative z-10 max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Automate 80% of Your Support Workload</h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">Let Zinora AI handle the repetitive questions so your team can focus on what matters most: building relationships.</p>
              
              <ul className="space-y-4 mb-10">
                {[
                  'Seamless knowledge base ingestion',
                  'Custom workflow builder',
                  'Smart intent recognition',
                  'Dynamic API actions'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                      <Check className="h-4 w-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              
              <Button size="lg" className="bg-white text-primary hover:bg-slate-100 h-14 px-8 text-base shadow-xl" onClick={() => setLocation("/signup")}>
                Start Free Trial
              </Button>
            </div>
          </div>
          
          <div className="bg-slate-50 p-12 md:p-20 flex items-center justify-center">
            <div className="w-full max-w-md space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center gap-4"
              >
                <div className="bg-slate-100 p-3 rounded-lg"><MessageSquare className="w-6 h-6 text-slate-600" /></div>
                <div>
                  <p className="font-semibold text-slate-900">Customer asks a question</p>
                  <p className="text-sm text-slate-500">Across any integrated channel</p>
                </div>
              </motion.div>
              
              <div className="flex justify-center">
                <ArrowRight className="w-6 h-6 text-slate-300 rotate-90" />
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-primary border border-primary-600 rounded-xl p-5 shadow-lg flex items-center gap-4 relative overflow-hidden text-white"
              >
                <div className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none" />
                <div className="bg-white/20 p-3 rounded-lg relative z-10"><Cpu className="w-6 h-6 text-white" /></div>
                <div className="relative z-10">
                  <p className="font-semibold">Zinora AI Analyzes Intent</p>
                  <p className="text-sm text-blue-100">Consults KB & executes actions</p>
                </div>
              </motion.div>
              
              <div className="flex justify-center gap-24 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 border-t-2 border-slate-300 border-dashed" />
                <ArrowRight className="w-6 h-6 text-slate-300 rotate-45 transform translate-y-3 -translate-x-2" />
                <ArrowRight className="w-6 h-6 text-slate-300 rotate-[135deg] transform translate-y-3 translate-x-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center"
                >
                  <div className="mx-auto w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm">Instant Resolution</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm text-center"
                >
                  <div className="mx-auto w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                    <ArrowUpRight className="w-5 h-5 text-amber-600" />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm">Smart Escalation</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: TESTIMONIALS */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Trusted by Teams Around the World</h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((test, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all h-full flex flex-col">
                  <div className="flex items-center gap-1 text-yellow-500 mb-6">
                    {[...Array(test.rating)].map((_, j) => <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                  </div>
                  <blockquote className="flex-1 text-xl font-medium text-slate-800 leading-relaxed mb-8 italic">"{test.quote}"</blockquote>
                  <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${test.color} flex items-center justify-center text-white font-bold shadow-sm`}>
                      {test.initial}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{test.author}</p>
                      <p className="text-sm text-slate-500">{test.title}, {test.company}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: PRICING PREVIEW */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">Simple, Transparent Pricing</h2>
            
            <div className="inline-flex items-center rounded-full bg-slate-200 p-1">
              <button 
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${billingCycle === "monthly" ? "bg-white shadow-sm text-slate-900" : "text-slate-600 hover:text-slate-900"}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${billingCycle === "yearly" ? "bg-white shadow-sm text-slate-900" : "text-slate-600 hover:text-slate-900"}`}
              >
                Yearly <span className="ml-1 text-xs text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full">-17%</span>
              </button>
            </div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {plansLoading ? (
              <>
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white border rounded-2xl p-8 space-y-4">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-12 w-1/3 mt-6" />
                    <div className="space-y-3 pt-6"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" /><Skeleton className="h-4 w-full" /></div>
                    <Skeleton className="h-12 w-full mt-6" />
                  </div>
                ))}
              </>
            ) : (
              plans?.map((plan) => {
                const price = billingCycle === "monthly" ? plan.price : Math.floor(plan.price * 0.83);
                return (
                  <div key={plan.id} className={`relative flex flex-col rounded-3xl bg-white p-8 ${plan.isPopular ? 'border-2 border-primary shadow-xl scale-105 z-10' : 'border border-slate-200 shadow-sm mt-4 mb-4'}`}>
                    {plan.isPopular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-bold text-white shadow-md">
                        Most Popular
                      </div>
                    )}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-slate-900">{plan.name}</h3>
                      <p className="text-slate-500 mt-2 h-10">{plan.description}</p>
                    </div>
                    <div className="mb-8">
                      {billingCycle === "yearly" && (
                        <p className="text-slate-400 line-through text-sm font-medium mb-1">${plan.price}/mo</p>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-extrabold text-slate-900">${price}</span>
                        <span className="text-slate-500 font-medium">/mo</span>
                      </div>
                      {billingCycle === "yearly" && <p className="text-green-600 text-sm font-medium mt-2">Billed annually</p>}
                    </div>
                    <ul className="mb-8 flex-1 space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                          <div className="flex h-5 w-5 mt-0.5 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                            <Check className="h-3 w-3" />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full h-12 text-base font-bold ${plan.isPopular ? "bg-primary text-white hover:bg-primary/90 shadow-md" : "bg-slate-100 text-slate-900 hover:bg-slate-200"}`}
                      onClick={() => setLocation("/signup")}
                    >
                      Get Started
                    </Button>
                  </div>
                );
              })
            )}
          </div>
          <p className="text-center text-slate-500 mt-12 font-medium">All plans include a 14-day free trial. No credit card required.</p>
        </div>
      </section>

      {/* SECTION 9: FAQ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Frequently Asked Questions</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "How does Zinora AI handle complex customer queries?", a: "Zinora AI uses multi-step reasoning to understand context and intent. If an issue requires human intervention or sensitive account changes, it seamlessly escalates to your human agents with full context." },
              { q: "Can I train the AI on my own data?", a: "Yes. You can connect Zinora AI to your existing help center, documentation, past support tickets, and website. It ingests this data instantly and uses it to provide accurate, brand-aligned answers." },
              { q: "What languages does Zinora AI support?", a: "Zinora AI natively understands and generates responses in over 50 languages, including Spanish, French, German, Japanese, Chinese, and Arabic. No manual translation rules required." },
              { q: "How long does it take to set up?", a: "Most teams go live in under 15 minutes. Simply connect your knowledge sources, adjust the brand voice settings, and deploy the widget or integrate with your existing helpdesk." },
              { q: "Is my customer data secure?", a: "Security is our top priority. We are SOC 2 Type II, GDPR, and HIPAA compliant. All data is encrypted at rest and in transit, and we do not use your proprietary data to train base models." },
              { q: "Can I integrate with my existing tools?", a: "Absolutely. We offer native integrations with Zendesk, Intercom, Salesforce, HubSpot, Shopify, Slack, and a robust REST API for custom integrations." },
              { q: "What happens when the AI can't resolve an issue?", a: "The AI recognizes its confidence limits. If it cannot resolve an issue, it politely informs the customer and instantly routes the conversation to the appropriate human team along with a summary." },
              { q: "Do you offer a free trial?", a: "Yes, we offer a 14-day full-featured free trial. No credit card is required to start, so you can test the AI's capabilities with your own data risk-free." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-slate-200">
                <AccordionTrigger className="text-left text-lg font-semibold text-slate-900 hover:text-primary py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 text-base leading-relaxed pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* SECTION 10: FINAL CTA */}
      <section className="relative py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Start Delivering Exceptional Support Today
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join the world's fastest-growing companies using Zinora AI to scale their support effortlessly while keeping customers happy.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button size="lg" className="h-14 px-10 text-lg bg-white text-primary hover:bg-slate-50 shadow-xl" onClick={() => setLocation("/signup")}>
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-white/30 text-white hover:bg-white/10" onClick={() => setLocation("/contact")}>
              Talk to Sales
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm font-medium text-blue-200">
            <span className="flex items-center gap-2"><Check className="h-4 w-4" /> No credit card required</span>
            <span className="flex items-center gap-2"><Check className="h-4 w-4" /> 14-day free trial</span>
            <span className="flex items-center gap-2"><Check className="h-4 w-4" /> Cancel anytime</span>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
