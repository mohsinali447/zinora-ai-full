import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const teamMembersTable = pgTable("team_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("agent"),
  status: text("status").notNull().default("active"),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
  conversationsHandled: integer("conversations_handled").notNull().default(0),
  avatarUrl: text("avatar_url"),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembersTable).omit({ id: true, joinedAt: true });
export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;
export type TeamMember = typeof teamMembersTable.$inferSelect;
