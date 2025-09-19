import gif404 from "../assets/gif404.gif";

const NotFoundPage = () => {
  return (
    <div className="font-poppins bg-black text-white h-screen flex flex-col items-center justify-center px-6 text-center">
      <img
        src={gif404}
        alt="404 Animation"
        className="w-[300px] md:w-[400px] mb-6 rounded-2xl"
      />

      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl font-semibold mb-2">Halaman tidak ditemukan</p>
      <p className="text-md text-gray-400 mb-6">
        Maaf, halaman yang kamu cari tidak tersedia atau telah dipindahkan.
      </p>
      <a
        href="/"
        className="bg-white text-black px-5 py-3 rounded-lg font-medium hover:bg-gray-200 transition"
      >
        Kembali ke Beranda
      </a>
    </div>
  );
};

export default NotFoundPage;
