// src/App.js
import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ---------------- COMPONENTS ----------------
import Navbar from "./components/navbar/navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./ScrollToTop";

// ---------------- PAGES ----------------
import Home from "./pages/Home";
import ShopProducts from "./pages/ShopProducts";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/CartCheckout";

// ---------------- AUTH ----------------
import LoginSignup from "./pages/LoginSignup";
import { AuthProvider } from "./context/AuthContext.jsx";

// ---------------- USER PAGES ----------------
import MyOrders from "./pages/MyOrders";
import AccountSettings from "./pages/AccountSettings";
import TrackOrder from "./pages/TrackOrder";

// ---------------- FOOTER PAGES ----------------
import ProductsPage from "./components/footerpages/ProductsPage";
import AboutPage from "./components/footerpages/AboutPage";
import ContactPage from "./components/footerpages/ContactPage";

// ---------------- CONTEXTS ----------------
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";

// ---------------- ADMIN IMPORTS ----------------
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import AdminRoute from "./admin/AdminRoute";
import AdminOrders from "./admin/AdminOrders";
import AdminOrderDetails from "./admin/AdminOrderDetails.jsx";

import AdminProducts from "./admin/AdminProducts";


import Men from "./pages/Men";


// =================================================

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <SearchProvider>
              <ScrollToTop />
              <Navbar />

              <Routes>
                {/* ---------------- USER ROUTES ---------------- */}
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<ShopProducts />} />
                <Route path="/category/:category" element={<ShopCategory />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/men" element={<ShopCategory fromPage="Men" />} />
<Route path="/women" element={<ShopCategory fromPage="Women" />} />
<Route path="/couples" element={<ShopCategory fromPage="Couples" />} />


                {/* User Account Pages */}
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/account-settings" element={<AccountSettings />} />
                <Route path="/track-order/:orderId" element={<TrackOrder />} />

                {/* Login / Signup */}
                <Route path="/login" element={<LoginSignup />} />
                <Route path="/signup" element={<LoginSignup />} />

                {/* Footer Pages */}
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* ---------------- ADMIN ROUTES ---------------- */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />

                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
  path="/admin/add-product"
  element={
    <AdminRoute>
      <AddProduct />
    </AdminRoute>
  }
/>

                <Route
  path="/admin/edit-product/:id"
  element={
    <AdminRoute>
      <EditProduct />
    </AdminRoute>
  }
/>

                <Route
                  path="/admin/orders"
                  element={
                    <AdminRoute>
                      <AdminOrders />
                    </AdminRoute>
                  }
                />
                <Route
  path="/admin/products"
  element={
    <AdminRoute>
      <AdminProducts />
    </AdminRoute>
  }
/>


              </Routes>

              <Footer />
            </SearchProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
