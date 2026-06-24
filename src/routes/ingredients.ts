// Author: Raihan Haykal
import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// GET /api/ingredients?search=
router.get("/", async (req, res) => {
  const search = ((req.query.search as string | undefined) ?? "").trim();
  const where: any = search
    ? { nama: { contains: search, mode: "insensitive" } }
    : {};
  const items = await prisma.ingredient.findMany({
    where,
    orderBy: { nama: "asc" },
  });
  res.json(items);
});

export default router;
