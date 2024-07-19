import { usePathname } from "next/navigation";
import Navbar from "../components/style-components/navbar/navbar";
import SidebarMenu from "../components/style-components/sidebar";

const Layout = (props) => {
  const { children } = props;

  const pathname = usePathname();

  const isAuthPath = ["/login", "/register"].includes(pathname);

  return (
    <div className="h-screen">
      {!isAuthPath && (
        <>
          <Navbar />
          <SidebarMenu />
        </>
      )}
      {children}
    </div>
  );
};

export default Layout;
