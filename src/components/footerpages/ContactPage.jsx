import React from 'react';
import './ContactPage.css';
import callIcon from '../assets/callIcon.png';
import whatsapp_icon from '../assets/whatsapp_icon.png';
import instagram_icon from '../assets/instagram_icon.png';

const ContactPage = () => {
  return (
    <div className="contact-page">

      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">
        We're here to assist you. Reach out for orders, collaborations, or support.
      </p>

      <div className="contact-container">

        {/* PHONE CONTACT */}
        <div className="contact-card">
          <h2>Call Us</h2>

          <img src={callIcon} alt="Call" className="contact-icon" />

          <p className="contact-info">+92 337 4983630</p>

          <a className="contact-btn" href="tel:+923374983630">
            Call Now
          </a>
        </div>

        {/* WHATSAPP CONTACT */}
        <div className="contact-card">
          <h2>WhatsApp</h2>

          <img src={whatsapp_icon} alt="WhatsApp" className="contact-icon" />

          <p className="contact-info">Instant Support Available</p>

          <a 
            className="contact-btn" 
            href="https://wa.me/923374983630"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* INSTAGRAM CONTACT */}
        <div className="contact-card">
          <h2>Instagram</h2>

          <img src={instagram_icon} alt="Instagram" className="contact-icon" />

          <p className="contact-info">DM for Orders & Queries</p>

          <a 
            className="contact-btn"
            href="https://www.instagram.com/titanattire.x/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Send DM
          </a>
        </div>

      </div>

    </div>
  );
};

export default ContactPage;
