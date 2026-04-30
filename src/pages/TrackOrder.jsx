// src/pages/TrackOrder.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import "./UserPages.css";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";


const TrackOrder = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, loadingUser } = useContext(AuthContext);
  
const [guestEmail, setGuestEmail] = useState("");
const [guestMode, setGuestMode] = useState(false);

const downloadInvoice = () => {
  if (!order) return;

  const doc = new jsPDF();

  // ===== COLORS =====
  const primaryColor = "#1a1a1a";
  const accentColor = "#c9a44d"; // Titan Attire gold vibe

  // ===== HEADER =====
  doc.setFontSize(22);
  doc.setTextColor(primaryColor);
  doc.text("TITAN ATTIRE", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(120);
  doc.text("Premium Fashion Store", 105, 27, { align: "center" });

  // Divider
  doc.setDrawColor(accentColor);
  doc.setLineWidth(0.7);
  doc.line(20, 32, 190, 32);

  // ===== ORDER INFO =====
  doc.setFontSize(11);
  doc.setTextColor(primaryColor);

  doc.text(`Order ID:`, 20, 42);
  doc.text(order._id, 60, 42);

  doc.text(`Date:`, 20, 49);
  doc.text(new Date(order.createdAt).toLocaleDateString(), 60, 49);

  doc.text(`Payment:`, 20, 56);
  doc.text(`${order.paymentStatus} (${order.paymentMethod})`, 60, 56);

  // ===== ITEMS HEADER =====
  doc.setFillColor(245, 245, 245);
  doc.rect(20, 65, 170, 8, "F");

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Item", 22, 71);
  doc.text("Qty", 100, 71);
  doc.text("Size", 120, 71);
  doc.text("Color", 140, 71);
  doc.text("Price", 170, 71, { align: "right" });

  doc.setFont("helvetica", "normal");

  // ===== ITEMS LIST =====
  let y = 80;
  order.items.forEach((item, index) => {
    doc.text(`${index + 1}. ${item.productName}`, 22, y);
    doc.text(String(item.quantity), 100, y);
    doc.text(item.size || "-", 120, y);
    doc.text(item.colorName || "-", 140, y);
    doc.text(`Rs ${item.productPrice}`, 170, y, { align: "right" });
    y += 8;
  });

  // ===== TOTAL =====
doc.setDrawColor(200);
doc.line(20, y + 2, 190, y + 2);

doc.setFont("helvetica", "bold");
doc.setFontSize(12);

// Left label
doc.text("Total Amount:", 20, y + 12);

// Right-aligned price
doc.text(`Rs ${order.totalAmount}`, 190, y + 12, { align: "right" });


  // ===== FOOTER =====
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120);

  doc.text("Thank you for shopping with Titan Attire 💛", 105, 285, {
    align: "center",
  });

  doc.text("For support: titanattire.x@gmail.com", 105, 292, { align: "center" });

  doc.save(`Invoice_${order._id}.pdf`);
};


  const statusSteps = ["Confirmed", "Processed", "Shipped", "Delivered"];

  // 👉👉 FIX 1: cancelled check
  const isCancelled = order?.status === "Cancelled";

  useEffect(() => {
  if (loadingUser) return;

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(`/orders/track/${orderId}`, {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {},
      });

      const normalizedItems = res.data.items.map((item) => {

  // ✅ HARD FIX — color hamesha nikalo
  let colorName =
    item.color ||
    item.selectedColor?.name ||
    item.selectedColor ||
    "Black"; // fallback

  if (typeof colorName === "object") {
    colorName = colorName.name || "Black";
  }

  const colorMap = {
    black: "#000",
    white: "#fff",
    red: "#f00",
    blue: "#00f",
    green: "#0f0",
    grey: "#ccc",
    gray: "#ccc",
  };

  const colorHex =
    colorMap[colorName.toLowerCase()] || "#000";

  let productPrice = 0;
  if (typeof item.product?.price === "number") {
    productPrice = item.product.price;
  } else if (item.product?.price?.current) {
    productPrice = item.product.price.current;
  }

  return {
    ...item,
    productName: item.product?.name || "Product",
    productPrice,
    colorName,   // ✅ GUARANTEED
    colorHex,    // ✅ GUARANTEED
    size: item.size || "",
    quantity: item.quantity || 1,
  };
});

      const totalAmount = normalizedItems.reduce(
        (sum, item) => sum + item.productPrice * item.quantity,
        0
      );

      setOrder({
        ...res.data,
        items: normalizedItems,
        totalAmount,
        paymentStatus: res.data.paymentStatus || "Pending",
        paymentMethod: res.data.paymentMethod || "COD",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Order not found");
    } finally {
      setLoading(false);
    }
  };

  fetchOrder();
}, [orderId, loadingUser]);

  if (loading || loadingUser) return <p>Loading order...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!order) return <p>No order found</p>;

  const stepIndex = statusSteps.indexOf(order.status);

  return (
    <div className="orders-wrapper trackorder">
      <div className="order-card">
        <div className="order-header">
          <span>
            <strong>Order ID:</strong> {order._id}
          </span>
          <span>
            <strong>Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </span>
        </div>
{/* 👤 Guest CTA */}
{!user && (
  <div className="guest-track-cta">
    <p>
      🔐 To track your orders,&nbsp;
      <Link to="/login" className="auth-link">Login</Link>
      &nbsp;or&nbsp;
      <Link to="/signup" className="auth-link">Signup</Link>
    </p>
  </div>
)}


        <div className="order-items">
          {order.items.map((item, idx) => (
            <div className="order-item" key={idx}>
              <span>{item.productName}</span>
              <span>× {item.quantity}</span>
              {item.size && <span>Size: {item.size}</span>}
              {item.colorName && (
                <span className="color-wrap">
                  Color:
                  <span
                    className={`color-dot ${
                      item.colorName.toLowerCase() === "white" ? "white" : ""
                    }`}
                    style={{ backgroundColor: item.colorHex }}
                  />
                  <span>{item.colorName}</span>
                </span>
              )}
              <span>
                <strong>Rs </strong>
                {item.productPrice}
              </span>
            </div>
          ))}
        </div>

        {/* 👉👉 FIX 2: Timeline logic */}
        <div className="order-timeline">
          {isCancelled ? (
            // ⛔ CANCELLED STATE
            <div className="timeline-step completed cancelled">
              <div className="step-circle">✖</div>
              <span>Cancelled</span>
            </div>
          ) : (
            // ✅ NORMAL FLOW
            statusSteps.map((step, idx) => {
              const completed = idx <= stepIndex;
              return (
                <div
                  key={idx}
                  className={`timeline-step ${completed ? "completed" : ""}`}
                >
                  <div className="step-circle">{idx + 1}</div>
                  <span>{step}</span>
                  {idx < statusSteps.length - 1 && (
                    <div
                      className={`step-line ${
                        completed ? "completed" : ""
                      }`}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="order-footer">
          <span>
            <strong>Total:</strong> Rs {order.totalAmount}
          </span>

          <span>
  <strong>Payment:</strong>{" "}
  {order.paymentStatus} ({order.paymentMethod})
</span>


          {/* 👉👉 FIX 3: cancel button only before confirm */}
          {order.status === "Order Placed" && (
            <button
              className="cancel-order-btn"
              onClick={async () => {
                if (!window.confirm("Cancel this order?")) return;
                try {
                  await api.put(`/orders/cancel/${order._id}`);
                  alert("Order cancelled");
                  window.location.reload();
                } catch (err) {
                  alert(err.response?.data?.message || "Cancel failed");
                }
              }}
            >
              Cancel Order
            </button>
          )}
          {/* ⬅️ Download Invoice Button */}
  {order && (
    <button className="download-invoice-btn" onClick={downloadInvoice}>
      📄 Download Invoice
    </button>
  )}
          
        </div>
      </div>
    </div>
  );
};


export default TrackOrder;
