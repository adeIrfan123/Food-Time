import ButtonAdd from "../../Components/ButtonAdd";
import Search from "../../Components/Search";
import Main from "../../Layouts/main";

const AdminAccountPage = () => {
  return (
    <Main>
      <div className="flex justify-between items-center pt-20">
        <h1 className="text-3xl font-bold text-black">Admin Account</h1>
        <div className="flex gap-5">
          <Search />
          <ButtonAdd to="/admin/tambah-akun" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[900px] bg-[#D9D9D9] grid grid-cols-[50px_150px_250px_650px_60px] items-center text-black py-4 mt-8 font-bold shadow-[0px_4px_4px_rgba(0,0,0,0.25),inset_0px_2px_4px_rgba(0,0,0,0.1)] px-4 rounded-t-lg">
          <div>No</div>
          <div>Nama</div>
          <div>Email</div>
          <div>Aksi</div>
          <div>
            <input type="checkbox" className="w-5 h-5 accent-green-600" />
          </div>
        </div>
        <div className="bg-amber-100/90 min-w-[900px] grid grid-cols-[50px_150px_250px_650px_60px] items-center text-black border-b border-gray-300 px-4 py-3">
          <div>1</div>
          <div>Ujang</div>
          <div className="line-clamp-2">Ujang@gmail.com</div>
          <div className="flex gap-2">
            <button className="bg-amber-300 text-black px-3 py-1 rounded hover:bg-amber-400 transition">
              Edit
            </button>
            <button className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500 transition">
              Hapus
            </button>
          </div>
          <div>
            <input type="checkbox" className="w-5 h-5 accent-green-600" />
          </div>
        </div>
      </div>
    </Main>
  );
};
export default AdminAccountPage;
