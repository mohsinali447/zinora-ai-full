import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const integrationsTable = pgTable("integrations", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  isConnected: boolean("is_connected").notNull().default(false),
  logoUrl: text("logo_url").notNull().default(""),
  connectedAt: timestamp("connected_at"),
});

export const insertIntegrationSchema = createInsertSchema(integrationsTable);
export type InsertIntegration = z.infer<typeof insertIntegrationSchema>;
export type Integration = typeof integrationsTable.$inferSelect;
