// src/utils/productHelpers.js

// =======================
// PRODUCT HELPERS
// =======================

// ---------------------- CATEGORY ----------------------
// ---------------------- CATEGORY ----------------------
export const getByCategory = (products, category) => {
  if (!products || !Array.isArray(products)) return [];
  if (!category) return products;

  return products.filter((p) => {
    if (Array.isArray(p.category)) {
      return p.category.some((c) =>
        String(c || "").toLowerCase() === String(category || "").toLowerCase()
      );
    } else {
      return String(p.category || "").toLowerCase() === String(category || "").toLowerCase();
    }
  });
};


// ---------------------- NEW COLLECTION ----------------------
export const getNewCollection = (products) => {
  if (!products || !Array.isArray(products)) return [];
  return products.filter((p) => p.new_collection === true);
};

// ---------------------- POPULAR / FEATURED ----------------------
export const getPopular = (products) => {
  if (!products || !Array.isArray(products)) return [];
  return products.filter((p) => p.featured === true);
};

// ---------------------- SALE PRODUCTS ----------------------
export const getSaleProducts = (products) => {
  if (!products || !Array.isArray(products)) return [];
  return products.filter((p) => p.on_sale === true);
};

// ---------------------- GET PRODUCT BY ID ----------------------
export const getProductById = (products, id) => {
  if (!products || !Array.isArray(products)) return null;
  return products.find((p) => String(p._id) === String(id));
};

// ---------------------- GET PRODUCTS BY NAME ----------------------
export const getProductsByName = (products, name) => {
  if (!products || !Array.isArray(products) || !name) return [];
  return products.filter((p) =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );
};

// ---------------------- ROUTE BASED ----------------------
export const getProductsByRoute = (products, route) => {
  if (!products || !Array.isArray(products)) return [];

  const r = route?.toLowerCase();

  if (r === "popular") return getPopular(products);
  if (r === "new") return getNewCollection(products);
  if (r === "shop") return products;

  return getByCategory(products, r);
};
