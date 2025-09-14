import { Outlet } from "react-router-dom";
import Navber from '../components/Navber';
import Sidebar from "./Sidebar";


const Layout = () => {

  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="max-h-screen px-10 py-5 overflow-y-auto grow">
        <Navber />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;