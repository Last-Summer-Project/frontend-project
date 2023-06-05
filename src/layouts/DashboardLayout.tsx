import { Outlet } from "react-router-dom";
import "~/assets/scss/dashboard/dashboard.scss"
import Navbar from "../components/Navbar";

interface Props {
  children?: React.ReactElement;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <div className="min-height-200 bg-primary position-absolute w-100"></div>
      <Navbar />
      {children || <Outlet />}
    </>
  );
};

export default DashboardLayout;
