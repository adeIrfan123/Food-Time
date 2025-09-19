import { useEffect, useState, useRef } from "react";
import axiosInstance from "../Api/axiosInstance";
import FeatherIcon from "./FeatherIcons";

const HeaderDashboard = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/admin/profile");
        setUser(res.data.data);
      } catch (err) {
        console.error("Gagal ambil profil:", err);
      }
    };
    fetchProfile();
  }, []);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/admin/logout");
      localStorage.removeItem("admin_token"); // bersihkan token dari localStorage
      localStorage.removeItem("admin_info"); // bersihkan token dari localStorage
      window.location.href = "/admin/login"; // redirect ke halaman login
    } catch (error) {
      console.error("Logout gagal:", error);
      alert("Terjadi kesalahan saat logout.");
    }
  };

  return (
    <nav className="bg-white py-4 px-4 sm:px-6 md:px-11 flex justify-between items-center fixed top-0 left-0 right-0 shadow z-50">
      <button
        onClick={toggleSidebar}
        className="hidden md:inline-block lg:hidden mr-4 p-2 rounded hover:bg-gray-100"
        aria-label="Toggle Sidebar"
      >
        <FeatherIcon
          icon="menu"
          className="w-6 h-6 text-black cursor-pointer"
        />
      </button>

      <h1 className="font-merienda text-greenForest text-2xl font-semibold lg:w-full">
        Food<span className="font-poppins">Time</span>
      </h1>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="text-black font-medium px-3 py-2 rounded hover:bg-gray-100"
        >
          {user ? `Halo, ${user.name}` : ""}
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg border z-50">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HeaderDashboard;
