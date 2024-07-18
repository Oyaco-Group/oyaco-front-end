import { useState } from "react";
import { useRouter } from "next/router";

const SidebarDropdown = ({ label, items, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleItemClick = (href) => {
    router.push(href);
  };

  return (
    <li className="my-2">
      <button
        type="button"
        className="group flex w-full items-center rounded-lg p-2 text-base text-gray-900 transition duration-75 hover:bg-blue-50 dark:text-white dark:hover:bg-gray-700"
        aria-controls="dropdown-example"
        onClick={toggleDropdown}
      >
        {icon && <span className="mr-2 text-xl">{icon}</span>}
        <span className="ms-3 flex-1 whitespace-nowrap text-left rtl:text-right">
          {label}
        </span>
        <svg
          className={`h-3 w-3 ${isOpen ? "rotate-180 transform" : ""}`}
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
      <ul
        id="dropdown-example"
        className={`space-y-2 py-2 ${isOpen ? "" : "hidden"}`}
      >
        {items.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => handleItemClick(item.href)}
              className="group my-2 flex w-full items-center rounded-lg p-2 pl-11 text-gray-900 transition duration-75 hover:bg-blue-50"
            >
              {item.icon && (
                <span className="mr-2 text-xl font-bold text-blue-400">
                  {item.icon}
                </span>
              )}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default SidebarDropdown;
