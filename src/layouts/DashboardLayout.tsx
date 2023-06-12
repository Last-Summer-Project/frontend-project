import { Outlet, useNavigate } from "react-router-dom";
import "~/assets/scss/dashboard/dashboard.scss";
import Navbar from "../components/Navbar";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { useEffect } from "react";
import { clearMessage, setMessage } from "~/app/slices/message";
import { checkLoggedIn, refreshToken } from "~/app/utils";
import { LANDING } from "~/const/url";
import useInterval from "~/components/useInterval";
interface Props {
  children?: React.ReactElement;
}

const DashboardLayout = ({ children }: Props) => {
  const navigate = useNavigate();

  const auth = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearMessage());

    checkLoggedIn(auth, dispatch).then((result) => {
      if (!result) {
        setMessage("Redirecting to landing page...");
        navigate(LANDING);
      }
    });
  }, [dispatch, auth, navigate]);

  useInterval(() => {
    refreshToken(auth, dispatch).then((result) => {
      if (!result) {
        setMessage("Redirecting to landing page...");
        navigate(LANDING);
      }
    });
  }, 50 * 60 * 1000);

  return (
    <div id="Dashboard">
      <div className="min-height-200 bg-primary position-absolute w-100"></div>
      <Navbar />
      {children || <Outlet />}
    </div>
  );
};

export default DashboardLayout;
