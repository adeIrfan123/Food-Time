import { useEffect, useState } from "react";
import DynamicHeader from "../../Components/DynamicHeader";
import Search from "../../Components/Search";
import Main from "../../layouts/main";
import axiosInstance from "../../Api/axiosInstance";

const LaporanPenjualanPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchOrder, setSearchOrder] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setIsLoading(true); // mulai loading
      const response = await axiosInstance.get("/admin/order");

      const completedOrders = response.data.data.filter(
        (order) => order.status?.trim().toLowerCase() === "completed"
      );

      setOrders(completedOrders);
    } catch (error) {
      console.log("Gagal menerima data order", error);
    } finally {
      setIsLoading(false); // selesai loading
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const userMatch = order.user_name
      ?.toLowerCase()
      .includes(searchOrder.toLowerCase());
    const productMatch = order.items?.some((item) =>
      item?.product?.name_product
        ?.toLowerCase()
        .includes(searchOrder.toLowerCase())
    );
    return userMatch || productMatch;
  });

  // Hitung total keseluruhan dari filteredOrders
  const totalKeseluruhan = filteredOrders.reduce(
    (acc, curr) => acc + Number(curr.total_price),
    0
  );

  return (
    <div>
      <Main>
        <div className="flex justify-between items-center pt-20 relative">
          <DynamicHeader />
          <Search
            value={searchOrder}
            onChange={setSearchOrder}
            placeholder="Cari berdasarkan nama produk..."
          />
        </div>

        <div className="overflow-x-auto">
          {/* HEADER */}
          <div className="md:w-280 lg:w-full bg-[#D9D9D9] grid grid-cols-[50px_150px_150px_150px_280px_180px] items-center text-black py-4 mt-8 font-bold shadow px-4 rounded-t-lg">
            <div>No</div>
            <div>Nama</div>
            <div>Total Harga</div>
            <div>Tanggal</div>
            <div>Detail Makanan</div>
            <div>Status Pemesanan</div>
          </div>

          {/* DATA */}
          {isLoading ? (
            <div className="p-4 text-center text-gray-600">Loading...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              Tidak ada data pesanan
            </div>
          ) : (
            filteredOrders.map((order, index) => (
              <div
                key={order.id}
                className="md:w-280 lg:w-full bg-amber-100/90 grid grid-cols-[50px_150px_150px_150px_280px_180px] items-center text-black border-b border-gray-300 px-4 py-3"
              >
                <div>{index + 1}</div>
                <div>{order.user_name}</div>
                <div>Rp {Number(order.total_price).toLocaleString()}</div>
                <div>{new Date(order.order_date).toLocaleDateString()}</div>
                <div className="line-clamp-2">
                  {order.items
                    .map(
                      (item) => `${item.quantity} ${item.product.name_product}`
                    )
                    .join(", ")}
                </div>
                <div>{order.status}</div>
              </div>
            ))
          )}

          {/* TOTAL */}
          {filteredOrders.length > 0 && (
            <div className="md:w-280 lg:w-full bg-green-200 text-black font-semibold grid grid-cols-[50px_150px_150px_150px_280px_180px] px-4 py-4 border-t border-gray-400">
              <div colSpan={2}></div>
              <div>Total:</div>
              <div>Rp {totalKeseluruhan.toLocaleString()}</div>
              <div></div>
              <div></div>
            </div>
          )}
        </div>
      </Main>
    </div>
  );
};

export default LaporanPenjualanPage;
