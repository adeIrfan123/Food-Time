// src/Api/Customer/deleteCartItem.js
import axiosUser from "../axiosUser";

const deleteCartItem = (itemId) => {
  return axiosUser.delete(`/user/cart/item/${itemId}`);
};

export default deleteCartItem;
