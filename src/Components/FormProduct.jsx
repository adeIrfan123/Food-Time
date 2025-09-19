import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "../Api/axiosInstance";

const FormProduct = ({ isAdd, id }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: null,
    description: "",
  });

  const [selectedFileName, setSelectedFileName] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false); // state modal
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdd && id) {
      const fetchProduct = async () => {
        try {
          const response = await axiosInstance.get(`/admin/product/${id}`);
          const product = response.data.data;
          setFormData({
            name: product.name_product,
            price: product.price,
            description: product.description,
            image: null,
          });
        } catch (error) {
          console.error("Gagal mengambil data produk:", error);
        }
      };

      fetchProduct();
    }
  }, [isAdd, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setSelectedFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true); // tampilkan modal
  };

  const confirmSubmit = async () => {
    try {
      setSubmitLoading(true);
      const data = new FormData();
      data.append("name_product", formData.name);
      data.append("price", formData.price);
      data.append("description", formData.description);
      if (formData.image) {
        data.append("image", formData.image);
      }

      let response;
      if (isAdd) {
        response = await axiosInstance.post("/admin/product", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axiosInstance.post(
          `/admin/product/${id}?_method=PUT`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }
      setErrorMessages({});
      navigate("/admin/produk");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Validasi dari Laravel (Unprocessable Entity)
        setErrorMessages(error.response.data.errors || {});
      } else {
        console.error("Gagal menyimpan produk:", error.response?.data || error);
      }
    } finally {
      setSubmitLoading(false);
      setShowConfirmModal(false);
    }
  };

  const cancelSubmit = () => {
    setShowConfirmModal(false);
  };

  const title = isAdd ? "Tambah Produk" : "Edit Produk";

  return (
    <div>
      <div className="flex justify-between items-center pt-20">
        <h1 className="text-3xl font-bold text-black">{title}</h1>
        <button
          onClick={() => navigate("/admin/produk")}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Batalkan
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex gap-8">
          <div className="flex flex-col">
            <label className="text-black">Nama Produk</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama Produk"
              className="w-70 px-3 py-2 border border-gray-700 text-black rounded"
              required
            />
            {errorMessages.name_product && (
              <p className="text-red-600 text-sm mt-1">
                {errorMessages.name_product[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-black">Harga</label>
            <input
              type="number"
              min={1}
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Harga"
              className="w-70 px-3 py-2 border border-gray-700 text-black rounded"
              required
            />
            {errorMessages.price && (
              <p className="text-red-600 text-sm mt-1">
                {errorMessages.price[0]}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col py-4 mt-4">
          <label htmlFor="imageInput" className="text-black mb-2">
            Gambar
          </label>
          <div className="relative w-72">
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              className="w-full p-2 border border-black rounded text-black"
              onChange={handleImageChange}
            />
            {errorMessages.image && (
              <p className="text-red-600 text-sm mt-1">
                {errorMessages.image[0]}
              </p>
            )}
            {selectedFileName && (
              <p className="text-sm text-gray-600 mt-1">
                File: {selectedFileName}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label className="text-black">Deskripsi</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Deskripsi"
            className="w-full px-3 py-2 border border-gray-700 text-black rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-greenForest text-white px-4 py-2 mt-5 rounded-md"
        >
          {title}
        </button>
      </form>

      {/* Modal Konfirmasi */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-black mb-3">
              Konfirmasi
            </h2>
            <p className="text-gray-700 mb-5">
              Yakin ingin {isAdd ? "menambahkan" : "mengubah"} produk ini?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelSubmit}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={confirmSubmit}
                disabled={submitLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                {submitLoading ? "Menyimpan..." : "Ya, Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormProduct;
