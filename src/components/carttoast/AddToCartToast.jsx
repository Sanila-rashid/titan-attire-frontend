// src/components/carttoast/AddToCartToast.jsx
import React, { useEffect, useState } from "react";
import "./AddToCartToast.css";

const AddToCartToast = ({ show }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2000); // hide after 2s
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <div className={`cart-toast ${visible ? "show" : ""}`}>
      ✅ Item added to cart
    </div>
  );
};

export default AddToCartToast;
