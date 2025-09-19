import { useEffect, useState, useRef } from "react";
import Navbar from "../../Components/Navbar";
import Product from "../../Components/Product";
import { product } from "../../Api/Customer/productApi";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const fetched = useRef(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await product();
      setProducts(response.data.data);
      setFilteredProducts(response.data.data);
    } catch {
      console.log("Gagal mendapatkan produk");
    }
  };

  useEffect(() => {
    if (!fetched.current) {
      fetchProducts();
      fetched.current = true;
    }
  }, []);

  useEffect(() => {
    const keyword = searchKeyword.toLowerCase();
    const result = products.filter((item) =>
      item.name_product.toLowerCase().includes(keyword)
    );
    setFilteredProducts(result);
  }, [searchKeyword, products]);

  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-18">
      <Navbar searchValues={searchKeyword} onChange={setSearchKeyword} />

      <div className="p-6 font-poppins">
        {successMessage && (
          <div className="bg-green-600 text-white py-2 px-4 rounded mb-4">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-600 text-white py-2 px-4 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <div className="overflow-x-auto">
          <div className="flex gap-4 w-max">
            {filteredProducts.map((item) => (
              // <Product
              //   key={item.id}
              //   id={item.id}
              //   image={`http://localhost:8000/storage/${item.image}`}
              //   name={item.name_product}
              //   price={item.price}
              //   onSuccess={handleSuccess}
              //   onError={handleError}
              // />
              <Product
                key={item.id}
                id={item.id}
                image={`http://localhost:8000/storage/${item.image}`}
                name={item.name_product}
                price={item.price}
                onSuccess={handleSuccess}
                onError={handleError}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
