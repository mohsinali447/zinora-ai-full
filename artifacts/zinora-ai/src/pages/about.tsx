import { PublicLayout } from "@/components/layouts/public-layout";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-24 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">About Zinora AI</h1>
          <p className="text-xl text-muted-foreground">Building the future of enterprise customer support.</p>
        </div>
        
        <div className="space-y-12">
          <Card>
            <CardContent className="p-8 prose prose-lg dark:prose-invert max-w-none">
              <h3>Our Mission</h3>
              <p>At Zinora AI, we believe that customer support should be instantaneous, accurate, and deeply empathetic. We are on a mission to empower international enterprises with an AI platform that not only resolves queries at lightning speed but also enhances the overall customer experience.</p>
              
              <h3>The Platform</h3>
              <p>Zinora is built for the enterprise. With bank-grade security, multi-lingual capabilities spanning over 50 languages, and native integrations with the tools you already use, Zinora acts as the central nervous system for your support operations.</p>

              <h3>Our Team</h3>
              <p>We are a team of AI researchers, design engineers, and customer success veterans. Headquartered in San Francisco with a global presence, we understand the nuances of international business and the critical importance of reliable support.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  );
}
