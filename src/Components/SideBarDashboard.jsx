import { Link, useLocation } from "react-router-dom";

const SideBarDashboard = ({ isOpen }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`
        bg-[#DFDCDC] h-[100dvh] w-[70%] md:w-[30%] lg:w-[17%]
        ${!isOpen ? "hidden" : "block"}
        lg:block
        md:absolute lg:relative z-10
        top-0 left-0
      `}
    >
      {/* Wrapper agar bisa dorong "Akun Admin" ke bawah */}
      <div className="flex flex-col justify-between h-full pt-20">
        <ul className="text-black text-4xl flex flex-col gap-1">
          <li
            className={`${
              isActive("/admin")
                ? "bg-greenForest text-white"
                : "hover:bg-greenForest hover:text-white"
            } py-5 px-6`}
          >
            <Link to={"/admin"}>Dashboard</Link>
          </li>
          <li
            className={`${
              isActive("/admin/produk") ||
              isActive("/admin/tambah-produk") ||
              window.location.pathname.startsWith("/admin/edit-produk")
                ? "bg-greenForest text-white"
                : "hover:bg-greenForest hover:text-white"
            } py-5 px-6`}
          >
            <Link to={"/admin/produk"}>Product</Link>
          </li>
          <li
            className={`${
              isActive("/admin/order")
                ? "bg-greenForest text-white"
                : "hover:bg-greenForest hover:text-white"
            } py-5 px-6`}
          >
            <Link to={"/admin/order"}>Order</Link>
          </li>
          <li
            className={`${
              isActive("/admin/akun-user")
                ? "bg-greenForest text-white"
                : "hover:bg-greenForest hover:text-white"
            } py-5 px-6`}
          >
            <Link to={"/admin/akun-user"}>Akun User</Link>
          </li>
          <li
            className={`${
              isActive("/admin/laporan-penjualan")
                ? "bg-greenForest text-white"
                : "hover:bg-greenForest hover:text-white"
            } py-5 px-6`}
          >
            <Link to={"/admin/laporan-penjualan"}>Laporan Penjualan</Link>
          </li>
        </ul>

        <Link
          to={"/admin/akun"}
          className={`${
            isActive("/admin/akun") ||
            isActive("/admin/tambah-akun") ||
            window.location.pathname.startsWith("/admin/edit-akun")
              ? "bg-greenForest text-white"
              : "hover:bg-greenForest hover:text-white"
          } md:py-13 md:px-8 text-center lg:py-5 lg:px-6 text-black text-3xl`}
        >
          Akun Admin
        </Link>
      </div>
    </div>
  );
};

export default SideBarDashboard;
