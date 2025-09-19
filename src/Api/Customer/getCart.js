// src/Api/Customer/getCart.js
import axiosUser from "../axiosUser";

const getCart = () => {
  return axiosUser.get("/user/cart");
};

export default getCart;
