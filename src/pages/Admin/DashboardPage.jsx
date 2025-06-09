import HeaderDashboard from "../../Components/HeaderDashboard";
import MainDashboard from "../../Components/MainDashboard";
import Search from "../../Components/Search";
import SideBarDashboard from "../../Components/SideBarDashboard";
import Main from "../../Layouts/main";

const DashboardPage = () => {
  return (
    <div>
      <Main>
        <div className="flex justify-between items-center pt-20">
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <Search />
        </div>
      </Main>
    </div>
  );
};
export default DashboardPage;
