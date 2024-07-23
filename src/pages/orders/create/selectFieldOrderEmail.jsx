import { useEffect } from "react";

const SelectFieldOrder = ({
  id,
  value,
  onChange,
  options,
  placeholder,
  className,
}) => {
  useEffect(() => {
    const selectElement = document.getElementById(id);
    if (selectElement) {
      if (value === "") {
        selectElement.classList.add("text-gray-400");
      } else {
        selectElement.classList.remove("text-gray-400");
      }
    }
  }, [value, id]);

  return (
    <div className="mb-5">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-400 focus:border-blue-500 focus:ring-blue-500 ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.id} className="text-gray-900">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFieldOrder;
