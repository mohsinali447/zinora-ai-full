import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { useListNotifications, useMarkNotificationRead, useMarkAllNotificationsRead, getListNotificationsQueryKey } from "@/lib/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check, Info, AlertCircle, MessageSquare } from "lucide-react";

export default function Notifications() {
  const { data: notifications } = useListNotifications();
  const markReadMutation = useMarkNotificationRead();
  const markAllReadMutation = useMarkAllNotificationsRead();
  const queryClient = useQueryClient();

  const handleMarkRead = (id: number) => {
    markReadMutation.mutate({ id }, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListNotificationsQueryKey() })
    });
  };

  const handleMarkAllRead = () => {
    markAllReadMutation.mutate(undefined, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListNotificationsQueryKey() })
    });
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'system': return <Info className="h-5 w-5 text-blue-500" />;
      case 'alert': return <AlertCircle className="h-5 w-5 text-destructive" />;
      case 'message': return <MessageSquare className="h-5 w-5 text-primary" />;
      default: return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground mt-1">Stay updated on your system alerts and messages.</p>
          </div>
          <Button variant="outline" onClick={() => handleMarkAllRead()} disabled={markAllReadMutation.isPending}>
            <Check className="mr-2 h-4 w-4" /> Mark all as read
          </Button>
        </div>

        <Card>
          <CardContent className="p-0 divide-y">
            {notifications?.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">No notifications.</div>
            ) : (
              notifications?.map(notif => (
                <div key={notif.id} className={`flex items-start gap-4 p-4 transition-colors hover:bg-muted/50 ${!notif.isRead ? 'bg-primary/5' : ''}`}>
                  <div className={`p-2 rounded-full mt-1 ${!notif.isRead ? 'bg-background shadow-sm' : 'bg-transparent'}`}>
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm ${!notif.isRead ? 'font-semibold' : 'font-medium'}`}>{notif.title}</h4>
                      <span className="text-xs text-muted-foreground">{new Date(notif.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notif.message}</p>
                  </div>
                  {!notif.isRead && (
                    <Button variant="ghost" size="icon" onClick={() => handleMarkRead(notif.id)} className="shrink-0 text-muted-foreground hover:text-foreground">
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
