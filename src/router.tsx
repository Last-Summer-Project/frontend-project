import { createBrowserRouter } from "react-router-dom";
import App from "~/App";
import LandingPage from "./views/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
]);

export default router;
