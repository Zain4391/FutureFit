import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import Landing from "./pages/Landing";
import Report from "./pages/Report";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/report",
        element: <Report />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
