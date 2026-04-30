// src/admin/AdminProducts.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";


const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
const toBool = (val) => val === true || val === "true" || val === 1 || val === "1";

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
console.log("REACT_APP_API_URL:", API_URL);

// Example Axios call

  // ---------------- AUTH CHECK ----------------
  useEffect(() => {
    if (!user?.isAdmin) navigate("/");
  }, [user, navigate]);

  // ---------------- FETCH PRODUCTS ----------------
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await api.get("/admin/products", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("✅ PRODUCTS FROM API 👉", res.data);

      // Map backend booleans to frontend-friendly fields
      const mapped = (res.data.products || []).map((p) => ({
  ...p,
  isSale: toBool(p.on_sale),
  isNewCollection: toBool(p.new_collection),
  isPopular: toBool(p.featured),
  countInStock: p.stock ?? 0,
}));



      setProducts(mapped);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, []);


  // ---------------- HELPERS ----------------
  const getCurrentPrice = (p) =>
    typeof p?.price === "object" ? p.price.current ?? 0 : p?.price ?? 0;
  const getOldPrice = (p) =>
    typeof p?.price === "object" ? p.price.old ?? 0 : p?.old_price ?? 0;

  // ---------------- EDIT / DELETE ----------------
  const openEdit = (product) => {
    const colors = Array.isArray(product.colors)
      ? product.colors.map((c) => ({
          name: c.name ?? "",
          hex: c.hex ?? "#000000",
          images: c.images || { front: "", back: "" },
        }))
      : [];

    setEditingProduct({
      ...product,
      sizes: Array.isArray(product.sizes) ? product.sizes : [],
      countInStock: product.countInStock ?? 0,
      colors,
      images: product.images || { front: "", back: "", colorImages: {} },
      price: product.price || { current: 0, old: 0 },
      isSale: !!product.isSale,
      isNewCollection: !!product.isNewCollection,
      isPopular: !!product.isPopular,
      category: product.category ?? "",
      description: product.description ?? "",
      name: product.name ?? "",
    });
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setEditingProduct(null);
    setIsEditOpen(false);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;
    try {
      await api.delete(`/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  };

  // ---------------- CLOUDINARY UPLOAD ----------------
  const CLOUD_NAME = "dzrucektg";
  const UPLOAD_PRESET = "titan_upload";

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: data }
    );
    const json = await res.json();
    return json.secure_url;
  };

  const handleFileUpload = async (file, side, color = null) => {
    try {
      setUploading(true);
      const url = await uploadToCloudinary(file);

      if (color) {
        setEditingProduct((prev) => ({
          ...prev,
          colors: prev.colors.map((c) =>
            c.name === color ? { ...c, images: { ...c.images, [side]: url } } : c
          ),
        }));
      } else {
        setEditingProduct((prev) => ({
          ...prev,
          images: { ...prev.images, [side]: url },
        }));
      }
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ---------------- SAVE PRODUCT ----------------
  const saveProduct = async () => {
  if (!editingProduct) return;

  const payload = {
    name: (editingProduct.name || "Unnamed Product").trim(),
    description: (editingProduct.description || "").trim(),
    category: Array.isArray(editingProduct.category) && editingProduct.category.length
      ? editingProduct.category
      : [editingProduct.category || "men"], // always array
    sizes: Array.isArray(editingProduct.sizes) && editingProduct.sizes.length
      ? editingProduct.sizes
      : ["M"], // default size
    colors: Array.isArray(editingProduct.colors)
      ? editingProduct.colors.map((c) => ({
          name: c.name?.trim() || `Color-${Math.random().toString(36).slice(2, 5)}`,
          hex: c.hex && c.hex !== "" ? c.hex : "#ffffff",

          images: {
            front: c.images?.front || "",
            back: c.images?.back || "",
          },
        }))
      : [],
    stock: Number(editingProduct.countInStock ?? 0), // mapped from countInStock
    price: {
      current: Number(editingProduct.price?.current ?? 0),
      old: Number(editingProduct.price?.old ?? 0),
    },
    images: {
      front: editingProduct.images?.front || "",
      back: editingProduct.images?.back || "",
      colorImages: editingProduct.images?.colorImages || {},
    },
    on_sale: !!editingProduct.isSale,
    new_collection: !!editingProduct.isNewCollection,
    featured: !!editingProduct.isPopular,
    bestseller: false,
  };

  console.log("✅ Payload to update:", payload);

  try {
    await api.put(
      `/admin/products/${editingProduct._id}`,
      payload,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    /// Update locally with badges fixed
setProducts((prev) =>
  prev.map((p) =>
    p._id === editingProduct._id
      ? {
          ...p,
          name: payload.name,
          description: payload.description,
          category: payload.category,
          price: payload.price,
          countInStock: payload.stock,
          images: payload.images,
          colors: payload.colors, // ✅ THIS WAS MISSING
          isSale: payload.on_sale,
          isNewCollection: payload.new_collection,
          isPopular: payload.featured,
        }
      : p
  )
);




    closeEdit();
  } catch (err) {
    console.error("⚠️ Update error:", err.response || err);
    alert("Failed to update product. Check console for details.");
  }
};

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] font-semibold">
        Loading products...
      </div>
    );
  }

  // ---------------- UI ----------------
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin · Products</h1>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Old</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
  {products.map((p, i) => (
    <tr key={p._id} className="border-t hover:bg-gray-50">
      {/* Index */}
      <td className="px-4 py-3">{i + 1}</td>

      {/* Front Image */}
      <td className="px-4 py-3">
        {p.images?.front ? (
          <img
            src={
              p.images.front.startsWith("http")
                ? p.images.front
                : `${API_URL}${p.images.front}`
            }
            alt={p.name}
            className="w-12 h-12 rounded object-cover"
          />
        ) : "—"}
      </td>

      {/* Name + Colors */}
      <td className="px-4 py-3 font-medium">
        {p.name}
        {p.colors?.length > 0 && (
          <div className="flex mt-1">
            {p.colors.map((c) => (
              <span
                key={c.name}
                style={{ backgroundColor: c.hex }}
                className="w-3 h-3 rounded-full inline-block mr-1 border"
              ></span>
            ))}
          </div>
        )}
      </td>

      {/* Categories */}
      <td className="px-4 py-3">
        {Array.isArray(p.category) ? p.category.join(", ") : p.category}
      </td>

      {/* Prices */}
      <td className="px-4 py-3 text-green-600 font-semibold">
        Rs. {getCurrentPrice(p)}
      </td>
      <td className="px-4 py-3 text-gray-400 line-through">
        Rs. {getOldPrice(p)}
      </td>

      {/* Stock */}
      <td className="px-4 py-3">{p.countInStock ?? "—"}</td>

      {/* Badges */}
      <td className="px-4 py-3 flex gap-1">
        {p.isSale && (
          <span className="bg-green-200 text-green-800 px-2 rounded text-xs">
            Sale
          </span>
        )}
        {p.isNewCollection && (
          <span className="bg-blue-200 text-blue-800 px-2 rounded text-xs">
            New
          </span>
        )}
        {p.isPopular && (
          <span className="bg-yellow-200 text-yellow-800 px-2 rounded text-xs">
            Popular
          </span>
        )}
      </td>

      {/* ID */}
      <td className="px-4 py-3 text-xs text-gray-400">{p._id}</td>

      {/* Actions */}
      <td className="px-4 py-3 space-x-2">
        <button
          onClick={() => openEdit(p)}
          className="px-3 py-1 bg-yellow-400 rounded text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => deleteProduct(p._id)}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {isEditOpen && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 space-y-4 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-2">Edit Product</h2>

            {/* Name */}
            <input
              className="w-full border p-2 rounded"
              placeholder="Product name"
              value={editingProduct.name ?? ""}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
            />

            {/* Description */}
            <textarea
              className="w-full border p-2 rounded"
              placeholder="Description"
              value={editingProduct.description ?? ""}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, description: e.target.value })
              }
            />

            {/* Prices */}
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                className="border p-2 rounded"
                placeholder="Current price"
                value={editingProduct.price.current ?? 0}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: { ...editingProduct.price, current: Number(e.target.value) },
                  })
                }
              />
              <input
                type="number"
                className="border p-2 rounded"
                placeholder="Old price"
                value={editingProduct.price.old ?? 0}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: { ...editingProduct.price, old: Number(e.target.value) },
                  })
                }
              />
            </div>

            {/* Stock */}
            <input
              type="number"
              className="border p-2 rounded"
              placeholder="Stock"
              value={editingProduct.countInStock ?? 0}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  countInStock: Number(e.target.value),
                })
              }
            />

            {/* Colors & Images */}
            {Array.isArray(editingProduct.colors) &&
              editingProduct.colors.map((c, idx) => (
                <div key={idx} className="border p-2 rounded space-y-2">
                  <div className="flex justify-between items-center">
                    <span>{c.name}</span>
                    <input
                      type="color"
                      value={c.hex ?? "#000000"}
                      onChange={(e) =>
                        setEditingProduct((prev) => ({
                          ...prev,
                          colors: prev.colors.map((col, i) =>
                            i === idx ? { ...col, hex: e.target.value } : col
                          ),
                        }))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="file"
                      onChange={(e) =>
                        handleFileUpload(e.target.files[0], "front", c.name)
                      }
                    />
                    <input
                      type="file"
                      onChange={(e) =>
                        handleFileUpload(e.target.files[0], "back", c.name)
                      }
                    />
                  </div>
                </div>
              ))}

            {/* Main Images */}
            <div className="grid grid-cols-2 gap-2">
              <input
                type="file"
                onChange={(e) => handleFileUpload(e.target.files[0], "front")}
              />
              <input
                type="file"
                onChange={(e) => handleFileUpload(e.target.files[0], "back")}
              />
            </div>

            {/* Badges */}
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={!!editingProduct.isSale}
                  onChange={() =>
                    setEditingProduct((prev) => ({ ...prev, isSale: !prev.isSale }))
                  }
                />
                Sale
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={!!editingProduct.isNewCollection}
                  onChange={() =>
                    setEditingProduct((prev) => ({
                      ...prev,
                      isNewCollection: !prev.isNewCollection,
                    }))
                  }
                />
                New Collection
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={!!editingProduct.isPopular}
                  onChange={() =>
                    setEditingProduct((prev) => ({ ...prev, isPopular: !prev.isPopular }))
                  }
                />
                Popular
              </label>
            </div>

            {/* Save / Cancel */}
            <div className="flex justify-end gap-2">
              <button onClick={closeEdit} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button
                onClick={saveProduct}
                disabled={uploading}
                className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
