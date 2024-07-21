const InventoryBalancePage = () => {
  const [sortOrder, setSortOrder] = useState(null);
  const [warehouse, setWarehouse] = useState("Warehouse 1");

  const handleSort = (order) => {
    setSortOrder(order);
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="mt-14 rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
        <h1 className="text-2xl">Inventory Balance</h1>
        <div className="flex justify-between mt-4">
          <select
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
            className="border rounded p-2"
          >
            <option value="Warehouse 1">Warehouse 1</option>
            <option value="Warehouse 2">Warehouse 2</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            className="border rounded p-2"
          />
          <div className="relative">
            <button
              onClick={() =>
                setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))
              }
              className="border rounded p-2"
            >
              Sort by
            </button>
            {sortOrder && (
              <div className="absolute bg-white border rounded shadow mt-2 right-0">
                <button
                  onClick={() => handleSort("desc")}
                  className="block w-full text-left p-2"
                >
                  Highest Stock
                </button>
                <button
                  onClick={() => handleSort("asc")}
                  className="block w-full text-left p-2"
                >
                  Lower Stock
                </button>
              </div>
            )}
          </div>
        </div>
        <table className="min-w-full mt-4 border">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">SKU</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Book Stock</th>
              <th className="border px-4 py-2">Stock Opname</th>
              <th className="border px-4 py-2">Price/pcs</th>
              <th className="border px-4 py-2">Input Stock Opname</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">ABCD24</td>
              <td className="border px-4 py-2">Biscuit</td>
              <td className="border px-4 py-2">Baby food</td>
              <td className="border px-4 py-2">100</td>
              <td className="border px-4 py-2">
                <input type="number" className="border p-1 w-full" />
              </td>
              <td className="border px-4 py-2">Rp. 20.000</td>
              <td className="border px-4 py-2">
                <input type="number" className="border p-1 w-full" />
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
        <button className="mt-4 border rounded p-2 bg-blue-500 text-white">
          Save
        </button>
      </div>
    </div>
  );
};

export default InventoryBalancePage;
