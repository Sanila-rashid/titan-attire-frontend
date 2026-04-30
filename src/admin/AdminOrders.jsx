import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // axios instance
import { AuthContext } from "../context/AuthContext";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  /* 🔐 ADMIN GUARD */
  useEffect(() => {
    if (!user?.isAdmin) {
      alert("Admin not logged in");
      navigate("/admin/login");
    }
  }, [user, navigate]);

  /* 📦 FETCH ORDERS */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/admin/orders"); // ✅ use api instance
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        alert("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    if (user?.isAdmin) fetchOrders();
  }, [user]);

  const format = (n) => Number(n || 0).toLocaleString();

  if (loading) return <p className="text-gold p-6">Loading orders...</p>;

  if (orders.length === 0)
    return <p className="text-gold p-6">No orders found.</p>;

  return (
    <div className="p-6 bg-black min-h-screen text-gold">
      <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>

      <table className="min-w-full border border-gray-700">
        <thead className="bg-gray-900">
          <tr>
            <th className="py-3 px-6 text-left">Order ID</th>
            <th className="py-3 px-6 text-left">Customer</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Total</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order._id}
              className="border-b border-gray-700 cursor-pointer hover:bg-gray-800"
              onClick={() => navigate(`/admin/orders/${order._id}`)}
            >
              <td className="py-3 px-6 break-all">{order._id}</td>
              <td className="py-3 px-6">{order.user?.name || "N/A"}</td>
              <td className="py-3 px-6 break-all">{order.user?.email || "N/A"}</td>
              <td className="py-3 px-6 font-bold">Rs {format(order.totalAmount)}</td>
              <td className="py-3 px-6">{order.status}</td>
              <td className="py-3 px-6">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
