  import React, { useEffect, useState } from "react";
  import Menu from "@/components/style-components/sidebar-item/menu-sidebar";
  import SidebarDropdown from "@/components/style-components/sidebar-item/dropdown-sidebar";
  import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
  import { TbHomeDot } from "react-icons/tb";
  import { MdOutlineInventory2 } from "react-icons/md";
  import { RiShoppingBagLine } from "react-icons/ri";
  import { BsClipboard2Check, BsBoxSeam } from "react-icons/bs";
  import { TbReport } from "react-icons/tb";
  import { LuWarehouse } from "react-icons/lu";

  import { useAuth } from "@/context/authContext";
  import { useRouter } from "next/router";
  import { toast } from "react-toastify";

  const SidebarMenu = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const userData = JSON.parse(atob(token.split(".")[1]));
          setUserRole(userData.role);
        } catch (error) {
          console.error("Error parsing user data from token:", error);
        }
      }
    }, []);

    const adminMenu = [
      {
        href: "/dashboard",
        title: "Dashboard",
        icon: <TbHomeDot className="text-xl" />,
      },
      {
        href: "/user",
        title: "Users",
        icon: <AiOutlineUser className="text-xl" />,
      },
      {
        href: "/warehouses",
        title: "Warehouses",
        icon: <LuWarehouse className="text-xl" />,
      },
      {
        label: "Inventories",
        items: [
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
        ],
        icon: <MdOutlineInventory2 className="text-xl text-blue-500" />,
      },
      {
        label: "Transactions",
        items: [
          {
            label: "Incoming",
            href: "/transactions/incoming",
          },
          {
            label: "Outgoing",
            href: "/transactions/outgoing",
          },
        ],
        icon: <BsClipboard2Check className="text-xl text-blue-400" />,
      },
      {
        href: "/orders",
        title: "Orders",
        icon: <RiShoppingBagLine className="text-xl" />,
      },
    ];

  const userMenu = [
    {
      href: "/product-list",
      title: "Product List",
      icon: <BsBoxSeam className="text-xl" />,
    },
    {
      href: user ? `/history-order/${user.id}` : "#",
      title: "History Order",
      icon: <TbReport className="text-xl" />,
    },
  ];

    const handleLogout = () => {
      logout();
      router.push("/login");
      toast.success("Logged out successfully");
    };

    // Render menu based on userRole
    const renderMenu = () => {
      if (userRole === "admin") {
        return adminMenu.map((menuItem, index) => (
          <React.Fragment key={index}>
            {menuItem.items ? (
              <SidebarDropdown
                label={menuItem.label}
                items={menuItem.items}
                icon={menuItem.icon}
              />
            ) : (
              <Menu
                href={menuItem.href}
                title={menuItem.title}
                icon={menuItem.icon}
              />
            )}
          </React.Fragment>
        ));
      } else if (userRole === "user") {
        return userMenu.map((menuItem, index) => (
          <Menu
            key={index}
            href={menuItem.href}
            title={menuItem.title}
            icon={menuItem.icon}
          />
        ));
      } else {
        return null;
      }
    };

    return (
      <aside
        id="logo-sidebar"
        className="fixed left-0 top-0 z-40 h-screen w-60 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-white px-3 pb-4 shadow-sm">
          <ul className="mt-5 flex h-full flex-col space-y-2">
            <div className="flex-grow">{renderMenu()}</div>
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
