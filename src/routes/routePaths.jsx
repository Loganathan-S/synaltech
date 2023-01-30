import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/register";
import Device from "../pages/sidemenu/Device";
import { routeNames } from "./routeNames";
import Bottommenu from "../pages/bottommenu/Bottommenu";
import AddNewDevice from "../pages/bottommenu/addNewDevice";
import Sortroom from "../pages/page/sortRoom";

export default function routePaths() {
  return (
    <Routes>
      <Route exact path={routeNames.auth.login} element={<Login />} />
      <Route exact path={routeNames.auth.register} element={<Register />} />
      <Route path={routeNames.device} element={<Device />} />
      <Route exact path={routeNames.addnewdevice} element={<AddNewDevice />} />
      <Route exact path={routeNames.dashboard} element={<Bottommenu />} />
      <Route exact path={routeNames.sortroom} element={<Sortroom />} />
    </Routes>
  );
}
