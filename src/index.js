import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoute from "../src/routes/appRoute";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
      <AppRoute />
    </Router>
);
reportWebVitals();
