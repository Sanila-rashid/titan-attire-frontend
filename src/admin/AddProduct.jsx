// src/admin/AddProduct.jsx
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const categoriesList = ["men", "women", "couples"];
const colorsList = ["Black", "White", "Blue", "Red", "Green", "Brown"];
const sizesList = ["XS", "S", "M", "L", "XL", "XXL"];
const colorHexMap = {
  black: "#000000",
  white: "#ffffff",
  blue: "#0000ff",
  red: "#ff0000",
  green: "#00ff00",
  brown: "#a52a2a",
};



// ---------------- CLOUDINARY CONFIG ----------------
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

// ---------------- COMPONENT ----------------
const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.isAdmin) navigate("/");
  }, [user, navigate]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    categories: [],
    sizes: [],
    colors: [],
    stock: "",
    price: { current: "", old: "" },
    images: { front: "", back: "", colorImages: {} },
    isSale: false,
    isNewCollection: false,
    isPopular: false,
  });

  const [uploading, setUploading] = useState(false);

  // ---------- helpers ----------
  const toggleArrayValue = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  const handleColorImage = (color, side, value) => {
    setForm((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        colorImages: {
          ...prev.images.colorImages,
          [color]: {
            ...prev.images.colorImages[color],
            [side]: value,
          },
        },
      },
    }));
  };

  const handleFileUpload = async (file, side, color = null) => {
    try {
      setUploading(true);
      const url = await uploadToCloudinary(file);
      if (color) {
        handleColorImage(color, side, url);
      } else {
        setForm((prev) => ({
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

  // ---------- submit ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare category payload (string if single, array if multiple)
    let categoryPayload;
    if (form.categories.length === 1) {
      categoryPayload = form.categories[0].toLowerCase();
    } else if (form.categories.length > 1) {
      categoryPayload = form.categories.map((c) => c.toLowerCase());
    } else {
      categoryPayload = "";
    }

    const colorsPayload = form.colors.map((color) => ({
  name: color,
  hex: colorHexMap[color.toLowerCase()] || "#000000",
  images: form.images.colorImages[color] || { front: "", back: "" },
}));



    try {
      await api.post("/products", {
  name: form.name,
  description: form.description,
  category: categoryPayload,
  sizes: form.sizes,
  colors: colorsPayload,
  stock: Number(form.stock),
  price: {
    current: Number(form.price.current),
    old: Number(form.price.old),
  },
  images: {
    front: form.images.front,
    back: form.images.back,
  },
  on_sale: form.isSale,            // 👈 use backend field names
  new_collection: form.isNewCollection,
  featured: form.isPopular,
});


      alert("Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error("API Error:", err);
      alert("Failed to add product. Check console for details.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>

      {uploading && (
        <div className="mb-4 text-blue-600 font-semibold">Uploading image...</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <input
          className="w-full border p-3 rounded"
          placeholder="Product name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        {/* Description */}
        <textarea
          className="w-full border p-3 rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-3 rounded"
            placeholder="Current price"
            type="number"
            value={form.price.current}
            onChange={(e) =>
              setForm({ ...form, price: { ...form.price, current: e.target.value } })
            }
          />
          <input
            className="border p-3 rounded"
            placeholder="Old price"
            type="number"
            value={form.price.old}
            onChange={(e) =>
              setForm({ ...form, price: { ...form.price, old: e.target.value } })
            }
          />
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-2">Categories</h3>
          <div className="flex flex-wrap gap-3">
            {categoriesList.map((c) => (
              <label key={c} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={form.categories.includes(c)}
                  onChange={() => toggleArrayValue("categories", c)}
                />
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="font-semibold mb-2">Sizes</h3>
          <div className="flex flex-wrap gap-3">
            {sizesList.map((s) => (
              <label key={s} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={form.sizes.includes(s)}
                  onChange={() => toggleArrayValue("sizes", s)}
                />
                {s}
              </label>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h3 className="font-semibold mb-2">Colors</h3>
          <div className="flex flex-wrap gap-3">
            {colorsList.map((c) => (
              <label key={c} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={form.colors.includes(c)}
                  onChange={() => toggleArrayValue("colors", c)}
                />
                {c}
              </label>
            ))}
          </div>
        </div>

        {/* Main Images */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files[0], "front")}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e.target.files[0], "back")}
          />
        </div>

        {/* Color-wise images */}
        {form.colors.map((color) => (
          <div key={color} className="border p-4 rounded">
            <h4 className="font-semibold mb-2">{color} Images</h4>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0], "front", color)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files[0], "back", color)}
              />
            </div>
          </div>
        ))}

        {/* Badges */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isSale}
              onChange={() => setForm((prev) => ({ ...prev, isSale: !prev.isSale }))}
            />
            Sale
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isNewCollection}
              onChange={() =>
                setForm((prev) => ({ ...prev, isNewCollection: !prev.isNewCollection }))
              }
            />
            New Collection
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isPopular}
              onChange={() =>
                setForm((prev) => ({ ...prev, isPopular: !prev.isPopular }))
              }
            />
            Popular
          </label>
        </div>

        {/* Stock */}
        <input
          className="border p-3 rounded"
          placeholder="Stock"
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading}
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 disabled:opacity-50"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
