import axiosUser from "../axiosUser";

const updateCartItem = (itemId, quantity) => {
  return axiosUser.put(`/user/cart/item/${itemId}`, { quantity });
};

export default updateCartItem;
