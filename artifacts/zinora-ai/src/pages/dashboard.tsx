import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { useGetDashboardSummary, useGetDashboardActivity } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, CheckCircle, Clock, Star, Bot, TrendingUp, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: summary, isLoading: isSummaryLoading } = useGetDashboardSummary();
  const { data: activity, isLoading: isActivityLoading } = useGetDashboardActivity();

  const kpis = summary ? [
    { label: "Total Conversations", value: summary.totalConversations, icon: MessageSquare, trend: "+12%" },
    { label: "Resolved Today", value: summary.resolvedToday, icon: CheckCircle, trend: "+5%" },
    { label: "Active Chats", value: summary.activeChats, icon: Activity, trend: "-2%" },
    { label: "Avg Response Time", value: summary.avgResponseTime, icon: Clock, trend: "-15%" },
    { label: "Satisfaction Score", value: `${summary.satisfactionScore}/5`, icon: Star, trend: "+0.2" },
    { label: "AI Resolution Rate", value: `${summary.aiResolutionRate}%`, icon: Bot, trend: "+4%" },
  ] : [];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Command Center</h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your support operations today.</p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isSummaryLoading ? (
            Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-[120px] rounded-xl" />)
          ) : (
            kpis.map((kpi, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.label}</CardTitle>
                  <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <p className={`text-xs mt-1 ${kpi.trend.startsWith('+') && !kpi.trend.includes('Time') ? 'text-green-500' : 'text-muted-foreground'}`}>
                    <TrendingUp className="inline mr-1 h-3 w-3" />
                    {kpi.trend} from last week
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>AI Performance Overview</CardTitle>
              <CardDescription>Conversations handled by AI vs Human agents over time.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center border-t bg-muted/10">
              {/* Replace with Recharts later */}
              <p className="text-muted-foreground">Performance Chart Area</p>
            </CardContent>
          </Card>
          
          <Card className="col-span-3 flex flex-col">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions across your platform.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              {isActivityLoading ? (
                <div className="space-y-4">
                  {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : (
                <div className="space-y-4">
                  {activity?.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 text-sm">
                      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div className="grid gap-1 flex-1">
                        <p className="font-medium leading-none">{item.description}</p>
                        <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                      </div>
                    </div>
                  ))}
                  {(!activity || activity.length === 0) && (
                     <p className="text-muted-foreground text-center py-4 text-sm">No recent activity.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
