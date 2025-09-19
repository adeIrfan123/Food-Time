import { useParams, useLocation } from "react-router";
import Main from "../layouts/main";
import FormProduct from "./FormProduct";

const ProductFormPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const isAdd = location.pathname.includes("tambah");

  return (
    <Main>
      <FormProduct isAdd={isAdd} id={id} />
    </Main>
  );
};

export default ProductFormPage;
