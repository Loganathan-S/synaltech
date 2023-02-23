import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../../constants/routePath";
import { useState } from "react";
import wakeup from "../../../assests/images/nolistlight.jpg";
import gotosleep from "../../../assests/images/gotosleep.jpg";
import leavehome from "../../../assests/images/leavinghome.jpg";
import enterhome from "../../../assests/images/enterhome.jpg";
import "../../../assests/css/global.scss";

function HomeList() {
  const navigate = useNavigate();

  const navToDashboard = () => {
    navigate(`${routeNames.dashboard}${routeNames.home}`);
  };

  const navToAutomation = () => {
    navigate(`${routeNames.dashboard}${routeNames.addautomation}`);
  };

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-sm-12 col-md-12">
          <label className="ModuleHeading">
            <Icon
              icon="material-symbols:arrow-right-alt-rounded"
              fontSize={32}
              rotate={2}
              onClick={navToDashboard}
              style={{ cursor: "pointer" }}
            />
          </label>
        </div>
      </div>
      <div className="text-center">
        <img
          src={wakeup}
          alt="addlight"
          className="img-fluid"
          style={{ borderRadius: "50%" }}
        />
      </div>
      <div className="mt-3 text-center ">
        <h4>You don't any automations yet</h4>

        <br />
      </div>
      <div className="mt-3 text-center">
        <p>
          <small className="text-muted ">
            Trigger your lights to turn on or off at a specified time: turn on
            the bedroom at full brigtness in the morning or shut off the entire
            house at bedtime,for example.
          </small>
        </p>
      </div>

      <div className="text-center">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() =>
            navigate(`${routeNames.dashboard}${routeNames.addautomation}`)
          }
        >
          create Autmation
        </button>
      </div>
    </div>
  );
}

export default HomeList;
