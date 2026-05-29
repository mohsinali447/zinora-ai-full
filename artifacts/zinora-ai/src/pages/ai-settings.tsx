import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { useGetAiSettings, useUpdateAiSettings, getGetAiSettingsQueryKey } from "@/lib/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bot, Save, Loader2 } from "lucide-react";

export default function AiSettings() {
  const { data: settings, isLoading } = useGetAiSettings();
  const updateMutation = useUpdateAiSettings();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  if (isLoading || !localSettings) return <DashboardLayout><div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div></DashboardLayout>;

  const handleSave = () => {
    updateMutation.mutate({ data: localSettings }, {
      onSuccess: () => {
        toast({ title: "Settings Saved", description: "AI configuration updated successfully." });
        queryClient.invalidateQueries({ queryKey: getGetAiSettingsQueryKey() });
      }
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Configuration</h1>
          <p className="text-muted-foreground mt-1">Manage how your AI agent behaves and interacts with customers.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bot className="h-5 w-5 text-primary" /> Personality & Identity</CardTitle>
            <CardDescription>Configure the voice and model of your AI.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Personality</Label>
                <Select value={localSettings.personality} onValueChange={(v) => setLocalSettings({...localSettings, personality: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Friendly">Friendly</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Formal">Formal</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Response Tone</Label>
                <Select value={localSettings.responseTone} onValueChange={(v) => setLocalSettings({...localSettings, responseTone: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Empathetic">Empathetic</SelectItem>
                    <SelectItem value="Direct">Direct</SelectItem>
                    <SelectItem value="Balanced">Balanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>AI Model</Label>
                <Select value={localSettings.model} onValueChange={(v) => setLocalSettings({...localSettings, model: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GPT-4">GPT-4 (Recommended)</SelectItem>
                    <SelectItem value="Claude">Claude 3.5 Sonnet</SelectItem>
                    <SelectItem value="Gemini">Gemini 1.5 Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Default Language</Label>
                <Select value={localSettings.language} onValueChange={(v) => setLocalSettings({...localSettings, language: v})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Behavior & Thresholds</CardTitle>
            <CardDescription>Control when the AI responds and when it escalates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Confidence Threshold ({localSettings.confidenceThreshold}%)</Label>
                <span className="text-xs text-muted-foreground">AI will escalate if confidence is lower</span>
              </div>
              <Slider
                value={[localSettings.confidenceThreshold]}
                max={100}
                step={1}
                onValueChange={(vals) => setLocalSettings({...localSettings, confidenceThreshold: vals[0]})}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Auto Reply</Label>
                  <p className="text-sm text-muted-foreground">Allow AI to send messages autonomously</p>
                </div>
                <Switch checked={localSettings.enableAutoReply} onCheckedChange={(c) => setLocalSettings({...localSettings, enableAutoReply: c})} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Escalate</Label>
                  <p className="text-sm text-muted-foreground">Automatically route complex issues to human agents</p>
                </div>
                <Switch checked={localSettings.autoEscalate} onCheckedChange={(c) => setLocalSettings({...localSettings, autoEscalate: c})} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sentiment Analysis</Label>
                  <p className="text-sm text-muted-foreground">Analyze customer emotion to prioritize angry customers</p>
                </div>
                <Switch checked={localSettings.enableSentimentAnalysis} onCheckedChange={(c) => setLocalSettings({...localSettings, enableSentimentAnalysis: c})} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Working Hours Only</Label>
                  <p className="text-sm text-muted-foreground">Only escalate to humans during business hours</p>
                </div>
                <Switch checked={localSettings.workingHoursOnly} onCheckedChange={(c) => setLocalSettings({...localSettings, workingHoursOnly: c})} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-6 py-4">
            <Button onClick={handleSave} disabled={updateMutation.isPending} className="ml-auto">
              {updateMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
