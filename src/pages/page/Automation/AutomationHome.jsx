import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../assests/css/global.scss";
import { routeNames } from "../../../constants/routePath";
import { Button, Modal } from "antd";
import { useState } from "react";
import wakeup from "../../../assests/images/wakeuplight.jpg";
import gotosleep from "../../../assests/images/gotosleep.jpg";
import leavehome from "../../../assests/images/leavinghome.jpg";
import enterhome from "../../../assests/images/enterhome.jpg";

function Automation(props) {
  const navigate = useNavigate();

  const navToDashboard = () => {
    navigate(`${routeNames.dashboard}${routeNames.home}`);
  };

  const navToAutomation = () => {
    navigate(`${routeNames.dashboard}${routeNames.addautomation}`);
  };

  return (
    <div className="container ">
      <div className="mt-3">
        <div className="row">
          <div className="col-12">
            <label className="ModuleHeading">
              <Icon
                icon="material-symbols:arrow-right-alt-rounded"
                fontSize={32}
                rotate={2}
                onClick={navToDashboard}
                style={{ cursor: "pointer" }}
              />
              <span className="">&nbsp;Automation</span>
            </label>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <div className="text-end">
            <Icon
              icon="fa:plus-circle"
              color="#2596be"
              height={33}
              className="pointer"
              onClick={navToAutomation}
            />
          </div>

          <div className="container">
            <div className="row mt-3">
              <div className="col-12 mt-4">
                <div
                  className="card position-relative"
                  onClick={() =>
                    navigate(`${routeNames.dashboard}${routeNames.editname}`)
                  }
                >
                  <div className="position-absolute top-0 start-0 p-3">
                    <h4 className="text-white">Wake up light</h4>
                  </div>
                  <img
                    src={wakeup}
                    className="card-img-top"
                    alt="..."
                    height={150}
                  />
                </div>
              </div>

              <div className="col-12 mt-4" style={{ width: "25rem" }}>
                <div
                  className="card position-relative"
                  // onClick={() =>
                  //   navigate(`${routeNames.dashboard}${routeNames.defaultroom}`)
                  // }
                >
                  <div className="position-absolute top-0 start-0 p-3">
                    <h4 className="text-white">Go to Sleep</h4>
                  </div>
                  <img
                    src={gotosleep}
                    className="card-img-top"
                    alt="..."
                    height={150}
                  />
                </div>
              </div>

              <div className="col-12 mt-4" style={{ width: "25rem" }}>
                <div
                  className="card position-relative"
                  // onClick={() =>
                  //   navigate(`${routeNames.dashboard}${routeNames.defaultroom}`)
                  // }
                >
                  <div className="position-absolute top-0 start-0 p-3">
                    <h4 className="text-white">Coming Home</h4>
                  </div>
                  <img
                    src={leavehome}
                    className="card-img-top"
                    alt="..."
                    height={150}
                  />
                </div>
              </div>

              <div className="col-12 mt-4" style={{ width: "25rem" }}>
                <div
                  className="card position-relative"
                  // onClick={() =>
                  //   navigate(`${routeNames.dashboard}${routeNames.defaultroom}`)
                  // }
                >
                  <div className="position-absolute top-0 start-0 p-3">
                    <h4 className="text-white">Leaving home</h4>
                  </div>
                  <img
                    src={enterhome}
                    className="card-img-top"
                    alt="..."
                    height={150}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Automation;
