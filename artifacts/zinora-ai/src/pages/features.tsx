import { PublicLayout } from "@/components/layouts/public-layout";
import { Bot, Globe, Shield, Zap, MessageSquare, BarChart } from "lucide-react";

export default function Features() {
  const features = [
    { icon: Bot, title: "Autonomous AI Agent", desc: "Instantly resolve up to 80% of routine queries with human-like understanding." },
    { icon: Globe, title: "Multilingual Support", desc: "Native understanding and response in over 50 languages automatically." },
    { icon: Zap, title: "Real-time Processing", desc: "Sub-second response times keep your customers engaged and satisfied." },
    { icon: Shield, title: "Enterprise Security", desc: "Bank-grade encryption and compliance with global data protection standards." },
    { icon: BarChart, title: "Advanced Analytics", desc: "Deep insights into customer sentiment, agent performance, and ROI." },
    { icon: MessageSquare, title: "Omnichannel Inbox", desc: "Unify email, chat, social, and SMS into one breathtakingly fast interface." },
  ];

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-24 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Powerful Features for Enterprise Support</h1>
          <p className="text-xl text-muted-foreground">Everything you need to automate and scale your customer service operations globally.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
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
    </PublicLayout>
  );
}
