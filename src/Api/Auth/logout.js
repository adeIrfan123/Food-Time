import axiosUser from "../axiosUser";

const logout = async () => {
  try {
    await axiosUser.post("user/logout");

    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_info");
    localStorage.removeItem("user_token"); // jika kamu simpan user id
    localStorage.removeItem("user_name"); // jika kamu simpan nama

    window.location.href = "/login";
  } catch (error) {
    console.error("Logout gagal:", error);
  }
};

export default logout;
