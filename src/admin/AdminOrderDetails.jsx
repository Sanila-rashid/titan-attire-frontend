import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import api, { IMAGE_BASE_URL } from "../utils/api";
import { AuthContext } from "../context/AuthContext";

const AdminOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.isAdmin || !user?.token) {
      navigate("/admin/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (!user?.token) return;

    const fetchOrder = async () => {
      try {
        const res = await api.get(`/admin/orders/${id}`);
        setOrder(res.data);
        setStatus(res.data.status);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, user]);

  const handleStatusChange = async (newStatus) => {
    try {
     await api.put(`/orders/status/${id}`, {
  status: newStatus
});


      setStatus(newStatus);
      alert("Order status updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="p-6 text-xl">Loading order details...</div>;
  if (!order) return <div className="p-6 text-xl">Order not found</div>;

  const format = (n) => Number(n || 0).toLocaleString();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-black text-gold flex-shrink-0">
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col">
        <Topbar />

        <div className="p-6 space-y-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gold text-black rounded hover:bg-yellow-400"
          >
            ← Back
          </button>

          <h2 className="text-3xl font-bold">Order Details</h2>

          <div className="bg-white rounded-xl shadow p-6 space-y-3">
            <p><b>Order ID:</b> {order._id}</p>
            <p><b>Customer:</b> {order.user?.name}</p>
            <p><b>Email:</b> {order.user?.email}</p>
            <p><b>Payment:</b> {order.paymentMethod || "COD"}</p>
            <p><b>Total:</b> Rs {format(order.totalAmount)}</p>
            <p><b>Created:</b> {new Date(order.createdAt).toLocaleString()}</p>

            <div className="flex items-center gap-4">
              <b>Status:</b>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="border rounded px-3 py-1"
              >
                {[
                  "Order Placed",
  "Confirmed",
  "Processed",
  "Shipped",
  "Delivered",
  "Cancelled",
]
.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-4 mt-4">
  {/* 🔴 Delete Single Order */}
  <button
    onClick={async () => {
      if (!window.confirm("Are you sure you want to delete this order?")) return;
      try {
        await api.delete(`/admin/orders/${id}`);
        alert("Order deleted successfully!");
        navigate("/admin/orders"); // Back to orders list
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to delete order");
      }
    }}
    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
  >
    🗑 Delete Order
  </button>

  {/* 🔴 Delete All Orders */}
  <button
    onClick={async () => {
      if (!window.confirm("Are you sure you want to delete ALL orders?")) return;
      try {
        await api.delete(`/admin/orders`); // backend me route hona chahiye: DELETE /admin/orders
        alert("All orders deleted successfully!");
        navigate("/admin/orders"); // Back to orders list (empty)
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to delete all orders");
      }
    }}
    className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900"
  >
    🗑 Delete All Orders
  </button>
</div>

            
          </div>
          

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4">Products</h3>
            <div className="space-y-4">
              {order.items.map((it, idx) => (
  <div key={idx} className="border rounded-lg p-4 flex justify-between bg-gray-50">
    <div>
      <p className="font-semibold">{it.product?.name || "Unknown Product"}</p>
      <div className="text-sm text-gray-600 flex gap-4">
        <span>Size: {it.size || "N/A"}</span>
        <span>Color: {it.selectedColor?.name || "N/A"}</span>
        <span>Qty: {it.quantity}</span>
      </div>
    </div>
    <p className="font-bold">
     Rs {format((it.price || it.product?.price?.current || 0) * it.quantity)}


    </p>
  </div>
))}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminOrderDetails;
