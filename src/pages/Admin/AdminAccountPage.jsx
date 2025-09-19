import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // fix: react-router-dom
import ButtonAdd from "../../Components/ButtonAdd";
import DynamicHeader from "../../Components/DynamicHeader";
import Search from "../../Components/Search";
import Main from "../../layouts/main";
import axiosInstance from "../../Api/axiosInstance";

const AdminAccountPage = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchAdminAccount = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/admin-control");
      const allUsers = response.data.data;

      const adminOnly = allUsers.filter((user) => user.role === "admin");
      setAdmins(adminOnly);
    } catch (error) {
      console.error("Gagal mengambil data admin:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminAccount();
  }, []);

  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setSelectedAdminId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await axiosInstance.delete(`/admin/admin-control/${selectedAdminId}`);
      setAdmins((prev) => prev.filter((admin) => admin.id !== selectedAdminId));
      setShowDeleteModal(false);
      setSelectedAdminId(null);
    } catch (error) {
      console.error("Gagal menghapus admin:", error);
      alert("Terjadi kesalahan saat menghapus admin.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedAdminId(null);
  };

  return (
    <Main>
      <div className="flex justify-between items-center pt-20">
        <DynamicHeader />
        <div className="flex gap-5">
          <Search value={searchTerm} onChange={setSearchTerm} />
          <ButtonAdd to="/admin/tambah-akun" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="md:w-full lg:min-w-[900px] bg-[#D9D9D9] grid grid-cols-[50px_150px_250px_0px] items-center text-black py-4 mt-8 font-bold shadow-[0px_4px_4px_rgba(0,0,0,0.25),inset_0px_2px_4px_rgba(0,0,0,0.1)] px-4 rounded-t-lg">
          <div>No</div>
          <div>Nama</div>
          <div>Email</div>
          <div>Aksi</div>
        </div>
        {loading ? (
          <div className="text-center py-8 text-gray-600">Loading...</div>
        ) : admins.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            Tidak ada data admin
          </div>
        ) : (
          filteredAdmins.map((admin, index) => (
            <div
              key={admin.id}
              className="bg-amber-100/90 md:w-full lg:min-w-[900px] grid grid-cols-[50px_150px_250px_0px] items-center text-black border-b border-gray-300 px-4 py-3"
            >
              <div>{index + 1}</div>
              <div>{admin.name}</div>
              <div className="line-clamp-2">{admin.email}</div>
              <div className="flex gap-2">
                <Link
                  to={`/admin/edit-akun/${admin.id}`}
                  className="bg-amber-300 text-black px-3 py-1 rounded hover:bg-amber-400 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(admin.id)}
                  className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500 transition"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Konfirmasi Hapus */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-black mb-3">
              Konfirmasi Hapus
            </h2>
            <p className="text-gray-700 mb-5">
              Yakin ingin menghapus akun admin ini?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteLoading}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                {deleteLoading ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Main>
  );
};

export default AdminAccountPage;
