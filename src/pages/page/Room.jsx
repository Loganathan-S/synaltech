import { Icon } from "@iconify/react";
import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../constants/routePath";
import "../../assests/css/global.scss";
import { ConfigureRoom } from "./configure";
import axios from "axios";

function Rooms() {
  const rooms = [
    "Kids_Room_Fan",
    "Kids_Room_Light",
    "Kids_Room_TV",
    "Kids_Room_AC",
  ];
  const [roomLightStateChange, setRoomLightStateChange] = useState(false);
  const [lines, setLines] = useState([]);
  const navigateToDashboard = useNavigate();
  const navToDashboard = () => {
    navigateToDashboard(`${routeNames.dashboard}${routeNames.home}`);
  };

  const { state } = useLocation();

  let lightArray = [];
  lightArray.push(state);
  console.log(lightArray);

  useEffect(() => {
    //console.log(Configure.deviceId);
    axios
      .get(`http://192.168.1.46:4000/device/${4}`)
      .then((res) => {
        const lines = res.data.description;
        const ln = ConfigureRoom[0].deviceDetails.map((p) => p.lineId);
        const lne = JSON.parse(lines)?.lines.filter((p) =>
          ln.some((array1) => array1 === p.id)
        );
        setLines(lne);
        //console.log(lne);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const roomValueChange = () => {
    setRoomLightStateChange(!roomLightStateChange);
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
            <span>&nbsp;{sessionStorage.getItem("RoomName")}</span>
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
        <div className="mt-2">

        {JSON.parse(state.valueselect).map((jsonstring, inx) => (
          <div key={inx}>
            <div className="d-flex flex-row flex-nowrap overflow-auto text-center">
              {jsonstring.lines.map((lineVal, linIndex) => (
                <div key={linIndex}>
                  {lineVal.checked && (
                      <Card cover hoverable className="bg_color">
                      <div className="row ">
                        <div className="col-12">
                          <Icon
                            icon="material-symbols:database"
                            className="fs-2"
                          />
                        </div>
                        <div className="col-12 ">
                          <p
                            className="m-0 FormPlaceholder"
                            style={{ color: "white" }}
                          >
                            {JSON.parse(jsonstring).lightName}
                          </p>
                          <p
                            className="m-0 FormPlaceholder"
                            style={{ color: "white" }}
                          >
                            unreachable
                          </p>
                        </div>
                        <div className="col-12  mt-2 text-center">
                              <div className="form-check form-switch d-flex justify-content-center ">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="flexSwitchCheckChecked"
                                  // checked={zoneLightStateChange}
                                  // onChange={zoneValueChange}
                                />
                              </div>
                            </div>
                      </div>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

          {/* {lightArray.map((lights, lightIndex) => (
            <div key={lightIndex}>
              <p>{lights.roomName}</p>
              <div className="d-flex flex-row flex-nowrap overflow-auto text-center">
                {lights.valueSelect.map((jsonstring, inx) => (
                  <div key={inx}>
                    <Card cover hoverable className="bg_color">
                      <div className="row ">
                        <div className="col-12">
                          <Icon
                            icon="material-symbols:database"
                            className="fs-2"
                          />
                        </div>
                        <div className="col-12 ">
                          <p
                            className="m-0 FormPlaceholder"
                            style={{ color: "white" }}
                          >
                            {JSON.parse(jsonstring).lightName}
                          </p>
                          <p
                            className="m-0 FormPlaceholder"
                            style={{ color: "white" }}
                          >
                            unreachable
                          </p>
                        </div>
                        <div className="col-12  mt-2 text-center">
                              <div className="form-check form-switch d-flex justify-content-center ">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="flexSwitchCheckChecked"
                                  // checked={zoneLightStateChange}
                                  // onChange={zoneValueChange}
                                />
                              </div>
                            </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ))} */}

        </div>
      </div>
    </div>
  );
}

export default Rooms;
