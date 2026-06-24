// Author: Raihan Haykal
import { Router } from "express";
import { prisma } from "../prisma";
import { recipeInclude, toRecipeDTO } from "../dto";
import { deviceId } from "../device";

const router = Router();

// GET /api/favorites
router.get("/", async (req, res) => {
  const dev = deviceId(req);
  if (!dev) {
    res.status(400).json({ error: "Header X-Device-Id wajib" });
    return;
  }
  const favs = await prisma.favorite.findMany({
    where: { deviceId: dev },
    include: { recipe: { include: recipeInclude } },
    orderBy: { createdAt: "desc" },
  });
  res.json(favs.map((f) => toRecipeDTO(f.recipe)));
});

// POST /api/favorites/:recipeId
router.post("/:recipeId", async (req, res) => {
  const dev = deviceId(req);
  if (!dev) {
    res.status(400).json({ error: "Header X-Device-Id wajib" });
    return;
  }
  const recipeId = Number(req.params.recipeId);
  await prisma.favorite.upsert({
    where: { recipeId_deviceId: { recipeId, deviceId: dev } },
    create: { recipeId, deviceId: dev },
    update: {},
  });
  res.json({ ok: true, favorit: true });
});

// DELETE /api/favorites/:recipeId
router.delete("/:recipeId", async (req, res) => {
  const dev = deviceId(req);
  if (!dev) {
    res.status(400).json({ error: "Header X-Device-Id wajib" });
    return;
  }
  const recipeId = Number(req.params.recipeId);
  await prisma.favorite.deleteMany({ where: { recipeId, deviceId: dev } });
  res.json({ ok: true, favorit: false });
});

export default router;
