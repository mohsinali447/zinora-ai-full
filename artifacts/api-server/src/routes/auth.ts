import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, usersTable } from "@workspace/db";
import {
  LoginBody,
  LoginResponse,
  SignupBody,
  ForgotPasswordBody,
  ForgotPasswordResponse,
  GetMeResponse,
  UpdateMeBody,
  UpdateMeResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { email } = parsed.data;
  let [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (!user) {
    [user] = await db.insert(usersTable).values({
      name: email.split("@")[0],
      email,
      passwordHash: "hashed",
      role: "admin",
      company: "Zinora Inc",
      plan: "pro",
    }).returning();
  }
  const token = Buffer.from(`${user.id}:${user.email}`).toString("base64");
  res.json(LoginResponse.parse({ token, user: formatUser(user) }));
});

router.post("/auth/signup", async (req, res): Promise<void> => {
  const parsed = SignupBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { name, email, company } = parsed.data;
  let [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (!user) {
    [user] = await db.insert(usersTable).values({
      name,
      email,
      passwordHash: "hashed",
      role: "admin",
      company,
      plan: "starter",
    }).returning();
  }
  const token = Buffer.from(`${user.id}:${user.email}`).toString("base64");
  res.status(201).json(LoginResponse.parse({ token, user: formatUser(user) }));
});

router.post("/auth/forgot-password", async (req, res): Promise<void> => {
  const parsed = ForgotPasswordBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  res.json(ForgotPasswordResponse.parse({ message: "Password reset email sent" }));
});

router.get("/auth/me", async (req, res): Promise<void> => {
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = auth.replace("Bearer ", "");
  const decoded = Buffer.from(token, "base64").toString();
  const [idStr] = decoded.split(":");
  const id = parseInt(idStr, 10);
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id));
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(GetMeResponse.parse(formatUser(user)));
});

router.patch("/auth/me", async (req, res): Promise<void> => {
  const auth = req.headers.authorization;
  if (!auth) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const token = auth.replace("Bearer ", "");
  const decoded = Buffer.from(token, "base64").toString();
  const [idStr] = decoded.split(":");
  const id = parseInt(idStr, 10);
  const parsed = UpdateMeBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [user] = await db.update(usersTable).set(parsed.data).where(eq(usersTable.id, id)).returning();
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(UpdateMeResponse.parse(formatUser(user)));
});

function formatUser(user: typeof usersTable.$inferSelect) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    company: user.company,
    plan: user.plan,
    avatarUrl: user.avatarUrl ?? null,
    createdAt: user.createdAt.toISOString(),
  };
}

export default router;
