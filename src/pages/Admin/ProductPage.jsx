import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../Api/axiosInstance";
import ButtonAdd from "../../Components/ButtonAdd";
import DynamicHeader from "../../Components/DynamicHeader";
import Search from "../../Components/Search";
import Main from "../../layouts/Main";

const ProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null); // untuk modal konfirmasi

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/product");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Gagal mendapatkan produk:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    setDeleteTarget(id);
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/admin/product/${deleteTarget}`);
      setProducts((prev) => prev.filter((item) => item.id !== deleteTarget));
      setDeleteTarget(null);
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
      alert("Terjadi kesalahan saat menghapus produk.");
    }
  };

  const cancelDelete = () => {
    setDeleteTarget(null);
  };

  const filteredProducts = products.filter((product) =>
    product.name_product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Main>
        <div className="flex justify-between items-center pt-20">
          <DynamicHeader />
          <div className="flex gap-5">
            <Search value={searchTerm} onChange={setSearchTerm} />
            <ButtonAdd to="/admin/tambah-produk" />
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <div className="min-w-[900px] bg-[#D9D9D9] grid grid-cols-[50px_150px_300px_100px_1fr_160px] items-center text-black py-4 font-bold shadow px-4 rounded-t-lg">
            <div>No</div>
            <div>Nama Produk</div>
            <div>Deskripsi</div>
            <div>Harga</div>
            <div>Gambar</div>
            <div>Aksi</div>
          </div>

          {loading ? (
            <div className="text-center py-6 text-gray-600">
              Loading produk...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-6 text-gray-600">
              Produk tidak ditemukan.
            </div>
          ) : (
            filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-amber-100/90 min-w-[900px] grid grid-cols-[50px_150px_300px_100px_1fr_160px] items-center text-black border-b border-gray-300 px-4 py-3"
              >
                <div>{index + 1}</div>
                <div>{product.name_product}</div>
                <div className="line-clamp-2 truncate">
                  {product.description}
                </div>
                <div>Rp {Number(product.price).toLocaleString()}</div>
                <div>
                  <img
                    src={`http://localhost:8000/storage/${product.image}`}
                    alt={product.name_product}
                    className="w-16 h-16 object-cover rounded"
                  />
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/admin/edit-produk/${product.id}`}
                    className="bg-amber-300 text-black px-3 py-1 rounded hover:bg-amber-400 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500 transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </Main>

      {/* Modal Konfirmasi Hapus */}
      {deleteTarget !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <div className="bg-white rounded-md shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-black mb-4">
              Konfirmasi Hapus
            </h2>
            <p className="text-sm text-gray-700 mb-6">
              Yakin ingin menghapus produk ini? Tindakan ini tidak dapat
              dibatalkan.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm rounded bg-gray-300 hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm rounded bg-red-500 text-white hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
