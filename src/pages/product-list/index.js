import { useState, useEffect } from "react";
import { fetchMasterProduct } from "../../fetching/products";
import SearchBar from "@/components/style-components/navbar/searchbar";
import Button from "@/components/style-components/button";

const getImageUrl = (imagePath) => {
  const baseUrl = "http://localhost:8080/api/images/";
  return imagePath ? `${baseUrl}${imagePath}` : "/defaultproducts.png";
};

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchProduct, setSearchProduct] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMasterProduct(page, limit);
        const products = data.data?.masterProduct;
        if (products) {
          setProducts(products);
          setOriginalData(products);
          setFilteredData(products);
        } else {
          console.log("Data tidak ditemukan");
        }
      } catch (error) {
        console.error("Error fetching master product data:", error);
      }
    };

    fetchData();
  }, [page, limit]);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchProduct(value);
    filterProduct(value);
  };

  const filterProduct = (valueSearch) => {
    let filteredMaster = originalData;

    if (valueSearch) {
      filteredMaster = filteredMaster.filter(
        (product) =>
          product.name.toLowerCase().includes(valueSearch.toLowerCase()) ||
          product.sku.toLowerCase().includes(valueSearch.toLowerCase())
      );
    }
    setFilteredData(filteredMaster);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  const groupedProducts = filteredData.reduce((acc, product) => {
    const category = product.category.name || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="p-4 sm:ml-64">
      <div className="mt-14 p-4 dark:border-gray-700">
        <h1 className="text-4xl mt-10 mb-10">Product List</h1>
        <SearchBar
          className="w-3/4"
          onChange={handleSearchInputChange}
          value={searchProduct}
        />
        {Object.keys(groupedProducts).map((category) => (
          <div key={category}>
            <h2 className="text-xl my-8">{category}</h2>
            <div className="grid grid-cols-5 gap-4">
              {groupedProducts[category].map((product) => (
                <div
                  key={product.id}
                  className="product-card rounded-lg border-2 p-4"
                >
                  <img
                    src={getImageUrl(product?.image)}
                    alt={product?.name || "Product"}
                    width={200}
                    height={200}
                    onError={(e) => (e.target.src = "/defaultproducts.png")}
                  />
                  <div className="flex justify-between">
                    <h2>{product.name}</h2>
                    <p className="text-blue-400">
                      {formatRupiah(product.price)}
                    </p>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button onClick={() => handleProductClick(product)}>
                      See more detail
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* {selectedProduct && (
          <div className="product-details">
            <button onClick={handleCloseDetails}>X</button>
            <h2>Product Details</h2>
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <p>{selectedProduct.name}</p>
            <p>{selectedProduct.price}</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Products;
