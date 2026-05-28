import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const messagesTable = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull(),
  content: text("content").notNull(),
  sender: text("sender").notNull(),
  senderType: text("sender_type").notNull().default("customer"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  isAi: boolean("is_ai").notNull().default(false),
  attachments: text("attachments").array().notNull().default([]),
});

export const insertMessageSchema = createInsertSchema(messagesTable).omit({ id: true });
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messagesTable.$inferSelect;
