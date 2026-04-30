// src/components/Offers/Offers.jsx
import React from "react";
import "./Offers.css";

const BASE_URL = "http://localhost:5000"; // backend URL

const Offers = () => {
  const handleScroll = () => {
    const section = document.getElementById("new-collections");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="offers-container">
      {/* Optional ribbons */}
      <div className="gold-ribbon">FEATURED</div>
      <div className="limited-tag">SALE</div>

      {/* LEFT */}
      <div className="offers-left">
        <h1>Exclusive Offers For You</h1>
        <p>Only on Best Seller Products</p>
        <button onClick={handleScroll}>Check Now</button>
      </div>

      {/* RIGHT */}
      <div className="offers-right">
        <img
          src={`${BASE_URL}/uploads/hoodieImg.png`}
          alt="Exclusive Offer"
        />
      </div>
    </div>
  );
};

export default Offers;
