import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Landing from "./pages/Landing";
import Logout from "./pages/Logout";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Index";
import Picture from "./pages/dashboard/Picture";
import { DASHBOARD, LANDING, LOGOUT } from "./const/url";
import Sick from "./pages/dashboard/Sick";
import Video from "./pages/dashboard/Video/Index";
import VideoNew from "./pages/dashboard/Video/New";
import VideoEdit from "./pages/dashboard/Video/Edit";
import Upload from "./pages/dashboard/Upload";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={LANDING} element={<Landing />} />
      <Route path={LOGOUT} element={<Logout />} />
      <Route path={DASHBOARD.INDEX} element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path={DASHBOARD.PICTURE} element={<Picture />} />
        <Route path={DASHBOARD.SICK} element={<Sick />} />
        <Route path={DASHBOARD.VIDEO} element={<Video />} />
        <Route path={DASHBOARD.VIDEO_NEW} element={<VideoNew />} />
        <Route path={DASHBOARD.VIDEO_EDIT} element={<VideoEdit />} />
        <Route path={DASHBOARD.UPLOAD} element={<Upload />} />
      </Route>
    </Route>
  )
);

export default router;
