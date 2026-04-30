import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const getPrice = (product) => {
    // Safely extract price from product object
    return Number(
      product.price?.current ??
      product.price?.new ??
      product.new_price ??
      product.old_price ??
      0
    );
  };

  const addToCart = (product, quantity = 1) => {
    const { id, size, color } = product;
    const price = getPrice(product);

    setCartItems(prev => {
      const existing = prev.find(
        item => item.id === id && item.size === size && item.color === color
      );

      if (existing) {
        return prev.map(item =>
          item.id === id && item.size === size && item.color === color
            ? {
                ...item,
                quantity: item.quantity + quantity,
                qty: item.qty + quantity,
                finalPrice: getPrice(item)
              }
            : item
        );
      } else {
        return [
          ...prev,
          {
            ...product,
            quantity,
            qty: quantity,
            finalPrice: price,
            uniqueKey: `${id}-${size}-${color}-${Date.now()}`
          }
        ];
      }
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const increaseQty = (key) => {
    setCartItems(prev =>
      prev.map(item =>
        item.uniqueKey === key
          ? { ...item, quantity: item.quantity + 1, qty: item.qty + 1 }
          : item
      )
    );
  };

  const decreaseQty = (key) => {
    setCartItems(prev =>
      prev.map(item =>
        item.uniqueKey === key
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
              qty: item.qty > 1 ? item.qty - 1 : 1
            }
          : item
      )
    );
  };

  const removeItem = (key) => {
    setCartItems(prev => prev.filter(item => item.uniqueKey !== key));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.finalPrice || 0) * (item.qty || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
        showToast,
        setShowToast,
        totalAmount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
