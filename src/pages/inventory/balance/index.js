const InventoryBalancePage = () => {
  return (
    <div>
      <div className="p-4 sm:ml-64">
        <div className="mt-14 rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
          <h1 className="text-2xl"> Inventory Balance Page</h1>
        <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2">Select warehouse</label>
          <select value={warehouse} onChange={handleWarehouseChange} className="border p-2 rounded">
            <option value="Warehouse 1">Warehouse 1</option>
            <option value="Warehouse 2">Warehouse 2</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <input type="text" placeholder="Search..." className="border p-2 rounded mr-2" />
        <div>
          <label className="mr-2">Sort by</label>
          <select value={sortOption} onChange={handleSortChange} className="border p-2 rounded">
            <option value="Highest Stock">Highest Stock</option>
            <option value="Lower Stock">Lower Stock</option>
          </select>
        </div>
      </div>
      <Table columns={columns} data={data} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Save</button>
    </div>
  );
};

export default InventoryBalance;
