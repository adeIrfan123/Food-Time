import axiosUser from "../axiosUser";

const userAccount = () => {
  return axiosUser.get("/user/profile");
};
export default userAccount;
