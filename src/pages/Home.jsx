import React from "react";
import Hero from "../components/Hero/Hero";
import Popular from "../components/Popular/Popular";
import Offers from "../components/Offers/Offers";
import NewCollections from "../components/NewCollections/NewCollections";
import NewsLetter from "../components/NewsLetter/NewsLetter";

const Home = () => {
  return (
    <>
      {/* Hero Banner */}
      <Hero />

      {/* Popular Products Section */}
      <Popular fromPage="Home" />

      {/* Featured Offers Section */}
      <Offers fromPage="Home" />

      {/* New Collections Section */}
      <NewCollections fromPage="Home" />

      {/* Newsletter Section */}
      <NewsLetter />
    </>
  );
};

export default Home;
