import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/register";
import AddNewDevice from "../pages/bottommenu/addNewDevice";
import Automation from "../pages/bottommenu/Automation";
import Home from "../pages/bottommenu/Home";
import Layout from "../pages/bottommenu/Layout";
import Settings from "../pages/bottommenu/Settings";
import SortRoomZone from "../pages/page/sortRoom";
import Device from "../pages/sidemenu/Device";
import { routeNames } from "./routeNames";

export default function routePaths() {
  return (
    <Routes>
      <Route exact path={routeNames.auth.login} element={<Login />} />
      <Route exact path={routeNames.auth.register} element={<Register />} />
      <Route exact path={routeNames.dashboard} element={<Layout />}>
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.home}`}
          element={<Home />}
        />
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.automation}`}
          element={<Automation />}
        />
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.settings}`}
          element={<Settings />}
        />
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.addnewdevice}`}
          element={<AddNewDevice />}
        />
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.sortroom}`}
          element={<SortRoomZone />}
        />
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.device}`}
          element={<Device />}
        />
      </Route>
    </Routes>
  );
}
