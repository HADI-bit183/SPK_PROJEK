// ===== GLOBAL STATE =====
let LAPTOP_DATA = [];
let currentPage = 1;
const PAGE_SIZE = 15;
let filteredData = [];
let selectedUse = 'kuliah';
let budget = 10000000;
let priorities = {harga:5, ram:3, cpu:3, storage:2, berat:2, layar:1};
let chartsInitialized = false;

// ===== LOAD DATA =====
// Data embedded inline (no server needed)
(function() {
  const data = [{"merek": "HP", "tipe": "ProBook 450 SE", "ram": 4.0, "storage": 256.0, "cpu": 1.1, "harga": 9900000.0, "berat": 1.41, "layar": 14.0, "saw": 0.5442, "rank_saw": 34, "topsis": 0.2024, "rank_topsis": 77, "skor": 0.3692, "rank": 49}, {"merek": "Advan", "tipe": "Soulmate 15G2", "ram": 16.0, "storage": 128.0, "cpu": 1.1, "harga": 10900000.0, "berat": 1.27, "layar": 14.0, "saw": 0.5338, "rank_saw": 46, "topsis": 0.2399, "rank_topsis": 55, "skor": 0.3795, "rank": 46}, {"merek": "Lenovo", "tipe": "ThinkPad E14", "ram": 32.0, "storage": 64.0, "cpu": 1.1, "harga": 11000000.0, "berat": 1.39, "layar": 14.0, "saw": 0.5544, "rank_saw": 22, "topsis": 0.4077, "rank_topsis": 11, "skor": 0.5663, "rank": 8}, {"merek": "Xiaomi", "tipe": "Mi Notebook Pro 14", "ram": 8.0, "storage": 64.0, "cpu": 3.0, "harga": 12100000.0, "berat": 1.22, "layar": 14.0, "saw": 0.594, "rank_saw": 7, "topsis": 0.2802, "rank_topsis": 27, "skor": 0.5408, "rank": 15}, {"merek": "Infinix", "tipe": "INBook X2 Ultra", "ram": 8.0, "storage": 256.0, "cpu": 1.1, "harga": 14700000.0, "berat": 2.13, "layar": 16.0, "saw": 0.4476, "rank_saw": 109, "topsis": 0.1424, "rank_topsis": 105, "skor": 0.1141, "rank": 110}, {"merek": "Infinix", "tipe": "INBook X1 Neo", "ram": 16.0, "storage": 128.0, "cpu": 1.6, "harga": 13600000.0, "berat": 1.37, "layar": 14.0, "saw": 0.5107, "rank_saw": 74, "topsis": 0.2249, "rank_topsis": 66, "skor": 0.3177, "rank": 72}, {"merek": "Axioo", "tipe": "MyBook 14 Pro", "ram": 16.0, "storage": 256.0, "cpu": 1.1, "harga": 13800000.0, "berat": 1.74, "layar": 15.6, "saw": 0.4943, "rank_saw": 84, "topsis": 0.2277, "rank_topsis": 64, "skor": 0.2855, "rank": 80}, {"merek": "Axioo", "tipe": "MyBook 14 Pro", "ram": 16.0, "storage": 512.0, "cpu": 1.1, "harga": 14500000.0, "berat": 1.69, "layar": 15.6, "saw": 0.5498, "rank_saw": 30, "topsis": 0.3178, "rank_topsis": 20, "skor": 0.4798, "rank": 28}, {"merek": "Infinix", "tipe": "INBook X2 Plus", "ram": 8.0, "storage": 64.0, "cpu": 1.1, "harga": 8300000.0, "berat": 1.91, "layar": 15.6, "saw": 0.5421, "rank_saw": 35, "topsis": 0.2008, "rank_topsis": 79, "skor": 0.3635, "rank": 54}, {"merek": "Acer", "tipe": "Aspire 7 A715", "ram": 16.0, "storage": 256.0, "cpu": 1.2, "harga": 14900000.0, "berat": 1.38, "layar": 14.0, "saw": 0.4996, "rank_saw": 81, "topsis": 0.2356, "rank_topsis": 58, "skor": 0.3035, "rank": 76}, {"merek": "Huawei", "tipe": "MateBook D15 G", "ram": 32.0, "storage": 64.0, "cpu": 1.1, "harga": 11400000.0, "berat": 1.33, "layar": 14.0, "saw": 0.5502, "rank_saw": 28, "topsis": 0.406, "rank_topsis": 12, "skor": 0.5559, "rank": 14}, {"merek": "HP", "tipe": "ProBook 450", "ram": 16.0, "storage": 64.0, "cpu": 1.1, "harga": 9300000.0, "berat": 1.78, "layar": 15.6, "saw": 0.5367, "rank_saw": 42, "topsis": 0.2429, "rank_topsis": 52, "skor": 0.3881, "rank": 43}, {"merek": "Samsung", "tipe": "Galaxy Book3 360", "ram": 8.0, "storage": 64.0, "cpu": 1.2, "harga": 12800000.0, "berat": 1.84, "layar": 15.6, "saw": 0.441, "rank_saw": 112, "topsis": 0.1109, "rank_topsis": 115, "skor": 0.0732, "rank": 114}, {"merek": "Advan", "tipe": "Soulmate 14 G2 i7", "ram": 8.0, "storage": 256.0, "cpu": 2.6, "harga": 14000000.0, "berat": 1.56, "layar": 14.0, "saw": 0.5644, "rank_saw": 16, "topsis": 0.2556, "rank_topsis": 44, "skor": 0.4574, "rank": 30}, {"merek": "Huawei", "tipe": "MateBook X Pro", "ram": 4.0, "storage": 512.0, "cpu": 1.1, "harga": 14600000.0, "berat": 1.63, "layar": 15.6, "saw": 0.5162, "rank_saw": 66, "topsis": 0.2553, "rank_topsis": 45, "skor": 0.3553, "rank": 57}, {"merek": "Samsung", "tipe": "Galaxy Book3 Pro E", "ram": 32.0, "storage": 64.0, "cpu": 3.0, "harga": 13900000.0, "berat": 1.33, "layar": 14.0, "saw": 0.628, "rank_saw": 2, "topsis": 0.4684, "rank_topsis": 3, "skor": 0.7735, "rank": 3}, {"merek": "Xiaomi", "tipe": "RedmiBook Pro 14", "ram": 8.0, "storage": 512.0, "cpu": 1.1, "harga": 15000000.0, "berat": 1.86, "layar": 15.6, "saw": 0.5137, "rank_saw": 69, "topsis": 0.2652, "rank_topsis": 37, "skor": 0.3584, "rank": 55}, {"merek": "Realme", "tipe": "Book Slim", "ram": 8.0, "storage": 512.0, "cpu": 1.1, "harga": 14900000.0, "berat": 1.79, "layar": 15.6, "saw": 0.5175, "rank_saw": 63, "topsis": 0.2663, "rank_topsis": 34, "skor": 0.3675, "rank": 51}, {"merek": "Xiaomi", "tipe": "RedmiBook Pro 14", "ram": 16.0, "storage": 64.0, "cpu": 1.1, "harga": 10800000.0, "berat": 1.88, "layar": 15.6, "saw": 0.4943, "rank_saw": 85, "topsis": 0.2176, "rank_topsis": 70, "skor": 0.2768, "rank": 82}, {"merek": "Advan", "tipe": "WorkPro 14 Series", "ram": 4.0, "storage": 64.0, "cpu": 1.1, "harga": 12500000.0, "berat": 2.36, "layar": 17.3, "saw": 0.4191, "rank_saw": 117, "topsis": 0.0793, "rank_topsis": 117, "skor": 0.0, "rank": 117}, {"merek": "Advan", "tipe": "Soulmate 14 G2 i7", "ram": 32.0, "storage": 256.0, "cpu": 1.6, "harga": 15000000.0, "berat": 1.53, "layar": 14.0, "saw": 0.5614, "rank_saw": 19, "topsis": 0.4315, "rank_topsis": 4, "skor": 0.6014, "rank": 5}, {"merek": "Xiaomi", "tipe": "RedmiBook Pro 14 SE", "ram": 16.0, "storage": 128.0, "cpu": 1.1, "harga": 9600000.0, "berat": 1.32, "layar": 14.0, "saw": 0.5623, "rank_saw": 17, "topsis": 0.256, "rank_topsis": 43, "skor": 0.4533, "rank": 32}, {"merek": "Realme", "tipe": "Book Slim Max", "ram": 8.0, "storage": 512.0, "cpu": 1.1, "harga": 14800000.0, "berat": 1.98, "layar": 15.6, "saw": 0.5119, "rank_saw": 72, "topsis": 0.264, "rank_topsis": 38, "skor": 0.3538, "rank": 61}, {"merek": "Huawei", "tipe": "MateBook 14 i7", "ram": 16.0, "storage": 512.0, "cpu": 1.1, "harga": 14800000.0, "berat": 1.43, "layar": 14.0, "saw": 0.5539, "rank_saw": 24, "topsis": 0.3211, "rank_topsis": 19, "skor": 0.4911, "rank": 25}, {"merek": "Infinix", "tipe": "INBook X2", "ram": 4.0, "storage": 256.0, "cpu": 1.1, "harga": 12400000.0, "berat": 1.94, "layar": 15.6, "saw": 0.4729, "rank_saw": 98, "topsis": 0.1504, "rank_topsis": 100, "skor": 0.1744, "rank": 99}, {"merek": "Xiaomi", "tipe": "Mi Notebook Air 13", "ram": 16.0, "storage": 256.0, "cpu": 1.2, "harga": 14600000.0, "berat": 1.95, "layar": 15.6, "saw": 0.4825, "rank_saw": 90, "topsis": 0.2209, "rank_topsis": 69, "skor": 0.2548, "rank": 88}, {"merek": "Dell", "tipe": "G16 Gaming Ultra", "ram": 8.0, "storage": 64.0, "cpu": 1.1, "harga": 14000000.0, "berat": 1.0, "layar": 13.4, "saw": 0.4665, "rank_saw": 101, "topsis": 0.1488, "rank_topsis": 102, "skor": 0.1594, "rank": 102}, {"merek": "Infinix", "tipe": "INBook X2 Plus", "ram": 8.0, "storage": 64.0, "cpu": 1.6, "harga": 12200000.0, "berat": 1.42, "layar": 14.0, "saw": 0.4903, "rank_saw": 88, "topsis": 0.1593, "rank_topsis": 96, "skor": 0.2186, "rank": 93}, {"merek": "Xiaomi", "tipe": "Mi Notebook Pro 14", "ram": 16.0, "storage": 256.0, "cpu": 1.1, "harga": 10400000.0, "berat": 1.43, "layar": 14.0, "saw": 0.5655, "rank_saw": 15, "topsis": 0.2676, "rank_topsis": 33, "skor": 0.47, "rank": 29}, {"merek": "LG", "tipe": "Gram 17", "ram": 32.0, "storage": 64.0, "cpu": 1.6, "harga": 12400000.0, "berat": 1.39, "layar": 14.0, "saw": 0.5591, "rank_saw": 20, "topsis": 0.4149, "rank_topsis": 7, "skor": 0.5822, "rank": 7}, {"merek": "Realme", "tipe": "Book Slim", "ram": 8.0, "storage": 64.0, "cpu": 1.1, "harga": 9400000.0, "berat": 1.34, "layar": 14.0, "saw": 0.5276, "rank_saw": 51, "topsis": 0.1947, "rank_topsis": 83, "skor": 0.3276, "rank": 69}, {"merek": "HP", "tipe": "Laptop 15s", "ram": 8.0, "storage": 512.0, "cpu": 1.1, "harga": 14900000.0, "berat": 1.6, "layar": 14.0, "saw": 0.52, "rank_saw": 62, "topsis": 0.2693, "rank_topsis": 31, "skor": 0.3753, "rank": 48}, {"merek": "MSI", "tipe": "Modern 15 G", "ram": 16.0, "storage": 128.0, "cpu": 1.1, "harga": 11700000.0, "berat": 1.53, "layar": 14.0, "saw": 0.5008, "rank_saw": 79, "topsis": 0.2213, "rank_topsis": 68, "skor": 0.2939, "rank": 77}, {"merek": "LG", "tipe": "Gram 16", "ram": 32.0, "storage": 128.0, "cpu": 1.1, "harga": 12600000.0, "berat": 1.22, "layar": 14.0, "saw": 0.5526, "rank_saw": 25, "topsis": 0.4092, "rank_topsis": 9, "skor": 0.5638, "rank": 9}, {"merek": "Infinix", "tipe": "INBook X2 Plus", "ram": 16.0, "storage": 64.0, "cpu": 1.1, "harga": 9900000.0, "berat": 1.98, "layar": 15.6, "saw": 0.5127, "rank_saw": 70, "topsis": 0.2294, "rank_topsis": 61, "skor": 0.3259, "rank": 70}, {"merek": "HP", "tipe": "HP 255 G9 i5", "ram": 16.0, "storage": 256.0, "cpu": 1.1, "harga": 13800000.0, "berat": 1.71, "layar": 15.6, "saw": 0.4955, "rank_saw": 83, "topsis": 0.2285, "rank_topsis": 63, "skor": 0.2888, "rank": 79}, {"merek": "Lenovo", "tipe": "IdeaPad Flex 5 Ultra", "ram": 16.0, "storage": 64.0, "cpu": 1.1, "harga": 10600000.0, "berat": 1.33, "layar": 14.0, "saw": 0.5205, "rank_saw": 61, "topsis": 0.2356, "rank_topsis": 59, "skor": 0.3476, "rank": 63}, {"merek": "Realme", "tipe": "Book Prime", "ram": 8.0, "storage": 256.0, "cpu": 1.6, "harga": 13900000.0, "berat": 1.55, "layar": 14.0, "saw": 0.5038, "rank_saw": 78, "topsis": 0.1808, "rank_topsis": 91, "skor": 0.2655, "rank": 84}, {"merek": "Huawei", "tipe": "MateBook D15 Pro", "ram": 32.0, "storage": 64.0, "cpu": 1.1, "harga": 11100000.0, "berat": 1.71, "layar": 15.6, "saw": 0.5413, "rank_saw": 36, "topsis": 0.4024, "rank_topsis": 14, "skor": 0.5339, "rank": 17}, {"merek": "Acer", "tipe": "Swift 3 Ultra", "ram": 16.0, "storage": 128.0, "cpu": 1.1, "harga": 12400000.0, "berat": 1.98, "layar": 15.6, "saw": 0.4755, "rank_saw": 95, "topsis": 0.2009, "rank_topsis": 78, "skor": 0.2231, "rank": 92}, {"merek": "Axioo", "tipe": "MyBook Hype S X", "ram": 8.0, "storage": 64.0, "cpu": 1.1, "harga": 11400000.0, "berat": 1.93, "layar": 16.0, "saw": 0.4579, "rank_saw": 104, "topsis": 0.1337, "rank_topsis": 109, "skor": 0.1284, "rank": 107}, {"merek": "Infinix", "tipe": "INBook X2", "ram": 4.0, "storage": 256.0, "cpu": 1.1, "harga": 10400000.0, "berat": 1.46, "layar": 14.0, "saw": 0.5286, "rank_saw": 50, "topsis": 0.1932, "rank_topsis": 84, "skor": 0.3284, "rank": 68}, {"merek": "Samsung", "tipe": "Galaxy Book3 Pro i7", "ram": 8.0, "storage": 256.0, "cpu": 1.1, "harga": 12100000.0, "berat": 1.66, "layar": 15.6, "saw": 0.5007, "rank_saw": 80, "topsis": 0.1777, "rank_topsis": 93, "skor": 0.2563, "rank": 87}, {"merek": "Asus", "tipe": "VivoBook 15", "ram": 8.0, "storage": 256.0, "cpu": 1.1, "harga": 10400000.0, "berat": 1.74, "layar": 15.6, "saw": 0.5323, "rank_saw": 47, "topsis": 0.1998, "rank_topsis": 80, "skor": 0.3419, "rank": 64}, {"merek": "Axioo", "tipe": "MyBook 14 Pro", "ram": 32.0, "storage": 64.0, "cpu": 1.1, "harga": 12000000.0, "berat": 1.64, "layar": 15.6, "saw": 0.5268, "rank_saw": 53, "topsis": 0.3975, "rank_topsis": 15, "skor": 0.4993, "rank": 24}, {"merek": "Dell", "tipe": "Latitude 5530 Ultra", "ram": 32.0, "storage": 64.0, "cpu": 1.1, "harga": 11300000.0, "berat": 1.56, "layar": 14.0, "saw": 0.5384, "rank_saw": 41, "topsis": 0.403, "rank_topsis": 13, "skor": 0.5284, "rank": 19}, {"merek": "Acer", "tipe": "TravelMate P2", "ram": 8.0, "storage": 64.0, "cpu": 1.1, "harga": 9600000.0, "berat": 1.99, "layar": 16.0, "saw": 0.4986, "rank_saw": 82, "topsis": 0.1715, "rank_topsis": 95, "skor": 0.2467, "rank": 89}, {"merek": "Samsung", "tipe": "Galaxy Book3 360", "ram": 8.0, "storage": 512.0, "cpu": 1.1, "harga": 14600000.0, "berat": 1.66, "layar": 15.6, "saw": 0.5265, "rank_saw": 54, "topsis": 0.2691, "rank_topsis": 32, "skor": 0.3889, "rank": 42}, {"merek": "Huawei", "tipe": "MateBook X Pro Max", "ram": 4.0, "storage": 512.0, "cpu": 1.1, "harga": 14500000.0, "berat": 1.56, "layar": 14.0, "saw": 0.5151, "rank_saw": 67, "topsis": 0.2566, "rank_topsis": 42, "skor": 0.354, "rank": 60}, {"merek": "Realme", "tipe": "Book Slim", "ram": 4.0, "storage": 256.0, "cpu": 1.1, "harga": 14200000.0, "berat": 2.19, "layar": 16.0, "saw": 0.4405, "rank_saw": 113, "topsis": 0.1274, "rank_topsis": 110, "skor": 0.0863, "rank": 112}, {"merek": "LG", "tipe": "Gram 17", "ram": 16.0, "storage": 128.0, "cpu": 2.3, "harga": 14300000.0, "berat": 1.65, "layar": 15.6, "saw": 0.5354, "rank_saw": 45, "topsis": 0.2607, "rank_topsis": 40, "skor": 0.4004, "rank": 41}, {"merek": "Dell", "tipe": "XPS 15 SE", "ram": 8.0, "storage": 256.0, "cpu": 1.1, "harga": 10300000.0, "berat": 1.58, "layar": 14.0, "saw": 0.5362, "rank_saw": 43, "topsis": 0.2056, "rank_topsis": 75, "skor": 0.3551, "rank": 58}, {"merek": "Asus", "tipe": "TUF Gaming F15 Max", "ram": 32.0, "storage": 64.0, "cpu": 1.1, "harga": 9500000.0, "berat": 1.28, "layar": 14.0, "saw": 0.5994, "rank_saw": 6, "topsis": 0.42, "rank_topsis": 5, "skor": 0.6717, "rank": 4}, {"merek": "Acer", "tipe": "Swift Go 14 i7", "ram": 8.0, "storage": 512.0, "cpu": 1.1, "harga": 14900000.0, "berat": 1.28, "layar": 14.0, "saw": 0.5395, "rank_saw": 39, "topsis": 0.2755, "rank_topsis": 30, "skor": 0.4218, "rank": 36}, {"merek": "MSI", "tipe": "GF63 Thin E", "ram": 16.0, "storage": 64.0, "cpu": 1.2, "harga": 12800000.0, "berat": 1.23, "layar": 14.0, "saw": 0.4923, "rank_saw": 87, "topsis": 0.216, "rank_topsis": 71, "skor": 0.2715, "rank": 83}, {"merek": "Huawei", "tipe": "MateBook D15", "ram": 32.0, "storage": 128.0, "cpu": 1.1, "harga": 12400000.0, "berat": 1.28, "layar": 14.0, "saw": 0.5512, "rank_saw": 26, "topsis": 0.4094, "rank_topsis": 8, "skor": 0.5608, "rank": 10}, {"merek": "Lenovo", "tipe": "IdeaPad Gaming 3", "ram": 16.0, "storage": 256.0, "cpu": 1.6, "harga": 14800000.0, "berat": 1.29, "layar": 14.0, "saw": 0.5321, "rank_saw": 48, "topsis": 0.2518, "rank_topsis": 47, "skor": 0.3859, "rank": 44}, {"merek": "Dell", "tipe": "Latitude 5530", "ram": 8.0, "storage": 512.0, "cpu": 1.1, "harga": 14700000.0, "berat": 2.0, "layar": 15.6, "saw": 0.5125, "rank_saw": 71, "topsis": 0.2639, "rank_topsis": 39, "skor": 0.3549, "rank": 59}, {"merek": "HP", "tipe": "EliteBook 850", "ram": 16.0, "storage": 256.0, "cpu": 2.6, "harga": 14300000.0, "berat": 1.97, "layar": 15.6, "saw": 0.5731, "rank_saw": 11, "topsis": 0.3028, "rank_topsis": 23, "skor": 0.516, "rank": 22}, {"merek": "Huawei", "tipe": "MateBook D14", "ram": 8.0, "storage": 64.0, "cpu": 2.6, "harga": 12100000.0, "berat": 1.41, "layar": 14.0, "saw": 0.5552, "rank_saw": 21, "topsis": 0.2421, "rank_topsis": 53, "skor": 0.4263, "rank": 35}, {"merek": "Xiaomi", "tipe": "Mi Notebook Pro 14", "ram": 8.0, "storage": 64.0, "cpu": 1.1, "harga": 11900000.0, "berat": 2.2, "layar": 16.0, "saw": 0.4404, "rank_saw": 114, "topsis": 0.1147, "rank_topsis": 113, "skor": 0.0753, "rank": 113}, {"merek": "Acer", "tipe": "Spin 514 Ultra", "ram": 8.0, "storage": 256.0, "cpu": 1.1, "harga": 11600000.0, "berat": 1.63, "layar": 15.6, "saw": 0.5113, "rank_saw": 73, "topsis": 0.1852, "rank_topsis": 88, "skor": 0.2852, "rank": 81}, {"merek": "Samsung", "tipe": "Galaxy Book Go", "ram": 8.0, "storage": 128.0, "cpu": 1.6, "harga": 14400000.0, "berat": 1.93, "layar": 16.0, "saw": 0.4574, "rank_saw": 106, "topsis": 0.1208, "rank_topsis": 111, "skor": 0.1163, "rank": 109}, {"merek": "Infinix", "tipe": "INBook X1 Neo", "ram": 32.0, "storage": 256.0, "cpu": 1.1, "harga": 12900000.0, "berat": 1.99, "layar": 15.6, "saw": 0.5452, "rank_saw": 33, "topsis": 0.4187, "rank_topsis": 6, "skor": 0.5563, "rank": 12}, {"merek": "Realme", "tipe": "Book Prime", "ram": 4.0, "storage": 64.0, "cpu": 1.1, "harga": 9000000.0, "berat": 1.44, "layar": 14.0, "saw": 0.5217, "rank_saw": 60, "topsis": 0.1852, "rank_topsis": 89, "skor": 0.307, "rank": 75}, {"merek": "Dell", "tipe": "Inspiron 15 3511 i7", "ram": 64.0, "storage": 128.0, "cpu": 1.1, "harga": 14000000.0, "berat": 1.56, "layar": 14.0, "saw": 0.6035, "rank_saw": 4, "topsis": 0.6644, "rank_topsis": 1, "skor": 0.8892, "rank": 1}, {"merek": "LG", "tipe": "Gram 14 X", "ram": 4.0, "storage": 256.0, "cpu": 1.1, "harga": 11200000.0, "berat": 1.29, "layar": 14.0, "saw": 0.522, "rank_saw": 58, "topsis": 0.1879, "rank_topsis": 86, "skor": 0.3101, "rank": 74}, {"merek": "Advan", "tipe": "WorkPro 14 Series i3", "ram": 8.0, "storage": 64.0, "cpu": 1.6, "harga": 11800000.0, "berat": 1.88, "layar": 15.6, "saw": 0.4817, "rank_saw": 91, "topsis": 0.1468, "rank_topsis": 103, "skor": 0.1898, "rank": 94}, {"merek": "Infinix", "tipe": "INBook X2 Plus", "ram": 4.0, "storage": 128.0, "cpu": 1.1, "harga": 14800000.0, "berat": 1.32, "layar": 13.3, "saw": 0.4297, "rank_saw": 115, "topsis": 0.1145, "rank_topsis": 114, "skor": 0.0526, "rank": 115}, {"merek": "HP", "tipe": "Spectre x360 Pro", "ram": 32.0, "storage": 64.0, "cpu": 3.0, "harga": 12300000.0, "berat": 1.28, "layar": 14.0, "saw": 0.656, "rank_saw": 1, "topsis": 0.4778, "rank_topsis": 2, "skor": 0.8405, "rank": 2}, {"merek": "Lenovo", "tipe": "ThinkBook 14 X", "ram": 16.0, "storage": 64.0, "cpu": 1.1, "harga": 13200000.0, "berat": 2.16, "layar": 16.0, "saw": 0.4434, "rank_saw": 111, "topsis": 0.1825, "rank_topsis": 90, "skor": 0.1395, "rank": 105}, {"merek": "Huawei", "tipe": "MateBook X Pro", "ram": 8.0, "storage": 64.0, "cpu": 1.1, "harga": 10800000.0, "berat": 1.94, "layar": 15.6, "saw": 0.4688, "rank_saw": 100, "topsis": 0.1462, "rank_topsis": 104, "skor": 0.1621, "rank": 101}, {"merek": "LG", "tipe": "Gram 14", "ram": 8.0, "storage": 64.0, "cpu": 3.0, "harga": 14300000.0, "berat": 2.19, "layar": 16.0, "saw": 0.5228, "rank_saw": 56, "topsis": 0.2541, "rank_topsis": 46, "skor": 0.3683, "rank": 50}, {"merek": "LG", "tipe": "Gram 15", "ram": 16.0, "storage": 512.0, "cpu": 1.1, "harga": 14700000.0, "berat": 1.89, "layar": 15.6, "saw": 0.5396, "rank_saw": 38, "topsis": 0.3144, "rank_topsis": 21, "skor": 0.4552, "rank": 31}, {"merek": "LG", "tipe": "Gram 16", "ram": 8.0, "storage": 128.0, "cpu": 3.0, "harga": 13200000.0, "berat": 1.25, "layar": 14.0, "saw": 0.5893, "rank_saw": 8, "topsis": 0.2786, "rank_topsis": 28, "skor": 0.5295, "rank": 18}, {"merek": "HP", "tipe": "Pavilion 15 Max", "ram": 32.0, "storage": 128.0, "cpu": 1.1, "harga": 11000000.0, "berat": 1.94, "layar": 15.6, "saw": 0.5503, "rank_saw": 27, "topsis": 0.4089, "rank_topsis": 10, "skor": 0.5587, "rank": 11}, {"merek": "Huawei", "tipe": "MateBook D14 i7", "ram": 8.0, "storage": 64.0, "cpu": 1.1, "harga": 10600000.0, "berat": 1.93, "layar": 16.0, "saw": 0.4751, "rank_saw": 96, "topsis": 0.1511, "rank_topsis": 99, "skor": 0.1795, "rank": 97}, {"merek": "Lenovo", "tipe": "ThinkPad E15", "ram": 4.0, "storage": 64.0, "cpu": 1.1, "harga": 8800000.0, "berat": 1.81, "layar": 15.6, "saw": 0.5163, "rank_saw": 65, "topsis": 0.1789, "rank_topsis": 92, "skor": 0.2902, "rank": 78}, {"merek": "Dell", "tipe": "Latitude 5430 Max", "ram": 16.0, "storage": 256.0, "cpu": 1.6, "harga": 14900000.0, "berat": 1.68, "layar": 15.6, "saw": 0.5142, "rank_saw": 68, "topsis": 0.2401, "rank_topsis": 54, "skor": 0.3382, "rank": 65}, {"merek": "Lenovo", "tipe": "IdeaPad Slim 3 15 G", "ram": 8.0, "storage": 128.0, "cpu": 1.1, "harga": 10900000.0, "berat": 1.35, "layar": 14.0, "saw": 0.5046, "rank_saw": 76, "topsis": 0.1729, "rank_topsis": 94, "skor": 0.2604, "rank": 85}, {"merek": "Acer", "tipe": "Aspire 5 A515", "ram": 4.0, "storage": 64.0, "cpu": 1.1, "harga": 8400000.0, "berat": 1.5, "layar": 14.0, "saw": 0.5388, "rank_saw": 40, "topsis": 0.1949, "rank_topsis": 82, "skor": 0.3515, "rank": 62}, {"merek": "LG", "tipe": "Gram 15 Ultra", "ram": 16.0, "storage": 256.0, "cpu": 1.1, "harga": 14000000.0, "berat": 1.94, "layar": 15.6, "saw": 0.4842, "rank_saw": 89, "topsis": 0.2219, "rank_topsis": 67, "skor": 0.2593, "rank": 86}, {"merek": "Axioo", "tipe": "MyBook 14E", "ram": 4.0, "storage": 64.0, "cpu": 3.0, "harga": 11700000.0, "berat": 1.33, "layar": 14.0, "saw": 0.5811, "rank_saw": 10, "topsis": 0.2657, "rank_topsis": 35, "skor": 0.5012, "rank": 23}, {"merek": "Axioo", "tipe": "MyBook 14E", "ram": 8.0, "storage": 512.0, "cpu": 1.1, "harga": 14500000.0, "berat": 1.93, "layar": 15.6, "saw": 0.5172, "rank_saw": 64, "topsis": 0.2653, "rank_topsis": 36, "skor": 0.366, "rank": 53}, {"merek": "MSI", "tipe": "Katana GF66", "ram": 16.0, "storage": 128.0, "cpu": 1.2, "harga": 14900000.0, "berat": 1.92, "layar": 15.6, "saw": 0.4487, "rank_saw": 108, "topsis": 0.1868, "rank_topsis": 87, "skor": 0.1543, "rank": 104}, {"merek": "MSI", "tipe": "Vector GP66", "ram": 8.0, "storage": 64.0, "cpu": 2.3, "harga": 11000000.0, "berat": 1.35, "layar": 14.0, "saw": 0.5618, "rank_saw": 18, "topsis": 0.2291, "rank_topsis": 62, "skor": 0.4292, "rank": 33}, {"merek": "Dell", "tipe": "Latitude 5530 X", "ram": 8.0, "storage": 64.0, "cpu": 3.0, "harga": 11400000.0, "berat": 1.31, "layar": 14.0, "saw": 0.6001, "rank_saw": 5, "topsis": 0.283, "rank_topsis": 26, "skor": 0.5561, "rank": 13}, {"merek": "Axioo", "tipe": "MyBook 14L G", "ram": 8.0, "storage": 256.0, "cpu": 1.1, "harga": 11700000.0, "berat": 1.23, "layar": 14.0, "saw": 0.5286, "rank_saw": 49, "topsis": 0.1985, "rank_topsis": 81, "skor": 0.333, "rank": 67}, {"merek": "Huawei", "tipe": "MateBook D15", "ram": 16.0, "storage": 128.0, "cpu": 2.3, "harga": 13500000.0, "berat": 1.2, "layar": 14.0, "saw": 0.5687, "rank_saw": 12, "topsis": 0.2762, "rank_topsis": 29, "skor": 0.4842, "rank": 27}, {"merek": "HP", "tipe": "ProBook 450", "ram": 8.0, "storage": 64.0, "cpu": 1.6, "harga": 14100000.0, "berat": 1.91, "layar": 16.0, "saw": 0.4463, "rank_saw": 110, "topsis": 0.115, "rank_topsis": 112, "skor": 0.0879, "rank": 111}, {"merek": "Samsung", "tipe": "Galaxy Book2 Pro", "ram": 16.0, "storage": 128.0, "cpu": 1.6, "harga": 12600000.0, "berat": 1.23, "layar": 14.0, "saw": 0.5362, "rank_saw": 44, "topsis": 0.2377, "rank_topsis": 57, "skor": 0.3825, "rank": 45}, {"merek": "Dell", "tipe": "G15 Gaming i3", "ram": 16.0, "storage": 256.0, "cpu": 1.6, "harga": 13600000.0, "berat": 1.27, "layar": 14.0, "saw": 0.5491, "rank_saw": 31, "topsis": 0.2575, "rank_topsis": 41, "skor": 0.4266, "rank": 34}, {"merek": "Acer", "tipe": "Spin 514", "ram": 8.0, "storage": 64.0, "cpu": 2.3, "harga": 11700000.0, "berat": 1.89, "layar": 15.6, "saw": 0.527, "rank_saw": 52, "topsis": 0.2076, "rank_topsis": 73, "skor": 0.3374, "rank": 66}, {"merek": "Asus", "tipe": "TUF Gaming A15 i5", "ram": 16.0, "storage": 512.0, "cpu": 1.1, "harga": 13600000.0, "berat": 1.47, "layar": 14.0, "saw": 0.567, "rank_saw": 14, "topsis": 0.3246, "rank_topsis": 18, "skor": 0.5217, "rank": 20}, {"merek": "Realme", "tipe": "Book Prime Plus", "ram": 16.0, "storage": 64.0, "cpu": 1.1, "harga": 11500000.0, "berat": 1.92, "layar": 16.0, "saw": 0.4797, "rank_saw": 93, "topsis": 0.2069, "rank_topsis": 74, "skor": 0.237, "rank": 90}, {"merek": "Acer", "tipe": "Swift 3", "ram": 8.0, "storage": 64.0, "cpu": 1.1, "harga": 10600000.0, "berat": 1.83, "layar": 16.0, "saw": 0.4786, "rank_saw": 94, "topsis": 0.1541, "rank_topsis": 98, "skor": 0.1896, "rank": 95}, {"merek": "Acer", "tipe": "Extensa 15", "ram": 16.0, "storage": 256.0, "cpu": 1.1, "harga": 11000000.0, "berat": 1.8, "layar": 15.6, "saw": 0.5397, "rank_saw": 37, "topsis": 0.2517, "rank_topsis": 48, "skor": 0.4019, "rank": 39}, {"merek": "Acer", "tipe": "ConceptD 3", "ram": 4.0, "storage": 256.0, "cpu": 2.6, "harga": 13700000.0, "berat": 1.74, "layar": 15.6, "saw": 0.5542, "rank_saw": 23, "topsis": 0.238, "rank_topsis": 56, "skor": 0.4209, "rank": 38}, {"merek": "Axioo", "tipe": "MyBook Hype S", "ram": 8.0, "storage": 64.0, "cpu": 1.1, "harga": 12700000.0, "berat": 2.54, "layar": 17.3, "saw": 0.4238, "rank_saw": 116, "topsis": 0.093, "rank_topsis": 116, "skor": 0.0216, "rank": 116}, {"merek": "MSI", "tipe": "Modern 15 i5", "ram": 16.0, "storage": 64.0, "cpu": 2.3, "harga": 14400000.0, "berat": 2.04, "layar": 16.0, "saw": 0.5054, "rank_saw": 75, "topsis": 0.2462, "rank_topsis": 49, "skor": 0.3249, "rank": 71}, {"merek": "Lenovo", "tipe": "IdeaPad Slim 3 15", "ram": 8.0, "storage": 256.0, "cpu": 3.0, "harga": 13500000.0, "berat": 1.86, "layar": 15.6, "saw": 0.5891, "rank_saw": 9, "topsis": 0.2858, "rank_topsis": 25, "skor": 0.5354, "rank": 16}, {"merek": "Axioo", "tipe": "MyBook 14E", "ram": 8.0, "storage": 256.0, "cpu": 1.1, "harga": 13400000.0, "berat": 2.16, "layar": 16.0, "saw": 0.4639, "rank_saw": 102, "topsis": 0.1495, "rank_topsis": 101, "skor": 0.1547, "rank": 103}, {"merek": "Huawei", "tipe": "MateBook X Pro", "ram": 16.0, "storage": 64.0, "cpu": 3.0, "harga": 14000000.0, "berat": 1.51, "layar": 14.0, "saw": 0.5686, "rank_saw": 13, "topsis": 0.3143, "rank_topsis": 22, "skor": 0.5165, "rank": 21}, {"merek": "HP", "tipe": "OMEN 16", "ram": 8.0, "storage": 128.0, "cpu": 1.1, "harga": 14500000.0, "berat": 1.21, "layar": 13.3, "saw": 0.4537, "rank_saw": 107, "topsis": 0.1388, "rank_topsis": 107, "skor": 0.1239, "rank": 108}, {"merek": "HP", "tipe": "EliteBook 850", "ram": 16.0, "storage": 256.0, "cpu": 1.1, "harga": 12600000.0, "berat": 1.38, "layar": 14.0, "saw": 0.5251, "rank_saw": 55, "topsis": 0.2462, "rank_topsis": 50, "skor": 0.3665, "rank": 52}, {"merek": "Advan", "tipe": "WorkPro 14 Series i3", "ram": 4.0, "storage": 128.0, "cpu": 2.6, "harga": 11700000.0, "berat": 1.88, "layar": 15.6, "saw": 0.55, "rank_saw": 29, "topsis": 0.2261, "rank_topsis": 65, "skor": 0.4017, "rank": 40}, {"merek": "Dell", "tipe": "XPS 13 i5", "ram": 32.0, "storage": 64.0, "cpu": 1.2, "harga": 14600000.0, "berat": 1.54, "layar": 14.0, "saw": 0.4938, "rank_saw": 86, "topsis": 0.3879, "rank_topsis": 17, "skor": 0.4213, "rank": 37}, {"merek": "Axioo", "tipe": "MyBook 14L i7", "ram": 8.0, "storage": 64.0, "cpu": 1.1, "harga": 11500000.0, "berat": 1.83, "layar": 16.0, "saw": 0.4595, "rank_saw": 103, "topsis": 0.1352, "rank_topsis": 108, "skor": 0.133, "rank": 106}, {"merek": "Infinix", "tipe": "INBook X2 Plus", "ram": 8.0, "storage": 256.0, "cpu": 1.1, "harga": 13400000.0, "berat": 1.95, "layar": 16.0, "saw": 0.4702, "rank_saw": 99, "topsis": 0.1546, "rank_topsis": 97, "skor": 0.1721, "rank": 100}, {"merek": "HP", "tipe": "OMEN 16 G", "ram": 4.0, "storage": 64.0, "cpu": 1.6, "harga": 11300000.0, "berat": 1.87, "layar": 15.6, "saw": 0.4801, "rank_saw": 92, "topsis": 0.1409, "rank_topsis": 106, "skor": 0.1814, "rank": 96}, {"merek": "Acer", "tipe": "Aspire 5 A515 E", "ram": 16.0, "storage": 256.0, "cpu": 1.1, "harga": 12100000.0, "berat": 1.59, "layar": 14.0, "saw": 0.5217, "rank_saw": 59, "topsis": 0.2445, "rank_topsis": 51, "skor": 0.3577, "rank": 56}, {"merek": "HP", "tipe": "ProBook 450", "ram": 16.0, "storage": 128.0, "cpu": 1.1, "harga": 14500000.0, "berat": 1.24, "layar": 13.4, "saw": 0.475, "rank_saw": 97, "topsis": 0.2102, "rank_topsis": 72, "skor": 0.2298, "rank": 91}, {"merek": "Lenovo", "tipe": "IdeaPad Gaming 3", "ram": 4.0, "storage": 256.0, "cpu": 1.1, "harga": 9600000.0, "berat": 1.49, "layar": 14.0, "saw": 0.5476, "rank_saw": 32, "topsis": 0.2047, "rank_topsis": 76, "skor": 0.3784, "rank": 47}, {"merek": "Realme", "tipe": "Book Prime", "ram": 16.0, "storage": 256.0, "cpu": 1.1, "harga": 12700000.0, "berat": 1.9, "layar": 15.6, "saw": 0.5045, "rank_saw": 77, "topsis": 0.2317, "rank_topsis": 60, "skor": 0.3105, "rank": 73}, {"merek": "LG", "tipe": "Gram 14 i7", "ram": 16.0, "storage": 64.0, "cpu": 1.1, "harga": 12500000.0, "berat": 2.04, "layar": 16.0, "saw": 0.4578, "rank_saw": 105, "topsis": 0.1919, "rank_topsis": 85, "skor": 0.178, "rank": 98}, {"merek": "Samsung", "tipe": "Galaxy Book Go Pro", "ram": 32.0, "storage": 64.0, "cpu": 1.1, "harga": 12000000.0, "berat": 1.75, "layar": 15.6, "saw": 0.5221, "rank_saw": 57, "topsis": 0.3959, "rank_topsis": 16, "skor": 0.4879, "rank": 26}, {"merek": "HP", "tipe": "Envy x360", "ram": 8.0, "storage": 256.0, "cpu": 3.0, "harga": 13900000.0, "berat": 1.27, "layar": 14.0, "saw": 0.609, "rank_saw": 3, "topsis": 0.2943, "rank_topsis": 24, "skor": 0.5846, "rank": 6}];
  LAPTOP_DATA = data;
  filteredData = [...LAPTOP_DATA].sort((a,b) => a.rank - b.rank);
  setTimeout(animateCounters, 500);
})();

// ===== iOS 26 PARTICLES WITH MOUSE INTERACTION =====
(function(){
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, mouse = {x: -999, y: -999};
  const COLORS = ['rgba(79,163,255,', 'rgba(191,127,255,', 'rgba(255,110,180,', 'rgba(64,224,208,', 'rgba(255,255,255,'];

  function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

  // Create layered particles: orbs + sparkles
  let orbs = Array.from({length: 12}, () => ({
    x: Math.random()*1200, y: Math.random()*800,
    vx: (Math.random()-0.5)*0.18, vy: (Math.random()-0.5)*0.18,
    r: Math.random()*60+30,
    color: COLORS[Math.floor(Math.random()*COLORS.length)],
    a: Math.random()*0.06+0.02,
    phase: Math.random()*Math.PI*2
  }));

  let sparks = Array.from({length: 80}, () => ({
    x: Math.random()*1200, y: Math.random()*800,
    vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4,
    r: Math.random()*1.5+0.5,
    color: COLORS[Math.floor(Math.random()*COLORS.length)],
    a: Math.random()*0.6+0.2,
    pulse: Math.random()*Math.PI*2,
    pulseSpeed: Math.random()*0.03+0.01
  }));

  let t = 0;
  function draw(){
    ctx.clearRect(0,0,W,H);
    t += 0.008;

    // Draw glowing orbs
    orbs.forEach(o => {
      o.x += o.vx; o.y += o.vy;
      if(o.x<-o.r) o.x=W+o.r; if(o.x>W+o.r) o.x=-o.r;
      if(o.y<-o.r) o.y=H+o.r; if(o.y>H+o.r) o.y=-o.r;
      const breathe = 1 + 0.15*Math.sin(t*0.8 + o.phase);
      const grad = ctx.createRadialGradient(o.x,o.y,0, o.x,o.y,o.r*breathe);
      grad.addColorStop(0, o.color+(o.a*2)+')');
      grad.addColorStop(1, o.color+'0)');
      ctx.beginPath(); ctx.arc(o.x, o.y, o.r*breathe, 0, Math.PI*2);
      ctx.fillStyle = grad; ctx.fill();
    });

    // Draw sparkles with mouse repulsion
    sparks.forEach(p => {
      p.pulse += p.pulseSpeed;
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const dist = Math.sqrt(dx*dx+dy*dy);
      if(dist < 120) {
        const force = (120-dist)/120 * 1.5;
        p.vx += dx/dist*force*0.08;
        p.vy += dy/dist*force*0.08;
      }
      p.vx *= 0.98; p.vy *= 0.98;
      p.x += p.vx; p.y += p.vy;
      if(p.x<0) p.x=W; if(p.x>W) p.x=0;
      if(p.y<0) p.y=H; if(p.y>H) p.y=0;

      const alpha = p.a * (0.5 + 0.5*Math.sin(p.pulse));
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = p.color+alpha+')';
      ctx.shadowBlur = 6; ctx.shadowColor = p.color+'0.8)';
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Soft connections between nearby sparks
    for(let i=0;i<sparks.length;i++) for(let j=i+1;j<sparks.length;j++){
      const dx=sparks[i].x-sparks[j].x, dy=sparks[i].y-sparks[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<80){
        ctx.beginPath();
        ctx.moveTo(sparks[i].x,sparks[i].y);
        ctx.lineTo(sparks[j].x,sparks[j].y);
        ctx.strokeStyle=`rgba(79,163,255,${(1-d/80)*0.12})`;
        ctx.lineWidth=0.5; ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ===== COUNTER UP =====
function animateCounters(){
  document.querySelectorAll('[data-target]').forEach(el=>{
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = target / 40;
    const timer = setInterval(()=>{
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + (el.dataset.suffix||'');
      if(current >= target) clearInterval(timer);
    }, 30);
  });
}

// ===== THEME =====
let isDark = true;
function toggleTheme(){
  isDark = !isDark;
  document.body.setAttribute('data-theme', isDark ? '' : 'light');
  document.getElementById('theme-btn').textContent = isDark ? '🌙' : '☀️';
}

// ===== NAVIGATION =====
function showSection(id){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(l=>{ if(l.getAttribute('onclick').includes(`'${id}'`)) l.classList.add('active'); });
  if(id==='dashboard' && !chartsInitialized){ initCharts(); chartsInitialized=true; }
  if(id==='ranking'){ if(LAPTOP_DATA.length>0){initRankingFilters(); renderTable();} else { setTimeout(()=>{initRankingFilters();renderTable();},500); } }
  if(id==='compare'){ if(LAPTOP_DATA.length>0){initCompare();} else { setTimeout(()=>{initCompare();},500); } }
  window.scrollTo(0,0);
}

// ===== WIZARD =====
function updateBudget(v){
  budget = parseInt(v);
  document.getElementById('budget-display').textContent = 'Rp ' + budget.toLocaleString('id-ID');
}
function selectUse(el, use){
  selectedUse = use;
  document.querySelectorAll('#use-grid .radio-opt').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');
}
function nextPanel(n){
  document.querySelectorAll('.wizard-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('panel'+n).classList.add('active');
  ['wstep1','wstep2','wstep3'].forEach((id,i)=>{
    const el = document.getElementById(id);
    el.classList.remove('active','done');
    if(i+1 < n) el.classList.add('done');
    else if(i+1 === n) el.classList.add('active');
  });
  if(n===3) renderPrioritySliders();
}
function renderPrioritySliders(){
  const usePresets = {
    kuliah:     {harga:5,ram:3,cpu:3,storage:2,berat:2,layar:1},
    programming:{harga:4,ram:5,cpu:4,storage:2,berat:1,layar:1},
    desain:     {harga:3,ram:4,cpu:4,storage:4,berat:1,layar:1},
    video:      {harga:2,ram:4,cpu:4,storage:5,berat:1,layar:1},
    gaming:     {harga:3,ram:4,cpu:5,storage:3,berat:1,layar:1},
    general:    {harga:5,ram:2,cpu:2,storage:2,berat:2,layar:1},
  };
  priorities = {...usePresets[selectedUse]};
  const labels = {harga:'Harga Murah',ram:'RAM Besar',cpu:'CPU Cepat',storage:'Storage Besar',berat:'Ringan',layar:'Layar Besar'};
  const colors = {harga:'#f59e0b',ram:'#3b82f6',cpu:'#8b5cf6',storage:'#10b981',berat:'#f43f5e',layar:'#06b6d4'};
  const cont = document.getElementById('priority-sliders');
  cont.innerHTML = '';

  // FIX: build seluruh HTML dulu, baru set innerHTML sekali — supaya DOM tidak di-reset tiap iterasi
  const rows = Object.keys(priorities).map(k => {
    const v = priorities[k];
    const pct = (v/5)*100;
    return `<div class="pslider-row">
      <div class="pslider-label">${labels[k]}</div>
      <div style="flex:1">
        <input type="range" min="1" max="5" value="${v}" style="width:100%" data-key="${k}" data-color="${colors[k]}" class="prio-slider">
        <div style="height:4px;background:${colors[k]};border-radius:2px;width:${pct}%;margin-top:4px;transition:width 0.2s" id="pbar_${k}"></div>
      </div>
      <div class="pslider-val" id="pval_${k}">${v}/5</div>
    </div>`;
  });
  cont.innerHTML = rows.join('');

  // FIX: attach event listeners via JS, bukan inline oninput string — lebih reliable
  cont.querySelectorAll('.prio-slider').forEach(input => {
    input.addEventListener('input', function() {
      const key = this.dataset.key;
      const color = this.dataset.color;
      priorities[key] = parseInt(this.value);
      const bar = document.getElementById('pbar_' + key);
      if(bar){ bar.style.width = (priorities[key]/5*100)+'%'; bar.style.background = color; }
      const val = document.getElementById('pval_' + key);
      if(val) val.textContent = priorities[key] + '/5';
    });
  });
}
function updatePSlider(el, key, color){
  priorities[key] = parseInt(el.value);
  const bar = document.getElementById('pbar_'+key);
  if(bar){ bar.style.width = (priorities[key]/5*100)+'%'; bar.style.background = color; }
  const val = document.getElementById('pval_'+key);
  if(val) val.textContent = priorities[key]+'/5';
}

// ===== RECOMMENDATION ENGINE =====
function runRecommendation(){
  const loading = document.getElementById('loading-overlay');
  const results = document.getElementById('results-container');
  results.style.display='none';
  document.getElementById('top-result').innerHTML = '';
  document.getElementById('other-results').innerHTML = '';
  loading.classList.add('visible');

  const steps = [
    {text:'Memfilter laptop sesuai budget...', dur:600},
    {text:'Menghitung normalisasi SAW...', dur:800},
    {text:'Menghitung TOPSIS D+ dan D−...', dur:900},
    {text:'Menggabungkan dan meranking...', dur:700},
    {text:'Mempersiapkan penjelasan AI...', dur:500},
  ];
  let html = steps.map((s,i)=>`<div class="lstep" id="lstep${i}"><div class="lstep-dot"></div><div class="lstep-text">${s.text}</div></div>`).join('');
  document.getElementById('loading-steps').innerHTML = html;

  let delay = 0;
  steps.forEach((s,i)=>{
    setTimeout(()=>{ document.getElementById('lstep'+i).classList.add('active'); },delay);
    delay += s.dur;
    setTimeout(()=>{ const el=document.getElementById('lstep'+i); el.classList.remove('active'); el.classList.add('done'); },delay);
  });

  setTimeout(()=>{
    loading.classList.remove('visible');
    computeAndShowResults();
    results.style.display='block';
  }, delay + 300);
}

function computeAndShowResults(){
  // Filter by budget
  let data = LAPTOP_DATA.filter(l => l.harga <= budget);
  if(data.length===0) data = [...LAPTOP_DATA];

  // Recalculate with custom weights
  const total = Object.values(priorities).reduce((a,b)=>a+b,0);
  const w = {
    ram: priorities.ram/total,
    storage: priorities.storage/total,
    cpu: priorities.cpu/total,
    harga: priorities.harga/total,
    berat: priorities.berat/total,
    layar: priorities.layar/total,
  };

  const maxRam = Math.max(...data.map(l=>l.ram));
  const maxStorage = Math.max(...data.map(l=>l.storage));
  const maxCpu = Math.max(...data.map(l=>l.cpu));
  const minHarga = Math.min(...data.map(l=>l.harga));
  const minBerat = Math.min(...data.map(l=>l.berat));
  const maxLayar = Math.max(...data.map(l=>l.layar));

  const scored = data.map(l=>{
    const saw = (l.ram/maxRam)*w.ram + (l.storage/maxStorage)*w.storage + (l.cpu/maxCpu)*w.cpu +
                (minHarga/l.harga)*w.harga + (minBerat/l.berat)*w.berat + (l.layar/maxLayar)*w.layar;
    return {...l, customSaw: saw};
  });

  // Normalize
  const maxSaw = Math.max(...scored.map(s=>s.customSaw));
  const minSaw = Math.min(...scored.map(s=>s.customSaw));
  const final = scored.map(l=>({...l, finalScore:(l.customSaw-minSaw)/(maxSaw-minSaw||1)}));
  final.sort((a,b)=>b.finalScore-a.finalScore);

  renderTopResult(final[0], final[0].finalScore);
  renderOtherResults(final.slice(1,6));
}

function renderTopResult(l, score){
  const pct = Math.round(score*100);
  document.getElementById('top-result').innerHTML = `
  <div class="result-top-card">
    <div class="result-badge">🏆 #1 REKOMENDASI TERBAIK</div>
    <div class="result-name">${l.merek} ${l.tipe}</div>
    <div class="result-type">Harga: <strong style="color:var(--green)">Rp ${l.harga.toLocaleString('id-ID')}</strong></div>
    <div class="result-specs">
      <div class="spec-item"><div class="spec-val">${l.ram} GB</div><div class="spec-label">RAM</div></div>
      <div class="spec-item"><div class="spec-val">${l.storage} GB</div><div class="spec-label">Storage</div></div>
      <div class="spec-item"><div class="spec-val">${l.cpu} GHz</div><div class="spec-label">CPU</div></div>
      <div class="spec-item"><div class="spec-val">${l.berat} kg</div><div class="spec-label">Berat</div></div>
    </div>
    <div class="result-score">
      <div class="score-circle" style="--pct:${pct*3.6}deg"><span>${pct}%</span></div>
      <div class="score-meta">Skor Final<br><strong>${(score).toFixed(4)}</strong></div>
    </div>
    <div class="divider"></div>
    <div style="font-size:0.85rem;font-weight:600;color:var(--text2);margin-bottom:0.75rem">💡 Mengapa Laptop Ini Direkomendasikan?</div>
    ${renderExplain(l)}
  </div>`;
}

function renderExplain(l){
  const maxRam=64,maxStorage=512,maxCpu=3.0,minHarga=8300000,minBerat=1.0,maxLayar=17.3;
  const factors = [
    {label:'RAM Tinggi', val: Math.round((l.ram/maxRam)*100), color:'#3b82f6'},
    {label:'CPU Kencang', val: Math.round((l.cpu/maxCpu)*100), color:'#8b5cf6'},
    {label:'Harga Hemat', val: Math.round((minHarga/l.harga)*100), color:'#f59e0b'},
    {label:'Storage OK', val: Math.round((l.storage/maxStorage)*100), color:'#10b981'},
    {label:'Ringan', val: Math.round((minBerat/l.berat)*100), color:'#f43f5e'},
  ];
  return `<div class="explain-bars">${factors.map(f=>`
    <div class="ebar">
      <div class="ebar-label">${f.label}</div>
      <div class="ebar-track"><div class="ebar-fill" style="width:${f.val}%;background:${f.color}"></div></div>
      <div class="ebar-pct" style="color:${f.color}">+${f.val}%</div>
    </div>`).join('')}</div>`;
}

function renderOtherResults(laptops){
  const html = laptops.map((l,i)=>`
  <div class="rec-card" onclick="openModalByIdx(${LAPTOP_DATA.findIndex(d=>d.merek===l.merek&&d.tipe===l.tipe&&d.rank===l.rank)})">
    <div class="rec-rank rank-n">${i+2}</div>
    <div class="rec-merek">${l.merek}</div>
    <div class="rec-tipe">${l.tipe}</div>
    <div class="rec-mini-specs">
      <div class="mini-spec"><div class="mini-sv">${l.ram}GB</div><div class="mini-sl">RAM</div></div>
      <div class="mini-spec"><div class="mini-sv">${l.cpu}GHz</div><div class="mini-sl">CPU</div></div>
      <div class="mini-spec"><div class="mini-sv">${l.storage}GB</div><div class="mini-sl">SSD</div></div>
    </div>
    <div class="rec-price">Rp ${l.harga.toLocaleString('id-ID')}</div>
    <div class="rec-score-bar"><div class="rec-score-fill" style="width:${Math.round(l.finalScore*100)}%"></div></div>
    <div class="rec-score-label"><span>Skor</span><span>${(l.finalScore).toFixed(4)}</span></div>
  </div>`).join('');
  document.getElementById('other-results').innerHTML = `<div class="rec-grid mt1">${html}</div>`;
}

// ===== CHARTS =====
function initCharts(){
  const top10 = [...LAPTOP_DATA].sort((a,b)=>a.rank-b.rank).slice(0,10);
  const brands = {};
  LAPTOP_DATA.forEach(l=>{ brands[l.merek]=(brands[l.merek]||0)+1; });
  const brandKeys = Object.keys(brands).sort((a,b)=>brands[b]-brands[a]);
  const isDarkMode = !document.body.getAttribute('data-theme') || document.body.getAttribute('data-theme')==='';
  const gridColor = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const textColor = isDarkMode ? '#94a3b8' : '#64748b';

  // Chart 1: Top 10 Horizontal Bar
  new Chart(document.getElementById('chart-top10'), {
    type:'bar',
    data:{
      labels: top10.map(l=>`${l.merek} ${l.tipe}`.substring(0,22)),
      datasets:[{
        label:'Skor Final',
        data: top10.map(l=>l.skor),
        backgroundColor: top10.map((_,i)=>`hsl(${220+i*8},80%,${55+i*2}%)`),
        borderRadius:6,
      }]
    },
    options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`Skor: ${c.raw.toFixed(4)}`}}},
      scales:{x:{grid:{color:gridColor},ticks:{color:textColor}},y:{grid:{display:false},ticks:{color:textColor,font:{size:10}}}}}
  });

  // Chart 2: Brand Donut
  const brandColors = ['#3b82f6','#8b5cf6','#f59e0b','#10b981','#f43f5e','#06b6d4','#84cc16','#f97316','#ec4899','#14b8a6','#a78bfa','#fb923c','#67e8f9','#d946ef'];
  new Chart(document.getElementById('chart-brand'), {
    type:'doughnut',
    data:{
      labels: brandKeys,
      datasets:[{data:brandKeys.map(k=>brands[k]),backgroundColor:brandColors,borderWidth:2,borderColor:'transparent'}]
    },
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{position:'right',labels:{color:textColor,boxWidth:12,font:{size:10}}},
        tooltip:{callbacks:{label:c=>`${c.label}: ${c.raw} laptop`}}}}
  });

  // Chart 3: SAW vs TOPSIS scatter
  new Chart(document.getElementById('chart-scatter'), {
    type:'scatter',
    data:{
      datasets:[{
        label:'Laptop',
        data: LAPTOP_DATA.map(l=>({x:l.saw,y:l.topsis,label:`${l.merek} ${l.tipe}`})),
        backgroundColor:'rgba(59,130,246,0.5)',
        pointRadius:4
      }]
    },
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`${c.raw.label}: SAW=${c.raw.x.toFixed(3)}, TOPSIS=${c.raw.y.toFixed(3)}`}}},
      scales:{x:{title:{display:true,text:'SAW Score',color:textColor},grid:{color:gridColor},ticks:{color:textColor}},
        y:{title:{display:true,text:'TOPSIS Score',color:textColor},grid:{color:gridColor},ticks:{color:textColor}}}}
  });

  // Chart 4: Price distribution
  const ranges = ['8-9jt','9-10jt','10-11jt','11-12jt','12-13jt','13-14jt','14-15jt'];
  const counts = [0,0,0,0,0,0,0];
  LAPTOP_DATA.forEach(l=>{
    const idx = Math.min(Math.floor((l.harga-8000000)/1000000),6);
    if(idx>=0) counts[idx]++;
  });
  new Chart(document.getElementById('chart-price'), {
    type:'bar',
    data:{
      labels:ranges,
      datasets:[{label:'Jumlah Laptop',data:counts,backgroundColor:'rgba(139,92,246,0.7)',borderColor:'#8b5cf6',borderWidth:1,borderRadius:6}]
    },
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{x:{grid:{display:false},ticks:{color:textColor}},y:{grid:{color:gridColor},ticks:{color:textColor,stepSize:1}}}}
  });
}

// ===== RANKING TABLE =====
function initRankingFilters(){
  const brands = [...new Set(LAPTOP_DATA.map(l=>l.merek))].sort();
  const bf = document.getElementById('brand-filter');
  if(bf.options.length <= 1){
    brands.forEach(b=>{ const o=document.createElement('option'); o.value=b; o.textContent=b; bf.appendChild(o); });
  }
}
function filterTable(){
  currentPage = 1;
  const q = document.getElementById('search-input').value.toLowerCase();
  const brand = document.getElementById('brand-filter').value;
  const sort = document.getElementById('sort-select').value;
  filteredData = LAPTOP_DATA.filter(l=>{
    const matchQ = !q || l.merek.toLowerCase().includes(q) || l.tipe.toLowerCase().includes(q);
    const matchB = !brand || l.merek===brand;
    return matchQ && matchB;
  });
  const sortFns = {
    rank:(a,b)=>a.rank-b.rank, saw:(a,b)=>b.saw-a.saw, topsis:(a,b)=>b.topsis-a.topsis,
    harga_asc:(a,b)=>a.harga-b.harga, harga_desc:(a,b)=>b.harga-a.harga, ram:(a,b)=>b.ram-a.ram
  };
  filteredData.sort(sortFns[sort]||sortFns.rank);
  renderTable();
}
function renderTable(){
  const start = (currentPage-1)*PAGE_SIZE;
  const page = filteredData.slice(start, start+PAGE_SIZE);
  const tbody = document.getElementById('ranking-tbody');
  tbody.innerHTML = page.map(l=>{
    const rankColors = l.rank<=3 ? ['#f59e0b','#9ca3af','#cd7f32'][l.rank-1] : 'var(--border)';
    return `<tr>
      <td><span class="rank-badge" style="background:${rankColors};color:${l.rank<=3?'#fff':'var(--text2)'}">${l.rank}</span></td>
      <td style="font-weight:600">${l.merek}</td>
      <td style="color:var(--text2);font-size:0.82rem">${l.tipe}</td>
      <td>${l.ram} GB</td>
      <td>${l.storage} GB</td>
      <td>${l.cpu} GHz</td>
      <td style="color:var(--green);font-weight:600">Rp ${(l.harga/1000000).toFixed(1)}jt</td>
      <td><span class="chip chip-blue">${l.saw.toFixed(3)}</span></td>
      <td><span class="chip chip-green">${l.topsis.toFixed(3)}</span></td>
      <td style="font-weight:700;color:var(--accent2)">${(l.skor*100).toFixed(1)}%</td>
      <td><button class="btn-secondary" style="padding:0.25rem 0.6rem;font-size:0.75rem" onclick="openModalByIdx(${LAPTOP_DATA.indexOf(l)})">Detail</button></td>
    </tr>`;
  }).join('');
  renderPagination();
}
function renderPagination(){
  const total = Math.ceil(filteredData.length/PAGE_SIZE);
  const p = document.getElementById('pagination');
  let html = '';
  if(currentPage>1) html+=`<button class="page-btn" onclick="goPage(${currentPage-1})">‹</button>`;
  for(let i=Math.max(1,currentPage-2);i<=Math.min(total,currentPage+2);i++)
    html+=`<button class="page-btn ${i===currentPage?'active':''}" onclick="goPage(${i})">${i}</button>`;
  if(currentPage<total) html+=`<button class="page-btn" onclick="goPage(${currentPage+1})">›</button>`;
  p.innerHTML = html;
  document.getElementById('page-info').textContent = `Menampilkan ${(currentPage-1)*PAGE_SIZE+1}–${Math.min(currentPage*PAGE_SIZE,filteredData.length)} dari ${filteredData.length} laptop`;
}
function goPage(n){ currentPage=n; renderTable(); window.scrollTo(0,300); }

// ===== MODAL =====
function openModalByIdx(idx){
  const l = LAPTOP_DATA[idx];
  if(!l) return;
  document.getElementById('modal-body').innerHTML = `
    <div class="modal-merek">${l.merek} ${l.tipe}</div>
    <div class="modal-tipe" style="margin-bottom:1rem">Ranking Final: <strong style="color:var(--accent2)">#${l.rank}</strong></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:1.25rem">
      ${[['RAM',l.ram+' GB'],['Storage',l.storage+' GB'],['CPU',l.cpu+' GHz'],['Berat',l.berat+' kg'],['Layar',l.layar+'"'],['Harga','Rp '+l.harga.toLocaleString('id-ID')]].map(([k,v])=>`
      <div class="spec-item"><div class="spec-val" style="font-size:0.95rem">${v}</div><div class="spec-label">${k}</div></div>`).join('')}
    </div>
    <div class="divider"></div>
    <div style="font-size:0.85rem;color:var(--text2);margin-bottom:0.75rem;font-weight:600">📊 Skor Metode</div>
    <div style="display:flex;flex-direction:column;gap:0.5rem">
      <div class="ebar"><div class="ebar-label">SAW Score</div><div class="ebar-track"><div class="ebar-fill" style="width:${l.saw*100}%;background:#3b82f6"></div></div><div class="ebar-pct" style="color:#60a5fa">${l.saw.toFixed(4)}</div></div>
      <div class="ebar"><div class="ebar-label">TOPSIS</div><div class="ebar-track"><div class="ebar-fill" style="width:${l.topsis*100}%;background:#8b5cf6"></div></div><div class="ebar-pct" style="color:#a78bfa">${l.topsis.toFixed(4)}</div></div>
      <div class="ebar"><div class="ebar-label">Skor Final</div><div class="ebar-track"><div class="ebar-fill" style="width:${l.skor*100}%;background:#10b981"></div></div><div class="ebar-pct" style="color:#10b981">${(l.skor*100).toFixed(1)}%</div></div>
    </div>
    <div class="divider"></div>
    ${renderExplain(l)}`;
  document.getElementById('modal-overlay').classList.add('open');
}
function closeModal(e){ if(e.target===document.getElementById('modal-overlay')) document.getElementById('modal-overlay').classList.remove('open'); }

// ===== COMPARE =====
function initCompare(){
  const sorted = [...LAPTOP_DATA].sort((a,b)=>a.rank-b.rank);
  ['cmp1','cmp2','cmp3'].forEach((id,i)=>{
    const sel = document.getElementById(id);
    if(sel.options.length <= 1){
      sel.innerHTML = '<option value="">-- Pilih Laptop --</option>';
      sorted.forEach((l)=>{ const o=document.createElement('option'); o.value=LAPTOP_DATA.indexOf(l); o.textContent=`#${l.rank} ${l.merek} ${l.tipe}`; sel.appendChild(o); });
      if(i<3 && sorted[i]) sel.value = LAPTOP_DATA.indexOf(sorted[i]);
    }
  });
  runCompare();
}
function runCompare(){
  const indices = ['cmp1','cmp2','cmp3'].map(id=>document.getElementById(id).value).filter(v=>v!=='');
  const laptops = indices.map(i=>LAPTOP_DATA[parseInt(i)]).filter(Boolean);
  if(laptops.length < 2){ document.getElementById('compare-result').innerHTML = '<div class="empty-state">Pilih minimal 2 laptop untuk dibandingkan</div>'; return; }

  const criterias = [
    {key:'ram', label:'RAM (GB)', better:'max'},
    {key:'storage', label:'Storage (GB)', better:'max'},
    {key:'cpu', label:'CPU (GHz)', better:'max'},
    {key:'harga', label:'Harga (Rp)', better:'min', fmt: v=>'Rp '+(v/1000000).toFixed(1)+'jt'},
    {key:'berat', label:'Berat (kg)', better:'min'},
    {key:'layar', label:'Layar (inch)', better:'max'},
    {key:'saw', label:'SAW Score', better:'max', fmt:v=>v.toFixed(4)},
    {key:'topsis', label:'TOPSIS Score', better:'max', fmt:v=>v.toFixed(4)},
    {key:'skor', label:'Skor Final', better:'max', fmt:v=>(v*100).toFixed(1)+'%'},
    {key:'rank', label:'Ranking Final', better:'min'},
  ];
  const headRow = `<tr><th>Kriteria</th>${laptops.map(l=>`<th>${l.merek}<br><small style="font-weight:400;font-size:0.75rem">${l.tipe}</small></th>`).join('')}</tr>`;
  const rows = criterias.map(c=>{
    const vals = laptops.map(l=>l[c.key]);
    const best = c.better==='max' ? Math.max(...vals) : Math.min(...vals);
    const worst = c.better==='max' ? Math.min(...vals) : Math.max(...vals);
    const cells = laptops.map(l=>{
      const v = l[c.key];
      const fmt = c.fmt ? c.fmt(v) : v;
      const cls = v===best ? 'best-cell' : v===worst&&laptops.length>1 ? 'worst-cell' : '';
      return `<td class="${cls}">${fmt}</td>`;
    }).join('');
    return `<tr><td style="font-weight:500;color:var(--text2)">${c.label}</td>${cells}</tr>`;
  }).join('');
  document.getElementById('compare-result').innerHTML = `<div style="overflow-x:auto"><table class="compare-table"><thead>${headRow}</thead><tbody>${rows}</tbody></table></div>
    <div style="margin-top:1rem;font-size:0.8rem;color:var(--text3)"><span style="color:var(--green)">■</span> Terbaik &nbsp; <span style="color:var(--red)">■</span> Terburuk</div>`;
}
