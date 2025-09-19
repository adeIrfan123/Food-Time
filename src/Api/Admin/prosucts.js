import axios from "../axiosInstance";

export const products = (credentials) => {
  return axios.get("/user/product", credentials);
};
