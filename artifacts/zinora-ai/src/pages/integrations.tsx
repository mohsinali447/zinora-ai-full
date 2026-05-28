import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { useListIntegrations, useConnectIntegration, useDisconnectIntegration, getListIntegrationsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiSlack, SiShopify, SiSalesforce, SiZendesk, SiHubspot, SiMailchimp } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function Integrations() {
  const { data: integrations, isLoading } = useListIntegrations();
  const connectMutation = useConnectIntegration();
  const disconnectMutation = useDisconnectIntegration();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const getIcon = (name: string) => {
    switch(name.toLowerCase()) {
      case 'slack': return <SiSlack className="h-8 w-8 text-[#E01E5A]" />;
      case 'shopify': return <SiShopify className="h-8 w-8 text-[#96BF48]" />;
      case 'salesforce': return <SiSalesforce className="h-8 w-8 text-[#00A1E0]" />;
      case 'zendesk': return <SiZendesk className="h-8 w-8 text-[#03363D]" />;
      case 'hubspot': return <SiHubspot className="h-8 w-8 text-[#FF7A59]" />;
      case 'mailchimp': return <SiMailchimp className="h-8 w-8 text-[#FFE01B]" />;
      default: return <div className="h-8 w-8 rounded bg-primary/20" />;
    }
  };

  const handleToggle = (id: string, isConnected: boolean) => {
    const mutation = isConnected ? disconnectMutation : connectMutation;
    mutation.mutate({ id }, {
      onSuccess: () => {
        toast({ title: isConnected ? "Disconnected" : "Connected successfully" });
        queryClient.invalidateQueries({ queryKey: getListIntegrationsQueryKey() });
      }
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground mt-1">Connect Zinora AI with your existing tools and workflows.</p>
        </div>

        {isLoading ? (
           <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {integrations?.map(int => (
              <Card key={int.id} className="flex flex-col">
                <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                  <div className="p-2 bg-background rounded-lg border shadow-sm flex-shrink-0">
                    {getIcon(int.name)}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center justify-between">
                      {int.name}
                      {int.isConnected && <Badge variant="secondary" className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-0">Connected</Badge>}
                    </CardTitle>
                    <Badge variant="outline" className="mt-1 font-normal text-xs">{int.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">{int.description}</p>
                </CardContent>
                <CardFooter className="border-t bg-muted/20 pt-4">
                  <Button 
                    variant={int.isConnected ? "outline" : "default"} 
                    className="w-full"
                    onClick={() => handleToggle(int.id, int.isConnected)}
                    disabled={connectMutation.isPending || disconnectMutation.isPending}
                  >
                    {int.isConnected ? "Disconnect" : "Connect"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
