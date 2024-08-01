import SearchBar from "@/components/style-components/navbar/searchbar";
import UserMenu from "@/components/style-components/navbar/profile-menu";

const Navbar = () => {
  return (
    <header>
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-blue-400">
        <div className="px-3 py-3 lg:px-10 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="h-6 w-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              {/* <svg
                className='h-8 me-3'
                version='1.1'
                viewBox='0 0 2048 853'
                xmlns='http://www.w3.org/2000/svg'
              ></svg> */}
              <div className="ms-2 flex md:me-24">
                <img
                  src="/OyaCo.png"
                  className="h-16 my-0 py-0"
                  alt="Oyaco Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold text-white sm:text-3xl">
                  OyaCo.
                </span>
              </div>
            </div>
            {/* Search bar navbar */}
            <SearchBar className="w-full max-w-lg" />
            <UserMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
