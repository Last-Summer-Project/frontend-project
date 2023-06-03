import {
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import Landing from "./pages/Landing";
import Logout from "./pages/Logout";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Landing />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/dashboard" element={<DashboardLayout/>}>
        <Route index element={<Dashboard />} />
      </Route>
    </Route>
  )
);

export default router;
