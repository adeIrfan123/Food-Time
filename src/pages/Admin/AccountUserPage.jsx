import { useEffect, useState } from "react";
import { Link } from "react-router";
import DynamicHeader from "../../Components/DynamicHeader";
import Main from "../../Layouts/main";
import Search from "../../Components/Search"; // Asumsikan kamu punya komponen ini
import { userAccounts } from "../../Api/Admin/userAccount";

const AccountUserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userAccounts();
        console.log("Data user:", response.data.data);
        const usersOnly = response.data.data.filter(
          (user) => user.role === "user"
        );
        setUsers(usersOnly);
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const filterUserAccount = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Main>
      <div className="flex justify-between items-center pt-20">
        <DynamicHeader />
        <div className="flex gap-5">
          <Search value={searchTerm} onChange={setSearchTerm} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="md:w-full lg:min-w-[900px] bg-[#D9D9D9] grid grid-cols-[50px_150px_250px] items-center text-black py-4 mt-8 font-bold shadow-[0px_4px_4px_rgba(0,0,0,0.25),inset_0px_2px_4px_rgba(0,0,0,0.1)] px-4 rounded-t-lg">
          <div>No</div>
          <div>Nama</div>
          <div>Email</div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-600">Loading...</div>
        ) : filterUserAccount.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            Tidak ada data user
          </div>
        ) : (
          filterUserAccount.map((user, index) => (
            <div
              key={user.id}
              className="bg-amber-100/90 md:w-full lg:min-w-[900px] grid grid-cols-[50px_150px_250px] items-center text-black border-b border-gray-300 px-4 py-3"
            >
              <div>{index + 1}</div>
              <div>{user.name}</div>
              <div className="line-clamp-2">{user.email}</div>
            </div>
          ))
        )}
      </div>
    </Main>
  );
};

export default AccountUserPage;
