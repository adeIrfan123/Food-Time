import addToCart from "../Api/Customer/cartAdd";
import { useCount } from "../hooks/useCount";

const Product = ({ id, image, name, price, onSuccess, onError }) => {
  const { handleDecrement, handleIncrement, handleInputChange, inputValue } =
    useCount();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const response = await addToCart(id, inputValue);
      console.log("Produk ditambahkan ke keranjang:", response.data);
      if (onSuccess) {
        onSuccess(
          `Berhasil menambahkan ${name} (${inputValue} pcs) ke keranjang`
        );
      }
    } catch (error) {
      console.error(
        "Gagal menambahkan ke keranjang:",
        error?.response?.data || error
      );
      if (onError) {
        onError(
          `Gagal menambahkan ${name} ke keranjang: ${
            error?.response?.data?.message || "Terjadi kesalahan."
          }`
        );
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img src={image} alt={name} className="w-50 h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-sm">{name}</h3>
        <p className="text-black font-bold mb-3">
          Rp{price.toLocaleString("id-ID")}
        </p>
        <form onSubmit={handleAddToCart}>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
            >
              Beli
            </button>
            <div className="bg-green-700 text-white px-3 py-2 rounded flex items-center gap-1">
              <button
                type="button"
                onClick={handleDecrement}
                className="font-semibold"
              >
                -
              </button>
              <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                min={1}
                className="w-12 text-center bg-white text-black rounded"
              />
              <button
                type="button"
                onClick={handleIncrement}
                className="font-semibold"
              >
                +
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
