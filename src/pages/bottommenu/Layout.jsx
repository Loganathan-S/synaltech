import React from "react";
import { Outlet } from "react-router-dom";
import Bottommenu from "./Bottommenu";

function Layout() {
  return (
    <div className="">
      <div>
        <Outlet />
      </div>
      <div className="mt-5">
        <Bottommenu />
      </div>
    </div>
  );
}

export default Layout;
