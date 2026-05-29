import { PublicLayout } from "@/components/layouts/public-layout";
import { useSubmitContact } from "@/lib/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const submitMutation = useSubmitContact();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate({ data: { name, email, company, subject, message } }, {
      onSuccess: () => {
        toast({ title: "Message sent", description: "Our sales team will get back to you shortly." });
        setName(""); setEmail(""); setCompany(""); setSubject(""); setMessage("");
      }
    });
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-24 md:px-6 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Contact Us</h1>
          <p className="text-xl text-muted-foreground">Ready to upgrade your support? Let's talk.</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5 text-primary" /> Send us a message</CardTitle>
              <CardDescription>Fill out the form below and we'll be in touch as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input value={name} onChange={e=>setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Company</Label>
                <Input value={company} onChange={e=>setCompany(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input value={subject} onChange={e=>setSubject(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea value={message} onChange={e=>setMessage(e.target.value)} required rows={5} />
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
    </PublicLayout>
  );
}
