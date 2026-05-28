import { Router, type IRouter } from "express";
import { db, teamMembersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  ListTeamMembersResponse,
  InviteTeamMemberBody,
  UpdateTeamMemberParams,
  UpdateTeamMemberBody,
  UpdateTeamMemberResponse,
  RemoveTeamMemberParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

function formatMember(m: typeof teamMembersTable.$inferSelect) {
  return {
    id: m.id,
    name: m.name,
    email: m.email,
    role: m.role,
    status: m.status,
    joinedAt: m.joinedAt.toISOString(),
    conversationsHandled: m.conversationsHandled,
    avatarUrl: m.avatarUrl ?? null,
  };
}

router.get("/team/members", async (req, res): Promise<void> => {
  const rows = await db.select().from(teamMembersTable);
  res.json(ListTeamMembersResponse.parse(rows.map(formatMember)));
});

router.post("/team/members", async (req, res): Promise<void> => {
  const parsed = InviteTeamMemberBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db.insert(teamMembersTable).values({
    name: parsed.data.name ?? parsed.data.email.split("@")[0],
    email: parsed.data.email,
    role: parsed.data.role,
    status: "invited",
    conversationsHandled: 0,
  }).returning();
  res.status(201).json(formatMember(row));
});

router.patch("/team/members/:id", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(rawId, 10);
  const parsed = UpdateTeamMemberBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db.update(teamMembersTable).set(parsed.data).where(eq(teamMembersTable.id, id)).returning();
  if (!row) {
    res.status(404).json({ error: "Team member not found" });
    return;
  }
  res.json(UpdateTeamMemberResponse.parse(formatMember(row)));
});

router.delete("/team/members/:id", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(rawId, 10);
  const [row] = await db.delete(teamMembersTable).where(eq(teamMembersTable.id, id)).returning();
  if (!row) {
    res.status(404).json({ error: "Team member not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
