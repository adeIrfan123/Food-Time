import FeatherIcon from "./FeatherIcons";
import Search from "../Components/Search";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ searchValue, onChange }) => {
  const [showSearch, setShowSearch] = useState(false);
  const wrapperRef = useRef(); // ini akan mencakup ikon + input search

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="shadow-[0px_4px_4px_rgba(0,0,0,0.35),inset_0px_2px_4px_rgba(0,0,0,0.1)] fixed top-0 left-0 right-0 bg-white z-50">
      <div className="px-4 flex items-center justify-between relative">
        <Link
          to={"/"}
          className="text-xl font-semibold py-4 font-merienda text-greenForest"
        >
          Food<span className="font-poppins">Time</span>
        </Link>
        <div className="flex items-center gap-3 relative">
          {/* BUNGKUS icon + input dalam wrapperRef */}
          <div ref={wrapperRef} className="relative">
            <FeatherIcon
              onClick={() => setShowSearch(!showSearch)}
              icon="search"
              className="w-5 h-5 text-black"
            />
            {showSearch && (
              <Search
                value={searchValue}
                onChange={onChange}
                className="absolute -bottom-12 right-0"
              />
            )}
          </div>
          <Link to={"/cart"}>
            <FeatherIcon icon="shopping-cart" className="w-5 h-5" />
          </Link>
          <Link to={"/profile"}>
            <FeatherIcon icon="user" className="w-5 h-5 text-black" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
