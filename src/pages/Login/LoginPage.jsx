import { useState } from "react";
import { login, loginUser } from "../../Api/Auth/loginApi";
import { useNavigate, useLocation, Link } from "react-router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isAdminLogin = location.pathname.includes("/admin");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const loginFn = isAdminLogin ? login : loginUser;
      const response = await loginFn({ email, password });
      const { token, user } = response.data;

      if (isAdminLogin && user.role === "admin") {
        localStorage.setItem("admin_token", token);
        localStorage.removeItem("user_token");
        // localStorage.setItem("admin_info", JSON.stringify(user));
        navigate("/admin");
      } else if (!isAdminLogin && user.role === "user") {
        localStorage.setItem("user_token", token);
        localStorage.removeItem("admin_token");
        // localStorage.setItem("user_info", JSON.stringify(user));
        navigate("/");
      } else {
        setError("Role tidak cocok dengan path login.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-center text-5xl text-greenForest font-merienda mt-10 md:mt-20 mb-15">
        Food<span className="font-poppins">Time</span>
      </h1>
      <div className="bg-[#AECFA4] w-80 md:w-100 m-auto rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.35),inset_0px_2px_4px_rgba(0,0,0,0.1)] ">
        <form
          onSubmit={handleLogin}
          className="flex flex-col font-poppins px-6 md:px-0 gap-4 py-8 md:py-20 w-80 mx-auto"
        >
          <h2 className="text-center text-3xl font-bold">
            LOGIN {isAdminLogin ? "ADMIN" : "USER"}
          </h2>

          <div className="flex flex-col gap-2 mt-5">
            <label className="ml-4">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" py-2 px-4 rounded-xl bg-white"
              required
            />
            <label className="ml-4">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 px-4 rounded-xl bg-white"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          {!isAdminLogin && (
            <span className="text-center">
              Belum punya{" "}
              <Link to="/register" className="text-blue-600">
                akun
              </Link>
              ?
            </span>
          )}

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-greenForest text-white py-3 w-30 rounded shadow-[0px_4px_4px_rgba(0,0,0,0.35),inset_0px_2px_4px_rgba(0,0,0,0.1)] cursor-pointer ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
