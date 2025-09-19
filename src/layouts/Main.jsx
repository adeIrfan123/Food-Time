import { useState } from "react";
import HeaderDashboard from "../Components/HeaderDashboard";
import SideBarDashboard from "../Components/SideBarDashboard";

const Main = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="font-poppins">
      <HeaderDashboard toggleSidebar={toggleSidebar} />
      <div className="flex">
        <SideBarDashboard isOpen={isSidebarOpen} />
        <div className="bg-amber-50 w-full lg:w-[83%] min-h-screen p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Main;
