// Author: Raihan Haykal
// Server utama Racik API
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import categories from "./routes/categories";
import ingredients from "./routes/ingredients";
import recipes from "./routes/recipes";
import favorites from "./routes/favorites";
import pantry from "./routes/pantry";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    app: "Racik API",
    deskripsi: "Backend aplikasi Racik - pencari resep berbasis bahan",
    author: "Raihan Haykal",
    health: "/api/health",
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "Racik API",
    author: "© Raihan Haykal",
    waktu: new Date().toISOString(),
  });
});

app.use("/api/categories", categories);
app.use("/api/ingredients", ingredients);
app.use("/api/recipes", recipes);
app.use("/api/favorites", favorites);
app.use("/api/pantry", pantry);

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`🍳 Racik API berjalan di port ${PORT}`);
});
