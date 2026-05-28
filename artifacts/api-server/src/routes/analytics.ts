import { Router, type IRouter } from "express";
import { db, conversationsTable } from "@workspace/db";
import { count, eq } from "drizzle-orm";
import {
  GetAnalyticsOverviewResponse,
  GetAnalyticsChartsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/analytics/overview", async (req, res): Promise<void> => {
  const [total] = await db.select({ count: count() }).from(conversationsTable);
  const [resolved] = await db.select({ count: count() }).from(conversationsTable).where(eq(conversationsTable.status, "resolved"));

  res.json(GetAnalyticsOverviewResponse.parse({
    totalTickets: total.count,
    resolvedTickets: resolved.count,
    avgSatisfaction: 4.8,
    avgResponseTime: 2.3,
    aiResolutionRate: 0.94,
    ticketsByChannel: [
      { name: "Chat", value: 45 },
      { name: "Email", value: 30 },
      { name: "WhatsApp", value: 15 },
      { name: "Slack", value: 10 },
    ],
    ticketsByStatus: [
      { name: "Open", value: Math.max(0, total.count - resolved.count) },
      { name: "Resolved", value: resolved.count },
      { name: "Pending", value: 5 },
    ],
  }));
});

router.get("/analytics/charts", async (req, res): Promise<void> => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dailyConversations = days.map((d, i) => ({
    date: d,
    value: 80 + Math.floor(Math.sin(i) * 30) + 30,
  }));
  const satisfactionTrend = days.map((d, i) => ({
    date: d,
    value: 4.5 + Math.sin(i) * 0.3,
  }));
  const responseTimeTrend = days.map((d, i) => ({
    date: d,
    value: 2.0 + Math.cos(i) * 0.5,
  }));
  const teamPerformance = [
    { name: "Alice", resolved: 142, avgTime: 1.8, satisfaction: 4.9 },
    { name: "Bob", resolved: 98, avgTime: 2.4, satisfaction: 4.7 },
    { name: "Carol", resolved: 210, avgTime: 1.5, satisfaction: 5.0 },
    { name: "Dave", resolved: 75, avgTime: 3.1, satisfaction: 4.5 },
  ];
  res.json(GetAnalyticsChartsResponse.parse({
    dailyConversations,
    satisfactionTrend,
    responseTimeTrend,
    teamPerformance,
  }));
});

export default router;
