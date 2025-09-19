import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import getCart from "../../Api/Customer/getCart";
import CartItem from "../../Components/CartItem";
import deleteCartItem from "../../Api/Customer/deleteCartItem";
import checkout from "../../Api/Customer/checkout";

const CartPage = () => {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const response = await getCart();
      console.log(response.data);
      // Pastikan ambil response.data.data sesuai struktur dari API
      setCart(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data cart:", error);
      alert("Gagal mengambil keranjang");
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteCartItem(itemId);
      fetchCart(); // reload cart setelah hapus
    } catch (error) {
      console.error("Gagal hapus item", error);
      alert("Gagal menghapus item dari keranjang");
    }
  };
  const handleCheckout = async () => {
    try {
      const response = await checkout();
      alert("Checkout berhasil!", response);
      fetchCart(); // reload cart
    } catch (error) {
      console.error("Gagal checkout:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Checkout gagal.");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="mt-20 mx-5 shadow rounded-md py-5">
        <div className="pl-5 font-semibold mb-5">
          <h2 className="text-2xl">Keranjang</h2>
        </div>

        {!cart ? (
          <p className="text-gray-600 pl-5">Memuat keranjang...</p>
        ) : Array.isArray(cart.items) && cart.items.length > 0 ? (
          <>
            {cart.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onDelete={handleDeleteItem}
                onQuantityChange={fetchCart}
              />
            ))}

            <div className="mt-4 flex justify-between items-center px-5">
              <p className="font-semibold text-lg">
                Total: Rp{" "}
                {cart.items
                  .reduce((total, item) => {
                    const price = item.product?.price ?? 0;
                    const quantity = item.quantity ?? 0;
                    return total + price * quantity;
                  }, 0)
                  .toLocaleString()}
              </p>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleCheckout}
              >
                Checkout Sekarang
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-600 pl-5">Keranjang masih kosong.</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;
