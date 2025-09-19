import Main from "../../Layouts/main";
import { Link } from "react-router";
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
