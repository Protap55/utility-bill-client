import React from "react";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Navber from "../Components/Navber";

const MainLayout = () => {
  return (
    <div>
      <nav>
        <Navber></Navber>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayout;
