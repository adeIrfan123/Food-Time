import axios from "../axiosInstance";
export const login = (credentials) => {
  return axios.post("/admin/login", credentials);
};

export const loginUser = (credentials) => {
  return axios.post("/user/login", credentials);
};
