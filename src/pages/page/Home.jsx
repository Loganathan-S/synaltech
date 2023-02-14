import React, { useEffect } from "react";
import { Card } from "antd";
import { Icon } from "@iconify/react";
import { useState } from "react";
import "../../assests/css/global.scss";
import { useNavigate } from "react-router-dom";
import { apiNames, routeNames } from "../../constants/routePath";
import { Configure, ConfigureRoom } from "./configure";
import { Apiservice } from "../../services/apiServices";

function Home() {
  const [listShow, setListShow] = useState(false);
  const addLists = [
    "Add Device",
    "Add Zone & Room",
    "Configure Zone",
    "Configure Room",
  ];
  const icons = [
    <Icon icon="ic:round-device-hub" inline={true} />,
    <Icon icon="ic:baseline-meeting-room" inline={true} />,
    <Icon icon="mdi:sort-calendar-descending" inline={true} />,
    <Icon icon="mdi:sort-calendar-descending" inline={true} />,
  ];
  const navigate = useNavigate();
  const navToLogout = useNavigate();
  const zone = ["Ground floor", "First floor"];
  const room = ["Hall", "Bed room"];
  const [zoneLists, setZoneLists] = useState([]);
  const [roomLists, setRoomLists] = useState([]);

  useEffect(() => {
    Apiservice.getLists(apiNames.zoneLists)
      .then((res) => {
        console.log(res);
        setZoneLists(res);
      })
      .catch((err) => {
        console.log(err);
      });

    Apiservice.getLists(apiNames.sectionLists)
      .then((res) => {
        console.log(res);
        setRoomLists(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showAddList = () => {
    setListShow(!listShow);
  };

  const logout = () => {
    navToLogout(routeNames.auth.home);
  };

  const addDevice = (list, id) => {
    if (addLists[id] === "Add Device") {
      navigate(`${routeNames.dashboard}${routeNames.addnewdevice}`);
    } else if (addLists[id] === "Add Zone & Room") {
      //console.log("Add new Room/Zone");
      navigate(`${routeNames.dashboard}${routeNames.addroomzone}`);
    } else if (addLists[id] === "Configure Zone") {
      // console.log("Sort Zone/Room");
      navigate(`${routeNames.dashboard}${routeNames.sortroom}`);
    }
  };

  const navToLights = (zoneName) => {
    sessionStorage.setItem("ZoneName", zoneName);
    navigate(`${routeNames.dashboard}${routeNames.lightspage}`);
  };

  const navToRooms = (roomname) => {
    sessionStorage.setItem("RoomName", roomname);
    navigate(`${routeNames.dashboard}${routeNames.roomspage}`);
  };

  return (
    <div className="container">
      <div className=" mt-3">
        <div className="row">
          <div className="col-8">
            <h3 className="ModuleHeading" style={{ cursor: "pointer" }}>
              SynalTech
            </h3>
          </div>
          <div className="col-4 text-end">
            <button className="btn btn-sm btn-secondary" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <div className="text-end">
            <Icon
              icon="fa:plus-circle"
              color="#2596be"
              width="35"
              height="35"
              className="pointer"
              onClick={showAddList}
            />
          </div>
          {listShow ? (
            <div className="row">
              {icons.map((icon, iconIndex) => (
                <div key={iconIndex} className="col-sm-12 col-md-4 mt-3">
                  {addLists.map(
                    (list, listIndex) =>
                      iconIndex === listIndex && (
                        <Card
                          key={listIndex}
                          cover
                          hoverable
                          style={{
                            width: 350,
                          }}
                          onClick={() => addDevice(list, listIndex)}
                        >
                          <div className="row">
                            <div className="col-9">
                              <p className="hoverLink FormContent m-0">
                                {icon}&nbsp;&nbsp;&nbsp;{list}
                              </p>
                            </div>
                            <div className="col-3 text-end">
                              {/* <Icon
                              icon="fa:plus-circle"
                              color="#2596ba"
                              width="25"
                              height="25"
                              className="pointer"
                            /> */}
                            </div>
                          </div>
                        </Card>
                      )
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-10 m-0 ModuleHeading">Home</div>
        <div className="col-2 text-end">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
            />
          </div>
        </div>
        <p className="mt-3 m-0 FormHeading">Zones</p>
      </div>
      <div className="row">
        <div className="col-12">
          {zoneLists.map((name, index) => (
            <div key={index}>
              {Configure.map((selected, inx) => (
                <div key={inx}>
                  {name.id === selected.zoneId && (
                    <div className="mt-2">
                      <Card
                        className="bg_color"
                        cover
                        hoverable
                        style={{
                          width: 350,
                        }}
                      >
                        <div className="row">
                          {/* <div className="col-2 gx-2" onClick={navToLights}>
                            <Icon
                              icon="material-symbols:home-outline"
                              className=""
                              height={45}
                            />
                          </div> */}
                          <div
                            className="col-10"
                            onClick={() => navToLights(name.zoneName)}
                          >
                            <p className="m-0 ModuleHeading">{name.zoneName}</p>
                            <p className="m-0">4 lines are on</p>
                          </div>
                          <div className="col-2">
                            <div className="form-check form-switch fs-4">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckChecked"
                              />
                            </div>
                          </div>
                          <div className="m-0 mt-3">
                            <input type="range" className="w-100" />
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="row mt-3">
        <p className="mt-2 m-0 FormHeading">Rooms</p>
      </div>
      <div className="row">
        <div className="col-12">
          {roomLists.map((name, index) => (
            <div key={index}>
              {ConfigureRoom.map((selected, inx) => (
                <div key={inx}>
                  {name.id === selected.deviceId && (
                    <div className="mt-2">
                      <Card
                        className="bg_color"
                        cover
                        hoverable
                        style={{
                          width: 350,
                        }}
                      >
                        <div className="row">
                          {/* <div className="col-2 gx-2" onClick={navToLights}>
                            <Icon
                              icon="material-symbols:home-outline"
                              className=""
                              height={45}
                            />
                          </div> */}
                          <div
                            className="col-10"
                            onClick={() => navToRooms(name.section)}
                          >
                            <p className="m-0 ModuleHeading">{name.section}</p>
                            <p className="m-0">4 lines are on</p>
                          </div>
                          <div className="col-2">
                            <div className="form-check form-switch fs-4">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="flexSwitchCheckChecked"
                              />
                            </div>
                          </div>
                          <div className="m-0 mt-3">
                            <input type="range" className="w-100" />
                          </div>
                        </div>
                      </Card>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
          {/* {room.map((rooms, index) => (
            <div key={index} className="mt-2">
              <Card
                className="bg_color"
                cover
                hoverable
                style={{
                  width: 350,
                }}
              >
                <div className="row">
                  <div className="col-2 gx-2 " onClick={navToRooms}>
                    <Icon
                      icon="material-symbols:dining-outline-rounded"
                      height={45}
                    />
                  </div>
                  <div className="col-10" onClick={navToRooms}>
                    <p className="m-0 ModuleHeading">{rooms}</p>
                    <p className="m-0">4 lines are off</p>
                  </div>
                  <div className="col-2">
                    <div className="form-check form-switch fs-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                      />
                    </div>
                  </div>

                  <div className="m-0 mt-3">
                    <input type="range" className=" w-100 " />
                  </div>
                </div>
              </Card>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Home;
