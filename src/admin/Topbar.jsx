import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Topbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div
      className="flex justify-between items-center px-6 py-4 shadow"
      style={{ backgroundColor: "#1c1b1b" }}
    >
      <h2 className="text-xl font-semibold text-white">Admin Dashboard</h2>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;
