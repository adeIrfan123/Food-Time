import { useEffect, useRef, useState } from "react";
import FeatherIcon from "../../Components/FeatherIcons";
import Navbar from "../../Components/Navbar";
import userAccount from "../../Api/Customer/userAccount";
import editProfile from "../../Api/Customer/editProfile";
import orderHistory from "../../Api/Customer/ordersHistory";
import { useNavigate } from "react-router-dom";
import logout from "../../Api/Auth/logout";

const ProfileUserPage = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [userData, setUserData] = useState(null);
  const [ordersHistory, setOrdersHistory] = useState([]);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const fetched = useRef(false);
  const formRef = useRef(null);
  const editButtonRef = useRef(null);
  const orderHistoryRef = useRef(null);
  const orderButtonRef = useRef(null);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const fetchUserData = async () => {
    try {
      const response = await userAccount();
      setUserData(response.data.data);
    } catch {
      console.error("Gagal mengambil data pengguna");
    }
  };

  useEffect(() => {
    if (!fetched.current) {
      fetchUserData();
      fetched.current = true;
    }
  }, []);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        password: "",
      });
    }
  }, [userData]);

  const toggleEditProfile = () => {
    setShowEditProfile(!showEditProfile);
    if (!showEditProfile) {
      setSuccessMessage("");
      setErrorMessage("");
    }
  };

  const toggleOrderHistory = async () => {
    setShowOrderHistory((prev) => !prev);
    if (!showOrderHistory && ordersHistory.length === 0) {
      try {
        const response = await orderHistory();
        setOrdersHistory(response.data.data);
      } catch (error) {
        console.error(
          "Gagal mengambil riwayat pesanan:",
          error.response?.data || error.message
        );
        alert("Gagal mengambil riwayat pesanan");
      }
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowConfirmModal(true);
  };

  const confirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      await editProfile(formData);
      setSuccessMessage("Profil berhasil diperbarui");
      setErrorMessage("");
      fetchUserData();
      setShowEditProfile(false);
    } catch (error) {
      console.error(
        "Gagal update profil:",
        error.response?.data || error.message
      );
      setErrorMessage("Gagal memperbarui profil");
      setSuccessMessage("");
    } finally {
      setIsSubmitting(false);
      setShowConfirmModal(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showEditProfile &&
        formRef.current &&
        !formRef.current.contains(event.target) &&
        editButtonRef.current &&
        !editButtonRef.current.contains(event.target)
      ) {
        setShowEditProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEditProfile]);

  useEffect(() => {
    const handleClickOutsideOrder = (event) => {
      if (
        showOrderHistory &&
        orderHistoryRef.current &&
        !orderHistoryRef.current.contains(event.target) &&
        orderButtonRef.current &&
        !orderButtonRef.current.contains(event.target)
      ) {
        setShowOrderHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideOrder);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideOrder);
  }, [showOrderHistory]);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000); // 3000 ms = 3 detik

      return () => clearTimeout(timer); // membersihkan timeout jika komponen unmount atau message berubah
    }
  }, [successMessage, errorMessage]);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout gagal:", error);
      alert("Logout gagal. Silakan coba lagi.");
    }
  };

  return (
    <div className="bg-white min-h-screen font-poppins relative">
      <Navbar />

      {successMessage && (
        <div className="absolute top-53 mx-20 md:top-65 p-4 mt-20 bg-green-100 border border-green-400 text-green-700 rounded-md">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="absolute top-53 mx-20 p-4 mt-20 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}
      <div className=" md:flex md:mt-20">
        <div className="md:w-[40%] md:mx-4">
          {userData && (
            <div className="mt-23 md:mt-10 h-30 mx-5 shadow-[0px_4px_4px_rgba(0,0,0,0.35),inset_0px_2px_4px_rgba(0,0,0,0.1)] rounded-md flex md:w-74 lg:w-110">
              <div className="px-4 py-2 flex items-center">
                <FeatherIcon icon="user" className="w-15 h-15" />
              </div>
              <div className="pl-2 flex flex-col justify-center gap-1">
                <p className="font-semibold">{userData.name}</p>
                <p>{userData.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="cursor-pointer flex pr-2 pl-4 pt-5 ml-auto md:ml-0 lg:ml-auto"
              >
                <div className="">
                  <FeatherIcon icon="log-out" className="w-8 h-8" />
                </div>
              </button>
            </div>
          )}

          <div className=" md:w-74 lg:w-110 h-35 mt-5 mx-5 shadow-[0px_4px_4px_rgba(0,0,0,0.35),inset_0px_2px_4px_rgba(0,0,0,0.1)]">
            <div className="flex ml-5 gap-4 md:w-68 lg:w-105">
              <button
                type="button"
                ref={editButtonRef}
                onClick={toggleEditProfile}
                className="mt-4 font-semibold text-green-700 shadow-[0px_4px_4px_rgba(0,0,0,0.35),inset_0px_2px_4px_rgba(0,0,0,0.1)] rounded-md py-2 px-4 cursor-pointer hover:bg-green-100 transition-colors w-13"
              >
                <FeatherIcon
                  icon="edit"
                  className="w-5 h-5 inline-block mr-2"
                />
              </button>
              <button
                type="button"
                ref={orderButtonRef}
                onClick={toggleOrderHistory}
                className="mt-4 font-semibold text-green-700 shadow-[0px_4px_4px_rgba(0,0,0,0.35),inset_0px_2px_4px_rgba(0,0,0,0.1)] rounded-md py-2 px-4 cursor-pointer hover:bg-green-100 transition-colors w-13"
              >
                <FeatherIcon
                  icon="shopping-bag"
                  className="w-5 h-5 inline-block mr-2"
                />
              </button>
            </div>
          </div>
        </div>
        <div className=" sm:w-[60%]">
          {showEditProfile && userData && (
            <div
              ref={formRef}
              className="mt-10 mx-5 shadow-[0px_4px_4px_rgba(0,0,0,0.35),inset_0px_2px_4px_rgba(0,0,0,0.1)] rounded-md py-5"
            >
              <div className="pl-5 font-semibold mb-5">
                <h2 className="text-2xl">Profil Saya</h2>
                <p className="text-gray-600">Kelola informasi akun Anda</p>
              </div>

              <form
                onSubmit={handleFormSubmit}
                className="flex flex-col gap-2 px-5"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-semibold">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="py-2 px-4 rounded-md bg-white border border-gray-300"
                    placeholder="Masukkan nama Anda"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-semibold mt-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="py-2 px-4 rounded-md bg-white border border-gray-300"
                    placeholder="Masukkan email Anda"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="font-semibold mt-3">
                    Ubah Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="py-2 px-4 rounded-md bg-white border border-gray-300"
                    placeholder="Masukkan password baru"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-greenForest text-white py-2 px-4 rounded-md mt-5 shadow-[0px_4px_4px_rgba(0,0,0,0.35),inset_0px_2px_4px_rgba(0,0,0,0.1)] cursor-pointer"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </div>
          )}

          {showOrderHistory && (
            <div
              ref={orderHistoryRef}
              className="mt-10 mx-5 shadow-[0px_4px_4px_rgba(0,0,0,0.35),inset_0px_2px_4px_rgba(0,0,0,0.1)] rounded-md py-5"
            >
              <div className="pl-5 font-semibold mb-5">
                <h2 className="text-2xl">Riwayat Pesanan</h2>
                <p className="text-gray-600">Lihat riwayat pesanan Anda</p>
              </div>

              {ordersHistory.length === 0 ? (
                <p className="text-gray-600 pl-5">Belum ada pesanan.</p>
              ) : (
                ordersHistory.map((order) => (
                  <div
                    key={order.id}
                    className="border-t border-gray-300 pt-4 px-5 mb-5"
                  >
                    <p className="font-semibold">
                      Tanggal: {new Date(order.order_date).toLocaleString()}
                    </p>
                    <p>Status: {order.status}</p>
                    <p>
                      Total: Rp {parseInt(order.total_price).toLocaleString()}
                    </p>

                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 mt-3 border rounded-md p-3 bg-gray-50"
                      >
                        <img
                          src={`http://localhost:8000/storage/${item.product.image}`}
                          alt={item.product.name_product}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div>
                          <p className="font-semibold">
                            {item.product.name_product}
                          </p>
                          <p>Harga: Rp {item.product.price.toLocaleString()}</p>
                          <p>Jumlah: {item.quantity}</p>
                          <p>
                            Subtotal: Rp{" "}
                            {parseInt(item.subtotal).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      {showConfirmModal && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold mb-4">Konfirmasi</h2>
            <p>Apakah Anda yakin ingin menyimpan perubahan profil?</p>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Batal
              </button>
              <button
                onClick={confirmSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                {isSubmitting ? "Menyimpan..." : "Ya, Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUserPage;
