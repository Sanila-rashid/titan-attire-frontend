import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/products", label: "Products" },
    { to: "/admin/orders", label: "Orders" },
    { to: "/admin/add-product", label: "Add Product" },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/settings", label: "Settings" },
  ];

  return (
    <div className="w-64 h-screen fixed top-0 left-0 flex flex-col p-6 overflow-y-auto" style={{ backgroundColor: "#1c1b1b" }}>
      <h1 className="text-2xl font-bold mb-6 text-white">Admin Panel</h1>
      <nav className="flex flex-col space-y-2">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`py-2 px-4 rounded transition text-white ${location.pathname === to ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
