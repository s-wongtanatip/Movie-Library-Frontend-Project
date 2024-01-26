import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import LandingPage from "./pages/landingPage.tsx";
import DetailPage from "./pages/detailPage.tsx";
import MyfavPage from "./pages/myfavPage.tsx";
import SearchPage from "./pages/searchPage.tsx";

import ErrorPage from "./pages/errorPage.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/detail/:id",
      element: <DetailPage />,
    },
    {
      path: "/favorite",
      element: <MyfavPage />,
    },
    {
      path: "/search",
      element: <SearchPage />,
    },]
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
