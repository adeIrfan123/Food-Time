import axios from "../axiosInstance";

export const adminAccounts = (credentials) => {
  return axios.get("/admin/admin-control", credentials);
};
