import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import { routeNames } from "./routeNames";

export default function routePaths() {
  return (
    <Routes>
      <Route exact path={routeNames.home} element={<Login />} />
      <Route exact path={routeNames.auth.login} element={<Login />} />
      <Route exact path={routeNames.dashboard} element={<Dashboard />} />
    </Routes>
  );
}
