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

function AddAutomation(props) {
  const navigate = useNavigate();
  const data = "WakeUpLight";
  const data1 = "GoToSleep";
  const data2 = "ComingHome";
  const data3 = "LeavingHome";
  // conat navigateToautomation = useNavigate();
  const navToDashboard = () => {
    navigate(`${routeNames.dashboard}${routeNames.automation}`);
  };

  const toComponentA = (data) => {
    navigate(`${routeNames.dashboard}${routeNames.automationname}`, {
      state: { data },
    });
  };

  return (
    <div className="container ">
      <div className="row pt-3 min-vh-100">
        <div className="col-12">
          <label className="ModuleHeading">
            <Icon
              icon="material-symbols:arrow-right-alt-rounded"
              fontSize={32}
              rotate={2}
              onClick={navToDashboard}
              style={{ cursor: "pointer" }}
            />
          </label>
          <h4 className="mt-2 mx-2">
            What Kind of automation do you want to create?
          </h4>

          <div className="container">
            <div className="row mt-3">
              <div className="col-12 mt-4">
                <div
                  className="card position-relative"
                  onClick={() => {
                    toComponentA(data);
                  }}
                  // onClick={() =>
                  //   navigate(
                  //     `${routeNames.dashboard}${routeNames.automationname}`
                  //   )
                  // }
                >
                  <div className="position-absolute top-0 start-0 p-3">
                    <h4 className="text-white">{data}</h4>
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
                  onClick={() => {
                    toComponentA(data1);
                  }}
                >
                  <div className="position-absolute top-0 start-0 p-3">
                    <h4 className="text-white">{data1}</h4>
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
                  onClick={() => {
                    toComponentA(data2);
                  }}
                >
                  <div className="position-absolute top-0 start-0 p-3">
                    <h4 className="text-white">{data2}</h4>
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
                  onClick={() => {
                    toComponentA(data3);
                  }}
                >
                  <div className="position-absolute top-0 start-0 p-3">
                    <h4 className="text-white">{data3}</h4>
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

export default AddAutomation;
