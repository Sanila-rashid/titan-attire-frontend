// src/components/NewCollections/NewCollections.jsx
import React, { useEffect, useState } from "react";
import Item from "../Item/Item";
import "./NewCollections.css";

const NewCollections = ({ fromPage }) => {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewCollection = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/new");
        const data = await res.json();
        setNewProducts(data);
      } catch (error) {
        console.error("New collection fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewCollection();
  }, []);

  return (
    <div className="new-collections" id="new-collections">
      <h1 className="nc-heading">EXCLUSIVE OFFERS</h1>
      <div className="gold-divider"></div>

      <div className="collections">
        {loading ? (
          <p>Loading...</p>
        ) : newProducts.length > 0 ? (
          newProducts.map((item) => (
            <Item
              key={item._id}
              _id={item._id}
              name={item.name}
              image_front={item.images?.front}
              image_back={item.images?.back}
              new_price={item.price?.current}
              old_price={item.price?.old}
              fromPage={fromPage}
              badges={{
                
                sale: item.on_sale,
                
              }}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default NewCollections;
