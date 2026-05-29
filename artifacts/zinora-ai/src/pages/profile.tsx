import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { useGetMe, useUpdateMe, getGetMeQueryKey } from "@/lib/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function Profile() {
  const { data: user, isLoading } = useGetMe();
  const updateMutation = useUpdateMe();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setCompany(user.company);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({ data: { name, company } }, {
      onSuccess: () => {
        toast({ title: "Profile updated" });
        queryClient.invalidateQueries({ queryKey: getGetMeQueryKey() });
      }
    });
  };

  if (isLoading || !user) return <DashboardLayout><div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your personal account settings.</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and public profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.avatarUrl || undefined} />
                  <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" type="button">Change Avatar</Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input value={name} onChange={e=>setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input value={user.email} disabled className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input value={company} onChange={e=>setCompany(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input value={user.role} disabled className="bg-muted/50" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 px-6 py-4">
              <Button type="submit" disabled={updateMutation.isPending} className="ml-auto">
                {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
