// Author: Raihan Haykal
import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// GET /api/ingredients?search=&page=&limit=
// Hanya bahan non-bumbu-dasar (untuk pemilih stok), dengan paginasi.
router.get("/", async (req, res) => {
  const search = ((req.query.search as string | undefined) ?? "").trim();
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(60, Math.max(1, Number(req.query.limit) || 30));
  const skip = (page - 1) * limit;

  const where: any = { staple: false };
  if (search) where.nama = { contains: search, mode: "insensitive" };

  const [total, items] = await Promise.all([
    prisma.ingredient.count({ where }),
    prisma.ingredient.findMany({ where, orderBy: { nama: "asc" }, skip, take: limit }),
  ]);

  res.json({ items, page, limit, total, hasMore: skip + items.length < total });
});

export default router;
