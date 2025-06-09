import HeaderDashboard from "../Components/HeaderDashboard";
import SideBarDashboard from "../Components/SideBarDashboard";

const Main = ({ children }) => {
  return (
    <div className="font-poppins">
      <HeaderDashboard />
      <div className="flex">
        <SideBarDashboard />
        <div className="bg-amber-50 w-[83%] min-h-screen p-6">{children}</div>
      </div>
    </div>
  );
};
export default Main;
