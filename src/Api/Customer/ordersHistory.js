import axiosUser from "../axiosUser";

const orderHistory = () => {
  return axiosUser.get("/user/orders-history");
};
export default orderHistory;
