import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import Logout from "./pages/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/logout",
    element: <Logout />
  }
]);

export default router;
