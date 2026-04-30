import React from "react";
import { Link } from "react-router-dom";
import couples_data from "../components/assets/couples_data";
import Item from "../components/Item/Item";
import "./Couples.css"; // isolated Couples CSS

const Couples = () => {
  return (
    <div className="couples-page">
      <h1 className="couples-title">COUPLES COLLECTION</h1>
      <div className="couples-divider"></div>

      <div className="couples-products">
        {couples_data.map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            state={{ fromPage: "Couples" }}
          >
            <Item
              key={item.id}
              name={item.name}
              image={item.image}
              image_front={item.image}
              image_back={item.back_image || item.image}
              new_price={item.new_price}
              old_price={item.old_price}
              fromPage="Couples"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Couples;
