import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import footer_titan_attire from '../assets/titan_attire.png'
import instagram_icon from '../assets/instagram_icon.png'
import pintester_icon from '../assets/pintester_icon.png'
import whatsapp_icon from '../assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="footer-brand">
        <img src={footer_titan_attire} alt="Titan Attire Logo" />
        <p>Titan Attire</p>
      </div>

      <ul className="footer-links">
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="footer-social-icons">
        <a 
          href="https://www.instagram.com/titanattire.x/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-icons-container"
        >
          <img src={instagram_icon} alt="Instagram" />
        </a>

        <a 
          href="https://www.pinterest.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-icons-container"
        >
          <img src={pintester_icon} alt="Pinterest" />
        </a>

        <a 
          href="https://wa.me/923374983630"  
          target="_blank"
          rel="noopener noreferrer"
          className="footer-icons-container"
        >
          <img src={whatsapp_icon} alt="WhatsApp" />
        </a>
      </div>

      <div className="footer-copy">
        <hr />
        <p>© {new Date().getFullYear()} Titan Attire — All Rights Reserved</p>
      </div>

    </footer>
  )
}

export default Footer
