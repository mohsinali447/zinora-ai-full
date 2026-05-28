import { Router, type IRouter } from "express";
import { db, conversationsTable, messagesTable } from "@workspace/db";
import { eq, like, desc, sql, and } from "drizzle-orm";
import {
  ListConversationsQueryParams,
  ListConversationsResponse,
  CreateConversationBody,
  GetConversationParams,
  GetConversationResponse,
  UpdateConversationParams,
  UpdateConversationBody,
  UpdateConversationResponse,
  ListMessagesParams,
  ListMessagesResponse,
  SendMessageParams,
  SendMessageBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

function formatConversation(c: typeof conversationsTable.$inferSelect) {
  return {
    id: c.id,
    customerName: c.customerName,
    customerEmail: c.customerEmail,
    subject: c.subject,
    status: c.status,
    lastMessage: c.lastMessage,
    lastMessageAt: c.lastMessageAt.toISOString(),
    tags: c.tags,
    channel: c.channel,
    assignedTo: c.assignedTo ?? null,
    unreadCount: c.unreadCount,
    createdAt: c.createdAt.toISOString(),
  };
}

function formatMessage(m: typeof messagesTable.$inferSelect) {
  return {
    id: m.id,
    conversationId: m.conversationId,
    content: m.content,
    sender: m.sender,
    senderType: m.senderType,
    timestamp: m.timestamp.toISOString(),
    isAi: m.isAi,
    attachments: m.attachments,
  };
}

router.get("/conversations", async (req, res): Promise<void> => {
  const params = ListConversationsQueryParams.safeParse(req.query);
  let query = db.select().from(conversationsTable);
  const conditions = [];
  if (params.success) {
    if (params.data.status) conditions.push(eq(conversationsTable.status, params.data.status));
    if (params.data.search) conditions.push(like(conversationsTable.customerName, `%${params.data.search}%`));
  }
  const rows = conditions.length > 0
    ? await db.select().from(conversationsTable).where(and(...conditions)).orderBy(desc(conversationsTable.lastMessageAt))
    : await db.select().from(conversationsTable).orderBy(desc(conversationsTable.lastMessageAt));
  res.json(ListConversationsResponse.parse(rows.map(formatConversation)));
});

router.post("/conversations", async (req, res): Promise<void> => {
  const parsed = CreateConversationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db.insert(conversationsTable).values(parsed.data).returning();
  res.status(201).json(GetConversationResponse.parse(formatConversation(row)));
});

router.get("/conversations/:id", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(rawId, 10);
  const [row] = await db.select().from(conversationsTable).where(eq(conversationsTable.id, id));
  if (!row) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  res.json(GetConversationResponse.parse(formatConversation(row)));
});

router.patch("/conversations/:id", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(rawId, 10);
  const parsed = UpdateConversationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const updateData: Record<string, unknown> = {};
  if (parsed.data.status !== undefined) updateData.status = parsed.data.status;
  if (parsed.data.tags !== undefined) updateData.tags = parsed.data.tags;
  if (parsed.data.assignedTo !== undefined) updateData.assignedTo = parsed.data.assignedTo;
  const [row] = await db.update(conversationsTable).set(updateData).where(eq(conversationsTable.id, id)).returning();
  if (!row) {
    res.status(404).json({ error: "Conversation not found" });
    return;
  }
  res.json(UpdateConversationResponse.parse(formatConversation(row)));
});

router.get("/conversations/:id/messages", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(rawId, 10);
  const rows = await db.select().from(messagesTable).where(eq(messagesTable.conversationId, id));
  res.json(ListMessagesResponse.parse(rows.map(formatMessage)));
});

router.post("/conversations/:id/messages", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(rawId, 10);
  const parsed = SendMessageBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [msg] = await db.insert(messagesTable).values({
    conversationId: id,
    content: parsed.data.content,
    sender: "Agent",
    senderType: "agent",
    isAi: false,
    attachments: parsed.data.attachments ?? [],
  }).returning();
  await db.update(conversationsTable).set({
    lastMessage: parsed.data.content,
    lastMessageAt: new Date(),
  }).where(eq(conversationsTable.id, id));
  res.status(201).json(formatMessage(msg));
});

export default router;
