import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import api from "../utils/api"; // axios instance with baseURL and interceptors
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, orders: 0, products: 0 });
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [editingProduct, setEditingProduct] = useState(null);
const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);

const openEditPanel = (product) => {
  setEditingProduct(product);
  setIsEditPanelOpen(true);
};

const closeEditPanel = () => {
  setEditingProduct(null);
  setIsEditPanelOpen(false);
};


  // Fetch stats: users, orders, products
  useEffect(() => {
    if (!user?.isAdmin) return;

    const fetchStats = async () => {
      try {
        const [u, o, p] = await Promise.all([
          api.get("/admin/users-count"),
          api.get("/admin/orders-count"),
          api.get("/admin/products-count"),
        ]);

        setStats({
          users: u.data.count || 0,
          orders: o.data.count || 0,
          products: p.data.count || 0,
        });
      } catch (err) {
        console.error("❌ Error fetching admin stats:", err);
      }
    };

    fetchStats();
  }, [user]);

  // Fetch recent orders
  useEffect(() => {
    if (!user?.isAdmin) return;

    const fetchOrders = async () => {
      try {
        const res = await api.get("/admin/recent-orders");
        setOrders(
          res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );
      } catch (err) {
        console.error("❌ Error fetching recent orders:", err);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [user]);

  // Fetch all products for admin
useEffect(() => {
  if (!user?.isAdmin) return;

  const fetchProducts = async () => {
    try {
      const res = await api.get("/admin/products", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // Make sure products is always an array
      const data = res.data;
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      setProducts([]);
    }
  };

  fetchProducts();
}, [user]);

  const totalRevenue = orders.reduce((s, o) => s + Number(o.totalAmount || 0), 0);
  const format = (n) => n.toLocaleString();

  const pendingOrders = orders.filter((o) => o.status === "Order Placed");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 h-screen sticky top-0 bg-black text-gold flex-shrink-0 z-20">
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <Topbar />

        <div className="p-6 space-y-8 overflow-auto">
          <h2 className="text-3xl font-bold">Welcome, Admin</h2>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Total Users", value: stats.users },
              { label: "Total Orders", value: stats.orders },
              { label: "Total Products", value: stats.products },
            ].map((s, i) => (
              <div key={i} className="bg-[#1c1b1b] p-6 rounded-xl shadow">
                <p className="text-gold text-sm">{s.label}</p>
                <p className="text-gold text-2xl font-bold mt-2">{s.value}</p>
              </div>
            ))}
          </div>

          {/* REVENUE */}
          <div className="bg-[#1c1b1b] p-6 rounded-xl shadow">
            <p className="text-gold text-sm">Total Revenue</p>
            <p className="text-gold text-2xl font-bold mt-2">
              Rs {format(totalRevenue)}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              ["Add Product", "/admin/add-product"],
             
              ["View Orders", "/admin/orders"],
              ["Manage Users", "/admin/users"],
              ["Settings", "/admin/settings"],
            ].map(([t, l]) => (
              <button
                key={t}
                onClick={() => navigate(l)}
                className="bg-gold py-3 rounded font-semibold hover:bg-yellow-400 transition"
              >
                {t}
              </button>
            ))}
          </div>

          {/* RECENT ORDERS TABLE */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-xl font-bold">Recent Orders</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm table-fixed min-w-[650px]">
                <thead className="bg-[#1c1b1b] text-gold uppercase">
                  <tr>
                    <th className="p-4 w-40 text-left">Order ID</th>
                    <th className="p-4 w-32 text-left">Customer</th>
                    <th className="p-4 w-48 text-left">Email</th>
                    <th className="p-4 w-28 text-left">Total</th>
                    <th className="p-4 w-28 text-left">Status</th>
                    <th className="p-4 w-40 text-left">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {pendingOrders.map((o, i) => (
                    <tr
                      key={o._id}
                      className={`${i % 2 ? "bg-gray-50" : "bg-white"} hover:bg-yellow-50 cursor-pointer`}
                      onClick={() => navigate(`/admin/orders/${o._id}`)}
                    >
                      <td className="p-4 break-all">{o._id}</td>
                      <td className="p-4">{o.user?.name}</td>
                      <td className="p-4 break-all">{o.user?.email}</td>
                      <td className="p-4 font-bold">Rs {format(o.totalAmount)}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">
                          {o.status}
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {new Date(o.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PRODUCTS TABLE */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden mt-8">
            <div className="px-6 py-4 border-b">
              <h3 className="text-xl font-bold">Products</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm table-fixed min-w-[650px]">
                <thead className="bg-[#1c1b1b] text-gold uppercase">
                  <tr>
                    <th className="p-4 w-40 text-left">ID</th>
                    <th className="p-4 w-48 text-left">Name</th>
                    <th className="p-4 w-28 text-left">Price</th>
                    <th className="p-4 w-32 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {products.map((p) => (
                    <tr key={p._id} className="hover:bg-yellow-50 cursor-pointer">
                      <td className="p-4 break-all">{p._id}</td>
                      <td className="p-4">{p.name}</td>
                      <td className="p-4 font-bold">Rs {p.price?.current}</td>
                      <td className="p-4">
                        <button
  onClick={() => openEditPanel(p)}
  className="bg-gold px-3 py-1 rounded hover:bg-yellow-400 transition"
>
  Edit
</button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* EDIT PRODUCT PANEL */}
<div
  className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl p-6 transition-transform duration-300 z-50 ${
    isEditPanelOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  {editingProduct && (
    <>
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

      <label className="block mb-1">Name</label>
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded"
        value={editingProduct.name}
        onChange={(e) =>
          setEditingProduct({ ...editingProduct, name: e.target.value })
        }
      />

      <label className="block mb-1">Price</label>
      <input
        type="number"
        className="w-full p-2 mb-4 border rounded"
        value={editingProduct.price?.current || 0}
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            price: { ...editingProduct.price, current: Number(e.target.value) },
          })
        }
      />

      <div className="flex gap-4">
        <button
          className="bg-gold px-4 py-2 rounded hover:bg-yellow-400"
          onClick={async () => {
            try {
              await api.put(
                `/admin/products/${editingProduct._id}`,
                editingProduct,
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
              );
              alert("Product updated!");
              
              // Refresh products list
              const res = await api.get("/admin/products", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
              });
              setProducts(res.data.products || res.data || []);
              
              closeEditPanel();
            } catch (err) {
              console.error(err);
              alert("Failed to update product.");
            }
          }}
        >
          Save
        </button>
        <button
          className="px-4 py-2 border rounded"
          onClick={closeEditPanel}
        >
          Cancel
        </button>
      </div>
    </>
  )}
</div>

      </main>
    </div>
  );
};

export default AdminDashboard;
