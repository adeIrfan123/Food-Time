import { useEffect, useState } from "react";
import DynamicHeader from "./DynamicHeader";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../Api/axiosInstance";

const FormAdminAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddPage = location.pathname.includes("tambah");
  const title = isAddPage ? "Tambah Admin" : "Edit Admin";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin", // lowercase sesuai backend
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAddPage && id) {
      axiosInstance
        .get(`/admin/admin-control/${id}`)
        .then((res) => {
          const { name, email, role } = res.data;
          setFormData((prev) => ({
            ...prev,
            name,
            email,
            role: role.toLowerCase(),
          }));
        })
        .catch((err) => {
          console.error("Gagal fetch admin:", err);
        });
    }
  }, [id, isAddPage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openConfirmModal = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const cancelSubmit = () => {
    setShowConfirmModal(false);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setErrors({});
      const payload = { ...formData };

      if (!isAddPage && !formData.password) {
        delete payload.password;
      }

      if (isAddPage) {
        await axiosInstance.post("/admin/admin-control", payload);
      } else {
        await axiosInstance.put(`/admin/admin-control/${id}`, payload);
      }

      navigate("/admin/akun");
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data);
        console.error("Validasi gagal:", error.response.data);
      } else {
        alert("Terjadi kesalahan saat menyimpan data admin.");
      }
    } finally {
      setShowConfirmModal(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center pt-20">
        <DynamicHeader />
        <Link
          to="/admin/akun"
          className="bg-red-600 py-2 px-4 rounded-md text-lg font-bold mb-2 text-white cursor-pointer"
        >
          Batalkan
        </Link>
      </div>

      <form onSubmit={openConfirmModal} className="text-black mt-8">
        <div className="flex gap-20">
          <div className="flex flex-col">
            <label className="text-2xl">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan Nama"
              required
              className="border-2 border-black w-70 py-2 px-3 mt-2 rounded-md"
            />
            {errors.name && <p className="text-red-500">{errors.name[0]}</p>}
          </div>
          <div className="flex flex-col">
            <label className="text-2xl">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan Email"
              required
              className="border-2 border-black rounded-md w-70 py-2 px-3 mt-2"
            />
            {errors.email && <p className="text-red-500">{errors.email[0]}</p>}
          </div>
        </div>

        <div className="flex items-center gap-20">
          <div>
            <div className="mt-5 flex flex-col">
              <label className="text-2xl">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan Password"
                className="w-70 border-2 border-black rounded-md py-2 px-3 mt-2"
                required={isAddPage}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password[0]}</p>
              )}
            </div>
            <div className="mt-2">
              <label htmlFor="showPassword" className="pl-4">
                <input
                  id="showPassword"
                  type="checkbox"
                  onChange={(e) => setShowPassword(e.target.checked)}
                />{" "}
                Show Password
              </label>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-2xl">Peran</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border border-black rounded-md px-4 py-2"
            >
              <option value="admin">Admin</option>
              <option value="user">Customer</option>
            </select>
            {errors.role && <p className="text-red-500">{errors.role[0]}</p>}
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 py-2 px-4 rounded-md text-lg text-white mt-9 cursor-pointer"
        >
          {title}
        </button>
      </form>

      {/* Modal Konfirmasi */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-black mb-3">
              Konfirmasi {isAddPage ? "Tambah" : "Edit"}
            </h2>
            <p className="text-gray-700 mb-5">
              Yakin ingin {isAddPage ? "menambahkan" : "menyimpan perubahan"}?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelSubmit}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                {isSubmitting
                  ? isAddPage
                    ? "Menambahkan..."
                    : "Menyimpan..."
                  : "Ya, Lanjut"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormAdminAccount;
