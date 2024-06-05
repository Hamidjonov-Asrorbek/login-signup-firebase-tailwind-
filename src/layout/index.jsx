import Header from "../components/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import Products from "../pages/Products";
import Cards from "../pages/Cards";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
