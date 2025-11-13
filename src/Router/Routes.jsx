import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/Registration";
import BillDetailsPage from "../Pages/BillDetailsPage";
import PrivateRoute from "./PrivateRoute";
import { createBrowserRouter } from "react-router";
import BillsPage from "../Pages/BillsPage";
import TotalBillsPage from "../Pages/TotalBillsPage";
import MyPayBillsPage from "../Pages/MyPayBillsPage";
import ErrorPage from "../Pages/ErrorPage";
import FaqPage from "../Pages/FaqPage";
import AboutPage from "../Pages/AboutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },

      {
        path: "/all-bills/:id",
        element: (
          <PrivateRoute>
            <BillDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/total-bills/:id",
        element: (
          <PrivateRoute>
            <TotalBillsPage></TotalBillsPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/mypaybills",
        element: (
          <PrivateRoute>
            <MyPayBillsPage></MyPayBillsPage>
          </PrivateRoute>
        ),
      },
      { path: "/bills", element: <BillsPage></BillsPage> },

      { path: "/login", element: <LoginPage /> },

      { path: "/registration", element: <RegisterPage /> },
      { path: "*", element: <ErrorPage></ErrorPage> },
      { path: "/faq", element: <FaqPage></FaqPage> },
      { path: "/about", element: <AboutPage></AboutPage> },
    ],
  },
]);
