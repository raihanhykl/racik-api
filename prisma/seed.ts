// Author: Raihan Haykal
// Seed database Racik: kategori, bahan (nusantara + mancanegara), 100 resep, ulasan.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ====================== PETA GAMBAR (Wikimedia) ======================
const IMG: Record<string, string> = {
  "Nasi Goreng Kampung": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Nasi_Goreng_Kampung_%2811967588375%29.jpg/960px-Nasi_Goreng_Kampung_%2811967588375%29.jpg",
  "Mie Goreng": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Mi_Goreng_GM.jpg/960px-Mi_Goreng_GM.jpg",
  "Telur Dadar": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Gorgonzola_%2B_Bacon_Omelette_%40_Omelegg_%40_Amsterdam_%2816600947041%29.jpg/960px-Gorgonzola_%2B_Bacon_Omelette_%40_Omelegg_%40_Amsterdam_%2816600947041%29.jpg",
  "Capcay Kuah": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Cap_cai.jpg/960px-Cap_cai.jpg",
  "Tumis Kangkung": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Tumis_kangkung_Makassar.JPG/960px-Tumis_kangkung_Makassar.JPG",
  "Sup Ayam Bening": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chicken_Noodle_Soup.jpg/960px-Chicken_Noodle_Soup.jpg",
  "Bubur Ayam": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Bubur_ayam_chicken_porridge.JPG/960px-Bubur_ayam_chicken_porridge.JPG",
  "Orek Tempe": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Tempeh_%288681605421%29.jpg/960px-Tempeh_%288681605421%29.jpg",
  "Pisang Goreng": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Banana_Fritters_and_tea.jpg/960px-Banana_Fritters_and_tea.jpg",
  "Perkedel Kentang": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Perkedel_kentang_tanpa_daging.JPG/960px-Perkedel_kentang_tanpa_daging.JPG",
  "Roti Bakar Coklat": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Toast-3.jpg/960px-Toast-3.jpg",
  "Es Teh Manis": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Iced_Tea_from_flickr.jpg/960px-Iced_Tea_from_flickr.jpg",
  "Es Jeruk Segar": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Orangejuice.jpg/960px-Orangejuice.jpg",
  "Sandwich Telur": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Egg_Sandwich.jpg",
  "Soto Ayam": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Soto_ayam.JPG/960px-Soto_ayam.JPG",
  "Soto Betawi": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Soto_Ayam_Savoy_Homann_Hotel.JPG/960px-Soto_Ayam_Savoy_Homann_Hotel.JPG",
  "Rawon": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Rawon_Setan_II.jpg/960px-Rawon_Setan_II.jpg",
  "Rendang": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Rendang_daging_sapi_asli_Padang.JPG/960px-Rendang_daging_sapi_asli_Padang.JPG",
  "Sate Ayam": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Sate_Udang.JPG/960px-Sate_Udang.JPG",
  "Sate Kambing": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Sate_Udang.JPG/960px-Sate_Udang.JPG",
  "Gado-gado": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Gado_gado_jakarta.jpg/960px-Gado_gado_jakarta.jpg",
  "Ketoprak": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Ketoprak_Boplo.JPG/960px-Ketoprak_Boplo.JPG",
  "Pecel": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Pecel_Hariadhi.JPG/960px-Pecel_Hariadhi.JPG",
  "Opor Ayam": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Opor_Ayam_Telur_Pindang.JPG/960px-Opor_Ayam_Telur_Pindang.JPG",
  "Ayam Goreng": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Ayam_goreng_in_Jakarta.JPG/960px-Ayam_goreng_in_Jakarta.JPG",
  "Ayam Bakar": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Ayam_Panggang.jpg/960px-Ayam_Panggang.jpg",
  "Ayam Geprek": "https://upload.wikimedia.org/wikipedia/commons/2/24/Ayam_geprek.png",
  "Gulai Kambing": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Gulai_ayam3.jpg/960px-Gulai_ayam3.jpg",
  "Sayur Asem": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Sayur_asem_vegetable_soup.jpg/960px-Sayur_asem_vegetable_soup.jpg",
  "Sayur Lodeh": "https://upload.wikimedia.org/wikipedia/commons/8/8f/Lodeh.jpg",
  "Pepes Ikan": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Pepes_ikan_emas_%28pais_lauk_mas%29_Sunda.jpg/960px-Pepes_ikan_emas_%28pais_lauk_mas%29_Sunda.jpg",
  "Ikan Bakar": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Gurame_bakar_kecap_2.JPG/960px-Gurame_bakar_kecap_2.JPG",
  "Nasi Uduk": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Nasi_uduk_netherlands.jpg/960px-Nasi_uduk_netherlands.jpg",
  "Nasi Kuning": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Nasi_Kuning_Ibu_Sulastri.jpg/960px-Nasi_Kuning_Ibu_Sulastri.jpg",
  "Lontong Sayur": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Lontong.jpg/960px-Lontong.jpg",
  "Mie Ayam": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mi_ayam_jamur.JPG/960px-Mi_ayam_jamur.JPG",
  "Bakso": "https://upload.wikimedia.org/wikipedia/commons/2/28/Bakso_mi_bihun.jpg",
  "Kwetiau Goreng": "https://upload.wikimedia.org/wikipedia/commons/0/04/Char_kway_teow.jpg",
  "Bihun Goreng": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Bihun_goreng.JPG/960px-Bihun_goreng.JPG",
  "Nasi Goreng Seafood": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Koh_Mak%2C_Thailand%2C_Fried_rice_with_seafood%2C_Thai_fried_rice.jpg/960px-Koh_Mak%2C_Thailand%2C_Fried_rice_with_seafood%2C_Thai_fried_rice.jpg",
  "Nasi Lemak": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Nasi_Lemak_dengan_Chili_Nasi_Lemak_dan_Sotong_Pedas%2C_di_Penang_Summer_Restaurant.jpg/960px-Nasi_Lemak_dengan_Chili_Nasi_Lemak_dan_Sotong_Pedas%2C_di_Penang_Summer_Restaurant.jpg",
  "Mie Rebus": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Mee_Rebus_by_Banej%2C_Singapore_October_2017.jpg/960px-Mee_Rebus_by_Banej%2C_Singapore_October_2017.jpg",
  "Bubur Kacang Hijau": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Bubur_kacang_hijau.JPG/960px-Bubur_kacang_hijau.JPG",
  "Spaghetti Bolognese": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Tagliatelle_al_rag%C3%B9_%28image_modified%29.jpg/960px-Tagliatelle_al_rag%C3%B9_%28image_modified%29.jpg",
  "Spaghetti Carbonara": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Espaguetis_carbonara.jpg/960px-Espaguetis_carbonara.jpg",
  "Pizza Margherita": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/960px-Pizza-3007395.jpg",
  "Hamburger": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/960px-RedDot_Burger.jpg",
  "Fried Chicken": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Fried-Chicken-Set.jpg/960px-Fried-Chicken-Set.jpg",
  "Beef Steak": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Beef_fillet_steak_with_mushrooms.jpg/960px-Beef_fillet_steak_with_mushrooms.jpg",
  "Butter Chicken": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Butter_Chicken_%26_Butter_Naan_-_Home_-_Chandigarh_-_India_-_0006.jpg/960px-Butter_Chicken_%26_Butter_Naan_-_Home_-_Chandigarh_-_India_-_0006.jpg",
  "Ramen": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Shoyu_Ramen%EF%BC%88Tokyo_Ramen%EF%BC%89_-_01.jpg/960px-Shoyu_Ramen%EF%BC%88Tokyo_Ramen%EF%BC%89_-_01.jpg",
  "Sushi": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Sushi_platter.jpg/960px-Sushi_platter.jpg",
  "Pad Thai": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Phat_Thai_kung_Chang_Khien_street_stall.jpg/960px-Phat_Thai_kung_Chang_Khien_street_stall.jpg",
  "Tom Yum": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tom_yam_kung_maenam.jpg/960px-Tom_yam_kung_maenam.jpg",
  "Bibimbap": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Dolsot-bibimbap.jpg/960px-Dolsot-bibimbap.jpg",
  "Tteokbokki": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Tteokbokki.JPG/960px-Tteokbokki.JPG",
  "Fish and Chips": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Fish_and_chips_blackpool.jpg/960px-Fish_and_chips_blackpool.jpg",
  "Shakshuka": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Shakshuka_by_Calliopejen1.jpg/960px-Shakshuka_by_Calliopejen1.jpg",
  "Tacos": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg/960px-001_Tacos_de_carnitas%2C_carne_asada_y_al_pastor.jpg",
  "Pho": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Bowl_of_Meatball_pho.jpg/960px-Bowl_of_Meatball_pho.jpg",
  "Gyoza": "https://upload.wikimedia.org/wikipedia/commons/8/88/%E5%8F%B0%E7%81%A3%E5%8D%97%E6%8A%95%E8%8D%89%E5%B1%AF%E6%B0%B4%E9%A4%83Nantou%2C_Taiwan_Caotun_dumplings.jpg",
  "Omurice": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Omurice_by_Taimeiken.jpg/960px-Omurice_by_Taimeiken.jpg",
  "Mac and Cheese": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Original_Mac_n_Cheese_.jpg/960px-Original_Mac_n_Cheese_.jpg",
  "Caesar Salad": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Caesar_salad_%282%29.jpg/960px-Caesar_salad_%282%29.jpg",
  "Tonkatsu": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/%22Amai-Yuwaku%22_Special_Loin_Pork_Cutlet1.jpg/960px-%22Amai-Yuwaku%22_Special_Loin_Pork_Cutlet1.jpg",
  "Beef Teriyaki": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/22nd_June_2012_Teriyaki_Duck.jpg/960px-22nd_June_2012_Teriyaki_Duck.jpg",
  "Katsudon": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Katsudon_001.jpg/960px-Katsudon_001.jpg",
  "Martabak Telur": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Murtabak.jpg/960px-Murtabak.jpg",
  "Risoles": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Risole1.JPG/960px-Risole1.JPG",
  "Lumpia Semarang": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Loenpia_Semarang.JPG/960px-Loenpia_Semarang.JPG",
  "Klepon": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Klepon_Khas_Tulungagung.jpg/960px-Klepon_Khas_Tulungagung.jpg",
  "Bakwan Sayur": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Cabbage_fritters_gorengan.JPG/960px-Cabbage_fritters_gorengan.JPG",
  "Tahu Goreng": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Japanese_SilkyTofu_%28Kinugoshi_Tofu%29.JPG/960px-Japanese_SilkyTofu_%28Kinugoshi_Tofu%29.JPG",
  "Donat": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Glazed-Donut.jpg/960px-Glazed-Donut.jpg",
  "Kentang Goreng": "https://upload.wikimedia.org/wikipedia/commons/8/83/French_Fries.JPG",
  "Chicken Nugget": "https://upload.wikimedia.org/wikipedia/commons/6/64/Chicken_Nuggets.jpg",
  "Brownies": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Chocolatebrownie.JPG/960px-Chocolatebrownie.JPG",
  "Pancake": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Foodiesfeed.com_pouring-honey-on-pancakes-with-walnuts.jpg/960px-Foodiesfeed.com_pouring-honey-on-pancakes-with-walnuts.jpg",
  "Waffle": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Waffles_with_Strawberries.jpg/960px-Waffles_with_Strawberries.jpg",
  "Croissant": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Croissant-Petr_Kratochvil.jpg/960px-Croissant-Petr_Kratochvil.jpg",
  "Samosa": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg/960px-Samosas%2C_snack_food_at_Wikipedia%27s_16th_Birthday_celebration_in_Chittagong_%2801%29.jpg",
  "Lumpia Basah": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Spring_Rolls_%283357696061%29.jpg/960px-Spring_Rolls_%283357696061%29.jpg",
  "Onigiri": "https://upload.wikimedia.org/wikipedia/commons/4/43/%E5%B0%8F%E6%96%99%E7%90%86%E3%83%90%E3%83%AB%E3%81%95%E3%81%8F%E3%82%89_%E7%89%B9%E8%A3%BD%E3%81%8A%E3%81%AB%E3%81%8E%E3%82%8A.jpg",
  "Cheesecake": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Baked_cheesecake_with_raspberries_and_blueberries.jpg/960px-Baked_cheesecake_with_raspberries_and_blueberries.jpg",
  "Cupcake": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Cupcakes%2C_chocolate_and_strawberry_flavour.jpg/960px-Cupcakes%2C_chocolate_and_strawberry_flavour.jpg",
  "Es Cendol": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Kampung_Paya_Jaras_Tengah%2C_Selangor_20250112_111330.jpg/960px-Kampung_Paya_Jaras_Tengah%2C_Selangor_20250112_111330.jpg",
  "Es Campur": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Es_Campur_2.JPG/960px-Es_Campur_2.JPG",
  "Jus Alpukat": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Persea_americana_fruit_2.JPG/960px-Persea_americana_fruit_2.JPG",
  "Kopi Tubruk": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Javanese_Kopi_Tubruk.jpg/960px-Javanese_Kopi_Tubruk.jpg",
  "Es Kelapa Muda": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Young_Coconut_Drink.jpg/960px-Young_Coconut_Drink.jpg",
  "Teh Tarik": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Teh_tarik_man_pulling_tea.jpg/960px-Teh_tarik_man_pulling_tea.jpg",
  "Wedang Jahe": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Ginger_tea.jpg/960px-Ginger_tea.jpg",
  "Milkshake": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Strawberry_milk_shake_%28cropped%29.jpg/960px-Strawberry_milk_shake_%28cropped%29.jpg",
  "Lemonade": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Lemonade_-_27682817724.jpg/960px-Lemonade_-_27682817724.jpg",
  "Cokelat Panas": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/After_The_St._Patrick%27s_Parade_Late_Lunch_%40_Lemon%2C_Dawson_Street%2C_Dublin%2C_Rep._Of_Ireland_A_Fine_Tradition%21_%286992614913%29.jpg/960px-After_The_St._Patrick%27s_Parade_Late_Lunch_%40_Lemon%2C_Dawson_Street%2C_Dublin%2C_Rep._Of_Ireland_A_Fine_Tradition%21_%286992614913%29.jpg",
  "Smoothie Buah": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Kiwi_Smoothie.jpg/960px-Kiwi_Smoothie.jpg",
  "Matcha Latte": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Matcha_Scoop.jpg/960px-Matcha_Scoop.jpg",
  "Cappuccino": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Cappuccino_in_original.jpg/960px-Cappuccino_in_original.jpg",
  "Bubble Tea": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Bubble_Tea.png",
  "Jus Mangga": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mangos_-_single_and_halved.jpg/960px-Mangos_-_single_and_halved.jpg",
};

// ====================== KATEGORI ======================
const categories = [
  { id: 1, nama: "Sarapan", emoji: "🍳" },
  { id: 2, nama: "Makan Berat", emoji: "🍛" },
  { id: 3, nama: "Cemilan", emoji: "🍰" },
  { id: 4, nama: "Minuman", emoji: "🥤" },
  { id: 5, nama: "Mancanegara", emoji: "🌍" },
];

// ====================== MASTER BAHAN ======================
// staple = bumbu dasar (selalu dianggap ada, tidak dihitung saat mencocokkan).
const STAPLES = new Set([
  "Garam", "Gula Pasir", "Minyak Goreng", "Air", "Lada Bubuk", "Penyedap Rasa", "Kaldu Bubuk",
]);
const INGREDIENTS: string[] = [
  // Protein & seafood
  "Telur", "Ayam", "Dada Ayam", "Daging Sapi", "Daging Kambing", "Daging Cincang", "Daging Asap",
  "Sosis", "Bakso", "Ikan", "Ikan Tuna", "Ikan Teri", "Udang", "Cumi", "Tahu", "Tempe",
  // Karbohidrat & tepung
  "Nasi Putih", "Beras", "Beras Ketan", "Mie Telur", "Mie Instan", "Bihun", "Kwetiau", "Spaghetti",
  "Makaroni", "Roti Tawar", "Roti Burger", "Kulit Tortilla", "Kentang", "Ubi", "Lontong",
  "Tepung Terigu", "Tepung Beras", "Tepung Panir", "Tepung Maizena", "Kulit Lumpia", "Kulit Pangsit",
  "Nori", "Oat",
  // Sayur
  "Bawang Merah", "Bawang Putih", "Bawang Bombay", "Daun Bawang", "Seledri", "Cabai Merah",
  "Cabai Rawit", "Cabai Hijau", "Tomat", "Wortel", "Kol", "Sawi Hijau", "Sawi Putih", "Kangkung",
  "Bayam", "Tauge", "Buncis", "Kacang Panjang", "Selada", "Timun", "Terong", "Labu Siam",
  "Jagung Manis", "Jamur", "Brokoli", "Paprika", "Daun Singkong", "Nangka Muda",
  // Bumbu & rempah
  "Jahe", "Kunyit", "Lengkuas", "Serai", "Daun Salam", "Daun Jeruk", "Kemiri", "Ketumbar",
  "Kayu Manis", "Pala", "Asam Jawa", "Daun Kemangi", "Daun Pandan", "Bumbu Kari", "Pasta Tom Yum",
  "Gochujang", "Saus Tiram", "Kecap Manis", "Kecap Asin", "Saus Tomat", "Saus Sambal", "Mayones",
  "Saus Teriyaki", "Pasta Tomat", "Wijen", "Kacang Tanah", "Bumbu Kacang", "Kacang Hijau",
  // Dairy & lemak
  "Santan", "Susu Cair", "Susu Kental Manis", "Mentega", "Margarin", "Keju Cheddar",
  "Keju Mozzarella", "Keju Parmesan", "Krim Kental", "Yogurt",
  // Manis & baking
  "Coklat Bubuk", "Coklat Batang", "Selai Coklat", "Meises", "Gula Merah", "Gula Halus", "Madu",
  "Baking Powder", "Ragi Instan", "Vanili",
  // Buah
  "Pisang", "Jeruk Peras", "Lemon", "Alpukat", "Mangga", "Stroberi", "Kelapa Muda", "Kelapa Parut", "Nanas",
  // Minuman
  "Teh Celup", "Kopi Bubuk", "Bubuk Matcha", "Cendol", "Es Batu", "Sirup", "Mutiara Tapioka",
  // Staple
  "Garam", "Gula Pasir", "Minyak Goreng", "Air", "Lada Bubuk", "Penyedap Rasa", "Kaldu Bubuk",
];

// ====================== RESEP ======================
type B = { n: string; j: string; o?: boolean };
type R = { judul: string; cat: number; menit: number; level: string; porsi: number; bahan: B[]; langkah: string[] };

const recipes: R[] = [
  // ---------------- SARAPAN ----------------
  { judul: "Telur Dadar", cat: 1, menit: 10, level: "Mudah", porsi: 1,
    bahan: [{ n: "Telur", j: "2 butir" }, { n: "Bawang Merah", j: "2 siung" }, { n: "Daun Bawang", j: "1 batang" }, { n: "Cabai Rawit", j: "2 buah", o: true }, { n: "Garam", j: "secukupnya" }, { n: "Minyak Goreng", j: "2 sdm" }],
    langkah: ["Kocok telur dalam mangkuk.", "Iris bawang merah, daun bawang, dan cabai, campurkan ke telur.", "Beri garam dan lada, aduk rata.", "Panaskan minyak, tuang adonan telur.", "Masak hingga kedua sisi matang, sajikan."] },
  { judul: "Sandwich Telur", cat: 1, menit: 10, level: "Mudah", porsi: 1,
    bahan: [{ n: "Roti Tawar", j: "2 lembar" }, { n: "Telur", j: "2 butir" }, { n: "Tomat", j: "1 buah", o: true }, { n: "Selada", j: "2 lembar", o: true }, { n: "Mayones", j: "1 sdm" }, { n: "Margarin", j: "1 sdm" }],
    langkah: ["Dadar atau ceplok telur, beri garam dan lada.", "Olesi roti dengan margarin lalu mayones.", "Tata telur, tomat, dan selada di atas roti.", "Tutup dengan roti lain, potong dua.", "Sajikan."] },
  { judul: "Bubur Ayam", cat: 1, menit: 45, level: "Sedang", porsi: 3,
    bahan: [{ n: "Beras", j: "1 cup" }, { n: "Ayam", j: "200 gram" }, { n: "Daun Bawang", j: "1 batang" }, { n: "Seledri", j: "1 batang" }, { n: "Bawang Putih", j: "2 siung" }, { n: "Kaldu Bubuk", j: "secukupnya" }, { n: "Air", j: "1.5 liter" }],
    langkah: ["Masak beras dengan banyak air sambil diaduk hingga jadi bubur.", "Rebus ayam hingga empuk, lalu suwir.", "Bumbui bubur dengan garam, lada, dan kaldu.", "Sajikan bubur dengan ayam suwir.", "Taburi daun bawang dan seledri."] },
  { judul: "Nasi Uduk", cat: 1, menit: 40, level: "Sedang", porsi: 4,
    bahan: [{ n: "Beras", j: "2 cup" }, { n: "Santan", j: "400 ml" }, { n: "Daun Salam", j: "2 lembar" }, { n: "Serai", j: "1 batang" }, { n: "Daun Jeruk", j: "3 lembar" }, { n: "Garam", j: "secukupnya" }],
    langkah: ["Cuci beras hingga bersih.", "Rebus santan dengan daun salam, serai, daun jeruk, dan garam.", "Masukkan beras, masak hingga santan terserap.", "Kukus nasi hingga matang dan pulen.", "Sajikan dengan pelengkap kesukaan."] },
  { judul: "Nasi Kuning", cat: 1, menit: 45, level: "Sedang", porsi: 4,
    bahan: [{ n: "Beras", j: "2 cup" }, { n: "Santan", j: "400 ml" }, { n: "Kunyit", j: "2 cm" }, { n: "Serai", j: "1 batang" }, { n: "Daun Salam", j: "2 lembar" }, { n: "Garam", j: "secukupnya" }],
    langkah: ["Haluskan kunyit, larutkan dengan santan.", "Rebus santan kunyit bersama serai dan daun salam.", "Masukkan beras, masak hingga santan menyusut.", "Kukus hingga matang.", "Sajikan dengan lauk pelengkap."] },
  { judul: "Lontong Sayur", cat: 1, menit: 40, level: "Sedang", porsi: 4,
    bahan: [{ n: "Lontong", j: "4 buah" }, { n: "Labu Siam", j: "1 buah" }, { n: "Santan", j: "500 ml" }, { n: "Bawang Merah", j: "5 siung" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Cabai Merah", j: "3 buah" }, { n: "Daun Salam", j: "2 lembar" }],
    langkah: ["Haluskan bawang merah, bawang putih, dan cabai.", "Tumis bumbu halus hingga harum.", "Masukkan labu siam dan santan, masak hingga empuk.", "Bumbui dengan garam, koreksi rasa.", "Sajikan lontong dengan kuah sayur."] },
  { judul: "Bubur Kacang Hijau", cat: 1, menit: 50, level: "Mudah", porsi: 4,
    bahan: [{ n: "Kacang Hijau", j: "250 gram" }, { n: "Santan", j: "300 ml" }, { n: "Gula Merah", j: "100 gram" }, { n: "Daun Pandan", j: "2 lembar" }, { n: "Jahe", j: "2 cm" }, { n: "Air", j: "1 liter" }],
    langkah: ["Rebus kacang hijau hingga empuk dan mekar.", "Tambahkan gula merah, pandan, dan jahe.", "Masak hingga gula larut dan mengental.", "Tuang santan, masak sebentar jangan sampai pecah.", "Sajikan hangat."] },
  { judul: "Pancake", cat: 1, menit: 20, level: "Mudah", porsi: 3,
    bahan: [{ n: "Tepung Terigu", j: "200 gram" }, { n: "Telur", j: "1 butir" }, { n: "Susu Cair", j: "200 ml" }, { n: "Gula Pasir", j: "2 sdm" }, { n: "Baking Powder", j: "1 sdt" }, { n: "Mentega", j: "2 sdm" }, { n: "Madu", j: "secukupnya", o: true }],
    langkah: ["Campur tepung, gula, dan baking powder.", "Masukkan telur dan susu, aduk hingga halus.", "Panaskan teflon, olesi mentega.", "Tuang satu sendok adonan, masak hingga berlubang lalu balik.", "Sajikan dengan madu atau topping."] },
  { judul: "Onigiri", cat: 1, menit: 20, level: "Mudah", porsi: 2,
    bahan: [{ n: "Nasi Putih", j: "2 piring" }, { n: "Nori", j: "2 lembar" }, { n: "Ikan Tuna", j: "100 gram", o: true }, { n: "Mayones", j: "1 sdm", o: true }, { n: "Garam", j: "secukupnya" }, { n: "Wijen", j: "1 sdt", o: true }],
    langkah: ["Campur tuna dengan mayones sebagai isian.", "Beri sedikit garam pada nasi hangat.", "Ambil nasi, beri isian di tengah.", "Bentuk segitiga dan padatkan.", "Balut dengan nori, taburi wijen."] },

  // ---------------- MAKAN BERAT (Indonesia) ----------------
  { judul: "Nasi Goreng Kampung", cat: 2, menit: 15, level: "Mudah", porsi: 2,
    bahan: [{ n: "Nasi Putih", j: "2 piring" }, { n: "Telur", j: "1 butir" }, { n: "Bawang Merah", j: "3 siung" }, { n: "Bawang Putih", j: "2 siung" }, { n: "Cabai Merah", j: "3 buah" }, { n: "Kecap Manis", j: "2 sdm" }, { n: "Minyak Goreng", j: "2 sdm" }],
    langkah: ["Haluskan bawang dan cabai.", "Tumis bumbu hingga harum, masukkan telur, orak-arik.", "Masukkan nasi, aduk rata.", "Tambahkan kecap manis, garam, dan penyedap.", "Aduk rata dan sajikan."] },
  { judul: "Nasi Goreng Seafood", cat: 2, menit: 20, level: "Sedang", porsi: 2,
    bahan: [{ n: "Nasi Putih", j: "2 piring" }, { n: "Udang", j: "100 gram" }, { n: "Cumi", j: "100 gram" }, { n: "Telur", j: "1 butir" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Saus Tiram", j: "1 sdm" }, { n: "Saus Tomat", j: "2 sdm" }, { n: "Daun Bawang", j: "1 batang" }],
    langkah: ["Tumis bawang putih hingga harum.", "Masukkan udang dan cumi, masak hingga berubah warna.", "Sisihkan, orak-arik telur, masukkan nasi.", "Beri saus tiram, saus tomat, garam.", "Aduk rata, taburi daun bawang, sajikan."] },
  { judul: "Mie Goreng", cat: 2, menit: 20, level: "Mudah", porsi: 2,
    bahan: [{ n: "Mie Telur", j: "2 keping" }, { n: "Telur", j: "1 butir" }, { n: "Sawi Hijau", j: "3 lembar" }, { n: "Wortel", j: "1 buah" }, { n: "Bawang Putih", j: "2 siung" }, { n: "Kecap Manis", j: "2 sdm" }, { n: "Saus Tiram", j: "1 sdm" }],
    langkah: ["Rebus mie setengah matang, tiriskan.", "Tumis bawang putih, masukkan telur, orak-arik.", "Masukkan wortel dan sawi, aduk layu.", "Masukkan mie, kecap, dan saus tiram.", "Aduk rata, sajikan."] },
  { judul: "Mie Rebus", cat: 2, menit: 20, level: "Mudah", porsi: 2,
    bahan: [{ n: "Mie Telur", j: "2 keping" }, { n: "Telur", j: "1 butir" }, { n: "Sawi Hijau", j: "3 lembar" }, { n: "Tauge", j: "50 gram" }, { n: "Bawang Putih", j: "2 siung" }, { n: "Kaldu Bubuk", j: "secukupnya" }, { n: "Air", j: "500 ml" }],
    langkah: ["Tumis bawang putih hingga harum, beri air.", "Didihkan kuah, beri garam dan kaldu.", "Masukkan mie, sawi, dan tauge.", "Masak hingga matang.", "Sajikan dengan telur rebus."] },
  { judul: "Mie Ayam", cat: 2, menit: 30, level: "Sedang", porsi: 2,
    bahan: [{ n: "Mie Telur", j: "2 keping" }, { n: "Ayam", j: "200 gram" }, { n: "Sawi Hijau", j: "3 lembar" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Kecap Manis", j: "2 sdm" }, { n: "Saus Tiram", j: "1 sdm" }, { n: "Daun Bawang", j: "1 batang" }],
    langkah: ["Tumis bawang putih, masukkan ayam potong dadu.", "Beri kecap dan saus tiram, masak hingga meresap.", "Rebus mie dan sawi hingga matang.", "Tata mie, beri tumisan ayam.", "Taburi daun bawang, sajikan dengan kuah kaldu."] },
  { judul: "Bihun Goreng", cat: 2, menit: 20, level: "Mudah", porsi: 2,
    bahan: [{ n: "Bihun", j: "150 gram" }, { n: "Telur", j: "1 butir" }, { n: "Wortel", j: "1 buah" }, { n: "Kol", j: "3 lembar" }, { n: "Bawang Putih", j: "2 siung" }, { n: "Kecap Manis", j: "2 sdm" }, { n: "Saus Tiram", j: "1 sdm" }],
    langkah: ["Rendam bihun hingga lunak, tiriskan.", "Tumis bawang putih, masukkan telur.", "Masukkan wortel dan kol, aduk layu.", "Masukkan bihun, kecap, dan saus tiram.", "Aduk rata, sajikan."] },
  { judul: "Kwetiau Goreng", cat: 2, menit: 20, level: "Sedang", porsi: 2,
    bahan: [{ n: "Kwetiau", j: "200 gram" }, { n: "Telur", j: "1 butir" }, { n: "Udang", j: "80 gram", o: true }, { n: "Sawi Hijau", j: "3 lembar" }, { n: "Tauge", j: "50 gram" }, { n: "Bawang Putih", j: "2 siung" }, { n: "Kecap Manis", j: "2 sdm" }, { n: "Saus Tiram", j: "1 sdm" }],
    langkah: ["Tumis bawang putih dan udang.", "Masukkan telur, orak-arik.", "Masukkan kwetiau, sawi, dan tauge.", "Beri kecap manis dan saus tiram.", "Aduk dengan api besar, sajikan."] },
  { judul: "Bakso", cat: 2, menit: 40, level: "Sedang", porsi: 4,
    bahan: [{ n: "Bakso", j: "15 butir" }, { n: "Bihun", j: "100 gram" }, { n: "Sawi Hijau", j: "3 lembar" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Daun Bawang", j: "1 batang" }, { n: "Kaldu Bubuk", j: "secukupnya" }, { n: "Air", j: "1.5 liter" }],
    langkah: ["Tumis bawang putih halus, masukkan ke air.", "Didihkan kuah, beri garam dan kaldu.", "Masukkan bakso, masak hingga mengapung.", "Seduh bihun dan sawi.", "Sajikan bakso dengan kuah panas dan daun bawang."] },
  { judul: "Capcay Kuah", cat: 2, menit: 25, level: "Sedang", porsi: 3,
    bahan: [{ n: "Sawi Hijau", j: "5 lembar" }, { n: "Wortel", j: "1 buah" }, { n: "Kol", j: "5 lembar" }, { n: "Bakso", j: "5 buah", o: true }, { n: "Ayam", j: "100 gram", o: true }, { n: "Bawang Putih", j: "3 siung" }, { n: "Bawang Bombay", j: "1/2 buah" }, { n: "Saus Tiram", j: "2 sdm" }],
    langkah: ["Potong semua sayuran.", "Tumis bawang putih dan bombay hingga harum.", "Masukkan ayam dan bakso.", "Beri air, didihkan, masukkan sayuran.", "Beri saus tiram dan garam, masak hingga matang."] },
  { judul: "Tumis Kangkung", cat: 2, menit: 15, level: "Mudah", porsi: 2,
    bahan: [{ n: "Kangkung", j: "1 ikat" }, { n: "Bawang Merah", j: "3 siung" }, { n: "Bawang Putih", j: "2 siung" }, { n: "Cabai Merah", j: "2 buah" }, { n: "Saus Tiram", j: "1 sdm" }, { n: "Minyak Goreng", j: "2 sdm" }],
    langkah: ["Petik dan cuci kangkung.", "Iris bawang dan cabai.", "Tumis bumbu iris hingga harum.", "Masukkan kangkung, aduk api besar.", "Beri saus tiram dan garam, sajikan."] },
  { judul: "Sup Ayam Bening", cat: 2, menit: 35, level: "Sedang", porsi: 4,
    bahan: [{ n: "Ayam", j: "300 gram" }, { n: "Wortel", j: "2 buah" }, { n: "Kentang", j: "2 buah" }, { n: "Daun Bawang", j: "1 batang" }, { n: "Seledri", j: "1 batang" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Air", j: "1 liter" }],
    langkah: ["Rebus ayam, buang busanya.", "Tumis bawang halus, masukkan ke kaldu.", "Tambahkan wortel dan kentang.", "Masak hingga empuk, beri garam dan lada.", "Taburi daun bawang dan seledri."] },
  { judul: "Orek Tempe", cat: 2, menit: 20, level: "Mudah", porsi: 3,
    bahan: [{ n: "Tempe", j: "1 papan" }, { n: "Cabai Merah", j: "3 buah" }, { n: "Bawang Merah", j: "4 siung" }, { n: "Bawang Putih", j: "2 siung" }, { n: "Kecap Manis", j: "3 sdm" }, { n: "Gula Merah", j: "1 sdm" }],
    langkah: ["Potong tempe korek, goreng setengah kering.", "Iris bawang dan cabai.", "Tumis bumbu iris hingga harum.", "Masukkan tempe, kecap, dan gula merah.", "Masak hingga meresap dan kering."] },
  { judul: "Soto Ayam", cat: 2, menit: 50, level: "Sedang", porsi: 4,
    bahan: [{ n: "Ayam", j: "400 gram" }, { n: "Bihun", j: "100 gram" }, { n: "Tauge", j: "50 gram" }, { n: "Telur", j: "2 butir" }, { n: "Kunyit", j: "2 cm" }, { n: "Serai", j: "1 batang" }, { n: "Daun Jeruk", j: "3 lembar" }, { n: "Bawang Putih", j: "4 siung" }],
    langkah: ["Rebus ayam hingga empuk, suwir dagingnya.", "Haluskan bawang dan kunyit, tumis dengan serai.", "Masukkan bumbu ke kaldu, beri garam.", "Siapkan bihun, tauge, dan telur rebus.", "Sajikan dengan kuah soto panas."] },
  { judul: "Soto Betawi", cat: 2, menit: 60, level: "Sulit", porsi: 4,
    bahan: [{ n: "Daging Sapi", j: "400 gram" }, { n: "Santan", j: "500 ml" }, { n: "Kentang", j: "2 buah" }, { n: "Tomat", j: "1 buah" }, { n: "Bawang Merah", j: "5 siung" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Serai", j: "1 batang" }, { n: "Daun Salam", j: "2 lembar" }],
    langkah: ["Rebus daging hingga empuk, potong dadu.", "Haluskan bawang, tumis dengan serai dan daun salam.", "Masukkan bumbu ke kaldu, tuang santan.", "Masak hingga mendidih jangan sampai pecah.", "Sajikan dengan kentang dan tomat."] },
  { judul: "Rawon", cat: 2, menit: 70, level: "Sulit", porsi: 4,
    bahan: [{ n: "Daging Sapi", j: "500 gram" }, { n: "Tauge", j: "50 gram" }, { n: "Bawang Merah", j: "6 siung" }, { n: "Bawang Putih", j: "4 siung" }, { n: "Kemiri", j: "3 butir" }, { n: "Lengkuas", j: "2 cm" }, { n: "Serai", j: "1 batang" }, { n: "Daun Jeruk", j: "3 lembar" }],
    langkah: ["Rebus daging hingga empuk, potong dadu.", "Haluskan semua bumbu (dengan kluwek bila ada).", "Tumis bumbu hingga harum dan matang.", "Masukkan bumbu ke kaldu daging.", "Masak hingga meresap, sajikan dengan tauge."] },
  { judul: "Rendang", cat: 2, menit: 120, level: "Sulit", porsi: 5,
    bahan: [{ n: "Daging Sapi", j: "600 gram" }, { n: "Santan", j: "1 liter" }, { n: "Cabai Merah", j: "10 buah" }, { n: "Bawang Merah", j: "8 siung" }, { n: "Bawang Putih", j: "5 siung" }, { n: "Lengkuas", j: "3 cm" }, { n: "Serai", j: "2 batang" }, { n: "Daun Jeruk", j: "4 lembar" }],
    langkah: ["Haluskan cabai, bawang, dan lengkuas.", "Tumis bumbu dengan serai dan daun jeruk.", "Masukkan daging, aduk hingga berubah warna.", "Tuang santan, masak dengan api kecil.", "Aduk terus hingga santan menyusut dan berminyak, sajikan."] },
  { judul: "Sate Ayam", cat: 2, menit: 40, level: "Sedang", porsi: 3,
    bahan: [{ n: "Ayam", j: "400 gram" }, { n: "Kacang Tanah", j: "150 gram" }, { n: "Kecap Manis", j: "3 sdm" }, { n: "Bawang Merah", j: "4 siung" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Cabai Rawit", j: "3 buah", o: true }, { n: "Gula Merah", j: "1 sdm" }],
    langkah: ["Potong ayam dadu, tusuk dengan tusukan sate.", "Goreng dan haluskan kacang untuk bumbu.", "Campur bumbu kacang dengan kecap dan air.", "Bakar sate sambil diolesi bumbu.", "Sajikan dengan bumbu kacang dan kecap."] },
  { judul: "Sate Kambing", cat: 2, menit: 40, level: "Sedang", porsi: 3,
    bahan: [{ n: "Daging Kambing", j: "400 gram" }, { n: "Kecap Manis", j: "4 sdm" }, { n: "Bawang Merah", j: "5 siung" }, { n: "Cabai Rawit", j: "5 buah" }, { n: "Tomat", j: "1 buah" }, { n: "Jahe", j: "2 cm" }],
    langkah: ["Potong daging kambing dadu, tusuk.", "Lumuri dengan kecap dan parutan jahe.", "Bakar sate hingga matang.", "Iris bawang merah, cabai, dan tomat.", "Sajikan dengan kecap dan sambal irisan."] },
  { judul: "Gado-gado", cat: 2, menit: 30, level: "Sedang", porsi: 3,
    bahan: [{ n: "Tahu", j: "2 potong" }, { n: "Tempe", j: "1/2 papan" }, { n: "Telur", j: "2 butir" }, { n: "Kangkung", j: "1 ikat" }, { n: "Tauge", j: "100 gram" }, { n: "Timun", j: "1 buah" }, { n: "Kacang Tanah", j: "150 gram" }, { n: "Cabai Rawit", j: "3 buah" }],
    langkah: ["Rebus sayuran dan telur.", "Goreng tahu dan tempe.", "Haluskan kacang dengan cabai dan gula.", "Beri air dan garam pada bumbu kacang.", "Tata sayuran, siram bumbu kacang."] },
  { judul: "Ketoprak", cat: 2, menit: 25, level: "Mudah", porsi: 2,
    bahan: [{ n: "Lontong", j: "2 buah" }, { n: "Bihun", j: "100 gram" }, { n: "Tahu", j: "2 potong" }, { n: "Tauge", j: "100 gram" }, { n: "Kacang Tanah", j: "150 gram" }, { n: "Bawang Putih", j: "2 siung" }, { n: "Kecap Manis", j: "2 sdm" }],
    langkah: ["Seduh bihun dan tauge.", "Goreng tahu, potong-potong.", "Haluskan kacang, bawang putih, dan cabai.", "Beri air dan kecap pada bumbu kacang.", "Tata lontong, bihun, tahu, siram bumbu."] },
  { judul: "Pecel", cat: 2, menit: 25, level: "Mudah", porsi: 3,
    bahan: [{ n: "Kangkung", j: "1 ikat" }, { n: "Tauge", j: "100 gram" }, { n: "Kacang Panjang", j: "5 batang" }, { n: "Bayam", j: "1 ikat" }, { n: "Kacang Tanah", j: "150 gram" }, { n: "Cabai Rawit", j: "4 buah" }, { n: "Gula Merah", j: "1 sdm" }],
    langkah: ["Rebus semua sayuran hingga matang.", "Goreng kacang tanah.", "Haluskan kacang dengan cabai dan gula merah.", "Beri air hangat hingga jadi saus kental.", "Siram sayuran dengan bumbu pecel."] },
  { judul: "Opor Ayam", cat: 2, menit: 50, level: "Sedang", porsi: 4,
    bahan: [{ n: "Ayam", j: "500 gram" }, { n: "Santan", j: "500 ml" }, { n: "Telur", j: "3 butir", o: true }, { n: "Bawang Merah", j: "6 siung" }, { n: "Bawang Putih", j: "4 siung" }, { n: "Kemiri", j: "3 butir" }, { n: "Serai", j: "1 batang" }, { n: "Daun Salam", j: "2 lembar" }],
    langkah: ["Haluskan bawang dan kemiri.", "Tumis bumbu dengan serai dan daun salam.", "Masukkan ayam, masak hingga berubah warna.", "Tuang santan, masak hingga matang.", "Tambahkan telur rebus, sajikan."] },
  { judul: "Ayam Goreng", cat: 2, menit: 40, level: "Mudah", porsi: 4,
    bahan: [{ n: "Ayam", j: "1 ekor potong" }, { n: "Bawang Putih", j: "4 siung" }, { n: "Kunyit", j: "2 cm" }, { n: "Ketumbar", j: "1 sdt" }, { n: "Daun Salam", j: "2 lembar" }, { n: "Minyak Goreng", j: "untuk menggoreng" }],
    langkah: ["Haluskan bawang putih, kunyit, dan ketumbar.", "Ungkep ayam dengan bumbu dan daun salam.", "Masak hingga bumbu meresap dan air menyusut.", "Panaskan minyak banyak.", "Goreng ayam hingga kuning keemasan."] },
  { judul: "Ayam Bakar", cat: 2, menit: 50, level: "Sedang", porsi: 4,
    bahan: [{ n: "Ayam", j: "1 ekor potong" }, { n: "Kecap Manis", j: "4 sdm" }, { n: "Bawang Merah", j: "5 siung" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Kemiri", j: "3 butir" }, { n: "Serai", j: "1 batang" }, { n: "Santan", j: "200 ml" }],
    langkah: ["Haluskan bawang dan kemiri.", "Ungkep ayam dengan bumbu, santan, dan kecap.", "Masak hingga bumbu meresap.", "Bakar ayam sambil diolesi sisa bumbu.", "Panggang hingga harum dan kecokelatan."] },
  { judul: "Ayam Geprek", cat: 2, menit: 35, level: "Sedang", porsi: 2,
    bahan: [{ n: "Dada Ayam", j: "2 potong" }, { n: "Tepung Terigu", j: "150 gram" }, { n: "Tepung Maizena", j: "2 sdm" }, { n: "Cabai Rawit", j: "10 buah" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Garam", j: "secukupnya" }],
    langkah: ["Balur ayam dengan tepung berbumbu.", "Goreng ayam hingga garing.", "Ulek cabai rawit, bawang putih, dan garam.", "Beri sedikit minyak panas pada sambal.", "Geprek ayam di atas sambal, sajikan."] },
  { judul: "Gulai Kambing", cat: 2, menit: 70, level: "Sulit", porsi: 4,
    bahan: [{ n: "Daging Kambing", j: "500 gram" }, { n: "Santan", j: "600 ml" }, { n: "Cabai Merah", j: "6 buah" }, { n: "Bawang Merah", j: "6 siung" }, { n: "Bawang Putih", j: "4 siung" }, { n: "Kunyit", j: "2 cm" }, { n: "Jahe", j: "2 cm" }, { n: "Serai", j: "1 batang" }],
    langkah: ["Rebus daging kambing hingga empuk.", "Haluskan semua bumbu.", "Tumis bumbu dengan serai hingga harum.", "Masukkan daging dan santan.", "Masak hingga kuah mengental, sajikan."] },
  { judul: "Sayur Asem", cat: 2, menit: 30, level: "Mudah", porsi: 4,
    bahan: [{ n: "Labu Siam", j: "1 buah" }, { n: "Kacang Panjang", j: "5 batang" }, { n: "Jagung Manis", j: "1 buah" }, { n: "Asam Jawa", j: "2 sdm" }, { n: "Bawang Merah", j: "4 siung" }, { n: "Cabai Merah", j: "2 buah" }, { n: "Gula Merah", j: "1 sdm" }],
    langkah: ["Haluskan bawang dan cabai.", "Didihkan air, masukkan bumbu.", "Masukkan jagung dan labu siam.", "Tambahkan kacang panjang dan asam jawa.", "Beri gula merah dan garam, masak hingga matang."] },
  { judul: "Sayur Lodeh", cat: 2, menit: 35, level: "Sedang", porsi: 4,
    bahan: [{ n: "Labu Siam", j: "1 buah" }, { n: "Terong", j: "1 buah" }, { n: "Kacang Panjang", j: "5 batang" }, { n: "Santan", j: "500 ml" }, { n: "Bawang Merah", j: "5 siung" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Cabai Merah", j: "3 buah" }, { n: "Daun Salam", j: "2 lembar" }],
    langkah: ["Haluskan bawang dan cabai.", "Tumis bumbu dengan daun salam.", "Masukkan santan, didihkan.", "Masukkan semua sayuran.", "Masak hingga sayur empuk dan kuah meresap."] },
  { judul: "Pepes Ikan", cat: 2, menit: 45, level: "Sedang", porsi: 3,
    bahan: [{ n: "Ikan", j: "3 ekor" }, { n: "Daun Kemangi", j: "1 ikat" }, { n: "Tomat", j: "1 buah" }, { n: "Cabai Merah", j: "3 buah" }, { n: "Bawang Merah", j: "5 siung" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Kunyit", j: "2 cm" }],
    langkah: ["Haluskan bawang, cabai, dan kunyit.", "Lumuri ikan dengan bumbu halus.", "Bungkus ikan dengan daun pisang beri kemangi dan tomat.", "Kukus hingga matang.", "Panggang sebentar agar harum, sajikan."] },
  { judul: "Ikan Bakar", cat: 2, menit: 40, level: "Sedang", porsi: 3,
    bahan: [{ n: "Ikan", j: "2 ekor" }, { n: "Kecap Manis", j: "3 sdm" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Cabai Merah", j: "3 buah" }, { n: "Jahe", j: "2 cm" }, { n: "Jeruk Peras", j: "1 buah" }],
    langkah: ["Bersihkan ikan, lumuri air jeruk dan garam.", "Haluskan bawang, cabai, dan jahe.", "Lumuri ikan dengan bumbu dan kecap.", "Bakar ikan sambil diolesi bumbu.", "Panggang hingga matang merata."] },
  { judul: "Nasi Lemak", cat: 2, menit: 45, level: "Sedang", porsi: 4,
    bahan: [{ n: "Beras", j: "2 cup" }, { n: "Santan", j: "400 ml" }, { n: "Ikan Teri", j: "100 gram" }, { n: "Kacang Tanah", j: "50 gram" }, { n: "Telur", j: "2 butir" }, { n: "Timun", j: "1 buah" }, { n: "Cabai Merah", j: "5 buah" }, { n: "Bawang Merah", j: "4 siung" }],
    langkah: ["Masak beras dengan santan dan daun pandan.", "Goreng teri dan kacang.", "Buat sambal dari cabai dan bawang.", "Rebus telur, iris timun.", "Sajikan nasi lemak dengan semua pelengkap."] },

  // ---------------- CEMILAN ----------------
  { judul: "Pisang Goreng", cat: 3, menit: 20, level: "Mudah", porsi: 4,
    bahan: [{ n: "Pisang", j: "5 buah" }, { n: "Tepung Terigu", j: "100 gram" }, { n: "Tepung Beras", j: "2 sdm" }, { n: "Gula Pasir", j: "1 sdm" }, { n: "Air", j: "secukupnya" }, { n: "Minyak Goreng", j: "untuk menggoreng" }],
    langkah: ["Kupas dan belah pisang.", "Campur tepung, gula, garam, dan air jadi adonan.", "Celupkan pisang ke adonan.", "Goreng dalam minyak panas.", "Tiriskan dan sajikan hangat."] },
  { judul: "Perkedel Kentang", cat: 3, menit: 30, level: "Sedang", porsi: 4,
    bahan: [{ n: "Kentang", j: "4 buah" }, { n: "Telur", j: "1 butir" }, { n: "Daun Bawang", j: "1 batang" }, { n: "Seledri", j: "1 batang" }, { n: "Bawang Putih", j: "2 siung" }, { n: "Minyak Goreng", j: "untuk menggoreng" }],
    langkah: ["Goreng/kukus kentang, haluskan.", "Campur dengan bawang putih, daun bawang, seledri.", "Beri garam dan lada, bentuk bulat pipih.", "Celupkan ke kocokan telur.", "Goreng hingga kecokelatan."] },
  { judul: "Roti Bakar Coklat", cat: 3, menit: 10, level: "Mudah", porsi: 1,
    bahan: [{ n: "Roti Tawar", j: "4 lembar" }, { n: "Selai Coklat", j: "3 sdm" }, { n: "Meises", j: "2 sdm", o: true }, { n: "Margarin", j: "2 sdm" }, { n: "Keju Cheddar", j: "secukupnya", o: true }, { n: "Susu Kental Manis", j: "1 sdm", o: true }],
    langkah: ["Olesi roti dengan margarin.", "Panggang roti di teflon hingga kecokelatan.", "Oleskan selai coklat.", "Taburi meises dan keju parut.", "Tangkupkan, potong, sajikan."] },
  { judul: "Bakwan Sayur", cat: 3, menit: 20, level: "Mudah", porsi: 4,
    bahan: [{ n: "Kol", j: "5 lembar" }, { n: "Wortel", j: "1 buah" }, { n: "Tauge", j: "50 gram" }, { n: "Tepung Terigu", j: "150 gram" }, { n: "Bawang Putih", j: "2 siung" }, { n: "Daun Bawang", j: "1 batang" }, { n: "Air", j: "secukupnya" }],
    langkah: ["Iris kol, wortel, dan daun bawang.", "Campur dengan tepung, bawang putih halus, dan air.", "Beri garam dan lada, aduk rata.", "Goreng per sendok dalam minyak panas.", "Goreng hingga garing kecokelatan."] },
  { judul: "Tahu Goreng", cat: 3, menit: 15, level: "Mudah", porsi: 3,
    bahan: [{ n: "Tahu", j: "5 potong" }, { n: "Bawang Putih", j: "2 siung" }, { n: "Ketumbar", j: "1/2 sdt" }, { n: "Garam", j: "secukupnya" }, { n: "Minyak Goreng", j: "untuk menggoreng" }],
    langkah: ["Haluskan bawang putih, ketumbar, dan garam.", "Lumuri tahu dengan bumbu.", "Diamkan beberapa menit.", "Goreng tahu dalam minyak panas.", "Goreng hingga kuning keemasan, sajikan."] },
  { judul: "Martabak Telur", cat: 3, menit: 30, level: "Sedang", porsi: 3,
    bahan: [{ n: "Kulit Lumpia", j: "6 lembar" }, { n: "Telur", j: "4 butir" }, { n: "Daging Cincang", j: "150 gram" }, { n: "Daun Bawang", j: "2 batang" }, { n: "Bawang Bombay", j: "1/2 buah" }, { n: "Bumbu Kari", j: "1 sdt", o: true }],
    langkah: ["Tumis daging dengan bawang bombay dan bumbu kari.", "Kocok telur, campur dengan daun bawang dan tumisan.", "Tuang isian ke kulit, lipat rapat.", "Goreng dalam minyak panas.", "Goreng hingga kecokelatan kedua sisi."] },
  { judul: "Risoles", cat: 3, menit: 45, level: "Sedang", porsi: 4,
    bahan: [{ n: "Tepung Terigu", j: "150 gram" }, { n: "Telur", j: "2 butir" }, { n: "Susu Cair", j: "300 ml" }, { n: "Wortel", j: "1 buah" }, { n: "Kentang", j: "1 buah" }, { n: "Tepung Panir", j: "100 gram" }, { n: "Bawang Bombay", j: "1/2 buah" }],
    langkah: ["Buat kulit dari tepung, telur, dan susu.", "Tumis wortel dan kentang untuk isian.", "Isi kulit dengan tumisan, lipat.", "Celup ke telur, gulingkan ke tepung panir.", "Goreng hingga keemasan."] },
  { judul: "Lumpia Semarang", cat: 3, menit: 40, level: "Sedang", porsi: 4,
    bahan: [{ n: "Kulit Lumpia", j: "10 lembar" }, { n: "Nangka Muda", j: "200 gram" }, { n: "Udang", j: "100 gram", o: true }, { n: "Telur", j: "1 butir" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Saus Tiram", j: "1 sdm" }],
    langkah: ["Tumis bawang putih, masukkan udang dan telur.", "Masukkan rebung/nangka muda, beri saus tiram.", "Masak hingga matang sebagai isian.", "Isi kulit lumpia, gulung rapat.", "Goreng hingga kecokelatan."] },
  { judul: "Lumpia Basah", cat: 3, menit: 30, level: "Mudah", porsi: 3,
    bahan: [{ n: "Kulit Lumpia", j: "6 lembar" }, { n: "Tauge", j: "100 gram" }, { n: "Wortel", j: "1 buah" }, { n: "Tahu", j: "2 potong" }, { n: "Bawang Putih", j: "2 siung" }, { n: "Saus Tiram", j: "1 sdm" }],
    langkah: ["Tumis bawang putih hingga harum.", "Masukkan wortel, tauge, dan tahu.", "Beri saus tiram dan garam, masak hingga layu.", "Isi kulit lumpia dengan tumisan.", "Gulung dan sajikan tanpa digoreng."] },
  { judul: "Klepon", cat: 3, menit: 40, level: "Sedang", porsi: 4,
    bahan: [{ n: "Tepung Beras", j: "250 gram" }, { n: "Gula Merah", j: "100 gram" }, { n: "Kelapa Parut", j: "100 gram" }, { n: "Daun Pandan", j: "2 lembar" }, { n: "Garam", j: "sejumput" }, { n: "Air", j: "secukupnya" }],
    langkah: ["Uleni tepung beras dengan air pandan.", "Ambil adonan, isi dengan gula merah.", "Bentuk bulat, rapatkan.", "Rebus hingga mengapung.", "Gulingkan ke kelapa parut, sajikan."] },
  { judul: "Donat", cat: 3, menit: 90, level: "Sedang", porsi: 6,
    bahan: [{ n: "Tepung Terigu", j: "300 gram" }, { n: "Telur", j: "1 butir" }, { n: "Ragi Instan", j: "1 sdt" }, { n: "Gula Pasir", j: "3 sdm" }, { n: "Mentega", j: "2 sdm" }, { n: "Susu Cair", j: "150 ml" }, { n: "Gula Halus", j: "untuk taburan" }],
    langkah: ["Campur tepung, ragi, gula, telur, dan susu.", "Uleni hingga kalis, diamkan 1 jam.", "Bentuk bulat berlubang.", "Goreng dalam minyak panas hingga keemasan.", "Taburi gula halus atau beri topping."] },
  { judul: "Kentang Goreng", cat: 3, menit: 25, level: "Mudah", porsi: 3,
    bahan: [{ n: "Kentang", j: "4 buah" }, { n: "Tepung Maizena", j: "2 sdm" }, { n: "Garam", j: "secukupnya" }, { n: "Saus Tomat", j: "secukupnya", o: true }, { n: "Minyak Goreng", j: "untuk menggoreng" }],
    langkah: ["Kupas kentang, potong memanjang.", "Rendam air, lalu rebus sebentar.", "Lumuri dengan maizena dan garam.", "Goreng dua kali agar renyah.", "Sajikan dengan saus tomat."] },
  { judul: "Chicken Nugget", cat: 3, menit: 40, level: "Sedang", porsi: 4,
    bahan: [{ n: "Dada Ayam", j: "300 gram" }, { n: "Telur", j: "1 butir" }, { n: "Tepung Terigu", j: "3 sdm" }, { n: "Tepung Panir", j: "150 gram" }, { n: "Bawang Putih", j: "2 siung" }, { n: "Keju Cheddar", j: "50 gram", o: true }],
    langkah: ["Haluskan ayam dengan bawang putih.", "Campur dengan tepung, telur, dan garam.", "Kukus adonan, lalu potong-potong.", "Celup ke telur, balur tepung panir.", "Goreng hingga keemasan."] },
  { judul: "Brownies", cat: 3, menit: 50, level: "Sedang", porsi: 6,
    bahan: [{ n: "Coklat Batang", j: "150 gram" }, { n: "Tepung Terigu", j: "100 gram" }, { n: "Telur", j: "3 butir" }, { n: "Gula Pasir", j: "150 gram" }, { n: "Mentega", j: "100 gram" }, { n: "Coklat Bubuk", j: "2 sdm" }],
    langkah: ["Lelehkan coklat batang dan mentega.", "Kocok telur dan gula hingga mengembang.", "Masukkan coklat leleh, aduk rata.", "Ayak tepung dan coklat bubuk, aduk.", "Panggang 35 menit, dinginkan."] },
  { judul: "Waffle", cat: 3, menit: 25, level: "Mudah", porsi: 3,
    bahan: [{ n: "Tepung Terigu", j: "200 gram" }, { n: "Telur", j: "2 butir" }, { n: "Susu Cair", j: "250 ml" }, { n: "Mentega", j: "50 gram" }, { n: "Gula Pasir", j: "2 sdm" }, { n: "Baking Powder", j: "1 sdt" }, { n: "Madu", j: "secukupnya", o: true }],
    langkah: ["Campur tepung, gula, dan baking powder.", "Masukkan telur, susu, dan mentega leleh.", "Aduk hingga adonan halus.", "Tuang ke cetakan waffle panas.", "Panggang hingga keemasan, sajikan dengan madu."] },
  { judul: "Croissant", cat: 3, menit: 120, level: "Sulit", porsi: 4,
    bahan: [{ n: "Tepung Terigu", j: "300 gram" }, { n: "Mentega", j: "150 gram" }, { n: "Ragi Instan", j: "1 sdt" }, { n: "Susu Cair", j: "150 ml" }, { n: "Gula Pasir", j: "2 sdm" }, { n: "Telur", j: "1 butir" }],
    langkah: ["Buat adonan dari tepung, ragi, gula, dan susu.", "Pipihkan, beri lapisan mentega, lipat berulang.", "Istirahatkan adonan di kulkas.", "Gulung berbentuk bulan sabit.", "Oles telur, panggang hingga keemasan."] },
  { judul: "Samosa", cat: 3, menit: 45, level: "Sedang", porsi: 4,
    bahan: [{ n: "Kulit Lumpia", j: "10 lembar" }, { n: "Kentang", j: "3 buah" }, { n: "Bumbu Kari", j: "1 sdt" }, { n: "Bawang Bombay", j: "1/2 buah" }, { n: "Cabai Hijau", j: "2 buah", o: true }, { n: "Minyak Goreng", j: "untuk menggoreng" }],
    langkah: ["Rebus dan haluskan kentang.", "Tumis bawang bombay dan bumbu kari.", "Campur dengan kentang sebagai isian.", "Bungkus isian dengan kulit bentuk segitiga.", "Goreng hingga renyah."] },
  { judul: "Cheesecake", cat: 3, menit: 80, level: "Sulit", porsi: 6,
    bahan: [{ n: "Keju Cheddar", j: "200 gram" }, { n: "Krim Kental", j: "200 ml" }, { n: "Telur", j: "3 butir" }, { n: "Gula Pasir", j: "100 gram" }, { n: "Tepung Terigu", j: "2 sdm" }, { n: "Lemon", j: "1 buah" }],
    langkah: ["Buat dasar dari biskuit dan mentega.", "Kocok keju krim, gula, dan telur.", "Tambahkan perasan lemon dan tepung.", "Tuang ke loyang di atas dasar biskuit.", "Panggang dengan teknik au bain marie, dinginkan."] },
  { judul: "Cupcake", cat: 3, menit: 35, level: "Mudah", porsi: 6,
    bahan: [{ n: "Tepung Terigu", j: "150 gram" }, { n: "Telur", j: "2 butir" }, { n: "Gula Pasir", j: "100 gram" }, { n: "Mentega", j: "100 gram" }, { n: "Susu Cair", j: "50 ml" }, { n: "Baking Powder", j: "1 sdt" }, { n: "Vanili", j: "1/2 sdt" }],
    langkah: ["Kocok mentega dan gula hingga lembut.", "Masukkan telur satu per satu.", "Tambahkan tepung, baking powder, dan susu.", "Tuang ke cup hingga 3/4 penuh.", "Panggang 20 menit, hias sesuai selera."] },

  // ---------------- MINUMAN ----------------
  { judul: "Es Teh Manis", cat: 4, menit: 5, level: "Mudah", porsi: 2,
    bahan: [{ n: "Teh Celup", j: "2 kantong" }, { n: "Gula Pasir", j: "3 sdm" }, { n: "Air", j: "500 ml" }, { n: "Es Batu", j: "secukupnya" }],
    langkah: ["Seduh teh dengan air panas.", "Tambahkan gula, aduk larut.", "Dinginkan teh.", "Siapkan gelas berisi es batu.", "Tuang teh, sajikan dingin."] },
  { judul: "Es Jeruk Segar", cat: 4, menit: 5, level: "Mudah", porsi: 1,
    bahan: [{ n: "Jeruk Peras", j: "3 buah" }, { n: "Gula Pasir", j: "2 sdm" }, { n: "Air", j: "200 ml" }, { n: "Es Batu", j: "secukupnya" }],
    langkah: ["Peras jeruk, saring bijinya.", "Larutkan gula dengan air hangat.", "Campur air jeruk dan larutan gula.", "Tambahkan es batu.", "Aduk dan sajikan."] },
  { judul: "Es Cendol", cat: 4, menit: 15, level: "Mudah", porsi: 3,
    bahan: [{ n: "Cendol", j: "200 gram" }, { n: "Santan", j: "300 ml" }, { n: "Gula Merah", j: "150 gram" }, { n: "Daun Pandan", j: "2 lembar" }, { n: "Es Batu", j: "secukupnya" }],
    langkah: ["Rebus gula merah dengan pandan jadi sirup.", "Rebus santan dengan sedikit garam.", "Siapkan cendol di gelas.", "Tuang santan dan sirup gula merah.", "Tambahkan es batu, sajikan."] },
  { judul: "Es Campur", cat: 4, menit: 15, level: "Mudah", porsi: 3,
    bahan: [{ n: "Cendol", j: "100 gram" }, { n: "Nangka Muda", j: "50 gram", o: true }, { n: "Kelapa Muda", j: "100 gram" }, { n: "Santan", j: "200 ml" }, { n: "Sirup", j: "4 sdm" }, { n: "Susu Kental Manis", j: "3 sdm" }, { n: "Es Batu", j: "secukupnya" }],
    langkah: ["Siapkan cendol, nangka, dan kelapa muda di mangkuk.", "Tambahkan es serut.", "Siram dengan santan dan sirup.", "Beri susu kental manis.", "Sajikan dingin."] },
  { judul: "Jus Alpukat", cat: 4, menit: 8, level: "Mudah", porsi: 1,
    bahan: [{ n: "Alpukat", j: "1 buah" }, { n: "Susu Kental Manis", j: "3 sdm" }, { n: "Gula Pasir", j: "1 sdm" }, { n: "Air", j: "150 ml" }, { n: "Es Batu", j: "secukupnya" }, { n: "Coklat Bubuk", j: "1 sdt", o: true }],
    langkah: ["Keruk daging alpukat.", "Masukkan ke blender dengan gula dan air.", "Blender hingga halus.", "Tuang ke gelas, beri es batu.", "Beri susu kental manis, sajikan."] },
  { judul: "Jus Mangga", cat: 4, menit: 8, level: "Mudah", porsi: 1,
    bahan: [{ n: "Mangga", j: "1 buah" }, { n: "Gula Pasir", j: "1 sdm" }, { n: "Air", j: "150 ml" }, { n: "Susu Kental Manis", j: "2 sdm", o: true }, { n: "Es Batu", j: "secukupnya" }],
    langkah: ["Kupas dan potong mangga.", "Masukkan ke blender dengan gula dan air.", "Blender hingga halus.", "Tuang ke gelas berisi es.", "Sajikan segar."] },
  { judul: "Kopi Tubruk", cat: 4, menit: 5, level: "Mudah", porsi: 1,
    bahan: [{ n: "Kopi Bubuk", j: "2 sdt" }, { n: "Gula Pasir", j: "1 sdt" }, { n: "Air", j: "200 ml" }],
    langkah: ["Masukkan kopi dan gula ke gelas.", "Didihkan air.", "Tuang air panas ke gelas.", "Aduk rata.", "Diamkan ampas mengendap, sajikan."] },
  { judul: "Es Kelapa Muda", cat: 4, menit: 8, level: "Mudah", porsi: 2,
    bahan: [{ n: "Kelapa Muda", j: "1 buah" }, { n: "Gula Pasir", j: "2 sdm" }, { n: "Air", j: "300 ml" }, { n: "Sirup", j: "2 sdm", o: true }, { n: "Es Batu", j: "secukupnya" }],
    langkah: ["Keruk daging kelapa muda.", "Tuang air kelapa ke wadah.", "Tambahkan gula atau sirup.", "Masukkan es batu.", "Aduk dan sajikan segar."] },
  { judul: "Teh Tarik", cat: 4, menit: 10, level: "Mudah", porsi: 2,
    bahan: [{ n: "Teh Celup", j: "2 kantong" }, { n: "Susu Kental Manis", j: "3 sdm" }, { n: "Gula Pasir", j: "1 sdm" }, { n: "Air", j: "300 ml" }],
    langkah: ["Seduh teh pekat dengan air panas.", "Tambahkan susu kental manis dan gula.", "Tuang bolak-balik antar dua gelas (tarik).", "Lakukan hingga berbusa.", "Sajikan hangat."] },
  { judul: "Wedang Jahe", cat: 4, menit: 15, level: "Mudah", porsi: 2,
    bahan: [{ n: "Jahe", j: "3 cm" }, { n: "Gula Merah", j: "50 gram" }, { n: "Daun Pandan", j: "1 lembar" }, { n: "Serai", j: "1 batang", o: true }, { n: "Air", j: "400 ml" }],
    langkah: ["Bakar dan memarkan jahe.", "Rebus jahe dengan air, pandan, dan serai.", "Tambahkan gula merah.", "Masak hingga harum dan gula larut.", "Saring dan sajikan hangat."] },
  { judul: "Milkshake", cat: 4, menit: 8, level: "Mudah", porsi: 1,
    bahan: [{ n: "Susu Cair", j: "200 ml" }, { n: "Stroberi", j: "100 gram" }, { n: "Gula Pasir", j: "2 sdm" }, { n: "Es Batu", j: "secukupnya" }, { n: "Krim Kental", j: "2 sdm", o: true }],
    langkah: ["Masukkan susu, stroberi, dan gula ke blender.", "Tambahkan es batu.", "Blender hingga halus dan berbusa.", "Tuang ke gelas tinggi.", "Beri krim di atasnya, sajikan."] },
  { judul: "Lemonade", cat: 4, menit: 8, level: "Mudah", porsi: 2,
    bahan: [{ n: "Lemon", j: "2 buah" }, { n: "Gula Pasir", j: "3 sdm" }, { n: "Air", j: "400 ml" }, { n: "Es Batu", j: "secukupnya" }, { n: "Daun Kemangi", j: "2 lembar", o: true }],
    langkah: ["Peras lemon.", "Larutkan gula dengan sedikit air hangat.", "Campur air lemon, larutan gula, dan air dingin.", "Tambahkan es batu.", "Aduk dan sajikan segar."] },
  { judul: "Cokelat Panas", cat: 4, menit: 10, level: "Mudah", porsi: 1,
    bahan: [{ n: "Coklat Bubuk", j: "2 sdm" }, { n: "Susu Cair", j: "200 ml" }, { n: "Gula Pasir", j: "1 sdm" }, { n: "Coklat Batang", j: "20 gram", o: true }],
    langkah: ["Panaskan susu dengan api kecil.", "Masukkan coklat bubuk dan gula.", "Aduk hingga larut.", "Tambahkan coklat batang bila suka.", "Tuang ke gelas, sajikan hangat."] },
  { judul: "Smoothie Buah", cat: 4, menit: 8, level: "Mudah", porsi: 1,
    bahan: [{ n: "Pisang", j: "1 buah" }, { n: "Stroberi", j: "50 gram" }, { n: "Yogurt", j: "100 ml" }, { n: "Madu", j: "1 sdm" }, { n: "Es Batu", j: "secukupnya" }],
    langkah: ["Potong pisang dan stroberi.", "Masukkan ke blender dengan yogurt.", "Tambahkan madu dan es batu.", "Blender hingga halus.", "Tuang ke gelas, sajikan."] },
  { judul: "Matcha Latte", cat: 4, menit: 8, level: "Mudah", porsi: 1,
    bahan: [{ n: "Bubuk Matcha", j: "2 sdt" }, { n: "Susu Cair", j: "200 ml" }, { n: "Gula Pasir", j: "1 sdm" }, { n: "Air", j: "50 ml" }, { n: "Es Batu", j: "secukupnya", o: true }],
    langkah: ["Larutkan matcha dengan sedikit air panas.", "Aduk/kocok hingga tidak bergerindil.", "Tambahkan gula.", "Tuang susu (panas atau dingin).", "Sajikan, beri es bila ingin dingin."] },
  { judul: "Cappuccino", cat: 4, menit: 8, level: "Sedang", porsi: 1,
    bahan: [{ n: "Kopi Bubuk", j: "2 sdt" }, { n: "Susu Cair", j: "150 ml" }, { n: "Gula Pasir", j: "1 sdm", o: true }, { n: "Coklat Bubuk", j: "1/2 sdt", o: true }],
    langkah: ["Seduh espresso/kopi pekat.", "Panaskan dan kocok susu hingga berbusa.", "Tuang kopi ke cangkir.", "Tambahkan susu berbusa.", "Taburi coklat bubuk di atasnya."] },
  { judul: "Bubble Tea", cat: 4, menit: 20, level: "Sedang", porsi: 2,
    bahan: [{ n: "Teh Celup", j: "2 kantong" }, { n: "Mutiara Tapioka", j: "100 gram" }, { n: "Susu Cair", j: "200 ml" }, { n: "Gula Merah", j: "3 sdm" }, { n: "Es Batu", j: "secukupnya" }],
    langkah: ["Rebus mutiara tapioka hingga matang.", "Rendam boba dalam sirup gula merah.", "Seduh teh, dinginkan.", "Campur teh dengan susu.", "Tambahkan boba dan es, sajikan."] },

  // ---------------- MANCANEGARA ----------------
  { judul: "Spaghetti Bolognese", cat: 5, menit: 35, level: "Sedang", porsi: 3,
    bahan: [{ n: "Spaghetti", j: "250 gram" }, { n: "Daging Cincang", j: "250 gram" }, { n: "Pasta Tomat", j: "3 sdm" }, { n: "Tomat", j: "2 buah" }, { n: "Bawang Bombay", j: "1 buah" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Keju Parmesan", j: "secukupnya", o: true }],
    langkah: ["Rebus spaghetti hingga al dente.", "Tumis bawang bombay dan bawang putih.", "Masukkan daging cincang, masak hingga cokelat.", "Tambahkan tomat dan pasta tomat, masak hingga kental.", "Sajikan saus di atas spaghetti, taburi parmesan."] },
  { judul: "Spaghetti Carbonara", cat: 5, menit: 25, level: "Sedang", porsi: 2,
    bahan: [{ n: "Spaghetti", j: "200 gram" }, { n: "Daging Asap", j: "100 gram" }, { n: "Telur", j: "2 butir" }, { n: "Keju Parmesan", j: "50 gram" }, { n: "Bawang Putih", j: "2 siung" }, { n: "Krim Kental", j: "100 ml", o: true }],
    langkah: ["Rebus spaghetti hingga al dente.", "Tumis bawang putih dan daging asap.", "Kocok telur dengan parmesan dan lada.", "Campur spaghetti panas dengan tumisan.", "Masukkan campuran telur, aduk cepat hingga creamy."] },
  { judul: "Pizza Margherita", cat: 5, menit: 40, level: "Sedang", porsi: 3,
    bahan: [{ n: "Tepung Terigu", j: "300 gram" }, { n: "Ragi Instan", j: "1 sdt" }, { n: "Pasta Tomat", j: "4 sdm" }, { n: "Keju Mozzarella", j: "150 gram" }, { n: "Tomat", j: "2 buah" }, { n: "Daun Kemangi", j: "5 lembar", o: true }],
    langkah: ["Buat adonan dari tepung, ragi, dan air, diamkan.", "Pipihkan adonan jadi bulat.", "Olesi dengan pasta tomat.", "Beri irisan tomat dan keju mozzarella.", "Panggang hingga keju leleh, beri kemangi."] },
  { judul: "Hamburger", cat: 5, menit: 30, level: "Sedang", porsi: 2,
    bahan: [{ n: "Roti Burger", j: "2 buah" }, { n: "Daging Cincang", j: "250 gram" }, { n: "Keju Cheddar", j: "2 lembar" }, { n: "Selada", j: "4 lembar" }, { n: "Tomat", j: "1 buah" }, { n: "Bawang Bombay", j: "1/2 buah" }, { n: "Saus Tomat", j: "secukupnya" }],
    langkah: ["Bentuk daging jadi patty, beri garam dan lada.", "Panggang patty hingga matang.", "Panggang sebentar roti burger.", "Tata roti, patty, keju, selada, tomat.", "Beri saus, tutup roti, sajikan."] },
  { judul: "Fried Chicken", cat: 5, menit: 40, level: "Sedang", porsi: 4,
    bahan: [{ n: "Ayam", j: "1 ekor potong" }, { n: "Tepung Terigu", j: "200 gram" }, { n: "Tepung Maizena", j: "3 sdm" }, { n: "Telur", j: "1 butir" }, { n: "Susu Cair", j: "100 ml" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Lada Bubuk", j: "secukupnya" }],
    langkah: ["Marinasi ayam dengan susu dan bumbu.", "Campur tepung, maizena, garam, dan lada.", "Celup ayam ke telur lalu balur tepung.", "Goreng dalam minyak panas.", "Goreng hingga garing keemasan."] },
  { judul: "Beef Steak", cat: 5, menit: 30, level: "Sedang", porsi: 2,
    bahan: [{ n: "Daging Sapi", j: "300 gram" }, { n: "Mentega", j: "2 sdm" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Kentang", j: "2 buah" }, { n: "Brokoli", j: "100 gram" }, { n: "Saus Tomat", j: "3 sdm" }, { n: "Lada Bubuk", j: "secukupnya" }],
    langkah: ["Lumuri daging dengan garam dan lada.", "Panaskan mentega, panggang daging sesuai tingkat kematangan.", "Tambahkan bawang putih untuk aroma.", "Rebus/tumis kentang dan brokoli.", "Sajikan steak dengan saus dan sayuran."] },
  { judul: "Butter Chicken", cat: 5, menit: 45, level: "Sedang", porsi: 3,
    bahan: [{ n: "Dada Ayam", j: "400 gram" }, { n: "Mentega", j: "3 sdm" }, { n: "Pasta Tomat", j: "4 sdm" }, { n: "Krim Kental", j: "150 ml" }, { n: "Bumbu Kari", j: "2 sdt" }, { n: "Bawang Bombay", j: "1 buah" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Yogurt", j: "100 ml" }],
    langkah: ["Marinasi ayam dengan yogurt dan bumbu kari.", "Tumis bawang dengan mentega.", "Masukkan ayam, masak hingga matang.", "Tambahkan pasta tomat dan krim.", "Masak hingga kuah kental, sajikan."] },
  { judul: "Ramen", cat: 5, menit: 40, level: "Sedang", porsi: 2,
    bahan: [{ n: "Mie Telur", j: "2 keping" }, { n: "Telur", j: "2 butir" }, { n: "Dada Ayam", j: "200 gram" }, { n: "Daun Bawang", j: "1 batang" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Kecap Asin", j: "3 sdm" }, { n: "Jahe", j: "2 cm" }, { n: "Nori", j: "2 lembar", o: true }],
    langkah: ["Buat kaldu dari ayam, bawang putih, dan jahe.", "Beri kecap asin, masak hingga gurih.", "Rebus mie, rebus telur setengah matang.", "Tata mie di mangkuk, tuang kaldu.", "Beri ayam, telur, daun bawang, dan nori."] },
  { judul: "Sushi", cat: 5, menit: 40, level: "Sulit", porsi: 2,
    bahan: [{ n: "Beras", j: "2 cup" }, { n: "Nori", j: "4 lembar" }, { n: "Ikan Tuna", j: "150 gram" }, { n: "Timun", j: "1 buah" }, { n: "Wortel", j: "1 buah" }, { n: "Mayones", j: "2 sdm" }, { n: "Wijen", j: "1 sdt", o: true }],
    langkah: ["Masak nasi, bumbui dengan cuka dan gula.", "Letakkan nori di atas gulungan bambu.", "Ratakan nasi, beri isian ikan dan sayur.", "Gulung padat lalu potong-potong.", "Sajikan dengan kecap asin."] },
  { judul: "Pad Thai", cat: 5, menit: 30, level: "Sedang", porsi: 2,
    bahan: [{ n: "Kwetiau", j: "200 gram" }, { n: "Udang", j: "100 gram" }, { n: "Telur", j: "2 butir" }, { n: "Tauge", j: "100 gram" }, { n: "Kacang Tanah", j: "50 gram" }, { n: "Asam Jawa", j: "2 sdm" }, { n: "Kecap Asin", j: "2 sdm" }, { n: "Daun Bawang", j: "1 batang" }],
    langkah: ["Rendam kwetiau hingga lunak.", "Tumis udang dan telur.", "Masukkan kwetiau, asam jawa, dan kecap.", "Tambahkan tauge dan daun bawang.", "Sajikan dengan taburan kacang."] },
  { judul: "Tom Yum", cat: 5, menit: 30, level: "Sedang", porsi: 3,
    bahan: [{ n: "Udang", j: "200 gram" }, { n: "Jamur", j: "100 gram" }, { n: "Pasta Tom Yum", j: "2 sdm" }, { n: "Serai", j: "2 batang" }, { n: "Daun Jeruk", j: "4 lembar" }, { n: "Cabai Rawit", j: "5 buah" }, { n: "Lemon", j: "1 buah" }, { n: "Tomat", j: "1 buah" }],
    langkah: ["Didihkan air dengan serai dan daun jeruk.", "Masukkan pasta tom yum.", "Tambahkan udang dan jamur.", "Beri cabai, tomat, dan perasan lemon.", "Masak hingga matang, sajikan panas."] },
  { judul: "Bibimbap", cat: 5, menit: 35, level: "Sedang", porsi: 2,
    bahan: [{ n: "Nasi Putih", j: "2 piring" }, { n: "Daging Sapi", j: "150 gram" }, { n: "Telur", j: "2 butir" }, { n: "Bayam", j: "1 ikat" }, { n: "Wortel", j: "1 buah" }, { n: "Tauge", j: "100 gram" }, { n: "Gochujang", j: "2 sdm" }, { n: "Wijen", j: "1 sdt" }],
    langkah: ["Tumis daging dengan kecap asin.", "Tumis terpisah bayam, wortel, dan tauge.", "Ceplok telur setengah matang.", "Tata nasi, beri sayuran dan daging melingkar.", "Beri gochujang dan telur, aduk saat makan."] },
  { judul: "Tteokbokki", cat: 5, menit: 25, level: "Mudah", porsi: 2,
    bahan: [{ n: "Beras Ketan", j: "200 gram" }, { n: "Gochujang", j: "3 sdm" }, { n: "Bawang Putih", j: "2 siung" }, { n: "Daun Bawang", j: "1 batang" }, { n: "Gula Merah", j: "1 sdm" }, { n: "Wijen", j: "1 sdt", o: true }],
    langkah: ["Buat tteok dari tepung beras ketan (atau pakai siap pakai).", "Didihkan air dengan gochujang dan bawang putih.", "Masukkan tteok dan gula.", "Masak hingga kuah mengental.", "Taburi daun bawang dan wijen."] },
  { judul: "Fish and Chips", cat: 5, menit: 35, level: "Sedang", porsi: 2,
    bahan: [{ n: "Ikan", j: "300 gram" }, { n: "Tepung Terigu", j: "150 gram" }, { n: "Tepung Maizena", j: "2 sdm" }, { n: "Kentang", j: "3 buah" }, { n: "Lemon", j: "1 buah" }, { n: "Baking Powder", j: "1/2 sdt" }, { n: "Air", j: "secukupnya" }],
    langkah: ["Potong kentang, goreng jadi chips.", "Buat adonan tepung, maizena, baking powder, dan air.", "Celup ikan ke adonan.", "Goreng ikan hingga garing keemasan.", "Sajikan dengan kentang dan perasan lemon."] },
  { judul: "Shakshuka", cat: 5, menit: 25, level: "Mudah", porsi: 2,
    bahan: [{ n: "Telur", j: "4 butir" }, { n: "Tomat", j: "4 buah" }, { n: "Paprika", j: "1 buah" }, { n: "Bawang Bombay", j: "1 buah" }, { n: "Bawang Putih", j: "3 siung" }, { n: "Pasta Tomat", j: "2 sdm" }, { n: "Cabai Merah", j: "1 buah", o: true }],
    langkah: ["Tumis bawang bombay, bawang putih, dan paprika.", "Masukkan tomat dan pasta tomat.", "Masak hingga jadi saus kental.", "Buat lubang, pecahkan telur di atasnya.", "Tutup wajan, masak hingga telur set."] },
  { judul: "Tacos", cat: 5, menit: 30, level: "Mudah", porsi: 3,
    bahan: [{ n: "Kulit Tortilla", j: "6 lembar" }, { n: "Daging Cincang", j: "250 gram" }, { n: "Selada", j: "5 lembar" }, { n: "Tomat", j: "2 buah" }, { n: "Keju Cheddar", j: "50 gram" }, { n: "Bawang Bombay", j: "1/2 buah" }, { n: "Saus Sambal", j: "secukupnya" }],
    langkah: ["Tumis daging cincang dengan bawang dan bumbu.", "Hangatkan kulit tortilla.", "Iris selada, tomat, dan keju.", "Isi tortilla dengan daging dan sayuran.", "Beri saus, lipat, sajikan."] },
  { judul: "Pho", cat: 5, menit: 60, level: "Sulit", porsi: 3,
    bahan: [{ n: "Daging Sapi", j: "300 gram" }, { n: "Bihun", j: "200 gram" }, { n: "Bawang Bombay", j: "1 buah" }, { n: "Jahe", j: "3 cm" }, { n: "Kayu Manis", j: "1 batang" }, { n: "Tauge", j: "100 gram" }, { n: "Daun Kemangi", j: "1 ikat" }, { n: "Daun Bawang", j: "1 batang" }],
    langkah: ["Rebus tulang/daging dengan jahe dan kayu manis jadi kaldu.", "Masak hingga kaldu bening dan harum.", "Seduh bihun.", "Iris tipis daging sapi.", "Tata bihun dan daging, siram kaldu panas, beri tauge dan kemangi."] },
  { judul: "Gyoza", cat: 5, menit: 40, level: "Sedang", porsi: 3,
    bahan: [{ n: "Kulit Pangsit", j: "20 lembar" }, { n: "Daging Cincang", j: "200 gram" }, { n: "Kol", j: "100 gram" }, { n: "Daun Bawang", j: "1 batang" }, { n: "Bawang Putih", j: "2 siung" }, { n: "Jahe", j: "1 cm" }, { n: "Kecap Asin", j: "1 sdm" }],
    langkah: ["Campur daging, kol cincang, dan bumbu.", "Beri isian di tengah kulit pangsit.", "Lipat dan rekatkan pinggirnya.", "Panggang dasar gyoza di teflon.", "Beri sedikit air, tutup hingga matang."] },
  { judul: "Omurice", cat: 5, menit: 25, level: "Sedang", porsi: 2,
    bahan: [{ n: "Nasi Putih", j: "2 piring" }, { n: "Telur", j: "4 butir" }, { n: "Dada Ayam", j: "150 gram" }, { n: "Bawang Bombay", j: "1/2 buah" }, { n: "Saus Tomat", j: "4 sdm" }, { n: "Wortel", j: "1 buah" }, { n: "Mentega", j: "2 sdm" }],
    langkah: ["Tumis ayam, bombay, dan wortel.", "Masukkan nasi dan saus tomat, aduk rata.", "Buat dadar telur tipis.", "Bungkus nasi goreng dengan telur dadar.", "Beri saus tomat di atasnya, sajikan."] },
  { judul: "Mac and Cheese", cat: 5, menit: 30, level: "Mudah", porsi: 3,
    bahan: [{ n: "Makaroni", j: "250 gram" }, { n: "Keju Cheddar", j: "150 gram" }, { n: "Susu Cair", j: "300 ml" }, { n: "Mentega", j: "3 sdm" }, { n: "Tepung Terigu", j: "2 sdm" }, { n: "Lada Bubuk", j: "secukupnya" }],
    langkah: ["Rebus makaroni hingga matang.", "Lelehkan mentega, masukkan tepung.", "Tuang susu sambil diaduk hingga kental.", "Masukkan keju parut, aduk hingga leleh.", "Campur dengan makaroni, sajikan."] },
  { judul: "Caesar Salad", cat: 5, menit: 20, level: "Mudah", porsi: 2,
    bahan: [{ n: "Selada", j: "1 buah" }, { n: "Dada Ayam", j: "150 gram" }, { n: "Roti Tawar", j: "2 lembar" }, { n: "Keju Parmesan", j: "30 gram" }, { n: "Mayones", j: "3 sdm" }, { n: "Bawang Putih", j: "1 siung" }, { n: "Lemon", j: "1/2 buah" }],
    langkah: ["Panggang ayam, potong dadu.", "Potong roti jadi crouton, panggang.", "Buat dressing dari mayones, bawang putih, dan lemon.", "Campur selada dengan dressing.", "Beri ayam, crouton, dan parmesan."] },
  { judul: "Tonkatsu", cat: 5, menit: 30, level: "Sedang", porsi: 2,
    bahan: [{ n: "Daging Sapi", j: "250 gram" }, { n: "Tepung Terigu", j: "100 gram" }, { n: "Telur", j: "1 butir" }, { n: "Tepung Panir", j: "150 gram" }, { n: "Kol", j: "100 gram" }, { n: "Saus Tomat", j: "3 sdm" }],
    langkah: ["Pipihkan daging, beri garam dan lada.", "Balur tepung, celup telur, lalu tepung panir.", "Goreng dalam minyak panas hingga keemasan.", "Iris halus kol sebagai pelengkap.", "Potong daging, sajikan dengan saus."] },
  { judul: "Beef Teriyaki", cat: 5, menit: 25, level: "Mudah", porsi: 2,
    bahan: [{ n: "Daging Sapi", j: "300 gram" }, { n: "Saus Teriyaki", j: "4 sdm" }, { n: "Bawang Bombay", j: "1 buah" }, { n: "Bawang Putih", j: "2 siung" }, { n: "Wijen", j: "1 sdt" }, { n: "Daun Bawang", j: "1 batang" }],
    langkah: ["Iris tipis daging sapi.", "Tumis bawang putih dan bombay.", "Masukkan daging, masak hingga berubah warna.", "Tuang saus teriyaki, masak hingga meresap.", "Taburi wijen dan daun bawang, sajikan."] },
  { judul: "Katsudon", cat: 5, menit: 30, level: "Sedang", porsi: 2,
    bahan: [{ n: "Dada Ayam", j: "200 gram" }, { n: "Nasi Putih", j: "2 piring" }, { n: "Telur", j: "3 butir" }, { n: "Tepung Panir", j: "100 gram" }, { n: "Bawang Bombay", j: "1/2 buah" }, { n: "Kecap Asin", j: "3 sdm" }, { n: "Gula Pasir", j: "1 sdm" }],
    langkah: ["Balur ayam dengan tepung panir, goreng jadi katsu.", "Didihkan kecap asin, gula, dan air dengan bombay.", "Masukkan katsu yang sudah dipotong.", "Tuang kocokan telur, masak hingga set.", "Sajikan di atas nasi panas."] },
];

// ====================== ULASAN (contoh) ======================
const namaPool = [
  "Sinta", "Budi Santoso", "Rara", "Dewi", "Agus", "Putri", "Eko", "Maya", "Rizki", "Wulan",
  "Fajar", "Indah", "Hendra", "Nadia", "Reza", "Tari", "Yoga", "Lia", "Dimas", "Ayu",
];
const komentarPool = [
  "Enak banget, langkah-langkahnya gampang diikuti!",
  "Rasanya pas, keluarga di rumah suka semua.",
  "Jadi resep andalan tiap masak. Mantap!",
  "Simpel tapi hasilnya juara.",
  "Bumbunya pas, nggak ribet bikinnya.",
  "",
  "Recommended buat pemula seperti aku.",
  "Anak-anak doyan, bakal bikin lagi.",
  "Tekstur dan rasanya pas banget di lidah.",
  "Auto laper lihat hasilnya, enak!",
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
  for (const c of categories) await prisma.category.create({ data: c });

  console.log("Menambah bahan...");
  const idByNama = new Map<string, number>();
  // Master bahan (urutan dijaga, staple ditandai)
  const seen = new Set<string>();
  for (const nama of INGREDIENTS) {
    if (seen.has(nama)) continue;
    seen.add(nama);
    const ing = await prisma.ingredient.create({
      data: { nama, staple: STAPLES.has(nama) },
    });
    idByNama.set(nama, ing.id);
  }

  // Pengaman: bahan yang dipakai resep tapi belum ada di master → buat otomatis (non-staple)
  async function ingId(nama: string): Promise<number> {
    if (idByNama.has(nama)) return idByNama.get(nama)!;
    const ing = await prisma.ingredient.create({ data: { nama, staple: STAPLES.has(nama) } });
    idByNama.set(nama, ing.id);
    console.warn("  (auto-create bahan) " + nama);
    return ing.id;
  }

  console.log("Menambah resep...");
  let nomor = 1;
  for (const r of recipes) {
    const imageUrl = IMG[r.judul];
    if (!imageUrl) {
      console.warn("LEWAT (tanpa gambar): " + r.judul);
      continue;
    }
    const bahanData = [];
    for (const b of r.bahan) {
      bahanData.push({
        ingredientId: await ingId(b.n),
        jumlah: b.j,
        optional: b.o ?? false,
      });
    }
    await prisma.recipe.create({
      data: {
        id: nomor++,
        judul: r.judul,
        deskripsi: deskripsi(r),
        imageUrl,
        categoryId: r.cat,
        waktuMasakMenit: r.menit,
        kesulitan: r.level,
        porsi: r.porsi,
        langkah: r.langkah,
        bahan: { create: bahanData },
      },
    });
  }

  console.log("Menambah ulasan contoh...");
  const hariMs = 86400000;
  const semuaResep = await prisma.recipe.findMany({ select: { id: true } });
  for (const rec of semuaResep) {
    const jumlah = 3 + ((rec.id * 5 + 1) % 5); // 3..7
    for (let j = 0; j < jumlah; j++) {
      await prisma.review.create({
        data: {
          recipeId: rec.id,
          deviceId: `seed-${rec.id}-${j}`,
          namaPenulis: namaPool[(rec.id * 3 + j) % namaPool.length],
          rating: ratingPattern[(rec.id + j) % ratingPattern.length],
          komentar: komentarPool[(rec.id + j) % komentarPool.length],
          createdAt: new Date(Date.now() - (j + 1) * 3 * hariMs),
        },
      });
    }
  }

  const totalBahan = await prisma.ingredient.count();
  const totalResep = await prisma.recipe.count();
  const totalUlasan = await prisma.review.count();
  console.log(
    `Selesai! ${categories.length} kategori, ${totalBahan} bahan, ${totalResep} resep, ${totalUlasan} ulasan.`
  );
}

// Deskripsi singkat otomatis bila tidak ditulis manual
function deskripsi(r: R): string {
  const cat = categories.find((c) => c.id === r.cat)?.nama ?? "";
  return `${r.judul} — hidangan ${cat.toLowerCase()} yang ${r.level.toLowerCase()} dibuat, siap dalam ${r.menit} menit untuk ${r.porsi} porsi.`;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
