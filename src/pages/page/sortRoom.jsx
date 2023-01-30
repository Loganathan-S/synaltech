import { Icon } from "@iconify/react";
import { Card } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { routeNames } from "../../routes/routeNames";

function Sortroom() {
  const [rooms, setSortRooms] = useState([
    "Dining",
    "Kitchen",
    "Hall",
    "Bedroom",
    "Theatre",
    "Bathroom",
  ]);

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
            <span>&nbsp;Sort Room</span>
          </label>
        </div>
      </div>
      <div className="row">
        {rooms.map((room, index) => (
          <div key={index} className="col-sm-12 col-md-3  mt-2">
            <Card cover hoverable>
              <div className="row">
                <div className="col-9">
                  <p className="fs-5 m-0">{room}</p>
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
