import Main from "../../Layouts/main";

const AddProductPage = () => {
  return (
    <Main>
      <div className="flex justify-between items-center pt-20 ">
        <h1 className="text-3xl font-bold text-black">Tambah Produk</h1>
        <button>
          <span className="inline-block px-4 py-2 text-white bg-red-500 rounded-md">
            Batalkan
          </span>
        </button>
      </div>
      {/* koding disini */}
      <form>
        <label htmlFor="" className="text-black">
          Nama Produk
        </label>
        <input
          type="text"
          name="name"
          placeholder="Nama Produk"
          className="w-full px-3 py-2 border border-gray-700 text-black rounded"
          required
        />
        <label htmlFor="" className="text-black ">
          Harga
        </label>
        <input
          type="number"
          min={1}
          name="price"
          placeholder="Harga"
          className="w-full px-3 py-2 border border-gray-700 text-black rounded"
          required
        />
        <label htmlFor="" className="text-black">
          Deskripsi
        </label>
        <textarea
          name="description"
          placeholder="Deskripsi"
          className="w-full px-3 py-2 border border-gray-700 text-black rounded"
        ></textarea>

        <button>
          <span className="inline-block px-4 py-2 mt-5 text-white bg-greenForest rounded-md">
            Tambah Produk
          </span>
        </button>
      </form>
    </Main>
  );
};
export default AddProductPage;
