// Author: Raihan Haykal
import { Router } from "express";
import { prisma } from "../prisma";
import { recipeInclude, toRecipeDTO, computeMatch, relatif } from "../dto";
import { deviceId } from "../device";

const router = Router();

// GET /api/recipes?category=&search=
router.get("/", async (req, res) => {
  const category = req.query.category ? Number(req.query.category) : undefined;
  const search = ((req.query.search as string | undefined) ?? "").trim();

  const where: any = {};
  if (category) where.categoryId = category;
  if (search) {
    where.OR = [
      { judul: { contains: search, mode: "insensitive" } },
      { deskripsi: { contains: search, mode: "insensitive" } },
    ];
  }

  const recipes = await prisma.recipe.findMany({
    where,
    include: recipeInclude,
    orderBy: { id: "asc" },
  });
  res.json(recipes.map(toRecipeDTO));
});

// POST /api/recipes/match   body { ingredientIds: number[] }
router.post("/match", async (req, res) => {
  const ids: number[] = Array.isArray(req.body?.ingredientIds)
    ? req.body.ingredientIds.map((x: any) => Number(x))
    : [];
  const pantry = new Set<number>(ids);

  const recipes = await prisma.recipe.findMany({ include: recipeInclude });
  const results = recipes.map((r) => computeMatch(r, pantry));
  results.sort((a, b) => {
    if (a.bisaDimasak !== b.bisaDimasak) return a.bisaDimasak ? -1 : 1;
    if (a.matchPercent !== b.matchPercent) return b.matchPercent - a.matchPercent;
    return a.bahanKurang.length - b.bahanKurang.length;
  });
  res.json(results);
});

// GET /api/recipes/:id
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const r = await prisma.recipe.findUnique({ where: { id }, include: recipeInclude });
  if (!r) {
    res.status(404).json({ error: "Resep tidak ditemukan" });
    return;
  }
  res.json(toRecipeDTO(r));
});

// GET /api/recipes/:id/reviews
router.get("/:id/reviews", async (req, res) => {
  const id = Number(req.params.id);
  const reviews = await prisma.review.findMany({
    where: { recipeId: id },
    orderBy: { createdAt: "desc" },
  });
  res.json(
    reviews.map((rv) => ({
      namaPenulis: rv.namaPenulis,
      rating: rv.rating,
      komentar: rv.komentar,
      tanggal: relatif(rv.createdAt),
    }))
  );
});

// POST /api/recipes/:id/reviews   (1 ulasan per resep per device)
router.post("/:id/reviews", async (req, res) => {
  const dev = deviceId(req);
  if (!dev) {
    res.status(400).json({ error: "Header X-Device-Id wajib" });
    return;
  }
  const id = Number(req.params.id);
  const nama = String(req.body?.namaPenulis ?? "").trim();
  const rating = Number(req.body?.rating);
  const komentar = String(req.body?.komentar ?? "").trim();

  if (!nama) {
    res.status(400).json({ error: "Nama wajib diisi" });
    return;
  }
  if (!(Number.isInteger(rating) && rating >= 1 && rating <= 5)) {
    res.status(400).json({ error: "Rating bintang wajib (1-5)" });
    return;
  }

  const existing = await prisma.review.findUnique({
    where: { recipeId_deviceId: { recipeId: id, deviceId: dev } },
  });
  if (existing) {
    res.status(409).json({ error: "Kamu sudah memberi ulasan untuk resep ini" });
    return;
  }

  const rv = await prisma.review.create({
    data: { recipeId: id, deviceId: dev, namaPenulis: nama, rating, komentar },
  });
  res.status(201).json({
    namaPenulis: rv.namaPenulis,
    rating: rv.rating,
    komentar: rv.komentar,
    tanggal: "Baru saja",
  });
});

export default router;
