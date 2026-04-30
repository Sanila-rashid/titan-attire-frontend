// PRODUCTS MASTER FILE
import w1_front from "./product_12.png";
import w1_back from "./product_12_back.png";
import w2_front from "./product_2.png";
import w2_back from "./product_2_back.png";
import m1_front from "./product_35.png";
import m1_back from "./product_35_back.png";
import m2_front from "./product_14.png";
import m2_back from "./product_14_back.png";
import c1_front from "./product_28.png";
import c1_back from "./product_28_back.png";

const products = [
  {
    id: 12,
    name: "Striped Flutter Sleeve Blouse",
    category: "women",
    new_collection: true,
    on_sale: true,
    featured: true,
    bestseller: false,
    price: { current: 2500, old: 4200 },
    images: { front: w1_front, back: w1_back },
    colors: [
      {
        name: "Default",
        hex: "#cccccc",
        images: { front: w1_front, back: w1_back },
      },
    ],
    stock: 25,
  },
  {
    id: 102,
    name: "Striped Peplum Blouse",
    category: "women",
    new_collection: false,
    on_sale: true,
    featured: true,

    price: { current: 2800, old: 4400 },
    images: { front: w2_front, back: w2_back },
    colors: [
      {
        name: "Default",
        hex: "#cccccc",
        images: { front: w2_front, back: w2_back },
      },
    ],
    stock: 18,
  },
  {
    id: 35,
    name: "Boys Orange Hooded Sweatshirt",
    category: "men",
    new_collection: true,
    on_sale: true,
    featured: false,
    price: { current: 2900, old: 4500 },
    images: { front: m1_front, back: m1_back },
    colors: [
      {
        name: "Orange",
        hex: "#ff8c00",
        images: { front: m1_front, back: m1_back },
      },
    ],
    stock: 30,
  },
  {
    id: 14,
    name: "Men Green Bomber Jacket",
    category: "men",
    new_collection: false,
    on_sale: true,
    featured: false,
    bestseller: false,
    price: { current: 3200, old: 5200 },
    images: { front: m2_front, back: m2_back },
    colors: [
      {
        name: "Green",
        hex: "#2e7d32",
        images: { front: m2_front, back: m2_back },
      },
    ],
    stock: 12,
  },
  {
    id: 28,
    name: "Couple Matching Hoodie Set",
    category: "couples",
    new_collection: true,
    on_sale: true,
    featured: false,

    price: { current: 2600, old: 4200 },
    images: { front: c1_front, back: c1_back },
    colors: [
      {
        name: "Black",
        hex: "#000000",
        images: { front: c1_front, back: c1_back },
      },
    ],
    stock: 20,
  },
];

export default products;
