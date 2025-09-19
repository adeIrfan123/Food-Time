import axiosAdmin from "../axiosInstance";

export const userAccounts = (credential) => {
  return axiosAdmin.get("/admin/admin-control", credential);
};
