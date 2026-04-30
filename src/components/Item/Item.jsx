import React from "react";
import { Link } from "react-router-dom";
import "./Item.css";
import { IMAGE_BASE_URL } from "../../utils/api";


const Item = ({
  _id,
  name,
  image_front,
  image_back,
  new_price,
  old_price,
  fromPage,
  badges = {},
}) => {
  // Ensure images always point to backend correctly
  const front =
    image_front && !image_front.startsWith("http")
      ? `${IMAGE_BASE_URL}${image_front}`
      : image_front || null;

  const back =
    image_back && !image_back.startsWith("http")
      ? `${IMAGE_BASE_URL}${image_back}`
      : image_back || front;

  const itemClass = `item ${fromPage === "Couples" ? "couples-item" : ""}`;
  const linkState = { fromPage: fromPage || "Home" };

  const renderBadges = () => {
    const badgeElements = [];
    if (badges.new)
      badgeElements.push(<div key="new" className="badge new">NEW</div>);
    if (badges.sale)
      badgeElements.push(<div key="sale" className="badge sale">SALE</div>);
    if (badges.popular)
      badgeElements.push(<div key="popular" className="badge popular">POPULAR</div>);
    if (badges.bestseller)
      badgeElements.push(
        <div key="bestseller" className="badge bestseller">BESTSELLER</div>
      );
    return badgeElements;
  };

  return (
    <div className={itemClass}>
      <div className="badges">{renderBadges()}</div>

      <Link to={`/product/${_id}`} state={linkState}>
        <div className="item-image-wrapper">
          {front && <img src={front} alt={name} className="front-img" />}
          {back && <img src={back} alt={name} className="back-img" />}
        </div>
      </Link>

      <p className="item-name">{name}</p>

      <div className="item-prices">
        <span className="item-price-new">Rs {new_price ?? 0}</span>
        {old_price && (
          <span className="item-price-old">Rs {old_price}</span>
        )}
      </div>

      <Link to={`/product/${_id}`} state={linkState}>
        <button className="check-now-btn">Check Now</button>
      </Link>
    </div>
  );
};

export default Item;
