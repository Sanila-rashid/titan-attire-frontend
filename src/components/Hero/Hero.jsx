import React from "react";
import "./Hero.css";
import hero_image from "../assets/hero_image.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <p className="hero-tag">HOT COLLECTION</p>

        <div className="hero-title">
          <p>Fresh Styles</p>
          <p className="brand-line">For Every Season</p>
        </div>

        <p className="hero-subtext">
          Upgrade your wardrobe with our latest premium selections.
        </p>

        <a className="hero-latest-link" href="#latest-collection">
          <div className="hero-latest-btn">Explore Latest</div>
        </a>
      </div>

      <div className="hero-right">
        <div className="img-overlay"></div>
        <img src={hero_image} alt="Hero" className="hero-main-img" />
      </div>
    </div>
  );
};

export default Hero;
