import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { useGetSubscription, useListPlans, useListInvoices } from "@/lib/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, CreditCard } from "lucide-react";

export default function Billing() {
  const { data: sub } = useGetSubscription();
  const { data: plans } = useListPlans();
  const { data: invoices } = useListInvoices();

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
          <p className="text-muted-foreground mt-1">Manage your plan, usage, and invoices.</p>
        </div>

        {sub && (
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    {sub.planName} Plan
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 uppercase">{sub.status}</Badge>
                  </CardTitle>
                  <CardDescription className="mt-1">Billing period: {new Date(sub.currentPeriodStart).toLocaleDateString()} - {new Date(sub.currentPeriodEnd).toLocaleDateString()}</CardDescription>
                </div>
                <Button variant="outline">Manage Subscription</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">AI Credits</span>
                  <span className="text-muted-foreground">{sub.aiCreditsUsed.toLocaleString()} / {sub.aiCreditsLimit.toLocaleString()}</span>
                </div>
                <Progress value={(sub.aiCreditsUsed / sub.aiCreditsLimit) * 100} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Seats</span>
                  <span className="text-muted-foreground">{sub.seatsUsed} / {sub.seatsLimit}</span>
                </div>
                <Progress value={(sub.seatsUsed / sub.seatsLimit) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {plans?.map((plan) => (
              <Card key={plan.id} className={`flex flex-col ${plan.name === sub?.planName ? 'border-primary shadow-sm' : ''}`}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-4">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/mo</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {plan.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4 text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.name === sub?.planName ? "outline" : "default"} disabled={plan.name === sub?.planName}>
                    {plan.name === sub?.planName ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5" /> Invoice History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices?.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell>{new Date(inv.date).toLocaleDateString()}</TableCell>
                    <TableCell>{inv.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 capitalize">{inv.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">${inv.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function CheckIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
