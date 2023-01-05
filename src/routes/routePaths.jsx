import React, { lazy, Suspense } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Route, Routes } from "react-router-dom";
import { routeNames } from "./routeNames";

const Login = lazy(() => import("../pages/auth/login"));
const Register = lazy(() => import("../pages/auth/register"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));

export default function routePaths() {
  return (
    <Routes>
      <Route
        exact
        path={routeNames.home}
        element={
          <Suspense fallback={null}>
            <Login />
          </Suspense>
        }
      ></Route>
      <Route
        path={routeNames.auth.login}
        element={
          <Suspense fallback={null}>
            <Login />
          </Suspense>
        }
      ></Route>
      <Route
        path={routeNames.auth.register}
        element={
          <Suspense fallback={null}>
            <Register />
          </Suspense>
        }
      ></Route>
      <Route
        path={routeNames.dashboard}
        element={
          <Suspense fallback={null}>
            <Dashboard />
          </Suspense>
        }
      ></Route>
    </Routes>
  );
}
