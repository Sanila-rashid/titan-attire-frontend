import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./UserPages.css";

const AccountSettings = () => {
  const { user, setUser, loadingUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || "", email: user.email || "", password: "" });
    }
  }, [user]);

  useEffect(() => {
    if (!user && !loadingUser) {
      navigate("/login", { replace: true });
    }
  }, [user, loadingUser, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setUpdating(true);
    try {
      const token = localStorage.getItem("token");
      const body = { ...form };
      if (!body.password) delete body.password;

      const res = await fetch(`http://localhost:5000/api/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to update profile");
      const data = await res.json();
      setUser(data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loadingUser) return <p className="loading-text">Loading account...</p>;
  if (!user) return null; // navigation handled in useEffect

  return (
    <div className="account-settings-page">
      <h1>Account Settings</h1>
      <form onSubmit={handleSubmit} className="account-form">
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />
        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} required />
        <label>Password</label>
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Leave blank to keep current password"
        />
        <button type="submit" disabled={updating}>
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;
