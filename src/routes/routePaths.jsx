import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/register";
import Dashboard from "../pages/dashboard/Dashboard";
import Mapping from "../pages/sidemenu/Mapping";
import Switchbox from "../pages/sidemenu/Switchbox";
import Device from "../pages/sidemenu/Device";
import Settings from "../pages/sidemenu/Settings";
import Synaltech from "../pages/sidemenu/Synaltech";
import { routeNames } from "./routeNames";
import Zone from "../pages/sidemenu/Zone";
import Section from "../pages/sidemenu/Section";
import Location from "../pages/sidemenu/Location";

export default function routePaths() {
  return (
    <Routes>
      <Route exact path={routeNames.auth.login} element={<Login />} />
      <Route exact path={routeNames.dashboard} element={<Dashboard />}>
        <Route
          index
          path={`${routeNames.dashboard}${routeNames.synaltech}`}
          element={<Synaltech />}
        />
        <Route
          path={`${routeNames.dashboard}${routeNames.device}`}
          element={<Device />}
        />
        <Route
          path={`${routeNames.dashboard}${routeNames.switchbox}`}
          element={<Switchbox />}
        />
        <Route
          path={`${routeNames.dashboard}${routeNames.mapping}`}
          element={<Mapping />}
        />
        <Route
          path={`${routeNames.dashboard}${routeNames.settings}`}
          element={<Settings />}
        />
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.zone}`}
          element={<Zone />}
        />
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.section}`}
          element={<Section />}
        />
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.location}`}
          element={<Location />}
        />
      </Route>
      <Route exact path={routeNames.auth.register} element={<Register />} />
    </Routes>
  );
}
