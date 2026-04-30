// src/pages/Men.jsx
import React from "react";
import men_data from "../components/assets/men_data";
import Item from "../components/Item/Item";
import "./ShopCategory.css";
import "./menwomen.css"; 

const Men = () => {
  return (
    <div className="men-page">
  <h1 className="men-title">MEN COLLECTION</h1>
  <div className="men-divider"></div>


      <div className="shopcategory-products">
        {men_data.map((item) => (
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

export default Men;
