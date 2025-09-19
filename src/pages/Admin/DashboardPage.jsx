import { useEffect, useState } from "react";
import Main from "../../layouts/main";
import DynamicHeader from "../../Components/DynamicHeader";
import Search from "../../Components/Search";
import axiosInstance from "../../Api/axiosInstance";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    orders: 0,
    products: 0,
    users: 0,
    admins: 0,
    total_sales: 0,
  });

  const fetchStats = async () => {
    try {
      // Ambil semua data order
      const orderRes = await axiosInstance.get("/admin/order");
      const orders = orderRes.data.data;

      // Filter hanya order yang status-nya 'completed'
      const completedOrders = orders.filter(
        (order) => order.status?.trim().toLowerCase() === "completed"
      );

      // Total harga dari order completed
      const totalSales = completedOrders.reduce(
        (sum, order) => sum + Number(order.total_price),
        0
      );

      // Ambil semua produk
      const productRes = await axiosInstance.get("/admin/product");

      // Ambil semua akun (user dan admin)
      const adminControlRes = await axiosInstance.get("/admin/admin-control");
      const allAccounts = adminControlRes.data.data;

      // Hitung berdasarkan role
      const userCount = allAccounts.filter((u) => u.role === "user").length;
      const adminCount = allAccounts.filter((u) => u.role === "admin").length;

      // Set statistik ke state
      setStats({
        orders: orders.length,
        products: productRes.data.data.length,
        admins: adminCount,
        users: userCount,
        total_sales: totalSales,
      });
    } catch (error) {
      console.error("Gagal mengambil statistik:", error);
    }
  };

  useEffect(() => {
    fetchStats();
    // const userToken = localStorage.getItem("user_token");
    // const adminToken = localStorage.getItem("admin_token");

    // if (userToken && adminToken) {
    //   navigate("/");
    //   return;
    // }

    // if ((!userToken, adminToken)) {
    //   navigate("/admin");
    //   return;
    // }
  }, []);

  return (
    <Main>
      <div className="pt-24 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <DynamicHeader />
          {/* <Search className="w-full sm:w-60 md:w-72" /> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <Card title="Jumlah Order" value={stats.orders} color="bg-blue-100" />
          <Card
            title="Jumlah Produk"
            value={stats.products}
            color="bg-yellow-100"
          />
          <Card title="Jumlah User" value={stats.users} color="bg-green-100" />
          <Card
            title="Jumlah Admin"
            value={stats.admins}
            color="bg-purple-100"
          />
          <Card
            title="Total Penjualan"
            value={`Rp ${Number(stats.total_sales).toLocaleString()}`}
            color="bg-pink-100"
          />
        </div>
      </div>
    </Main>
  );
};

const Card = ({ title, value, color }) => (
  <div className={`p-4 rounded-xl shadow-md ${color}`}>
    <div className="text-sm font-medium text-gray-700">{title}</div>
    <div className="text-2xl font-bold text-black mt-1">{value}</div>
  </div>
);

export default DashboardPage;
