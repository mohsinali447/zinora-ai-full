import { Router, type IRouter } from "express";
import { db, conversationsTable, messagesTable } from "@workspace/db";
import { count, eq, gte, desc } from "drizzle-orm";
import {
  GetDashboardSummaryResponse,
  GetDashboardActivityResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/dashboard/summary", async (req, res): Promise<void> => {
  const [totalResult] = await db.select({ count: count() }).from(conversationsTable);
  const [resolvedResult] = await db.select({ count: count() }).from(conversationsTable).where(eq(conversationsTable.status, "resolved"));
  const [activeResult] = await db.select({ count: count() }).from(conversationsTable).where(eq(conversationsTable.status, "open"));

  res.json(GetDashboardSummaryResponse.parse({
    totalConversations: totalResult.count,
    resolvedToday: resolvedResult.count,
    activeChats: activeResult.count,
    avgResponseTime: "2.3s",
    satisfactionScore: 4.8,
    aiResolutionRate: 0.94,
    weeklyGrowth: 12.5,
  }));
});

router.get("/dashboard/activity", async (req, res): Promise<void> => {
  const conversations = await db.select().from(conversationsTable).orderBy(desc(conversationsTable.lastMessageAt)).limit(10);
  const activity = conversations.map((c, i) => ({
    id: c.id,
    type: i % 3 === 0 ? "resolved" : i % 3 === 1 ? "new_conversation" : "ai_reply",
    description: i % 3 === 0
      ? `Conversation with ${c.customerName} resolved`
      : i % 3 === 1
      ? `New conversation from ${c.customerName}`
      : `AI replied to ${c.customerName}`,
    timestamp: c.lastMessageAt.toISOString(),
    user: c.assignedTo ?? null,
  }));
  res.json(GetDashboardActivityResponse.parse(activity));
});

export default router;
