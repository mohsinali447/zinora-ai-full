import { pgTable, serial, text, timestamp, boolean, real, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const aiSettingsTable = pgTable("ai_settings", {
  id: serial("id").primaryKey(),
  personality: text("personality").notNull().default("friendly"),
  responseTone: text("response_tone").notNull().default("balanced"),
  model: text("model").notNull().default("gpt-4"),
  language: text("language").notNull().default("en"),
  confidenceThreshold: real("confidence_threshold").notNull().default(0.8),
  autoEscalate: boolean("auto_escalate").notNull().default(true),
  autoEscalateThreshold: real("auto_escalate_threshold").notNull().default(0.5),
  maxResponseLength: integer("max_response_length").notNull().default(500),
  enableSentimentAnalysis: boolean("enable_sentiment_analysis").notNull().default(true),
  enableAutoReply: boolean("enable_auto_reply").notNull().default(true),
  workingHoursOnly: boolean("working_hours_only").notNull().default(false),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertAiSettingsSchema = createInsertSchema(aiSettingsTable).omit({ id: true, updatedAt: true });
export type InsertAiSettings = z.infer<typeof insertAiSettingsSchema>;
export type AiSettings = typeof aiSettingsTable.$inferSelect;
