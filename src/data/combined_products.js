// ------------------------------------
// IMPORT ALL IMAGES
// ------------------------------------

// WOMEN PRODUCT 1 (multiple colors)
import p1_img from "../assets/products/product_1.png";
import p1_back from "../assets/products/product_1_back.png";
import p1_white_front from "../assets/products/product_1_white_front.png";
import p1_white_back from "../assets/products/product_1_white_back.png";
import p1_black_front from "../assets/products/product_1_black_front.png";
import p1_black_back from "../assets/products/product_1_black_back.png";

// WOMEN PRODUCT 2
import p2_img from "../assets/products/product_2.png";
import p2_back from "../assets/products/product_2_back.png";

// MEN PRODUCT 1
import p3_img from "../assets/products/product_3.png";
import p3_back from "../assets/products/product_3_back.png";

// COUPLES PRODUCT 1
import p4_img from "../assets/products/product_4.png";
import p4_back from "../assets/products/product_4_back.png";

// ------------------------------------
// NEW COLLECTION IMPORTS
// ------------------------------------
import n1_front from "../assets/products/product_12.png";
import n1_back from "../assets/products/product_12_back.png";

import n2_front from "../assets/products/product_35.png";
import n2_back from "../assets/products/product_35_back.png";

import n3_front from "../assets/products/product_14.png";
import n3_back from "../assets/products/product_14_back.png";

import n4_front from "../assets/products/product_8.png";
import n4_back from "../assets/products/product_8_back.png";

import n5_front from "../assets/products/product_15.png";
import n5_back from "../assets/products/product_15_back.png";

import n6_front from "../assets/products/product_2.png";
import n6_back from "../assets/products/product_2_back.png";

import n7_front from "../assets/products/product_17.png";
import n7_back from "../assets/products/product_17_back.png";

import n8_front from "../assets/products/product_28.png";
import n8_back from "../assets/products/product_28_back.png";

// ------------------------------------
// MEN / WOMEN / COUPLES EXTRA
// ------------------------------------
import men1_front from "../assets/products/men1_front.png";
import men1_back from "../assets/products/men1_back.png";

import women1_front from "../assets/products/women1_front.png";
import women1_back from "../assets/products/women1_back.png";

import couple1_front from "../assets/products/couple1_front.png";
import couple1_back from "../assets/products/couple1_back.png";

// ------------------------------------
// FINAL MASTER PRODUCT ARRAY
// ------------------------------------

const products = [

  // ---------- MAIN PRODUCTS ----------
  {
    id: 1,
    name: "Floral Summer Cotton Top",
    category: "women",
    image_front: p1_img,
    image_back: p1_back,
    new_price: 3499,
    old_price: 4999,
    sale: true,
    colors: [
      {
        name: "Black",
        hex: "#000000",
        image_front: p1_black_front,
        image_back: p1_black_back,
      },
      {
        name: "White",
        hex: "#ffffff",
        image_front: p1_white_front,
        image_back: p1_white_back,
      },
    ],
  },

  {
    id: 2,
    name: "Elegant Casual Ladies Blouse",
    category: "women",
    image_front: p2_img,
    image_back: p2_back,
    new_price: 3799,
    old_price: 5299,
    colors: [
      {
        name: "Default",
        hex: "#cccccc",
        image_front: p2_img,
        image_back: p2_back,
      },
    ],
  },

  {
    id: 3,
    name: "Soft Fabric Daily Wear Shirt",
    category: "men",
    image_front: p3_img,
    image_back: p3_back,
    new_price: 3299,
    old_price: 4599,
    colors: [
      {
        name: "Default",
        hex: "#cccccc",
        image_front: p3_img,
        image_back: p3_back,
      },
    ],
  },

  {
    id: 4,
    name: "Premium Stylish Women Top",
    category: "couples",
    image_front: p4_img,
    image_back: p4_back,
    new_price: 4499,
    old_price: 5999,
    colors: [
      {
        name: "Default",
        hex: "#cccccc",
        image_front: p4_img,
        image_back: p4_back,
      },
    ],
  },

  // ---------- NEW COLLECTION ----------
  {
    id: 12,
    name: "Striped Flutter Sleeve Blouse",
    category: "women",
    sale: true,
    image_front: n1_front,
    image_back: n1_back,
    new_price: 2500,
    old_price: 4200,
    colors: [
      { name: "Default", hex: "#cccccc", image_front: n1_front, image_back: n1_back },
    ],
  },

  {
    id: 35,
    name: "Boys Orange Hooded Sweatshirt",
    category: "men",
    sale: true,
    image_front: n2_front,
    image_back: n2_back,
    new_price: 2900,
    old_price: 4500,
    colors: [
      { name: "Default", hex: "#cccccc", image_front: n2_front, image_back: n2_back },
    ],
  },

  {
    id: 14,
    name: "Men Green Bomber Jacket",
    category: "men",
    sale: true,
    image_front: n3_front,
    image_back: n3_back,
    new_price: 3200,
    old_price: 5200,
    colors: [
      { name: "Default", hex: "#cccccc", image_front: n3_front, image_back: n3_back },
    ],
  },

  {
    id: 8,
    name: "Striped Flutter Sleeve Blouse",
    category: "couples",
    sale: true,
    image_front: n4_front,
    image_back: n4_back,
    new_price: 2600,
    old_price: 4000,
    colors: [
      { name: "Default", hex: "#cccccc", image_front: n4_front, image_back: n4_back },
    ],
  },

  // ---------- MEN / WOMEN / COUPLES EXTRA ----------
  {
    id: 201,
    name: "Men Black Hoodie",
    category: "men",
    image_front: men1_front,
    image_back: men1_back,
    new_price: 2499,
    old_price: 2999,
  },

  {
    id: 301,
    name: "Women Oversized Hoodie",
    category: "women",
    image_front: women1_front,
    image_back: women1_back,
    new_price: 2299,
    old_price: 2799,
  },

  {
    id: 401,
    name: "Couple Matching Hoodies",
    category: "couples",
    image_front: couple1_front,
    image_back: couple1_back,
    new_price: 4499,
    old_price: 4999,
  },

];

export default products;
