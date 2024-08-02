import { useState, useEffect } from "react";
import fetchMaster from "../../fetching/products"; // Pastikan path ini benar
import SearchBar from "@/components/style-components/navbar/searchbar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMaster(page, limit);
        console.log("Fetched data:", data); // Debug log
        if (data && data.products) {
          setProducts(data.products); // Set produk setelah data diterima
        } else {
          console.log("Data tidak ditemukan");
        }
      } catch (error) {
        console.error("Error fetching master product data:", error);
      }
    };

    fetchData();
  }, [page, limit]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="mt-14 p-4 dark:border-gray-700">
        <h1 className="text-4xl mt-10 mb-10">Product List</h1>
        <div className="grid grid-cols-1 gap-4">
          <SearchBar className="w-full" />
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.price}</p>
                <button onClick={() => handleProductClick(product)}>
                  See more detail
                </button>
              </div>
            ))}
          </div>
          {selectedProduct && (
            <div className="product-details">
              <button onClick={handleCloseDetails}>X</button>
              <h2>Product Details</h2>
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              <p>{selectedProduct.name}</p>
              <p>{selectedProduct.price}</p>
              {/* Tambahan properti yang lain */}
              {/* <p>{selectedProduct.description}</p> */}
            </div>
          )}
          <style jsx>{`
            .product-list {
              display: flex;
              flex-wrap: wrap;
            }
            .product-card {
              border: 1px solid #ccc;
              padding: 10px;
              margin: 10px;
              width: calc(25% - 40px);
              box-sizing: border-box;
            }
            .product-details {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: #fff;
              padding: 20px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default Products;
