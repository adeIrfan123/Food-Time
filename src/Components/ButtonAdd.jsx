import { Link } from "react-router";

const ButtonAdd = ({ to = "#" }) => {
  return (
    <Link
      to={to}
      className="bg-greenForest py-3 px-4 rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.35),inset_0px_2px_4px_rgba(0,0,0,0.1)] cursor-pointer"
    >
      Tambah
    </Link>
  );
};
export default ButtonAdd;
