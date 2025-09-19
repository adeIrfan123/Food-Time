import { useLocation } from "react-router-dom";

const DynamicHeader = () => {
  const location = useLocation();
  const path = location.pathname.split("/").filter(Boolean);

  const getTitle = () => {
    const last = path[path.length - 1];
    if (last === "produk") return "Produk";
    // if (last === "tambah-produk") return "Tambah Produk";
    if (last === "akun") return "Akun Admin";
    if (last === "tambah-akun") return "Tambah Akun Admin";
    if (last === "edit-akun") return "Edit Akun Admin";
    if (last === "laporan") return "Laporan";
    if (last === "admin") return "Dashboard";
    return "Halaman";
  };
  return (
    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black">
      {getTitle()}
    </h1>
  );
};
export default DynamicHeader;
