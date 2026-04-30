// ALL PRODUCT FIXED

import p1 from "./product_1.png";
import p1_f from "./p1_product_i1.png";
import p1_b from "./product_1_back.png";

import p2 from "./product_2.png";
import p2_b from "./product_2_back.png";

import p3 from "./product_3.png";
import p3_b from "./product_3_back.png";

import p4 from "./product_4.png";
import p4_b from "./product_4_back.png";

import p13 from "./product_13.png";
import p14 from "./product_14.png";

import p25 from "./product_25.png";
import p26 from "./product_26.png";

let all_product = [
  {
    id: 1,
    name: "Striped Flutter Sleeve Blouse",
    category: "women",
    image_front: p1_f,
    image_back: p1_b,
    colors: [
      {
        name: "Pink",
        hex: "#f7c4d3",
        image_front: p1_f,
        image_back: p1_b,
      },
    ],
    new_price: 50,
    old_price: 80.5,
  },

  {
    id: 2,
    name: "Striped Flutter Sleeve Blouse",
    category: "women",
    image_front: p2,
    image_back: p2_b,
    colors: [
      {
        name: "Default",
        hex: "#cccccc",
        image_front: p2,
        image_back: p2_b,
      },
    ],
    new_price: 85,
    old_price: 120.5,
  },

  {
    id: 3,
    name: "Striped Flutter Sleeve Blouse",
    category: "women",
    image_front: p3,
    image_back: p3_b,
    colors: [
      {
        name: "Default",
        hex: "#cccccc",
        image_front: p3,
        image_back: p3_b,
      },
    ],
    new_price: 60,
    old_price: 100.5,
  },

  {
    id: 4,
    name: "Striped Flutter Sleeve Blouse",
    category: "women",
    image_front: p4,
    image_back: p4_b,
    colors: [
      {
        name: "Default",
        hex: "#cccccc",
        image_front: p4,
        image_back: p4_b,
      },
    ],
    new_price: 100,
    old_price: 150,
  },

  {
    id: 13,
    name: "Men Slim Fit Bomber Jacket",
    category: "men",
    image_front: p13,
    image_back: p13,
    colors: [
      {
        name: "Default",
        hex: "#cccccc",
        image_front: p13,
        image_back: p13,
      },
    ],
    new_price: 85,
    old_price: 120.5,
  },

  {
    id: 14,
    name: "Men Slim Fit Bomber Jacket",
    category: "men",
    image_front: p14,
    image_back: p14,
    colors: [
      {
        name: "Default",
        hex: "#cccccc",
        image_front: p14,
        image_back: p14,
      },
    ],
    new_price: 85,
    old_price: 120.5,
  },

  {
    id: 25,
    name: "Boys Hooded Sweatshirt",
    category: "couples",
    image_front: p25,
    image_back: p25,
    colors: [
      {
        name: "Default",
        hex: "#cccccc",
        image_front: p25,
        image_back: p25,
      },
    ],
    new_price: 85,
    old_price: 120.5,
  },

  {
    id: 26,
    name: "Boys Hooded Sweatshirt",
    category: "couples",
    image_front: p26,
    image_back: p26,
    colors: [
      {
        name: "Default",
        hex: "#cccccc",
        image_front: p26,
        image_back: p26,
      },
    ],
    new_price: 85,
    old_price: 120.5,
  },
];

export default all_product;
