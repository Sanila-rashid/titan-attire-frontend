import React from "react";
import "./ProductsPage.css";

// ⭐ Your Images (correct way to import in React)
import hoodieImg from "../assets/hoodieImg.png";
import sweatshirtImg from "../assets/sweatshirtImg.png";
import trousersImg from "../assets/trousersImg.png";

function ProductsPage() {
  return (
    <div className="products-container">
      <h1 className="products-title">Our Premium Collection</h1>
      <p className="products-sub">
        Explore our curated selection of hoodies, sweatshirts, and trousers — crafted with comfort & elegance.
      </p>

      <div className="products-grid">

        {/* Hoodie */}
        <div className="product-card">
          <div className="product-image">
            <img src={hoodieImg} alt="Hoodie" />
          </div>
          <h2 className="product-name">Premium Hoodies</h2>
          <p className="product-desc">
            Ultra–soft fleece hoodies designed for all-day comfort in a classy modern fit.
          </p>
        </div>

        {/* Sweatshirts */}
        <div className="product-card">
          <div className="product-image">
            <img src={sweatshirtImg} alt="Sweatshirt" />
          </div>
          <h2 className="product-name">Signature Sweatshirts</h2>
          <p className="product-desc">
            Minimal, stylish & warm — made for those who love premium winterwear.
          </p>
        </div>

        {/* Trousers */}
        <div className="product-card">
          <div className="product-image">
            <img src={trousersImg} alt="Trousers" />
          </div>
          <h2 className="product-name">Comfort Trousers</h2>
          <p className="product-desc">
            Soft, durable & perfectly tailored trousers for everyday comfort.
          </p>
        </div>

      </div>
    </div>
  );
}

export default ProductsPage;
