import axiosInstance from "../axiosInstance";

export const product = () => {
  return axiosInstance.get("/user/product");
};
