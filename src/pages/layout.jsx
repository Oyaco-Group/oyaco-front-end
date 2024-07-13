import React from "react";
import NavbarHeader from "@/components/style-components/navbar";
import SidebarLeft from "@/components/style-components/sidebar";

export default function Layout(props) {
  const { children } = props;
  return (
    <div>
      <NavbarHeader />
      <SidebarLeft />
      {children}
    </div>
  );
}
