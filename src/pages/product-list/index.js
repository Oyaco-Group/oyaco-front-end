import { useState } from "react";

const ProductListPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="p-4 sm:ml-64">
      <div className="mt-14 rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
        <h1 className="text-2xl mb-4">Product List</h1>
        <input
          type="text"
          placeholder="Search..."
          className="mb-4 p-2 border rounded w-full"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded">
              <img src={product.image} alt={product.name} className="mb-2" />
              <h2 className="text-xl">{product.name}</h2>
              <p className="text-gray-500">{product.price}</p>
              <button
                className="mt-2 p-2 bg-blue-500 text-white rounded"
                onClick={() => setSelectedProduct(product)}
              >
                See more detail
              </button>
            </div>
          ))}
        </div>
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded shadow-lg relative w-11/12 md:w-1/2">
              <button
                className="absolute top-2 right-2 text-gray-500"
                onClick={() => setSelectedProduct(null)}
              >
                X
              </button>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="mb-2"
              />
              <h2 className="text-2xl">{selectedProduct.name}</h2>
              <p className="text-gray-500">{selectedProduct.price}</p>
              <p>{selectedProduct.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
