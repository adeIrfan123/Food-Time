// src/Api/Customer/addToCart.js
import axiosUser from "../axiosUser";

const addToCart = (product_id, quantity) => {
  return axiosUser.post(`/user/cart/${product_id}`, { quantity: quantity });
};

export default addToCart;
