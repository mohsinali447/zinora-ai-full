import { Router, type IRouter } from "express";
import { db, articlesTable } from "@workspace/db";
import { eq, like, and, sql } from "drizzle-orm";
import {
  ListArticlesQueryParams,
  ListArticlesResponse,
  CreateArticleBody,
  GetArticleParams,
  GetArticleResponse,
  UpdateArticleParams,
  UpdateArticleBody,
  UpdateArticleResponse,
  DeleteArticleParams,
  ListCategoriesResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function formatArticle(a: typeof articlesTable.$inferSelect) {
  return {
    id: a.id,
    title: a.title,
    content: a.content,
    category: a.category,
    tags: a.tags,
    status: a.status,
    views: a.views,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  };
}

router.get("/knowledge/articles", async (req, res): Promise<void> => {
  const params = ListArticlesQueryParams.safeParse(req.query);
  const conditions = [];
  if (params.success) {
    if (params.data.category) conditions.push(eq(articlesTable.category, params.data.category));
    if (params.data.search) conditions.push(like(articlesTable.title, `%${params.data.search}%`));
  }
  const rows = conditions.length > 0
    ? await db.select().from(articlesTable).where(and(...conditions))
    : await db.select().from(articlesTable);
  res.json(ListArticlesResponse.parse(rows.map(formatArticle)));
});

router.post("/knowledge/articles", async (req, res): Promise<void> => {
  const parsed = CreateArticleBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db.insert(articlesTable).values({
    ...parsed.data,
    tags: parsed.data.tags ?? [],
    status: parsed.data.status ?? "draft",
  }).returning();
  res.status(201).json(GetArticleResponse.parse(formatArticle(row)));
});

router.get("/knowledge/articles/:id", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(rawId, 10);
  const [row] = await db.select().from(articlesTable).where(eq(articlesTable.id, id));
  if (!row) {
    res.status(404).json({ error: "Article not found" });
    return;
  }
  res.json(GetArticleResponse.parse(formatArticle(row)));
});

router.patch("/knowledge/articles/:id", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(rawId, 10);
  const parsed = UpdateArticleBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db.update(articlesTable).set({
    ...parsed.data,
    updatedAt: new Date(),
  }).where(eq(articlesTable.id, id)).returning();
  if (!row) {
    res.status(404).json({ error: "Article not found" });
    return;
  }
  res.json(UpdateArticleResponse.parse(formatArticle(row)));
});

router.delete("/knowledge/articles/:id", async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(rawId, 10);
  const [row] = await db.delete(articlesTable).where(eq(articlesTable.id, id)).returning();
  if (!row) {
    res.status(404).json({ error: "Article not found" });
    return;
  }
  res.sendStatus(204);
});

router.get("/knowledge/categories", async (req, res): Promise<void> => {
  const rows = await db.select({
    category: articlesTable.category,
  }).from(articlesTable);
  const counts: Record<string, number> = {};
  for (const r of rows) {
    counts[r.category] = (counts[r.category] ?? 0) + 1;
  }
  const categories = Object.entries(counts).map(([name, articleCount], i) => ({
    id: i + 1,
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    articleCount,
  }));
  res.json(ListCategoriesResponse.parse(categories));
});

export default router;
