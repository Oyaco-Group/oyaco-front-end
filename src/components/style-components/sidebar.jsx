import Menu from "@/components/style-components/sidebar-item/menu-sidebar";
import SidebarDropdown from "@/components/style-components/sidebar-item/dropdown-sidebar";

const SidebarMenu = () => {
  const inventoryItems = [
    { label: "Products", href: "/inventory/products" },
    { label: "Category", href: "/inventory/category" },
    { label: "Inventory Balance", href: "/inventory/balance" },
  ];

  const transactionItems = [
    { label: "In coming", href: "/transactions/incoming" },
    { label: "Out going", href: "/transactions/outgoing" },
  ];

  return (
    <aside
      id="logo-sidebar"
      className="fixed left-0 top-0 z-40 h-screen w-60 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform sm:translate-x-0 dark:border-gray-700 dark:bg-gray-800"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-white px-3 pb-4 shadow-sm dark:bg-gray-800">
        <ul className="mt-2 flex h-full flex-col space-y-2">
          <div className="flex-grow">
            <Menu href="/dashboard" title="Dashboard" />
            <Menu href="/users" title="Users" />
            <SidebarDropdown label="Inventory" items={inventoryItems} />
            <SidebarDropdown label="Transaction" items={transactionItems} />
            <Menu href="/orders" title="Order" />
          </div>
          <div className="mt-auto">
            <Menu href="/login" title="Log out" className="text-red-500 hover:text-red-700" />
          </div>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarMenu;
