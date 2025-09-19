import axiosUser from "../axiosUser";

const order = (product_id, quantity) => {
  return axiosUser.post(`/user/order/${product_id}`, { quantity: quantity });
};
export default order;
