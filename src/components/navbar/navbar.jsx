import React, { useEffect, useState, useContext, useRef, useMemo } from "react";
import "./navbar.css";
import titan_attire from "../assets/titan_attire.png";
import cart_icon from "../assets/cart_icon.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { ProductContext } from "../../context/ProductContext";
import AddToCartToast from "../carttoast/AddToCartToast";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { products, loading } = useContext(ProductContext);
  const { cartItems, showToast } = useContext(CartContext);
  const { user, logout, loadingUser } = useContext(AuthContext);

  const [openShopDropdown, setOpenShopDropdown] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef();
  const [openDropdown, setOpenDropdown] = useState(false);

  const totalCount = useMemo(() => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) return 0;
    return cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
  }, [cartItems]);

  const isShopPage =
    location.pathname === "/shop" || location.pathname.startsWith("/category");

  const [shakeCart, setShakeCart] = useState(false);
  const prevCountRef = useRef(0);

  useEffect(() => {
    if (totalCount > prevCountRef.current) {
      setShakeCart(true);
      setTimeout(() => setShakeCart(false), 500);
    }
    prevCountRef.current = totalCount;
  }, [totalCount]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchResults([]);
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
  const query = e.target.value;
  setSearchQuery(query);

  if (query.trim().length === 0) {
    setSearchResults([]);
    return;
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  setSearchResults(filtered);
};


  const handleSearchKey = (e) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      navigate(`/product/${searchResults[0]._id}`);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  // ✅ Only render after user is loaded
  if (loadingUser) return null;

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/">
            <img src={titan_attire} alt="Titan Attire" />
            <span>TITAN ATTIRE</span>
          </Link>
        </div>

        <div
          className={`hamburger ${open ? "active" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-menu ${open ? "show" : ""}`}>
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Home</Link>
          </li>

          <li className="shop-dropdown">
  <div
    className={`shop-link ${isShopPage ? "active" : ""}`}
    onClick={() => setOpenShopDropdown(prev => !prev)}
  >
    Shop <span className="shop-arrow">▼</span>
  </div>

  <ul className={`dropdown-menu ${openShopDropdown ? "show" : ""}`}>
    {/* "All Products" link at the top */}
    <li>
      <Link to="/shop" onClick={() => setOpenShopDropdown(false)}>
        All Products
      </Link>
    </li>
    <hr /> {/* optional separator */}

    {/* Categories below */}
    <li>
      <Link to="/category/men" onClick={() => setOpenShopDropdown(false)}>
        Men
      </Link>
    </li>
    <li>
      <Link to="/category/women" onClick={() => setOpenShopDropdown(false)}>
        Women
      </Link>
    </li>
    <li>
      <Link to="/category/couples" onClick={() => setOpenShopDropdown(false)}>
        Couples
      </Link>
    </li>
  </ul>
</li>



          <li className={location.pathname === "/about" ? "active" : ""}>
            <Link to="/about">About</Link>
          </li>
          <li className={location.pathname === "/contact" ? "active" : ""}>
            <Link to="/contact">Contact</Link>
          </li>

          {/* ✅ Admin Panel link */}
          {user?.isAdmin && (
            <li className={location.pathname === "/admin/dashboard" ? "active" : ""}>
              <Link to="/admin/dashboard">Admin Panel</Link>
            </li>
          )}

        </ul>

        <div className="nav-actions" ref={searchRef}>
          <div className="nav-search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKey}
              disabled={loading}
            />
            {searchResults.length > 0 && (
              <ul className="search-dropdown">
                {searchResults.slice(0, 6).map((p) => (
                  <li
                    key={p._id}
                    onClick={() => {
                      navigate(`/product/${p._id}`);
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                  >
                    {p.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {!user ? (
            <>
              <Link to="/login">
                <button className="btn-login">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn-signup">Sign Up</button>
              </Link>
            </>
          ) : (
            <div className="nav-user-dropdown">
              <button
                className="btn-profile"
                onClick={() => setOpenDropdown((prev) => !prev)}
              >
                Profile ▼
              </button>

              {openDropdown && (
                <ul className="user-dropdown-menu">
                  <li onClick={() => setOpenDropdown(false)}>
                    <Link to="/my-orders" className="dropdown-item">
                      My Orders
                    </Link>
                  </li>
                  <li onClick={() => setOpenDropdown(false)}>
                    <Link to="/account-settings" className="dropdown-item">
                      Account Settings
                    </Link>
                  </li>
                  {user?.isAdmin && (
                    <li onClick={() => setOpenDropdown(false)}>
                      <Link to="/admin/dashboard" className="dropdown-item">
                        Admin Panel
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        logout();
                        window.location.href = "/";
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}

          <Link to="/cart" className={`cart-link`}>
            <img
              src={cart_icon}
              alt="Cart"
              className={`cart-icon ${shakeCart ? "shake" : ""}`}
            />
            <span className="cart-count-badge">{totalCount}</span>
          </Link>

          <AddToCartToast show={showToast} onClose={() => {}} />
        </div>
      </nav>

      
    </>
  );
};

export default Navbar;
