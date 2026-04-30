// src/pages/LoginSignup.jsx
import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // <-- arrow 1: import useLocation
import "./LoginSignup.css";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";

const LoginSignup = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const location = useLocation(); // <-- arrow 2: useLocation to detect URL
  const initialTab = location.pathname === "/signup" ? "signup" : "login";

  const [activeTab, setActiveTab] = useState(initialTab); // <-- arrow 3: set initial tab based on URL
  useEffect(() => {
  if (location.pathname === "/signup") {
    setActiveTab("signup");
  } else if (location.pathname === "/login") {
    setActiveTab("login");
  }
}, [location.pathname]); // run every time URL changes

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [loading, setLoading] = useState(false);

  // Input handlers
  const handleLoginChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleSignupChange = (e) =>
    setSignupData({ ...signupData, [e.target.name]: e.target.value });

  // <-- arrow 4: handle tab + update URL
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    navigate(tab === "login" ? "/login" : "/signup");
  };

  // ===== LOGIN =====
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessageType("error");
        setMessage(data.message || "Login failed ❌");
        return;
      }

      const safeUser = {
        _id: data._id || "unknown_id",
        name: data.name || "User",
        email: data.email || loginData.email,
        isAdmin: !!data.isAdmin,
        token: data.token || "",
      };

      login(safeUser);
      setMessageType("success");
      setMessage(`Welcome back, ${safeUser.name} ✅`);
      navigate("/");
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  // ===== SIGNUP =====
  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessageType("error");
        setMessage(data.message || "Signup failed ❌");
        return;
      }

      const safeUser = {
        _id: data.user?._id || data._id,
        name: data.user?.name || data.name,
        email: data.user?.email || data.email,
        isAdmin: !!(data.user?.isAdmin || data.isAdmin),
        token: data.token || (data.user?.token || ""),
      };

      login(safeUser);
      localStorage.setItem("user", JSON.stringify(safeUser));
      localStorage.setItem("token", safeUser.token);

      setMessageType("success");
      setMessage(`Welcome, ${safeUser.name} ✅`);
      setSignupData({ name: "", email: "", password: "" });
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      setMessageType("error");
      setMessage("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  // ===== GOOGLE LOGIN (placeholder) =====
  const handleGoogleLogin = () => {
    setMessageType("error");
    setMessage("Google login coming soon!");
  };

  return (
    <div className="login-signup-wrapper-modern">
      <div className="login-signup-card">
        <h2 className="title">
          {activeTab === "login" ? "Login to Your Account" : "Create a New Account"}
        </h2>

        <div className="tabs-modern">
          {/* <-- arrow 5: update buttons to use handleTabSwitch */}
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => handleTabSwitch("login")}
          >
            Login
          </button>
          <button
            className={activeTab === "signup" ? "active" : ""}
            onClick={() => handleTabSwitch("signup")}
          >
            Signup
          </button>
        </div>

        {message && (
          <p className={`message ${messageType === "error" ? "error" : "success"}`}>
            {message}
          </p>
        )}

        {activeTab === "login" ? (
          <>
            <form className="form-modern" onSubmit={handleLogin}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <button className="btn-google" onClick={handleGoogleLogin}>
              Continue with Google
            </button>

            {/* <-- arrow 6: switch-text span uses handleTabSwitch */}
            <p className="switch-text">
              Don't have an account?{" "}
              <span onClick={() => handleTabSwitch("signup")}>Signup</span>
            </p>
          </>
        ) : (
          <>
            <form className="form-modern" onSubmit={handleSignup}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={signupData.name}
                onChange={handleSignupChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={signupData.email}
                onChange={handleSignupChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={signupData.password}
                onChange={handleSignupChange}
                required
              />
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Signing up..." : "Signup"}
              </button>
            </form>

            <button className="btn-google" onClick={handleGoogleLogin}>
              Continue with Google
            </button>

            <p className="switch-text">
              Already have an account?{" "}
              <span onClick={() => handleTabSwitch("login")}>Login</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
