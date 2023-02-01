import { Icon } from "@iconify/react";
import { Card } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { routeNames } from "../../routes/routeNames";
import "../../assests/css/global.css";

function Sortroom() {
  const rooms = ["Dining", "Kitchen", "Hall"];
  const zones = ["Ground floor", "First floor", "Second floor"];

  const navigateToDashboard = useNavigate();

  const navToDashboard = () => {
    navigateToDashboard(routeNames.dashboard);
  };

  return (
    <div className="container">
      <div className="row mt-3">
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
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-3 mx-1">
          <label className="FormHeading">Room</label>
        </div>

        {rooms.map((room, index) => (
          <div key={index} className="col-sm-12 col-md-3 mt-2">
            <Card cover hoverable>
              <div className="row">
                <div className="col-9">
                  <p className="FormContent m-0">{room}</p>
                </div>
                <div className="col-3 text-end">
                  <p className="fs-5 m-0">
                    <Icon icon="mdi:database-eye-outline" />
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}

        <div className="col-sm-12 col-md-3 mx-1 mt-2">
          <label className="FormHeading">Zone</label>
        </div>
        {zones.map((zone, index) => (
          <div key={index} className="col-sm-12 col-md-3  mt-2">
            <Card cover hoverable>
              <div className="row">
                <div className="col-9">
                  <p className="FormContent m-0">{zone}</p>
                </div>
                <div className="col-3 text-end">
                  <p className="fs-5 m-0">
                    <Icon icon="mdi:database-eye-outline" />
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sortroom;
