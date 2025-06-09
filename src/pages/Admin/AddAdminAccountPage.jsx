import { useState } from "react";
import Main from "../../Layouts/main";
import { Link } from "react-router";

const AddAdminAccountPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Main>
      <div className="flex justify-between items-center pt-20">
        <h1 className="text-3xl font-bold text-black">Tambah Akun Admin</h1>
        <Link
          to={"/admin/akun"}
          className="bg-red-600 py-2 px-4 rounded-md text-lg font-bold mb-2 text-white cursor-pointer"
        >
          Batalkan
        </Link>
        {/* <Search /> */}
      </div>
      <div>
        <form action="" className="text-black mt-8">
          <div className="flex gap-20">
            <div className="flex flex-col">
              <label htmlFor="" className="text-2xl">
                Nama
              </label>
              <input
                type="text"
                placeholder="Masukan Nama"
                className="border-2 border-black w-70 py-2 px-3 mt-2 rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-2xl">
                Email
              </label>
              <input
                type="email"
                placeholder="Masukkan Email"
                className="border-2 border-black rounded-md w-70 py-2 px-3 mt-2"
              />
            </div>
          </div>
          <div>
            <div className="mt-5 flex flex-col ">
              <label htmlFor="" className="text-2xl">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan Password"
                className="w-70 border-2 border-black rounded-md py-2 px-3 mt-2"
              />
            </div>
            <div className="mt-2">
              <label htmlFor="showPassword" className="pl-4">
                <input
                  id="showPassword"
                  type="checkbox"
                  onChange={(event) => setShowPassword(event.target.checked)}
                />
                Show Password
              </label>
            </div>
          </div>
          <button className="bg-greenForest py-2 px-4 rounded-md text-lg text-white mt-9 cursor-pointer">
            Tambah Akun
          </button>
        </form>
      </div>
    </Main>
  );
};
export default AddAdminAccountPage;
