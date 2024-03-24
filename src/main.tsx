import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";
import { SocketContextProvider } from "./provider/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SocketContextProvider>
      {<RouterProvider router={router} />}
    </SocketContextProvider>
  </React.StrictMode>
);
