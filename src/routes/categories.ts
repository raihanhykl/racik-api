// Author: Raihan Haykal
import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// GET /api/categories
router.get("/", async (_req, res) => {
  const cats = await prisma.category.findMany({ orderBy: { id: "asc" } });
  res.json(cats);
});

export default router;
