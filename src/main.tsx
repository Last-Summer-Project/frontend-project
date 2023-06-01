import React from "react";
import ReactDOM from "react-dom/client";
import store from "~/app/store";
import { Provider } from "react-redux";
import router from "~/router.tsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
