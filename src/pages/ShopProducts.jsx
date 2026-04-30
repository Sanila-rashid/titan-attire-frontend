import React from "react";
import ShopCategory from "./ShopCategory";
import "./ShopCategory.css";

const ShopProducts = () => {
  return (
    <div className="category-page">
      <h1 className="cat-heading">SHOP COLLECTION</h1>
      <div className="gold-line"></div>

      <ShopCategory showAll={true} fromPage="Shop" />
    </div>
  );
};

export default ShopProducts;
