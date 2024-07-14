import Navbar from "../components/style-components/navbar";
import SidebarMenu from "../components/style-components/sidebar";

const Layout = (props) => {
  const { children } = props;
  return (
    <div>
      <Navbar />
      <SidebarMenu />
      {children}
    </div>
  );
};

export default Layout;
