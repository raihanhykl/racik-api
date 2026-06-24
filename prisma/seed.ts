// Author: Raihan Haykal
// Seed database Racik: kategori, bahan, resep, dan ulasan contoh.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { id: 1, nama: "Sarapan", emoji: "🍳" },
  { id: 2, nama: "Makan Berat", emoji: "🍛" },
  { id: 3, nama: "Cemilan", emoji: "🍰" },
  { id: 4, nama: "Minuman", emoji: "🥤" },
];

const ingredients = [
  { id: 1, nama: "Telur", staple: false },
  { id: 2, nama: "Nasi Putih", staple: false },
  { id: 3, nama: "Bawang Merah", staple: false },
  { id: 4, nama: "Bawang Putih", staple: false },
  { id: 5, nama: "Cabai Merah", staple: false },
  { id: 6, nama: "Cabai Rawit", staple: false },
  { id: 7, nama: "Kecap Manis", staple: false },
  { id: 8, nama: "Mie Telur", staple: false },
  { id: 9, nama: "Sawi Hijau", staple: false },
  { id: 10, nama: "Wortel", staple: false },
  { id: 11, nama: "Kol", staple: false },
  { id: 12, nama: "Ayam", staple: false },
  { id: 13, nama: "Daun Bawang", staple: false },
  { id: 14, nama: "Tomat", staple: false },
  { id: 15, nama: "Kangkung", staple: false },
  { id: 16, nama: "Tempe", staple: false },
  { id: 17, nama: "Tahu", staple: false },
  { id: 18, nama: "Pisang", staple: false },
  { id: 19, nama: "Tepung Terigu", staple: false },
  { id: 20, nama: "Roti Tawar", staple: false },
  { id: 21, nama: "Selai Coklat", staple: false },
  { id: 22, nama: "Keju", staple: false },
  { id: 23, nama: "Susu Cair", staple: false },
  { id: 24, nama: "Teh Celup", staple: false },
  { id: 25, nama: "Jeruk Peras", staple: false },
  { id: 26, nama: "Kentang", staple: false },
  { id: 27, nama: "Seledri", staple: false },
  { id: 28, nama: "Bakso", staple: false },
  { id: 29, nama: "Margarin", staple: false },
  { id: 30, nama: "Saus Tiram", staple: false },
  { id: 31, nama: "Es Batu", staple: false },
  { id: 32, nama: "Bawang Bombay", staple: false },
  { id: 33, nama: "Udang", staple: false },
  // Bumbu dasar
  { id: 40, nama: "Garam", staple: true },
  { id: 41, nama: "Gula Pasir", staple: true },
  { id: 42, nama: "Minyak Goreng", staple: true },
  { id: 43, nama: "Air", staple: true },
  { id: 44, nama: "Lada Bubuk", staple: true },
  { id: 45, nama: "Penyedap Rasa", staple: true },
];

type Bahan = { ingredientId: number; jumlah: string; optional?: boolean };
type SeedRecipe = {
  id: number;
  judul: string;
  deskripsi: string;
  imageUrl: string;
  categoryId: number;
  waktuMasakMenit: number;
  kesulitan: string;
  porsi: number;
  bahan: Bahan[];
  langkah: string[];
};

const recipes: SeedRecipe[] = [
  {
    id: 1,
    judul: "Nasi Goreng Kampung",
    deskripsi:
      "Nasi goreng pedas sederhana khas rumahan dengan aroma bawang yang menggugah selera.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Nasi_Goreng_Kampung_%2811967588375%29.jpg/500px-Nasi_Goreng_Kampung_%2811967588375%29.jpg",
    categoryId: 2,
    waktuMasakMenit: 15,
    kesulitan: "Mudah",
    porsi: 2,
    bahan: [
      { ingredientId: 2, jumlah: "2 piring" },
      { ingredientId: 1, jumlah: "1 butir" },
      { ingredientId: 3, jumlah: "3 siung" },
      { ingredientId: 4, jumlah: "2 siung" },
      { ingredientId: 5, jumlah: "3 buah" },
      { ingredientId: 7, jumlah: "2 sdm" },
      { ingredientId: 40, jumlah: "secukupnya" },
      { ingredientId: 42, jumlah: "2 sdm" },
      { ingredientId: 45, jumlah: "secukupnya", optional: true },
    ],
    langkah: [
      "Haluskan bawang merah, bawang putih, dan cabai merah.",
      "Panaskan minyak, tumis bumbu halus hingga harum.",
      "Masukkan telur, orak-arik hingga matang.",
      "Masukkan nasi putih, aduk hingga tercampur rata.",
      "Tambahkan kecap manis, garam, dan penyedap.",
      "Aduk rata, angkat, dan sajikan selagi hangat.",
    ],
  },
  {
    id: 2,
    judul: "Mie Goreng",
    deskripsi: "Mie goreng gurih dengan sayuran segar, cocok untuk makan kapan saja.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Mi_Goreng_GM.jpg/500px-Mi_Goreng_GM.jpg",
    categoryId: 2,
    waktuMasakMenit: 20,
    kesulitan: "Mudah",
    porsi: 2,
    bahan: [
      { ingredientId: 8, jumlah: "2 keping" },
      { ingredientId: 1, jumlah: "1 butir" },
      { ingredientId: 9, jumlah: "3 lembar" },
      { ingredientId: 10, jumlah: "1 buah" },
      { ingredientId: 4, jumlah: "2 siung" },
      { ingredientId: 3, jumlah: "2 siung" },
      { ingredientId: 7, jumlah: "2 sdm" },
      { ingredientId: 30, jumlah: "1 sdm" },
      { ingredientId: 40, jumlah: "secukupnya" },
      { ingredientId: 42, jumlah: "2 sdm" },
    ],
    langkah: [
      "Rebus mie telur hingga setengah matang, lalu tiriskan.",
      "Tumis bawang putih dan bawang merah hingga harum.",
      "Masukkan telur, orak-arik hingga matang.",
      "Masukkan wortel dan sawi, aduk hingga layu.",
      "Masukkan mie, kecap manis, saus tiram, dan garam.",
      "Aduk rata, masak 2 menit, lalu sajikan.",
    ],
  },
  {
    id: 3,
    judul: "Telur Dadar",
    deskripsi: "Telur dadar berbumbu yang renyah di pinggir, praktis untuk sarapan.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Gorgonzola_%2B_Bacon_Omelette_%40_Omelegg_%40_Amsterdam_%2816600947041%29.jpg/500px-Gorgonzola_%2B_Bacon_Omelette_%40_Omelegg_%40_Amsterdam_%2816600947041%29.jpg",
    categoryId: 1,
    waktuMasakMenit: 10,
    kesulitan: "Mudah",
    porsi: 1,
    bahan: [
      { ingredientId: 1, jumlah: "2 butir" },
      { ingredientId: 3, jumlah: "2 siung" },
      { ingredientId: 13, jumlah: "1 batang" },
      { ingredientId: 6, jumlah: "2 buah", optional: true },
      { ingredientId: 40, jumlah: "secukupnya" },
      { ingredientId: 42, jumlah: "2 sdm" },
      { ingredientId: 44, jumlah: "secukupnya" },
    ],
    langkah: [
      "Kocok telur dalam mangkuk hingga berbusa.",
      "Iris tipis bawang merah, daun bawang, dan cabai.",
      "Campurkan irisan ke telur, beri garam dan lada.",
      "Panaskan minyak di wajan dengan api sedang.",
      "Tuang adonan telur, masak hingga kedua sisi matang.",
      "Angkat dan sajikan dengan nasi hangat.",
    ],
  },
  {
    id: 4,
    judul: "Capcay Kuah",
    deskripsi: "Tumis aneka sayuran berkuah yang segar, sehat, dan mengenyangkan.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Cap_cai.jpg/500px-Cap_cai.jpg",
    categoryId: 2,
    waktuMasakMenit: 25,
    kesulitan: "Sedang",
    porsi: 3,
    bahan: [
      { ingredientId: 9, jumlah: "5 lembar" },
      { ingredientId: 10, jumlah: "1 buah" },
      { ingredientId: 11, jumlah: "5 lembar" },
      { ingredientId: 28, jumlah: "5 buah", optional: true },
      { ingredientId: 12, jumlah: "100 gram", optional: true },
      { ingredientId: 4, jumlah: "3 siung" },
      { ingredientId: 32, jumlah: "1/2 buah" },
      { ingredientId: 30, jumlah: "2 sdm" },
      { ingredientId: 40, jumlah: "secukupnya" },
      { ingredientId: 42, jumlah: "2 sdm" },
      { ingredientId: 43, jumlah: "200 ml" },
    ],
    langkah: [
      "Potong semua sayuran sesuai selera.",
      "Tumis bawang putih dan bawang bombay hingga harum.",
      "Masukkan ayam dan bakso, masak hingga berubah warna.",
      "Tambahkan air secukupnya, lalu didihkan.",
      "Masukkan sayuran, saus tiram, dan garam.",
      "Masak hingga sayuran matang namun tetap renyah, sajikan.",
    ],
  },
  {
    id: 5,
    judul: "Tumis Kangkung",
    deskripsi: "Tumis kangkung api besar yang renyah dengan bumbu sederhana.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Tumis_kangkung_Makassar.JPG/500px-Tumis_kangkung_Makassar.JPG",
    categoryId: 2,
    waktuMasakMenit: 15,
    kesulitan: "Mudah",
    porsi: 2,
    bahan: [
      { ingredientId: 15, jumlah: "1 ikat" },
      { ingredientId: 3, jumlah: "3 siung" },
      { ingredientId: 4, jumlah: "2 siung" },
      { ingredientId: 5, jumlah: "2 buah" },
      { ingredientId: 30, jumlah: "1 sdm" },
      { ingredientId: 40, jumlah: "secukupnya" },
      { ingredientId: 42, jumlah: "2 sdm" },
    ],
    langkah: [
      "Petik dan cuci bersih kangkung.",
      "Iris bawang merah, bawang putih, dan cabai merah.",
      "Panaskan minyak, tumis bumbu iris hingga harum.",
      "Masukkan kangkung, aduk cepat dengan api besar.",
      "Tambahkan saus tiram dan garam.",
      "Masak sebentar hingga layu, sajikan segera.",
    ],
  },
  {
    id: 6,
    judul: "Sup Ayam Bening",
    deskripsi: "Sup ayam hangat berisi wortel dan kentang, menyegarkan tubuh.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chicken_Noodle_Soup.jpg/500px-Chicken_Noodle_Soup.jpg",
    categoryId: 2,
    waktuMasakMenit: 35,
    kesulitan: "Sedang",
    porsi: 4,
    bahan: [
      { ingredientId: 12, jumlah: "300 gram" },
      { ingredientId: 10, jumlah: "2 buah" },
      { ingredientId: 26, jumlah: "2 buah" },
      { ingredientId: 13, jumlah: "1 batang" },
      { ingredientId: 27, jumlah: "1 batang" },
      { ingredientId: 4, jumlah: "3 siung" },
      { ingredientId: 3, jumlah: "3 siung" },
      { ingredientId: 40, jumlah: "secukupnya" },
      { ingredientId: 44, jumlah: "secukupnya" },
      { ingredientId: 43, jumlah: "1 liter" },
    ],
    langkah: [
      "Rebus ayam hingga mendidih, buang busa kotorannya.",
      "Haluskan bawang putih dan bawang merah, lalu tumis hingga harum.",
      "Masukkan tumisan bumbu ke dalam rebusan ayam.",
      "Tambahkan wortel dan kentang, masak hingga empuk.",
      "Beri garam dan lada, koreksi rasa.",
      "Taburi daun bawang dan seledri, sajikan hangat.",
    ],
  },
  {
    id: 7,
    judul: "Bubur Ayam",
    deskripsi: "Bubur lembut dengan ayam suwir, sarapan favorit sepanjang masa.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Bubur_ayam_chicken_porridge.JPG/500px-Bubur_ayam_chicken_porridge.JPG",
    categoryId: 1,
    waktuMasakMenit: 45,
    kesulitan: "Sedang",
    porsi: 3,
    bahan: [
      { ingredientId: 2, jumlah: "2 piring" },
      { ingredientId: 12, jumlah: "200 gram" },
      { ingredientId: 13, jumlah: "1 batang" },
      { ingredientId: 27, jumlah: "1 batang" },
      { ingredientId: 4, jumlah: "2 siung" },
      { ingredientId: 40, jumlah: "secukupnya" },
      { ingredientId: 44, jumlah: "secukupnya" },
      { ingredientId: 43, jumlah: "1 liter" },
    ],
    langkah: [
      "Masak nasi dengan banyak air sambil terus diaduk hingga menjadi bubur.",
      "Rebus ayam hingga empuk, lalu suwir-suwir.",
      "Tumis bawang putih halus untuk menambah aroma.",
      "Beri garam dan lada pada bubur, aduk rata.",
      "Sajikan bubur dengan taburan ayam suwir.",
      "Tambahkan daun bawang dan seledri di atasnya.",
    ],
  },
  {
    id: 8,
    judul: "Orek Tempe",
    deskripsi: "Orek tempe manis pedas yang kering dan tahan lama, teman nasi yang pas.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Tempeh_%288681605421%29.jpg/500px-Tempeh_%288681605421%29.jpg",
    categoryId: 2,
    waktuMasakMenit: 20,
    kesulitan: "Mudah",
    porsi: 3,
    bahan: [
      { ingredientId: 16, jumlah: "1 papan" },
      { ingredientId: 5, jumlah: "3 buah" },
      { ingredientId: 3, jumlah: "4 siung" },
      { ingredientId: 4, jumlah: "2 siung" },
      { ingredientId: 7, jumlah: "3 sdm" },
      { ingredientId: 41, jumlah: "1 sdm" },
      { ingredientId: 40, jumlah: "secukupnya" },
      { ingredientId: 42, jumlah: "3 sdm" },
    ],
    langkah: [
      "Potong tempe bentuk korek api, goreng setengah kering.",
      "Iris bawang merah, bawang putih, dan cabai merah.",
      "Tumis bumbu iris hingga harum.",
      "Masukkan tempe goreng, aduk rata.",
      "Tambahkan kecap manis, gula, dan garam.",
      "Masak hingga bumbu meresap dan agak kering, sajikan.",
    ],
  },
  {
    id: 9,
    judul: "Pisang Goreng",
    deskripsi: "Pisang goreng renyah di luar, lembut di dalam. Cemilan sore yang juara.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Banana_Fritters_and_tea.jpg/500px-Banana_Fritters_and_tea.jpg",
    categoryId: 3,
    waktuMasakMenit: 20,
    kesulitan: "Mudah",
    porsi: 4,
    bahan: [
      { ingredientId: 18, jumlah: "5 buah" },
      { ingredientId: 19, jumlah: "100 gram" },
      { ingredientId: 41, jumlah: "1 sdm" },
      { ingredientId: 40, jumlah: "sejumput" },
      { ingredientId: 43, jumlah: "secukupnya" },
      { ingredientId: 42, jumlah: "untuk menggoreng" },
    ],
    langkah: [
      "Kupas pisang dan belah sesuai selera.",
      "Campur tepung terigu, gula, garam, dan air menjadi adonan.",
      "Celupkan pisang ke dalam adonan tepung.",
      "Panaskan minyak yang banyak di wajan.",
      "Goreng pisang hingga kuning keemasan.",
      "Tiriskan dan sajikan selagi hangat.",
    ],
  },
  {
    id: 10,
    judul: "Perkedel Kentang",
    deskripsi:
      "Perkedel kentang gurih yang lembut, lauk pendamping yang selalu dirindukan.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Perkedel_kentang_tanpa_daging.JPG/500px-Perkedel_kentang_tanpa_daging.JPG",
    categoryId: 3,
    waktuMasakMenit: 30,
    kesulitan: "Sedang",
    porsi: 4,
    bahan: [
      { ingredientId: 26, jumlah: "4 buah" },
      { ingredientId: 1, jumlah: "1 butir" },
      { ingredientId: 13, jumlah: "1 batang" },
      { ingredientId: 27, jumlah: "1 batang" },
      { ingredientId: 4, jumlah: "2 siung" },
      { ingredientId: 40, jumlah: "secukupnya" },
      { ingredientId: 44, jumlah: "secukupnya" },
      { ingredientId: 42, jumlah: "untuk menggoreng" },
    ],
    langkah: [
      "Goreng atau kukus kentang hingga empuk, lalu haluskan.",
      "Tumis bawang putih halus, campurkan ke kentang.",
      "Tambahkan daun bawang, seledri, garam, dan lada.",
      "Bentuk adonan menjadi bulat pipih.",
      "Celupkan ke dalam kocokan telur.",
      "Goreng hingga kecokelatan, tiriskan dan sajikan.",
    ],
  },
  {
    id: 11,
    judul: "Roti Bakar Coklat",
    deskripsi: "Roti bakar coklat keju yang manis dan lumer, nikmat untuk teman ngopi.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Toast-3.jpg/500px-Toast-3.jpg",
    categoryId: 3,
    waktuMasakMenit: 10,
    kesulitan: "Mudah",
    porsi: 1,
    bahan: [
      { ingredientId: 20, jumlah: "4 lembar" },
      { ingredientId: 21, jumlah: "3 sdm" },
      { ingredientId: 29, jumlah: "2 sdm" },
      { ingredientId: 22, jumlah: "secukupnya", optional: true },
    ],
    langkah: [
      "Olesi permukaan roti tawar dengan margarin.",
      "Panaskan teflon dengan api kecil.",
      "Panggang roti hingga kecokelatan di kedua sisi.",
      "Oleskan selai coklat pada satu sisi roti.",
      "Taburi keju parut bila suka, lalu tangkupkan.",
      "Potong roti dan sajikan hangat.",
    ],
  },
  {
    id: 12,
    judul: "Es Teh Manis",
    deskripsi: "Es teh manis menyegarkan, pelepas dahaga andalan setiap hari.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Iced_Tea_from_flickr.jpg/500px-Iced_Tea_from_flickr.jpg",
    categoryId: 4,
    waktuMasakMenit: 5,
    kesulitan: "Mudah",
    porsi: 2,
    bahan: [
      { ingredientId: 24, jumlah: "2 kantong" },
      { ingredientId: 41, jumlah: "3 sdm" },
      { ingredientId: 43, jumlah: "500 ml" },
      { ingredientId: 31, jumlah: "secukupnya" },
    ],
    langkah: [
      "Seduh teh celup dengan air panas.",
      "Tambahkan gula pasir, aduk hingga larut.",
      "Diamkan teh hingga agak dingin.",
      "Siapkan gelas berisi es batu.",
      "Tuang teh manis ke dalam gelas.",
      "Sajikan dingin.",
    ],
  },
  {
    id: 13,
    judul: "Es Jeruk Segar",
    deskripsi: "Es jeruk peras asli yang segar dan kaya vitamin C.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Orangejuice.jpg/500px-Orangejuice.jpg",
    categoryId: 4,
    waktuMasakMenit: 5,
    kesulitan: "Mudah",
    porsi: 1,
    bahan: [
      { ingredientId: 25, jumlah: "3 buah" },
      { ingredientId: 41, jumlah: "2 sdm" },
      { ingredientId: 43, jumlah: "200 ml" },
      { ingredientId: 31, jumlah: "secukupnya" },
    ],
    langkah: [
      "Peras jeruk, lalu saring bijinya.",
      "Larutkan gula dengan sedikit air hangat.",
      "Campurkan air jeruk dan larutan gula.",
      "Tambahkan air dingin secukupnya.",
      "Masukkan es batu ke dalam gelas.",
      "Tuang es jeruk dan sajikan.",
    ],
  },
  {
    id: 14,
    judul: "Sandwich Telur",
    deskripsi:
      "Sandwich telur praktis dengan tomat dan keju, sarapan cepat saji ala rumahan.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Egg_Sandwich.jpg/500px-Egg_Sandwich.jpg",
    categoryId: 1,
    waktuMasakMenit: 10,
    kesulitan: "Mudah",
    porsi: 1,
    bahan: [
      { ingredientId: 20, jumlah: "2 lembar" },
      { ingredientId: 1, jumlah: "2 butir" },
      { ingredientId: 14, jumlah: "1 buah", optional: true },
      { ingredientId: 22, jumlah: "1 lembar", optional: true },
      { ingredientId: 29, jumlah: "1 sdm" },
      { ingredientId: 40, jumlah: "secukupnya" },
      { ingredientId: 44, jumlah: "secukupnya" },
    ],
    langkah: [
      "Ceplok atau dadar telur, beri garam dan lada.",
      "Olesi roti tawar dengan margarin.",
      "Tata telur di atas roti.",
      "Tambahkan irisan tomat dan keju.",
      "Tutup dengan roti tawar lainnya.",
      "Potong menjadi dua dan sajikan.",
    ],
  },
];

// Pool ulasan contoh
const namaPool = [
  "Sinta", "Budi Santoso", "Rara", "Dewi", "Agus", "Putri", "Eko",
  "Maya", "Rizki", "Wulan", "Fajar", "Indah", "Hendra", "Nadia",
];
const komentarPool = [
  "Enak banget, langkah-langkahnya gampang diikuti!",
  "Rasanya pas, keluarga di rumah suka semua.",
  "Jadi resep andalan tiap masak. Mantap!",
  "Simpel tapi hasilnya juara.",
  "Bumbunya pas, nggak ribet bikinnya.",
  "", // ada yang tanpa komentar (komentar opsional)
  "Recommended buat pemula seperti aku.",
  "Anak-anak doyan, bakal bikin lagi.",
];
const ratingPattern = [5, 4, 5, 5, 4, 5, 3, 5, 4, 5, 4, 5];

async function main() {
  console.log("Menghapus data lama...");
  await prisma.review.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.pantryItem.deleteMany();
  await prisma.recipeIngredient.deleteMany();
  await prisma.recipe.deleteMany();
  await prisma.ingredient.deleteMany();
  await prisma.category.deleteMany();

  console.log("Menambah kategori...");
  for (const c of categories) {
    await prisma.category.create({ data: c });
  }

  console.log("Menambah bahan...");
  for (const i of ingredients) {
    await prisma.ingredient.create({ data: i });
  }

  console.log("Menambah resep...");
  for (const r of recipes) {
    await prisma.recipe.create({
      data: {
        id: r.id,
        judul: r.judul,
        deskripsi: r.deskripsi,
        imageUrl: r.imageUrl,
        categoryId: r.categoryId,
        waktuMasakMenit: r.waktuMasakMenit,
        kesulitan: r.kesulitan,
        porsi: r.porsi,
        langkah: r.langkah,
        bahan: {
          create: r.bahan.map((b) => ({
            ingredientId: b.ingredientId,
            jumlah: b.jumlah,
            optional: b.optional ?? false,
          })),
        },
      },
    });
  }

  console.log("Menambah ulasan contoh...");
  const hariMs = 86400000;
  for (const r of recipes) {
    const jumlah = 3 + ((r.id * 5 + 1) % 5); // 3..7 ulasan per resep
    for (let j = 0; j < jumlah; j++) {
      const idx = (r.id * 3 + j) % namaPool.length;
      const rating = ratingPattern[(r.id + j) % ratingPattern.length];
      const komentar = komentarPool[(r.id + j) % komentarPool.length];
      await prisma.review.create({
        data: {
          recipeId: r.id,
          deviceId: `seed-${r.id}-${j}`,
          namaPenulis: namaPool[idx],
          rating,
          komentar,
          createdAt: new Date(Date.now() - (j + 1) * 3 * hariMs),
        },
      });
    }
  }

  const totalUlasan = await prisma.review.count();
  console.log(
    `Selesai! ${categories.length} kategori, ${ingredients.length} bahan, ${recipes.length} resep, ${totalUlasan} ulasan.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
