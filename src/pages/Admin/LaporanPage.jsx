import { useEffect, useState } from "react";
import DynamicHeader from "../../Components/DynamicHeader";
import Search from "../../Components/Search";
import Main from "../../layouts/Main";
import axiosInstance from "../../Api/axiosInstance";

const LaporanPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchOrder, setSearchOrder] = useState("");
  const [modal, setModal] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmEdit, setConfirmEdit] = useState(null);
  const [message, setMessage] = useState(null); // success message
  const [error, setError] = useState(null); // error message

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/admin/order");
      setOrders(response.data.data);
    } catch (err) {
      console.error("Gagal menerima data order", err);
      setError("Gagal memuat data pesanan.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage(null);
        setError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleEditStatus = (orderId, currentStatus) => {
    setModal(orderId);
    setSelectedStatus(currentStatus);
  };

  const handleCloseModal = () => {
    setModal(null);
    setSelectedStatus("");
  };

  const openConfirmEdit = () => {
    setConfirmEdit({ id: modal, newStatus: selectedStatus });
  };

  const confirmEditStatus = async () => {
    try {
      await axiosInstance.put(`/admin/order/${confirmEdit.id}`, {
        status: confirmEdit.newStatus,
      });
      setMessage("Status berhasil diperbarui.");
      fetchOrders();
      handleCloseModal();
    } catch (err) {
      console.error("Gagal memperbarui status", err);
      setError("Gagal memperbarui status pesanan.");
    } finally {
      setConfirmEdit(null);
    }
  };

  const handleDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/admin/order/${confirmDeleteId}`);
      setOrders((prev) => prev.filter((order) => order.id !== confirmDeleteId));
      setMessage("Pesanan berhasil dihapus.");
    } catch (err) {
      console.error("Gagal menghapus order", err);
      setError("Terjadi kesalahan saat menghapus pesanan.");
    } finally {
      setConfirmDeleteId(null);
    }
  };

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

  return (
    <div>
      {/* Notifikasi sukses dan error */}
      {message && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow z-50">
          {message}
          <button onClick={() => setMessage(null)} className="ml-2 font-bold">
            ×
          </button>
        </div>
      )}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow z-50">
          {error}
          <button onClick={() => setError(null)} className="ml-2 font-bold">
            ×
          </button>
        </div>
      )}

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
          <div className="md:w-280 lg:w-full bg-[#D9D9D9] grid grid-cols-[50px_150px_150px_150px_280px_180px_150px] items-center text-black py-4 mt-8 font-bold shadow px-4 rounded-t-lg relative">
            <div>No</div>
            <div>Nama</div>
            <div>Total Harga</div>
            <div>Tanggal</div>
            <div>Detail Makanan</div>
            <div>Status Pemesanan</div>
            <div>Aksi</div>
          </div>

          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <div
                key={order.id}
                className="md:w-280 lg:w-full bg-amber-100/90 grid grid-cols-[50px_150px_150px_150px_280px_180px_150px] items-center text-black border-b border-gray-300 px-4 py-3"
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

                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => handleEditStatus(order.id, order.status)}
                    className="bg-amber-300 text-black px-3 py-1 rounded hover:bg-amber-400 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500 transition"
                  >
                    Hapus
                  </button>
                </div>

                {/* Modal Edit */}
                {modal !== null && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white p-6 rounded shadow-md w-80">
                      <p className="text-lg font-semibold text-black mb-4">
                        Ubah Status Pesanan
                      </p>
                      <select
                        className="w-full mb-4 border border-gray-300 rounded p-2"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={handleCloseModal}
                          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                        >
                          Batal
                        </button>
                        <button
                          onClick={openConfirmEdit}
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-600">Loading...</div>
          )}
        </div>
      </Main>

      {/* Modal Konfirmasi Hapus */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <p className="text-lg font-semibold text-black mb-4">
              Yakin ingin menghapus pesanan ini?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Edit Status */}
      {confirmEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <p className="text-lg font-semibold text-black mb-4">
              Yakin ingin mengubah status pesanan?
            </p>
            <p className="text-gray-700 mb-4">
              Status akan diubah menjadi{" "}
              <span className="font-bold">{confirmEdit.newStatus}</span>.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmEdit(null)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={confirmEditStatus}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaporanPage;
