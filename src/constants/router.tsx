import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Orphans from "../pages/Orphans";
import Projects from "../pages/Projects";
import Requests from "../pages/Requests";
import AboutUs from "../pages/AboutUs";
import DonationSuccess from "../pages/DonationSuccess";
import DonationCancel from "../pages/DonationCancel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "Home", element: <Navigate to="/" replace /> },
      { path: "orphans", element: <Orphans /> },
      { path: "projects", element: <Projects /> },
      { path: "requests", element: <Requests /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "donation/success", element: <DonationSuccess /> },
      { path: "donation/cancel", element: <DonationCancel /> },
    ],
  },
]);
