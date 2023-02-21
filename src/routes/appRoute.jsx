import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/register";
import AddNewDevice from "../pages/page/addNewDevice";
import Automation from "../pages/page/Automation/AutomationHome";
import Home from "../pages/page/Home";
import Layout from "../pages/dashboard/Layout";
import Settings from "../pages/page/Settings";
import SortRoomZone from "../pages/page/sortRoom";
import Device from "../pages/page/Device";
import { routeNames } from "../constants/routePath";
import AddRoomZone from "../pages/page/AddRoomZone";
import RoomZoneList from "../pages/page/RoomZoneList";
import Lights from "../pages/page/Zone";
import Rooms from "../pages/page/Room";
import DefaultZone from "../pages/page/DefaultZone";
import DefaultRoom from "../pages/page/DefaultRoom";
import AutomationName from "../pages/page/Automation/AddAutoClock";
import AddAutomation from "../pages/page/Automation/AddAutomation";
import AddLightConfig from "../pages/page/Automation/AddLightConfig";
import EditNameAutomation from "../pages/page/Automation/EditNameAutomation";
import EditAutoLightConfig from "../pages/page/Automation/EditAutoLightConfig";
import RoomLists from "../pages/page/RoomLists";
import ZoneLists from "../pages/ZoneLists";

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
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.lightspage}`}
          element={<Lights />}
        />
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.roomspage}`}
          element={<Rooms />}
        />
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.defaultzone}`}
          element={<DefaultZone />}
        />
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.defaultroom}`}
          element={<DefaultRoom />}
        />
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.roomlists}`}
          element={<RoomLists />}
        />
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.zonelists}`}
          element={<ZoneLists />}
        />
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.addautomation}`}
          element={<AddAutomation />}
        />

        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.automationname}`}
          element={<AutomationName />}
        />
        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.addautolight}`}
          element={<AddLightConfig />}
        />

        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.editname}`}
          element={<EditNameAutomation />}
        />

        <Route
          exact
          path={`${routeNames.dashboard}${routeNames.editlightcongif}`}
          element={<EditAutoLightConfig />}
        />
      </Route>
    </Routes>
  );
}
