import React, { useEffect, useState } from "react";

const DropDownInventory = ({ product, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const [options,setOptions] = useState([])

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };
 
  const addOption = () => {
    const inventory = product.inventory
    let array = [];
    for(const i in inventory) {
        array.push ({
            warehouse : inventory[i].warehouse.name,
            stock : inventory[i].quantity,
            id : inventory[i].id
        })
    }
    setOptions(array);
  }

  useEffect(() => {
    addOption();
},[options])

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-50"
        type="button"
      >
        <span className="sr-only">Action button</span>
        {selectedOption ? (
          <>
            {selectedOption.icon && (
              <span className="mr-2">{selectedOption.icon}</span>
            )}
            {selectedOption.label}
          </>
        ) : (
          "Select..."
        )}
        <svg
          className={`ms-2.5 h-2.5 w-2.5 ${isOpen ? "rotate-180 transform" : ""}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-44 divide-y divide-gray-100 rounded-lg border bg-white shadow-md">
          <ul
            className="py-1 text-xs text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownActionButton"
          >
            {options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSelectOption(option)}
                  className="flex w-full items-center px-4 py-2 text-left hover:bg-blue-50 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {option.warehouse && <span className="mr-2">{option.warehouse}</span>}
                  Stok : {option.stock}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownInventory;
