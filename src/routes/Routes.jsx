import { Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/Admin/DashboardPage";
import ProductPage from "../pages/Admin/ProductPage";
import LaporanPage from "../pages/Admin/LaporanPage";
import AdminAccountPage from "../pages/Admin/AdminAccountPage";
import AddAdminAccountPage from "../pages/Admin/AddAdminAccountPage";
import EditAdminAccountPage from "../pages/Admin/EditAdminAccountPage";
import ProductFormPage from "../Components/ProductFormPage";
import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import HomePage from "../pages/Customer/HomePage";
import ProfileUserPage from "../pages/Customer/ProfileUserPage";
import OrderHistoryPage from "../pages/Customer/OrderHistoryPage";
import {
  AdminPrivateRoute,
  UserPrivateRoute,
  PreventAuthRoute,
} from "./RouteGuards";
import AccountUserPage from "../pages/Admin/AccountUserPage";
import LaporanPenjualanPage from "../pages/Admin/LaporanPenjualanPage";
import NotFoundPage from "../pages/NotFoundPage";
import CartPage from "../pages/Customer/CartPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
      <Route
        path="/admin"
        element={<AdminPrivateRoute element={<DashboardPage />} />}
      />
      <Route
        path="/admin/order"
        element={<AdminPrivateRoute element={<LaporanPage />} />}
      />
      <Route
        path="/admin/laporan-penjualan"
        element={<AdminPrivateRoute element={<LaporanPenjualanPage />} />}
      />
      <Route
        path="/admin/akun"
        element={<AdminPrivateRoute element={<AdminAccountPage />} />}
      />
      <Route
        path="/admin/akun-user"
        element={<AdminPrivateRoute element={<AccountUserPage />} />}
      />
      <Route
        path="/admin/tambah-akun"
        element={<AdminPrivateRoute element={<AddAdminAccountPage />} />}
      />
      <Route
        path="/admin/edit-akun/:id"
        element={<AdminPrivateRoute element={<EditAdminAccountPage />} />}
      />
      <Route
        path="/admin/produk"
        element={<AdminPrivateRoute element={<ProductPage />} />}
      />
      <Route
        path="/admin/tambah-produk"
        element={<AdminPrivateRoute element={<ProductFormPage />} />}
      />
      <Route
        path="/admin/edit-produk/:id"
        element={<AdminPrivateRoute element={<ProductFormPage />} />}
      />
      <Route
        path="/admin/hapus-produk/:id"
        element={<AdminPrivateRoute element={<ProductPage />} />}
      />

      <Route
        path="/admin/login"
        element={<PreventAuthRoute element={<LoginPage />} />}
      />
      <Route
        path="/login"
        element={<PreventAuthRoute element={<LoginPage />} />}
      />
      <Route
        path="/register"
        element={<PreventAuthRoute element={<RegisterPage />} />}
      />

      <Route path="/" element={<HomePage />} />
      <Route
        path="/profile"
        element={<UserPrivateRoute element={<ProfileUserPage />} />}
      />
      <Route
        path="/edit-profile"
        element={<UserPrivateRoute element={<ProfileUserPage />} />}
      />
      <Route
        path="/orders-history"
        element={<UserPrivateRoute element={<OrderHistoryPage />} />}
      />
      <Route
        path="/cart"
        element={<UserPrivateRoute element={<CartPage />} />}
      />
    </Routes>
  );
};

export default AppRoutes;
