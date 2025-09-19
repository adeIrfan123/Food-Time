import { Link } from "react-router";

const ButtonAdd = ({ to = "#" }) => {
  // const location = useLocation();
  const path = to.split("/").filter(Boolean);
  const last = path[path.length - 1] || "";

  const label = last
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <Link
      to={to}
      className="bg-greenForest py-3 px-4 rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.35),inset_0px_2px_4px_rgba(0,0,0,0.1)] cursor-pointer text-white font-medium"
    >
      {label}
    </Link>
  );
};
export default ButtonAdd;
