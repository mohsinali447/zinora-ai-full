import { Router, type IRouter } from "express";
import { db, aiSettingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  GetAiSettingsResponse,
  UpdateAiSettingsBody,
  UpdateAiSettingsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

async function ensureSettings() {
  const [existing] = await db.select().from(aiSettingsTable);
  if (existing) return existing;
  const [created] = await db.insert(aiSettingsTable).values({}).returning();
  return created;
}

function formatSettings(s: typeof aiSettingsTable.$inferSelect) {
  return {
    id: s.id,
    personality: s.personality,
    responseTone: s.responseTone,
    model: s.model,
    language: s.language,
    confidenceThreshold: s.confidenceThreshold,
    autoEscalate: s.autoEscalate,
    autoEscalateThreshold: s.autoEscalateThreshold,
    maxResponseLength: s.maxResponseLength,
    enableSentimentAnalysis: s.enableSentimentAnalysis,
    enableAutoReply: s.enableAutoReply,
    workingHoursOnly: s.workingHoursOnly,
  };
}

router.get("/ai-settings", async (req, res): Promise<void> => {
  const settings = await ensureSettings();
  res.json(GetAiSettingsResponse.parse(formatSettings(settings)));
});

router.patch("/ai-settings", async (req, res): Promise<void> => {
  const settings = await ensureSettings();
  const parsed = UpdateAiSettingsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const updateData: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(parsed.data)) {
    if (v !== undefined) updateData[k] = v;
  }
  const [updated] = await db.update(aiSettingsTable).set({ ...updateData, updatedAt: new Date() }).where(eq(aiSettingsTable.id, settings.id)).returning();
  res.json(UpdateAiSettingsResponse.parse(formatSettings(updated)));
});

export default router;
