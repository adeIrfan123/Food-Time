import axiosUser from "../axiosUser";

const updateProfile = async (data) => {
  return axiosUser.put("/user/edit-profile", data);
};
export default updateProfile;
