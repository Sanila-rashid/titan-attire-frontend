// ---------------------- IMPORTS ----------------------

import p1_img from './product_1.png'
import p1_back from './product_1_back.png'
import p1_white_front from './product_1_white_front.png'
import p1_white_back from './product_1_white_back.png'
import p1_black_front from './product_1_black_front.png'
import p1_black_back from './product_1_black_back.png'

import p2_img from './product_2.png'
import p2_back from './product_2_back.png'

import p3_img from './product_3.png'
import p3_back from './product_3_back.png'

import p4_img from './product_4.png'
import p4_back from './product_4_back.png'

// ---------------------- DATA ----------------------

let data_product = [
  {
    id: 1,
    name: "Floral Summer Cotton Top",
    category: "women",
    image: p1_img,
    back_image: p1_back,
    new_price: 3499,
    old_price: 4999,
    sale: true,

    colors: [
      {
        name: "Black",
        hex: "#000000",
        image_front: p1_black_front,
        image_back: p1_black_back
      },
      {
        name: "White",
        hex: "#ffffff",
        image_front: p1_white_front,
        image_back: p1_white_back
      }
    ]
  },

  {
    id: 2,
    name: "Elegant Casual Ladies Blouse",
    category: "women",
    image: p2_img,
    back_image: p2_back,
    new_price: 3799,
    old_price: 5299,

    colors: [
      {
        name: "Default",
        hex: "#cccccc",
        image_front: p2_img,
        image_back: p2_back
      }
    ]
  },

  {
    id: 3,
    name: "Soft Fabric Daily Wear Shirt",
    category: "men",
    image: p3_img,
    back_image: p3_back,
    new_price: 3299,
    old_price: 4599,

    colors: [
      {
        name: "Default",
        hex: "#cccccc",
        image_front: p3_img,
        image_back: p3_back
      }
    ]
  },

  {
    id: 4,
    name: "Premium Stylish Women Top",
    category: "couples",
    image: p4_img,
    back_image: p4_back,
    new_price: 4499,
    old_price: 5999,

    colors: [
      {
        name: "Default",
        hex: "#cccccc",
        image_front: p4_img,
        image_back: p4_back
      }
    ]
  },
];

// ---------------------- EXPORT ----------------------
export default data_product;
