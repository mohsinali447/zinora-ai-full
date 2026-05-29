import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { useSubmitContact } from "@/lib/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LifeBuoy, Mail } from "lucide-react";
import { useGetMe } from "@/lib/hooks";

export default function Support() {
  const { data: user } = useGetMe();
  const submitMutation = useSubmitContact();
  const { toast } = useToast();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    submitMutation.mutate({ data: { name: user.name, email: user.email, subject, message } }, {
      onSuccess: () => {
        toast({ title: "Message sent", description: "Our support team will get back to you shortly." });
        setSubject("");
        setMessage("");
      }
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
          <p className="text-muted-foreground mt-1">Get help, read FAQs, or contact our enterprise support team.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2"><LifeBuoy className="h-5 w-5" /> Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I train the AI on my data?</AccordionTrigger>
                <AccordionContent>
                  You can add articles in the Knowledge Base section. The AI automatically indexes and learns from published articles within seconds.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How are AI credits calculated?</AccordionTrigger>
                <AccordionContent>
                  One AI credit equals one AI-generated response in a conversation. Internal system messages or human agent replies do not consume credits.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I connect my own CRM?</AccordionTrigger>
                <AccordionContent>
                  Yes, navigate to the Integrations page to connect Salesforce, Hubspot, Zendesk, and other supported platforms.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5 text-primary" /> Contact Support</CardTitle>
                <CardDescription>Submit a ticket directly to our enterprise support team.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input value={subject} onChange={e=>setSubject(e.target.value)} required placeholder="Brief description of the issue" />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea value={message} onChange={e=>setMessage(e.target.value)} required rows={6} placeholder="Provide as much detail as possible..." />
                </div>
              </CardContent>
              <CardFooter className="bg-muted/20 border-t px-6 py-4">
                <Button type="submit" disabled={submitMutation.isPending} className="w-full">
                  {submitMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send Message
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
