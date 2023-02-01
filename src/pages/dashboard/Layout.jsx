import React from "react";
import { Outlet } from "react-router-dom";
import NavbarMenu from "../../components/navbar/NavbarMenu";

function Layout() {
  return (
    <div className="">
      <div>
        <Outlet />
      </div>
      <div className="mt-5">
        <NavbarMenu />
      </div>
    </div>
  );
}

export default Layout;
