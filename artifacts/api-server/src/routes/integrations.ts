import { Router, type IRouter } from "express";
import { db, integrationsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  ListIntegrationsResponse,
  ConnectIntegrationParams,
  ConnectIntegrationResponse,
  DisconnectIntegrationParams,
  DisconnectIntegrationResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function formatIntegration(i: typeof integrationsTable.$inferSelect) {
  return {
    id: i.id,
    name: i.name,
    description: i.description,
    category: i.category,
    isConnected: i.isConnected,
    logoUrl: i.logoUrl,
    connectedAt: i.connectedAt ? i.connectedAt.toISOString() : null,
  };
}

router.get("/integrations", async (req, res): Promise<void> => {
  const rows = await db.select().from(integrationsTable);
  res.json(ListIntegrationsResponse.parse(rows.map(formatIntegration)));
});

router.post("/integrations/:id/connect", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const [row] = await db.update(integrationsTable).set({ isConnected: true, connectedAt: new Date() }).where(eq(integrationsTable.id, rawId)).returning();
  if (!row) {
    res.status(404).json({ error: "Integration not found" });
    return;
  }
  res.json(ConnectIntegrationResponse.parse(formatIntegration(row)));
});

router.post("/integrations/:id/disconnect", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const [row] = await db.update(integrationsTable).set({ isConnected: false, connectedAt: null }).where(eq(integrationsTable.id, rawId)).returning();
  if (!row) {
    res.status(404).json({ error: "Integration not found" });
    return;
  }
  res.json(DisconnectIntegrationResponse.parse(formatIntegration(row)));
});

export default router;
