import { PublicLayout } from "@/components/layouts/public-layout";
import { useListPlans } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Pricing() {
  const { data: plans } = useListPlans();

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-24 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">Choose the perfect plan for your team's needs.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
          {plans?.map((plan) => (
            <div key={plan.id} className={`relative flex flex-col rounded-2xl border bg-card p-8 shadow-sm ${plan.isPopular ? 'border-primary ring-1 ring-primary' : ''}`}>
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button className="w-full" variant={plan.isPopular ? "default" : "outline"}>
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
