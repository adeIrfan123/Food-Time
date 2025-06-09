import Search from "../../Components/Search";
import Main from "../../Layouts/main";

const LaporanPage = () => {
  return (
    <div>
      <Main>
        <div className="flex justify-between items-center pt-20">
          <h1 className="text-3xl font-bold text-black">Laporan Pemesanan</h1>
          <Search />
        </div>
        <div>
          <div className="overflow-x-auto">
            {/* HEADER */}
            <div className="min-w-[1000px] bg-[#D9D9D9] grid grid-cols-[50px_150px_150px_150px_280px_180px_150px_40px] items-center text-black py-4 mt-8 font-bold shadow-[0px_4px_4px_rgba(0,0,0,0.25),inset_0px_2px_4px_rgba(0,0,0,0.1)] px-4 rounded-t-lg">
              <div>No</div>
              <div>Nama</div>
              <div>Nomor Telepon</div>
              <div>Tanggal</div>
              <div>Detail Makanan</div>
              <div>Status Pemesanan</div>
              <div>Aksi</div>
              <div className="flex justify-center">
                <input type="checkbox" className="w-5 h-5 accent-green-600" />
              </div>
            </div>

            {/* ROW DATA */}
            <div className="min-w-[1000px] bg-amber-100/90 grid grid-cols-[50px_150px_150px_150px_280px_180px_150px_40px] items-center text-black border-b border-gray-300 px-4 py-3">
              <div>1</div> {/* No */}
              <div>Rojak</div> {/* Nama */}
              <div>081219282</div> {/* Nomor Telepon */}
              <div>17-08-2005</div> {/* Tanggal */}
              <div className="line-clamp-2">
                2 rujak buah, 3 ayam goreng, 2 nasi goreng
              </div>{" "}
              {/* Detail Makanan */}
              <div>Menunggu</div> {/* Status Pemesanan */}
              <div className="flex gap-2 items-center">
                <button className="bg-amber-300 text-black px-3 py-1 rounded hover:bg-amber-400 transition">
                  Edit
                </button>
                <button className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500 transition">
                  Hapus
                </button>
              </div>
              <div className="flex justify-center">
                <input type="checkbox" className="w-5 h-5 accent-green-600" />
              </div>
            </div>
          </div>
        </div>
      </Main>
    </div>
  );
};
export default LaporanPage;
