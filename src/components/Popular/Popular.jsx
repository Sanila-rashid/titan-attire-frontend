import React, { useContext } from "react";
import Item from "../Item/Item";
import { ProductContext } from "../../context/ProductContext";
import "./popular.css";

const Popular = ({ fromPage = "Home" }) => {
  const { products } = useContext(ProductContext);
  const popularProducts = products.filter(p => p.featured);

  return (
    <div className="popular" id="latest-collection">
      <h1>LATEST COLLECTION</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.length > 0 ? (
          popularProducts.map(item => (
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

export default Popular;
