import Main from "../../layouts/main";
import { Link } from "react-router-dom";
import DynamicHeader from "../../Components/DynamicHeader";
import FormAdminAccount from "../../Components/FormAdminAccount";

const AddAdminAccountPage = () => {
  return (
    <Main>
      <FormAdminAccount />
    </Main>
  );
};
export default AddAdminAccountPage;
