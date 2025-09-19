import axiosUser from "../axiosUser";

const checkout = () => {
  return axiosUser.post("/user/checkout");
};

export default checkout;
