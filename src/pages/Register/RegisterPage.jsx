import { useState } from "react";
import { register } from "../../Api/Auth/registerApi";
import { Link, useNavigate } from "react-router";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await register({ email, password, name });
      console.log(response.data);

      if (response.status === 201) {
        setSuccess("Registrasi berhasil, silakan login.");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      // Jika server mengembalikan error (misalnya Laravel API)
      if (err.response && err.response.data) {
        const res = err.response.data;
        console.log(res);
        if (typeof res === "string") {
          setError(res);
        } else if (res.message) {
          setError(res.message);
        } else if (res.errors) {
          // Ambil error pertama dari daftar
          const firstError = Object.values(res.errors)[0];
          setError(firstError[0]);
        } else {
          setError("Registrasi gagal, silakan coba lagi.");
        }
      } else {
        setError("Terjadi kesalahan. Silakan periksa koneksi Anda.");
      }
    }
  };

  return (
    <div>
      <h1 className="text-center text-5xl text-greenForest font-merienda mt-10 md:mt-20 mb-15">
        Food<span className="font-poppins">Time</span>
      </h1>
      <div className="bg-[#AECFA4] w-80 md:w-100 m-auto rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.35),inset_0px_2px_4px_rgba(0,0,0,0.1)]">
        <form
          onSubmit={handleRegister}
          className="flex flex-col font-poppins px-6 md:px-0 gap-4 py-8 md:py-20 w-80 mx-auto"
        >
          <h2 className="text-center text-3xl font-bold">REGISTER</h2>
          <div className="flex flex-col gap-2 mt-5">
            <label htmlFor="name" className="ml-4">
              Nama
            </label>
            <input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="py-2 px-4 rounded-xl bg-white"
              required
            />
            <label htmlFor="email" className="ml-4">
              Email
            </label>
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 px-4 rounded-xl bg-white"
              required
            />
            <label htmlFor="password" className="ml-4">
              Password
            </label>
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="py-2 px-4 rounded-xl bg-white"
              required
            />
            <span className="text-center">
              Sudah punya{" "}
              <Link to="/login" className="text-blue-600">
                akun
              </Link>
              ?
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 bg-white rounded p-2 mt-2 text-sm text-center">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="text-green-700 bg-white rounded p-2 mt-2 text-sm text-center">
              {success}
            </div>
          )}

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-greenForest text-white py-3 w-30 rounded shadow-[0px_4px_4px_rgba(0,0,0,0.35),inset_0px_2px_4px_rgba(0,0,0,0.1)] cursor-pointer"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
