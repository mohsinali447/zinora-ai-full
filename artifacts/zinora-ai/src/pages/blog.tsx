import { PublicLayout } from "@/components/layouts/public-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Blog() {
  const posts = [
    { title: "The Future of AI in Enterprise Support", category: "AI Trends", date: "Oct 12, 2023", desc: "How generative AI is reshaping the landscape of customer interactions for global brands." },
    { title: "How GlobalTech Reduced Response Times by 95%", category: "Case Study", date: "Sep 28, 2023", desc: "Discover how one of the world's leading tech companies transformed their support with Zinora." },
    { title: "Announcing Zinora AI 2.0", category: "Product Updates", date: "Sep 15, 2023", desc: "New models, better sentiment analysis, and seamless handoffs to human agents." },
    { title: "Scaling Multilingual Support Without Scaling Costs", category: "Best Practices", date: "Aug 30, 2023", desc: "Strategies for expanding into new regions while maintaining high customer satisfaction." },
    { title: "The ROI of Instant Resolution", category: "Business", date: "Aug 12, 2023", desc: "Why resolving tickets in seconds rather than hours drastically improves your bottom line." },
    { title: "Building a Better Knowledge Base for AI", category: "Guides", date: "Jul 22, 2023", desc: "Tips and tricks for formatting your documentation so your AI agent learns faster." }
  ];

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-24 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Zinora Blog</h1>
          <p className="text-xl text-muted-foreground">Insights, updates, and strategies for customer success.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Card key={i} className="cursor-pointer hover:shadow-lg transition-all border-border/50 bg-card overflow-hidden">
              <div className="h-48 bg-muted/30 border-b flex items-center justify-center">
                 <span className="text-4xl opacity-20 font-serif italic text-primary">Z</span>
              </div>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <CardTitle className="text-xl leading-tight">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{post.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
