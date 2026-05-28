import { Router, type IRouter } from "express";
import {
  GetSubscriptionResponse,
  ListPlansResponse,
  ListInvoicesResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/billing/subscription", async (req, res): Promise<void> => {
  res.json(GetSubscriptionResponse.parse({
    planId: "pro",
    planName: "Pro",
    status: "active",
    currentPeriodStart: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    currentPeriodEnd: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    aiCreditsUsed: 7240,
    aiCreditsLimit: 10000,
    seatsUsed: 4,
    seatsLimit: 10,
  }));
});

router.get("/billing/plans", async (req, res): Promise<void> => {
  res.json(ListPlansResponse.parse([
    {
      id: "starter",
      name: "Starter",
      price: 29,
      yearlyPrice: 290,
      description: "Perfect for small teams getting started with AI support",
      features: ["1,000 AI credits/month", "Up to 3 seats", "Basic analytics", "Email support", "Knowledge base"],
      isPopular: false,
      aiCredits: 1000,
      seats: 3,
    },
    {
      id: "pro",
      name: "Pro",
      price: 79,
      yearlyPrice: 790,
      description: "For growing businesses that need powerful AI automation",
      features: ["10,000 AI credits/month", "Up to 10 seats", "Advanced analytics", "Priority support", "Custom AI personality", "Integrations", "Team management"],
      isPopular: true,
      aiCredits: 10000,
      seats: 10,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 299,
      yearlyPrice: 2990,
      description: "Unlimited power for large organizations with complex needs",
      features: ["Unlimited AI credits", "Unlimited seats", "Enterprise analytics", "Dedicated support", "Custom AI models", "SSO & SAML", "SLA guarantees", "Custom integrations"],
      isPopular: false,
      aiCredits: 999999,
      seats: 999,
    },
  ]));
});

router.get("/billing/invoices", async (req, res): Promise<void> => {
  const invoices = [
    { id: "INV-2025-005", amount: 79, status: "paid", date: "2025-05-01", description: "Pro Plan - May 2025", downloadUrl: "#" },
    { id: "INV-2025-004", amount: 79, status: "paid", date: "2025-04-01", description: "Pro Plan - April 2025", downloadUrl: "#" },
    { id: "INV-2025-003", amount: 79, status: "paid", date: "2025-03-01", description: "Pro Plan - March 2025", downloadUrl: "#" },
    { id: "INV-2025-002", amount: 29, status: "paid", date: "2025-02-01", description: "Starter Plan - February 2025", downloadUrl: "#" },
    { id: "INV-2025-001", amount: 29, status: "paid", date: "2025-01-01", description: "Starter Plan - January 2025", downloadUrl: "#" },
  ];
  res.json(ListInvoicesResponse.parse(invoices));
});

export default router;
