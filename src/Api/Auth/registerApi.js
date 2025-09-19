import axiosInstance from "../axiosInstance";

export const register = (userData) => {
  return axiosInstance.post("/user/registrasi", userData);
};
