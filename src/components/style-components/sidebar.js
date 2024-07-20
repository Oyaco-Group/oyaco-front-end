import React, { useEffect, useState } from "react";
import Menu from "@/components/style-components/sidebar-item/menu-sidebar";
import SidebarDropdown from "@/components/style-components/sidebar-item/dropdown-sidebar";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { TbHomeDot } from "react-icons/tb";
import { MdOutlineInventory2 } from "react-icons/md";
import { RiShoppingBagLine } from "react-icons/ri";
import { BsClipboard2Check } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";
import { TbReport } from "react-icons/tb";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const SidebarMenu = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.role) {
      setUserRole(userData.role);
    }
  }, []);

  const inventoryItems = [
    {
      label: "Products",
      href: "/inventory/products",
    },
    {
      label: "Category",
      href: "/inventory/category",
    },
    {
      label: "Inventory Balance",
      href: "/inventory/balance",
    },
  ];

  const transactionItems = [
    {
      label: "Incoming",
      href: "/transactions/incoming",
    },
    {
      label: "Outgoing",
      href: "/transactions/outgoing",
    },
  ];

  const handleLogout = () => {
    // console.log("click");
    logout();
    router.push("/login");
    toast.success("Log out successfully ");
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed left-0 top-0 z-40 h-screen w-60 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-white px-3 pb-4 shadow-sm">
        <ul className="mt-5 flex h-full flex-col space-y-2">
          <div className="flex-grow">
            {userRole === "admin" && (
              <>
                <Menu
                  href="/dashboard"
                  title="Dashboard"
                  icon={<TbHomeDot className="text-xl" />}
                />
                <Menu
                  href="/user"
                  title="Users"
                  icon={<AiOutlineUser className="text-xl" />}
                />
                <SidebarDropdown
                  label="Inventories"
                  items={inventoryItems}
                  icon={
                    <MdOutlineInventory2 className="text-xl text-blue-500" />
                  }
                />
                <SidebarDropdown
                  label="Transactions"
                  items={transactionItems}
                  icon={<BsClipboard2Check className="text-xl text-blue-400" />}
                />
                <Menu
                  href="/orders"
                  title="Orders"
                  icon={<RiShoppingBagLine className="text-xl" />}
                />
              </>
            )}

            {userRole === "user" && (
              <>
                <Menu
                  href="/product-list"
                  title="Product List"
                  icon={<BsBoxSeam className="text-xl" />}
                />
                <Menu
                  href="/HistoryOrder"
                  title="History Order"
                  icon={<TbReport className="text-xl" />}
                />
              </>
            )}
          </div>
          <div className="mt-auto">
            <Menu
              href="#"
              title="Log out"
              icon={<AiOutlineLogout className="text-xl text-red-600" />}
              className="text-red-500 hover:text-red-700"
              onClick={handleLogout}
            />
          </div>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarMenu;
