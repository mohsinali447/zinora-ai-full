import { PublicLayout } from "@/components/layouts/public-layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Faq() {
  const faqs = [
    { q: "What is Zinora AI?", a: "Zinora AI is a world-class customer support platform that uses advanced AI models to resolve customer queries instantly and autonomously." },
    { q: "How long does it take to implement?", a: "Most enterprises go live within a few days. The AI trains instantly on your existing knowledge base articles and documentation." },
    { q: "What languages are supported?", a: "Zinora natively supports over 50 languages, allowing you to provide localized support to international customers without hiring native speakers." },
    { q: "Is my data secure?", a: "Yes. We employ bank-grade encryption and comply with GDPR, CCPA, and SOC2 standards to ensure your enterprise data is fully protected." },
    { q: "Can it hand off to a human agent?", a: "Absolutely. You can set confidence thresholds and conditions under which the AI will seamlessly route the conversation to a human agent." }
  ];

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-24 md:px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">Everything you need to know about Zinora AI.</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-lg">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </PublicLayout>
  );
}
