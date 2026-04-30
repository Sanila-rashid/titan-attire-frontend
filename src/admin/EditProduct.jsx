// src/admin/EditProduct.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
  if (!token) {
    alert("You must be logged in as admin");
    navigate("/admin/login");
    return;
  }

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched product:", data); // For debugging
      setProduct(data.product); // <-- IMPORTANT
    } catch (err) {
      console.error(err);
      alert("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id, token, navigate]);


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        `/admin/products/${id}`,
        { 
          name: product.name, 
          price: { current: Number(product.price?.current || 0) }, 
          description: product.description || "" 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Product updated successfully");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update product");
    }
  };

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <form onSubmit={submitHandler} className="p-6 max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

      <div>
        <label className="block mb-1">Product Name</label>
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          required
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Price (Rs)</label>
        <input
          type="number"
          value={product.price?.current || 0}
          onChange={(e) =>
            setProduct({
              ...product,
              price: { ...product.price, current: Number(e.target.value) },
            })
          }
          required
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          value={product.description || ""}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          className="border p-2 w-full rounded"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-gold px-4 py-2 rounded hover:bg-yellow-400"
      >
        Update Product
      </button>
    </form>
  );
};

export default EditProduct;
