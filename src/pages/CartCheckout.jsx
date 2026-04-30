import React, { useContext, useState, useEffect, useMemo } from "react";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import "./CartCheckout.css";

// JWT token helper
const getToken = () => localStorage.getItem("token");

// City & Area mapping
const CITY_AREA_MAP = {
  Karachi: [
  "DHA Phase 1",
  "DHA Phase 2",
  "DHA Phase 3",
  "DHA Phase 4",
  "DHA Phase 5",
  "DHA Phase 6",
  "DHA Phase 7",
  "DHA Phase 8",
  "Clifton",
  "PECHS",
  "Gulshan-e-Iqbal",
  "Gulistan-e-Johar",
  "North Nazimabad",
  "Nazimabad",
  "Federal B Area",
  "Saddar",
  "Garden",
  "Bahadurabad",
  "Shah Faisal Colony",
  "Malir",
  "Malir Cantt",
  "Korangi",
  "Landhi",
  "Defence View",
  "KDA Scheme 1",
  "Surjani Town",
  "New Karachi",
  "Lyari",
  "Orangi Town",
  "Shadman" // ✅ added
],

  //Lahore: ["Model Town", "Gulberg", "DHA", "Johar Town"],
  //Islamabad: ["F-6", "F-7", "G-10", "G-11"],
};

// Helper to get image based on selected color
const getCartImage = (item) => {
  if (!item.selectedColor || !item.product) return item.product?.image_front || item.image;
  const colorKey = `image_front_${item.selectedColor.toLowerCase()}`;
  return item.product[colorKey] || item.product.image_front || item.image;
};

const CartCheckout = () => {
  const { cartItems, removeItem, clearCart } = useContext(CartContext);
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    area: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
const [paymentMethod, setPaymentMethod] = useState("COD");

  // Autofill user info from JWT token
  useEffect(() => {
    const token = getToken();
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({
        name: payload.name || "",
        email: payload.email || "",
        phone: payload.phone || "",
        city: payload.city || "",
        area: payload.area || "",
        address: payload.address || "",
      });
    } catch (err) {
      console.error("JWT decode error:", err);
    }
  }, []);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  // Merge cart items with real product details
  const mergedCart = useMemo(() => {
    return cartItems.map((item) => {
      const product = products.find((p) => String(p._id) === String(item.id));

      return {
        ...item,
        product: product || null,
        finalPrice:
          Number(product?.price?.current) ||
          Number(product?.price?.old) ||
          Number(item.price) ||
          Number(item.finalPrice) ||
          0,
        qty: Number(item.qty ?? item.quantity ?? 1),
        size: item.size ?? "N/A",
        selectedColor: item.selectedColor || item.color || "N/A",
      };
    });
  }, [cartItems, products]);

  // Only include valid products in the order
  const validCartItems = mergedCart.filter((item) => item.product?._id);

  
console.log("Cart items being sent:", cartItems);

  // Place order
  const placeOrder = async () => {
    const trimmedUser = {
      name: user.name.trim(),
      email: user.email.trim(),
      phone: user.phone.trim(),
      city: user.city,
      area: user.area,
      address: user.address.trim(),
    };

    // Validate user info
    if (
      !trimmedUser.name ||
      !trimmedUser.email ||
      !trimmedUser.phone ||
      !trimmedUser.city ||
      !trimmedUser.area ||
      !trimmedUser.address
    ) {
      alert("Please fill all required fields");
      return;
    }
    // ❌ Block invalid typed areas
const validAreas = CITY_AREA_MAP[trimmedUser.city] || [];

if (!validAreas.includes(trimmedUser.area)) {
  alert("❌ Please select a valid area from the list");
  return;
}


    if (validCartItems.length === 0) {
      alert("Cart has invalid items or is empty!");
      console.warn("Invalid cart items detected:", mergedCart.filter(item => !item.product?._id));
      return;
    }
// ✅ Payment method validation
if (!paymentMethod) {
  alert("Please select a payment method");
  return;
}

// ➡️ Future Easypaisa / JazzCash integration
    // if (paymentMethod === "ONLINE") {
    //   // TODO: call Easypaisa/JazzCash API here
    //   // Example: set orderData.paymentStatus = "Pending" until success
    // }
<select name="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
  <option value="">Select Payment Method *</option>
  <option value="COD">Cash on Delivery</option>
  <option value="Online">Online Payment</option> {/* Commented if you want */}
</select>


    setLoading(true);

    try {
      const orderData = {
  items: validCartItems.map((item) => ({
    productId: item.product._id, // ✅ backend compatible
    quantity: item.qty,
    size: item.size,
    selectedColor: { name: item.selectedColor, hex: "" }
  })),
  totalAmount: finalTotal,
  user: trimmedUser, // ✅ backend compatible
  paymentMethod, // ➡️ send payment method to backend
};


      const token = getToken();
      

      const res = await api.post("/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const orderId = res.data?._id;

      if (orderId) {
  clearCart();
  navigate(`/track-order/${orderId}`);
}

       else {
        setMessage("❌ Order placed but cannot navigate. Check backend response.");
      }
    } catch (err) {
      console.error("❌ CREATE ORDER ERROR:", err.response?.data || err);
      setMessage(err.response?.data?.message || "❌ Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Cart total
const totalAmount = validCartItems.reduce(
  (sum, item) => sum + (item.finalPrice || 0) * (item.qty || 1),
  0
);

// Delivery charge
const deliveryCharge = totalAmount > 0 ? 200 : 0; // Rs 200 example

// Final total
const finalTotal = totalAmount + deliveryCharge;


  return (
    <div className="cart-checkout-wrapper">
      <div className="cart-checkout-grid">
        {/* CART ITEMS */}
        <div className="cart-items-container">
          <h2>Your Cart ({mergedCart.length})</h2>
          {mergedCart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              {mergedCart.map((item) => (
                <div className="cart-item" key={item.uniqueKey || item._id || item.id}>
                  <div className="cart-item-img-wrapper">
                    <img className="cart-img" src={getCartImage(item)} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>Rs {item.finalPrice}</p>
                    <span>
                      Qty: {item.qty} | Size: {item.size} | Color: {item.selectedColor}
                    </span>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.uniqueKey || item._id || item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </>
          )}
        </div>

        {/* CHECKOUT */}
        <div className="checkout-container">
          <h2>Checkout</h2>
         <div className="checkout-total">
  {/* Subtotal remove */}
  <div>
    <span>Delivery:</span>
    <strong>Rs {deliveryCharge}</strong>
  </div>
  <div>
    <span>Total:</span>
    <strong>Rs {finalTotal}</strong> {/* delivery + cart total */}
  </div>
</div>

          <div className="checkout-form">
            <input name="name" placeholder="Name *" value={user.name} onChange={handleChange} />
            <input name="email" placeholder="Email *" value={user.email} onChange={handleChange} />
            <input name="phone" placeholder="Phone *" value={user.phone} onChange={handleChange} />
            <select name="city" value={user.city} onChange={handleChange}>
              <option value="">Select City *</option>
              {Object.keys(CITY_AREA_MAP).map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <input
  list="area-list"
  name="area"
  placeholder="Select / Type Area *"
  value={user.area}
  onChange={handleChange}
  disabled={!user.city}
/>

<datalist id="area-list">
  {user.city &&
    CITY_AREA_MAP[user.city].map((area) => (
      <option key={area} value={area} />
    ))}
</datalist>

            <input name="address" placeholder="Street / House / Building *" value={user.address} onChange={handleChange} />
            {/* PAYMENT METHOD */}
            <div className="payment-method">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery (COD)
              </label>

            {/*
              <label className="disabled-payment">
                <input
                  type="radio"
                  name="payment"
                  value="ONLINE"
                  disabled
                  // ➡️ Enable for Easypaisa/JazzCash
                  // onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Online Payment (Coming Soon)
              </label>
              */}
            </div>
          </div>

          
          <button className="checkout-btn" onClick={placeOrder} disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
          {message && <p className="checkout-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;  
              


