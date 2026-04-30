import { createContext, useEffect, useState } from "react";
import api from "../utils/api"; // your axios instance

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Is axios available?", typeof api !== "undefined");

        // ✅ Corrected: remove extra /api
        const { data } = await api.get("/products");

        if (!Array.isArray(data)) throw new Error("API did not return an array");

        const formatted = data.map((p, idx) => ({
          ...p,
          _id: p._id ? p._id.toString() : `${idx}`, // fallback id if missing
        }));

        console.log("✅ PRODUCTS FROM API 👉", formatted);

        setProducts(formatted);
      } catch (err) {
        console.error("❌ API ERROR", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};
