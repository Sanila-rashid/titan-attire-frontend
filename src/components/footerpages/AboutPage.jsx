import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">

      <h1 className="about-title">About Titan Attire</h1>

      <p className="about-text">
        Titan Attire is dedicated to crafting premium streetwear with bold
        designs, exceptional quality, and a focus on luxury comfort. 
        Our products include hoodies, sweatshirts, and trousers — all carefully
        stitched and made to last.
      </p>

      <div className="about-section">

        <div className="about-card">
          <h2>Premium Quality</h2>
          <p>High-grade fabric, durable stitching, and superior finishing.</p>
        </div>

        <div className="about-card">
          <h2>Modern Designs</h2>
          <p>Minimal, bold, and stylish clothing that stands out.</p>
        </div>

        <div className="about-card">
          <h2>Customer First</h2>
          <p>Dedicated support and fast delivery across Pakistan.</p>
        </div>

      </div>

    </div>
  );
};

export default AboutPage;
