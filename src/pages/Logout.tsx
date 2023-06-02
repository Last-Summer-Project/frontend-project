import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "~/app/hooks";
import { logout } from "~/app/slices/auth";
import { LANDING } from "~/const/url";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logout()).then(() => navigate(LANDING));
  }, [dispatch, navigate]);

  return <></>;
};

export default Logout;
