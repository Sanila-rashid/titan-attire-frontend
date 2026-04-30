import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Hero from '../components/Hero/Hero';
import Popular from '../components/Popular/Popular';
import Offers from '../components/Offers/Offers';
import NewCollections from '../components/NewCollections/NewCollections';
import NewsLetter from '../components/NewsLetter/NewsLetter';

const Shop = () => {
  const location = useLocation();

  useEffect(() => {
    const savedScroll = sessionStorage.getItem("shop-scroll");
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll));
      sessionStorage.removeItem("shop-scroll");
    }
  }, [location]);

  useEffect(() => {
    return () => {
      sessionStorage.setItem("shop-scroll", window.scrollY);
    };
  }, []);

  return (
    <div>
      <Hero />

      {/* MUST ADD THIS */}
      <Popular fromPage="Shop" />

      {/* MUST ADD THIS */}
      <Offers fromPage="Shop" />

      {/* MUST ADD THIS */}
      <NewCollections fromPage="Shop" />

      <NewsLetter />
    </div>
  );
};

export default Shop;
