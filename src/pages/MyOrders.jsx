import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./UserPages.css";

const MyOrders = () => {
  const { user, loadingUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingUser) return;
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/orders/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const normalizedOrders = res.data.map((order) => ({
          ...order,
          items: order.items.map((item) => {
            let colorHex = null;

            if (item.selectedColor?.hex) {
              if (typeof item.selectedColor.hex === "string") {
                colorHex = item.selectedColor.hex;
              } else if (
                typeof item.selectedColor.hex === "object" &&
                item.selectedColor.hex.current
              ) {
                colorHex = item.selectedColor.hex.current;
              }
            }

            return {
              ...item,
              productName: item.product?.name || "Product",
              productPrice:
                typeof item.product?.price === "number"
                  ? item.product.price
                  : 0,
              colorName: item.selectedColor?.name || null,
              colorHex,
            };
          }),
        }));

        setOrders(normalizedOrders);
      } catch (err) {
        console.error("Fetch orders error:", err.response?.data || err.message);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, loadingUser, navigate]);

  if (loading || loadingUser) {
    return <div className="orders-page">Loading orders...</div>;
  }

  return (
    <div className="orders-page myorders">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <span>
  <strong>Payment:</strong>{" "}
  {order.paymentMethod || "COD"}
</span>

              <span>
                <strong>Order ID:</strong> {order._id}
              </span>
              <span>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
              <span>
                <strong>Status:</strong> {order.status || "Pending"}
              </span>
            </div>

            <div className="order-items">
              {order.items.map((item, i) => (
                <div key={i} className="order-item">
                  <div className="order-item-main">
                    <strong>{item.productName}</strong> × {item.quantity}
                  </div>

                  <div className="order-item-meta">
                    {item.size && <span>Size: {item.size}</span>}

                    {item.colorName && (
  <div className="color-wrap">
    <span>Color:</span>

    <div
      className={`color-dot ${
        item.colorName.toLowerCase() === "white" ? "white" : ""
      }`}
      style={{
        backgroundColor:
          item.colorHex && item.colorHex !== "#000"
            ? item.colorHex
            : item.colorName.toLowerCase(),
      }}
    />

    <span className="color-name">
      {item.colorName.charAt(0).toUpperCase() +
        item.colorName.slice(1)}
    </span>
  </div>
)}

                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <strong>Total:</strong> Rs {order.totalAmount || 0}
              <span className="payment-badge">
    {order.paymentMethod || "Cash on Delivery"}
  </span>
<span>
  <strong>Payment Status:</strong>{" "}
  <span
    style={{
      color: order.paymentStatus === "Received" ? "green" : "orange",
      fontWeight: "600",
    }}
  >
    {order.paymentStatus}
  </span>
</span>
              <button onClick={() => navigate(`/track-order/${order._id}`)}>
                Track Order
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
