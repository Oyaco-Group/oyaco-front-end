import { useState } from "react";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center">
      <div className="ms-3 flex items-center">
        <div className="relative flex items-center justify-center">
          <button
            type="button"
            className="flex rounded-full bg-white py-1.5 pl-2 pr-5 text-sm focus:ring-4 focus:ring-gray-300"
            aria-expanded={isOpen ? "true" : "false"}
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="h-10 w-10 rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
              alt="profile picture"
            />
            <div className="ms-3 space-y-0.5 text-left font-medium text-gray-500 rtl:text-right">
              <div className="mt-2">| Admin</div>
            </div>
          </button>

          {isOpen && (
            <div
              className="absolute right-0 mt-[250px] w-48 list-none divide-y divide-gray-100 rounded bg-white text-base shadow-md"
              id="dropdown-user"
            >
              <div className="px-4 py-3">
                <p className="text-sm text-blue-600 dark:text-white">
                  Hi, Neil Sims!
                </p>
                <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-300">
                  neil.sims@oyaco.com
                </p>
              </div>
              <ul className="py-1">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Edit Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Log out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
