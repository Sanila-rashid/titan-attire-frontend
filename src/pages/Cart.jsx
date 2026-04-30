// src/pages/Cart.jsx
import React, { useContext, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import "./Cart.css";

const Cart = () => {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
  } = useContext(CartContext);

  const { products } = useContext(ProductContext);
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath =
    location.state?.fromPage || location.state?.from || "/shop";

  const getQty = (item) => {
    if (typeof item.qty === "number") return item.qty;
    if (typeof item.quantity === "number") return item.quantity;
    return 1;
  };

  // Merge product details safely
  const mergedCart = useMemo(() => {
    return cartItems.map((item, idx) => {
      const product = products.find((p) => String(p._id) === String(item.id));

      const finalPrice =
        Number(product?.price?.current) ||
        Number(product?.price?.old) ||
        Number(item.price) ||
        0;

      return {
        ...item,
        uniqueKey: item.uniqueKey || `${item.id}-${idx}`,
        finalPrice,
        qty: getQty(item),
        image: item.image || product?.images?.front || product?.images?.back || "",
      };
    });
  }, [cartItems, products]);

  const subtotal = mergedCart.reduce(
    (acc, item) => acc + item.finalPrice * item.qty,
    0
  );
// Calculate delivery and final total
const deliveryCharge = subtotal >= 10000 ? 0 : 200;
const finalTotal = subtotal + deliveryCharge;

  return (
    <div className="cart-wrapper">
      {/* BACK BUTTON */}
      <div className="back-btn-container">
        <button
          className="back-last-btn"
          onClick={() => {
            navigate(
              fromPath === "Home" ? "/" : `/${fromPath.toLowerCase()}`,
              {
                state: {
                  scrollTo: "new-collections",
                  productId: cartItems[0]?.id,
                },
              }
            );
          }}
        >
          <span className="arrow-left">←</span> Back
        </button>
      </div>

      <div className="cart-page-title below-back-title">
        <h1>Your Cart</h1>
        <p className="cart-count">{cartItems.length} item(s)</p>
      </div>

      {mergedCart.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your Cart is Empty</h2>
          <Link to="/shop">
            <button className="empty-btn">Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="cart-main-grid">
          {/* LEFT */}
          <div className="cart-container">
            {mergedCart.map((item) => (
              <Link
                to={`/product/${item.id}`}
                state={{ fromPage: fromPath }}
                key={item.uniqueKey}
                className="link-wrapper"
                onClick={(e) => {
                  if (
                    e.target.closest(".qty-btn") ||
                    e.target.closest(".remove-btn")
                  ) {
                    e.preventDefault();
                  }
                }}
              >
                <div className="cart-item" id={`product-${item.id}`}>
                  <div className="cart-item-img-wrapper">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-img"
                    />
                  </div>

                  <div className="cart-item-details">
                    <h3 className="cart-name">{item.name}</h3>

                    <p className="cart-item-meta">
                      <span className="meta-label">Color:</span>{" "}
                      {item.color || "Default"} |{" "}
                      <span className="meta-label">Size:</span>{" "}
                      {item.size || "Standard"}
                    </p>

                    <p className="cart-item-price">Rs {item.finalPrice}</p>

                    <div className="qty-and-remove">
                      <div className="qty-section">
                        <button
                          className="qty-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            decreaseQty(item.uniqueKey);
                          }}
                        >
                          −
                        </button>

                        <span className="qty-number">{item.qty}</span>

                        <button
                          className="qty-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            increaseQty(item.uniqueKey);
                          }}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const card = e.target.closest(".cart-item");
                          if (card) card.classList.add("slide-out");
                          setTimeout(() => removeItem(item.uniqueKey), 420);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-qty-badge">
                    <span>{item.qty}x</span>
                  </div>
                </div>
              </Link>
            ))}

            {/* CLEAR CART */}
            <div className="clear-cart-wrapper">
              <button
                className="clear-cart-btn"
                onClick={() => {
                  if (window.confirm("Clear entire cart?")) {
                    clearCart();
                  }
                }}
              >
                🗑 Clear Cart
              </button>
            </div>
          </div>

          {/* SUMMARY */}
          <aside className="cart-summary floating-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>Rs {subtotal}</span>
            </div>

            <div className="summary-row">
  <span>Delivery</span>
  <span>Rs {deliveryCharge}</span>
</div>

<div className="summary-total">
  <span>Total</span>
  <span>Rs {finalTotal}</span>
</div>


            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>

            <Link to="/shop">
              <button className="continue-btn">Continue Shopping</button>
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
