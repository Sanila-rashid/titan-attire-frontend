import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ id, name, price, image, colors, sizes }) => {
  const { addToCart } = useContext(CartContext);

  const [selectedColor, setSelectedColor] = useState(colors?.[0] || "Default");
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || "Free");

 const handleAdd = () => {
  addToCart({
    id,
    name,
    price,
    image,
    color: selectedColor,   // <-- must be 'color'
    size: selectedSize,     // <-- must be 'size'
  });


  };

  return (
    <div className="product-card">
      <img src={image} alt={name} className="p-img" />

      <h3>{name}</h3>
      <p className="p-price">Rs {price}</p>

      {/* ---- COLOR SELECT ---- */}
      {colors && (
        <select
          className="select-box"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          {colors.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      )}

      {/* ---- SIZE SELECT ---- */}
      {sizes && (
        <select
          className="select-box"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          {sizes.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      )}

      <button className="add-btn" onClick={handleAdd}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
