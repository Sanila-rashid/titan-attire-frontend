import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // axios instance with baseURL
import { AuthContext } from "../context/AuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // ✅ Use api instance instead of axios directly
      const { data } = await api.post("/admin/login", { email, password });

      // Save admin in context
      login({
        _id: data._id,
        name: data.name,
        email: data.email,
        isAdmin: data.isAdmin,
        token: data.token,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      // Redirect to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid admin credentials");
    }
  };

  useEffect(() => {
    if (user?.isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [user, navigate]);

  return (
    <form onSubmit={submitHandler} className="admin-login-form">
      <h2>Admin Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;
