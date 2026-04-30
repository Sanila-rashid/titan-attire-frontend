// src/pages/ShopCategory.jsx
import React, { useContext, useState, useMemo } from "react";
import Item from "../components/Item/Item";
import { ProductContext } from "../context/ProductContext";
import { useParams } from "react-router-dom";
import "./ShopCategory.css";

const ShopCategory = ({ showAll = false, fromPage }) => {
  const { products, loading } = useContext(ProductContext);
  const { category } = useParams();

  const route = category || "shop";
  const TITLES = {
  men: "Men Collection",
  women: "Women Collection",
  couples: "Couples Collection",
  popular: "Popular Products",
  new: "New Arrivals",
};

const pageTitle = fromPage || TITLES[route] || route;



  // FILTER & SORT STATE
  const [selectedSize, setSelectedSize] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");

  // FILTER & SORT PRODUCTS (Safe Version)
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products]; // copy to avoid mutation

    // Category / special pages
if (route === "popular") result = result.filter((p) => p.featured);
else if (route === "new") result = result.filter((p) => p.new_collection);
else if (route !== "shop")
  result = result.filter((p) =>
    Array.isArray(p.category)
      ? p.category.some(c => c.toLowerCase() === route.toLowerCase())
      : p.category?.toLowerCase() === route.toLowerCase()
  );


    // Size filter
    if (selectedSize) result = result.filter((p) => p.sizes?.includes(selectedSize));

    // Price filter
    if (maxPrice)
      result = result.filter((p) => (p.price?.current ?? 0) <= Number(maxPrice));

    // Sorting
    if (sortBy) {
      if (sortBy === "price-asc")
        result = result.sort((a, b) => (a.price?.current ?? 0) - (b.price?.current ?? 0));
      if (sortBy === "price-desc")
        result = result.sort((a, b) => (b.price?.current ?? 0) - (a.price?.current ?? 0));
      if (sortBy === "new")
        result = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      if (sortBy === "popular")
        result = result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, route, selectedSize, maxPrice, sortBy]);

  if (loading) return <p>Loading products...</p>;

  // Extract all available sizes for filter
  const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes || [])));

  return (
    <div className="shop-category">
  {!showAll && (
    <>
      <h2 className="category-title">{pageTitle.toUpperCase()}</h2>
      <div className="category-divider" />  {/* <-- THIS LINE */}
    </>
  )}

      {/* FILTER & SORT TOP BAR */}
      <div className="filters-container top-bar">
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">All Sizes</option>
          {allSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="new">Newest</option>
          <option value="popular">Popular</option>
        </select>
      </div>

      {/* PRODUCTS GRID */}
      <div className="shopcategory-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Item
              key={`${item._id}-${item.name}`}
              _id={item._id}
              name={item.name}
              image_front={item.images?.front}
              image_back={item.images?.back}
              new_price={item.price?.current ?? 0}
              old_price={item.price?.old ?? 0}
              fromPage={pageTitle}
              badges={{
                
                sale: item.on_sale,
                
              }}
            />
          ))
        ) : (
          <p className="no-items">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ShopCategory;
