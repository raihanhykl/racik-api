// Author: Raihan Haykal
import { Prisma } from "@prisma/client";

/** Relasi lengkap (dipakai halaman DETAIL & matching). */
export const recipeInclude = {
  category: true,
  reviews: { select: { rating: true } },
  bahan: { include: { ingredient: true } },
} satisfies Prisma.RecipeInclude;

/** Relasi ringan (dipakai LIST: tanpa bahan/langkah agar payload kecil). */
export const recipeListInclude = {
  category: true,
  reviews: { select: { rating: true } },
} satisfies Prisma.RecipeInclude;

export function avgRating(reviews: { rating: number }[]): number {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((a, r) => a + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

/** DTO ringan untuk daftar/kartu resep (tanpa bahan & langkah). */
export function toRecipeListDTO(r: any) {
  return {
    id: r.id,
    judul: r.judul,
    deskripsi: r.deskripsi,
    imageUrl: r.imageUrl,
    categoryId: r.categoryId,
    categoryNama: r.category?.nama ?? "",
    categoryEmoji: r.category?.emoji ?? "",
    waktuMasakMenit: r.waktuMasakMenit,
    kesulitan: r.kesulitan,
    porsi: r.porsi,
    rating: avgRating(r.reviews ?? []),
    jumlahUlasan: r.reviews ? r.reviews.length : 0,
    bahan: [],
    langkah: [],
  };
}

/** DTO lengkap untuk halaman detail resep. */
export function toRecipeDTO(r: any) {
  return {
    ...toRecipeListDTO(r),
    bahan: (r.bahan ?? []).map((b: any) => ({
      ingredientId: b.ingredientId,
      nama: b.ingredient?.nama ?? "",
      jumlah: b.jumlah,
      staple: b.ingredient?.staple ?? false,
      optional: b.optional,
    })),
    langkah: r.langkah ?? [],
  };
}

/** Algoritma pencocokan resep dengan bahan yang dimiliki. */
export function computeMatch(recipe: any, pantry: Set<number>) {
  let total = 0;
  let cocok = 0;
  const bahanKurang: any[] = [];

  for (const b of recipe.bahan) {
    if (b.ingredient?.staple || b.optional) continue;
    total++;
    if (pantry.has(b.ingredientId)) {
      cocok++;
    } else {
      bahanKurang.push({
        ingredientId: b.ingredientId,
        nama: b.ingredient?.nama ?? "",
        jumlah: b.jumlah,
        staple: false,
        optional: b.optional,
      });
    }
  }

  const matchPercent = total === 0 ? 0 : Math.round((cocok * 100) / total);
  const bisaDimasak = total > 0 && bahanKurang.length === 0;

  return {
    recipe: toRecipeListDTO(recipe), // ringan: kartu hasil tak perlu bahan/langkah
    matchPercent,
    bisaDimasak,
    totalWajib: total,
    cocok,
    bahanKurang,
  };
}

/** Format tanggal relatif berbahasa Indonesia. */
export function relatif(d: Date): string {
  const diff = Date.now() - new Date(d).getTime();
  const hari = Math.floor(diff / 86400000);
  if (hari <= 0) return "Hari ini";
  if (hari === 1) return "Kemarin";
  if (hari < 7) return `${hari} hari lalu`;
  if (hari < 30) return `${Math.floor(hari / 7)} minggu lalu`;
  if (hari < 365) return `${Math.floor(hari / 30)} bulan lalu`;
  return `${Math.floor(hari / 365)} tahun lalu`;
}
