import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/register";
import AddNewDevice from "../pages/page/addNewDevice";
import Automation from "../pages/page/Automation";
import Home from "../pages/page/Home";
import Layout from "../pages/dashboard/Layout";
import Settings from "../pages/page/Settings";
import SortRoomZone from "../pages/page/sortRoom";
import Device from "../pages/page/Device";
import { routeNames } from "../constants/routePath";
import AddRoomZone from "../pages/page/AddRoomZone";
import RoomZoneList from "../pages/page/RoomZoneList";

export default function routePaths() {
  return (
    <Routes>
      <Route exact path={routeNames.auth.home} element={<Login />} />
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
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.addroomzone}`}
          element={<AddRoomZone />}
        />
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.roomzonelist}`}
          element={<RoomZoneList />}
        />
      </Route>
    </Routes>
  );
}
