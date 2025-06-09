import { Route, Routes } from "react-router";
import DashboardPage from "../pages/Admin/DashboardPage";
import ProductPage from "../pages/Admin/ProductPage";
import LaporanPage from "../pages/Admin/LaporanPage";
import AdminAccountPage from "../pages/Admin/AdminAccountPage";
import AddAdminAccountPage from "../pages/Admin/AddAdminAccountPage";
import AddProductPage from "../pages/Admin/AddProductPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<DashboardPage />} />
      <Route path="/admin/product" element={<ProductPage />} />
      <Route path="/admin/laporan" element={<LaporanPage />} />
      <Route path="/admin/akun" element={<AdminAccountPage />} />
      <Route path="/admin/tambah-akun" element={<AddAdminAccountPage />} />
      <Route path="/admin/tambah-produk" element={<AddProductPage />} />
    </Routes>
  );
};
export default AppRoutes;
