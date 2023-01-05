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
        path={routeNames.home}
        element={
          <Suspense>
            <Login />
          </Suspense>
        }
      ></Route>
      <Route
        path={routeNames.auth.login}
        element={
          <Suspense>
            <Login />
          </Suspense>
        }
      ></Route>
      <Route
        path={routeNames.auth.register}
        element={
          <Suspense>
            <Register />
          </Suspense>
        }
      ></Route>
      <Route
        path={routeNames.dashboard}
        element={
          <Suspense>
            <Dashboard />
          </Suspense>
        }
      ></Route>
    </Routes>
  );
}
