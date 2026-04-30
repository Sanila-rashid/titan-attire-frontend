// src/pages/Women.jsx
import React from "react";
import women_data from "../components/assets/women_data";
import Item from "../components/Item/Item";
import "./ShopCategory.css";

const Women = () => {
  return (
    <div className="shop-category">
      <h1 className="category-title">WOMEN COLLECTION</h1>
      <hr className="category-divider" />

      <div className="shopcategory-products">
        {women_data.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            new_price={item.new_price}
            old_price={item.old_price}
            image={item.image_front || item.image}
            back_image={item.image_back}
          />
        ))}
      </div>
    </div>
  );
};

export default Women;
