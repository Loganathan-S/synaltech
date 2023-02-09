import { Icon } from "@iconify/react";
import { Card } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { routeNames } from "../../constants/routePath";
import "../../assests/css/global.scss";

function Rooms() {
  const rooms = ["Dining hall_1", "Dining hall_2", "Dining hall_3"];
  const navigateToDashboard = useNavigate();
  const navToDashboard = () => {
    navigateToDashboard(`${routeNames.dashboard}${routeNames.home}`);
  };

  return (
    <div className="container">
      <div className="row bg_color pt-3 pb-3  rounded-bottom">
        <div className="col-10">
          <label className="ModuleHeading">
            <Icon
              icon="material-symbols:arrow-right-alt-rounded"
              fontSize={32}
              rotate={2}
              style={{ cursor: "pointer" }}
              onClick={navToDashboard}
            />
            <span>&nbsp;Dinning Hall</span>
          </label>
        </div>
        <div className="col-2">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
            />
          </div>
        </div>
        <div className="">
          <input type="range" className="w-100 pt-3 pb-3" />
        </div>
      </div>

      <div className="row mt-2 ">
        <div className="text-end">
          <Icon
            icon="fa:plus-circle"
            color="#2596be"
            width="35"
            height="35"
            className="pointer"
          />
        </div>
        <p className="m-o FormContent">My scenes</p>
        <div>
          <Card
            style={{
              width: 350,
              height: 100,
            }}
          ></Card>
        </div>
        <p className="m-0 mt-3 FormContent">LIGHTS</p>
        <div className="text-center mt-2">
          <div className="d-flex flex-row flex-nowrap overflow-auto">
            {/* <Card cover hoverable className="bg_color">
              <div className="row ">
                <div className="col-12">
                  <Icon icon="material-symbols:database" className="fs-2" />
                </div>
                <div className="col-12">
                  <p className="m-0 FormPlaceholder" style={{ color: "white" }}>
                    Dining hall 1
                  </p>
                  <p className="m-0 FormPlaceholder" style={{ color: "white" }}>
                    unreachable
                  </p>
                </div>
                <div className="col-12 mx-3 mt-2">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckChecked"
                    />
                  </div>
                </div>
              </div>
            </Card> */}
            {rooms.map((room, indx) => (
              <div
                className="card card-block mx-2 bg_color"
                style={{ minWidth: "150px" }}
                key={indx}
              >
                <div className="mt-2" style={{ color: "white" }}>
                  <Icon icon="material-symbols:database" className="fs-2" />
                </div>

                <p className="m-0 FormPlaceholder" style={{ color: "white" }}>
                  {room}
                </p>
                <p className="m-0 FormPlaceholder" style={{ color: "white" }}>
                  unreachable
                </p>
                <div className="form-check form-switch d-flex justify-content-center mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckChecked"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
