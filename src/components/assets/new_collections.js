import p1_front from "./product_12.png";
import p1_back from "./product_12_back.png";

import p2_front from "./product_35.png";
import p2_back from "./product_35_back.png";

import p3_front from "./product_14.png";
import p3_back from "./product_14_back.png";

import p4_front from "./product_8.png";
import p4_back from "./product_8_back.png";

import p5_front from "./product_15.png";
import p5_back from "./product_15_back.png";

import p6_front from "./product_2.png";
import p6_back from "./product_2_back.png";

import p7_front from "./product_17.png";
import p7_back from "./product_17_back.png";

import p8_front from "./product_28.png";
import p8_back from "./product_28_back.png";

let new_collections = [
  {
    id: 12,
    name: "Striped Flutter Sleeve Blouse",
    category: "women",
    sale: true,
    image_front: p1_front,
    image_back: p1_back,
    new_price: 2500,
    old_price: 4200,
    colors: [
      { name: "Default", hex: "#cccccc", image_front: p1_front, image_back: p1_back },
    ],
  },

  {
    id: 35,
    name: "Boys Orange Hooded Sweatshirt",
    category: "men",
    sale: true,
    image_front: p2_front,
    image_back: p2_back,
    new_price: 2900,
    old_price: 4500,
    colors: [
      { name: "Default", hex: "#cccccc", image_front: p2_front, image_back: p2_back },
    ],
  },

  {
    id: 14,
    name: "Men Green Bomber Jacket",
    category: "men",
    sale: true,
    image_front: p3_front,
    image_back: p3_back,
    new_price: 3200,
    old_price: 5200,
    colors: [
      { name: "Default", hex: "#cccccc", image_front: p3_front, image_back: p3_back },
    ],
  },

  {
    id: 8,
    name: "Striped Flutter Sleeve Blouse",
    category: "couples",
    sale: true,
    image_front: p4_front,
    image_back: p4_back,
    new_price: 2600,
    old_price: 4000,
    colors: [
      { name: "Default", hex: "#cccccc", image_front: p4_front, image_back: p4_back },
    ],
  },

  {
    id: 15,
    name: "Men Green Zipper Jacket",
    category: "men",
    sale: true,
    image_front: p5_front,
    image_back: p5_back,
    new_price: 2100,
    old_price: 3600,
    colors: [
      { name: "Default", hex: "#cccccc", image_front: p5_front, image_back: p5_back },
    ],
  },

  {
    id: 102,
    name: "Striped Peplum Blouse",
    category: "women",
    sale: true,
    image_front: p6_front,
    image_back: p6_back,
    new_price: 2800,
    old_price: 4400,
    colors: [
      { name: "Default", hex: "#cccccc", image_front: p6_front, image_back: p6_back },
    ],
  },

  {
    id: 17,
    name: "Men Bomber Jacket",
    category: "men",
    sale: true,
    image_front: p7_front,
    image_back: p7_back,
    new_price: 3000,
    old_price: 5000,
    colors: [
      { name: "Default", hex: "#cccccc", image_front: p7_front, image_back: p7_back },
    ],
  },

  {
    id: 28,
    name: "Boys Orange Sweatshirt",
    category: "couples",
    sale: true,
    image_front: p8_front,
    image_back: p8_back,
    new_price: 2600,
    old_price: 4200,
    colors: [
      { name: "Default", hex: "#cccccc", image_front: p8_front, image_back: p8_back },
    ],
  },
];

export default new_collections;
