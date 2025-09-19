import FeatherIcon from "./FeatherIcons";
import { useState } from "react";
import updateCartItem from "../Api/Customer/updateCartItem";

const CartItem = ({ item, onDelete, onQuantityChange }) => {
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const price = item.product?.price ?? 0;
  const quantity = item.quantity ?? 0;
  const subtotal = price * quantity;

  const handleChangeQuantity = async (newQuantity) => {
    if (newQuantity < 1) return;
    try {
      setLoading(true);
      await updateCartItem(item.id, newQuantity);
      onQuantityChange();
    } catch (error) {
      console.error("Gagal update quantity", error);
      alert("Gagal update jumlah");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    setShowConfirm(false);
    onDelete(item.id);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-4 mt-3 border rounded-md p-3 bg-gray-50">
        <div className="flex gap-4 items-center">
          <img
            src={`http://localhost:8000/storage/${item.product.image}`}
            alt={item.product.name_product}
            className="w-20 h-20 object-cover rounded"
          />
          <div>
            <p className="font-semibold">{item.product.name_product}</p>
            <p>Harga: Rp {price.toLocaleString()}</p>
            <div className="flex items-center gap-2 mt-1">
              <button
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => handleChangeQuantity(quantity - 1)}
                disabled={loading}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => handleChangeQuantity(quantity + 1)}
                disabled={loading}
              >
                +
              </button>
            </div>
            <p className="mt-1">Subtotal: Rp {subtotal.toLocaleString()}</p>
          </div>
        </div>
        <button
          className="text-red-500 hover:text-red-700"
          title="Hapus"
          onClick={() => setShowConfirm(true)}
          disabled={loading}
        >
          <FeatherIcon icon="trash" />
        </button>
      </div>

      {/* Modal Konfirmasi */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-3">Konfirmasi Hapus</h3>
            <p className="text-sm text-gray-600 mb-4">
              Apakah Anda yakin ingin menghapus item ini dari keranjang?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowConfirm(false)}
              >
                Batal
              </button>
              <button
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={confirmDelete}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
