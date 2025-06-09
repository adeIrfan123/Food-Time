import { Link, useLocation } from "react-router";

const SideBarDashboard = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <div className="bg-[#DFDCDC] h-[100dvh] w-[17%] flex flex-col justify-between pt-20">
      <ul className="text-black text-4xl flex flex-col gap-1">
        <li
          className={`${
            isActive("/admin")
              ? "bg-greenForest text-white"
              : "hover:bg-greenForest"
          } py-5 px-6`}
        >
          <Link to={"/admin"}>Dashboard</Link>
        </li>
        <li
          className={`${
            isActive("/admin/product") || isActive("/admin/tambah-produk")
              ? "bg-greenForest text-white"
              : "hover:bg-greenForest"
          } py-5 px-6`}
        >
          <Link to={"/admin/product"}>Product</Link>
        </li>
        <li
          className={`${
            isActive("/admin/laporan")
              ? "bg-greenForest text-white"
              : "hover:bg-greenForest"
          } py-5 px-6`}
        >
          <Link to={"/admin/laporan"}>Laporan</Link>
        </li>
      </ul>
      <Link
        to={"/admin/akun"}
        className={`${
          isActive("/admin/akun") || isActive("/admin/tambah-akun")
            ? "bg-greenForest text-white"
            : "hover:bg-greenForest"
        } py-5 px-6 text-black text-3xl`}
      >
        Akun Admin
      </Link>
    </div>
  );
};
export default SideBarDashboard;
