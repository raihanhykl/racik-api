// Author: Raihan Haykal
import { Router } from "express";
import { prisma } from "../prisma";
import { deviceId } from "../device";

const router = Router();

function dto(p: any) {
  return {
    ingredientId: p.ingredientId,
    nama: p.ingredient?.nama ?? "",
    note: p.note,
    selected: p.selected,
  };
}

// GET /api/pantry
router.get("/", async (req, res) => {
  const dev = deviceId(req);
  if (!dev) {
    res.status(400).json({ error: "Header X-Device-Id wajib" });
    return;
  }
  const items = await prisma.pantryItem.findMany({
    where: { deviceId: dev },
    include: { ingredient: true },
    orderBy: { id: "asc" },
  });
  res.json(items.map(dto));
});

// POST /api/pantry   body { ingredientId, note?, selected? }  (tambah/perbarui)
router.post("/", async (req, res) => {
  const dev = deviceId(req);
  if (!dev) {
    res.status(400).json({ error: "Header X-Device-Id wajib" });
    return;
  }
  const ingredientId = Number(req.body?.ingredientId);
  if (!ingredientId) {
    res.status(400).json({ error: "ingredientId wajib" });
    return;
  }
  const note = String(req.body?.note ?? "");
  const selected = req.body?.selected === undefined ? true : !!req.body.selected;

  const item = await prisma.pantryItem.upsert({
    where: { deviceId_ingredientId: { deviceId: dev, ingredientId } },
    create: { deviceId: dev, ingredientId, note, selected },
    update: { note, selected },
    include: { ingredient: true },
  });
  res.json(dto(item));
});

// PUT /api/pantry/:ingredientId   body { note?, selected? }
router.put("/:ingredientId", async (req, res) => {
  const dev = deviceId(req);
  if (!dev) {
    res.status(400).json({ error: "Header X-Device-Id wajib" });
    return;
  }
  const ingredientId = Number(req.params.ingredientId);
  const data: any = {};
  if (req.body?.note !== undefined) data.note = String(req.body.note);
  if (req.body?.selected !== undefined) data.selected = !!req.body.selected;
  await prisma.pantryItem.updateMany({ where: { deviceId: dev, ingredientId }, data });
  res.json({ ok: true });
});

// DELETE /api/pantry/:ingredientId
router.delete("/:ingredientId", async (req, res) => {
  const dev = deviceId(req);
  if (!dev) {
    res.status(400).json({ error: "Header X-Device-Id wajib" });
    return;
  }
  const ingredientId = Number(req.params.ingredientId);
  await prisma.pantryItem.deleteMany({ where: { deviceId: dev, ingredientId } });
  res.json({ ok: true });
});

export default router;
