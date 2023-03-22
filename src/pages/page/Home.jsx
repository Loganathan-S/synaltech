import React, { useEffect } from "react";
import { Card } from "antd";
import { Icon } from "@iconify/react";
import { useState } from "react";
import "../../assests/css/global.scss";
import { useNavigate } from "react-router-dom";
import { apiNames, routeNames } from "../../constants/routePath";
import { Configure, ConfigureRoom } from "./configure";
import { Apiservice } from "../../services/apiServices";
import axios from "axios";

function Home() {
  const [linesZone, setLinesZone] = useState([]);
  const [linesRoom, setLinesRoom] = useState([]);
  const [listShow, setListShow] = useState(false);
  const [homeShow, setHomeShow] = useState(true);
  const addLists = ["Add Device", "Add Zone & Room", "Configure Zone"];
  const icons = [
    <Icon icon="ic:round-device-hub" inline={true} />,
    <Icon icon="ic:baseline-meeting-room" inline={true} />,
    <Icon icon="mdi:sort-calendar-descending" inline={true} />,
  ];
  const navigate = useNavigate();
  const navToLogout = useNavigate();
  const [roomLists, setRoomLists] = useState([]);
  const [zoneLightCount, setZoneLightCount] = useState("");
  const [roomLightCount, setRoomLightCount] = useState("");
  const [expand, setExpand] = useState(false);
  const [children, setChildren] = useState([]);
  const [roomChildren, setRoomChildren] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/addzone")
      .then((response) => {
        //console.log(response.data);
        setChildren(response.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:3001/addroom")
      .then((response) => {
        console.log(response.data);
        setRoomChildren(response.data);
      })
      .catch((error) => console.log(error));

    // Apiservice.getLists(apiNames.zoneLists) // need
    //   .then((res) => {
    //     //console.log(res);
    //     setZoneLists(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    Apiservice.getLists(apiNames.sectionLists)
      .then((res) => {
        // console.log(res);
        setRoomLists(res);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://192.168.1.46:4000/device/${8}`)
      .then((res) => {
        const lines = res.data.description;
        const ln = Configure[0].deviceDetails.map((p) => p.lineId);
        const lne = JSON.parse(lines)?.lines.filter((p) =>
          ln.some((array1) => array1 === p.id)
        );
        setLinesZone(lne);
        //console.log(lne);

        let count = 0;
        lne.forEach((obj) => {
          const key = `${obj.value}`;
          if (key == 1) {
            count += 1;
          }
        });
        setZoneLightCount(count);
        //console.log(count);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`http://192.168.1.46:4000/device/${9}`)
      .then((res) => {
        const lines = res.data.description;
        const ln = ConfigureRoom[0].deviceDetails.map((p) => p.lineId);
        const lne = JSON.parse(lines)?.lines.filter((p) =>
          ln.some((array1) => array1 === p.id)
        );
        setLinesRoom(lne);
        //console.log(lne);

        let count = 0;
        lne.forEach((obj) => {
          const key = `${obj.value}`;
          if (key == 1) {
            count += 1;
          }
        });
        setRoomLightCount(count);
        //console.log(count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showAddList = () => {
    setExpand(!expand);
    setListShow(!listShow);
    setHomeShow(!homeShow);
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

  const navToZoneLights = (zoneName, items, idx) => {
    // console.log(idx)
    console.log(items);
    let linesData = items;
    sessionStorage.setItem("ZoneName", zoneName);
    navigate(`${routeNames.dashboard}${routeNames.lightspage}`, {
      state: linesData,
      zonesLight: children,
      roomsLight: roomChildren,
    });
  };

  const navToRoomLights = (roomName, items, idx) => {
    console.log(items);
    let linesData = items;
    sessionStorage.setItem("RoomName", roomName);
    navigate(`${routeNames.dashboard}${routeNames.roomspage}`, {
      state: linesData,
    });
  };

  // const navToRoomsLights = (roomname) => {
  //   sessionStorage.setItem("RoomName", roomname);
  //   navigate(`${routeNames.dashboard}${routeNames.roomspage}`);
  // };

  // const handleParentCheckboxChange = (e) => {
  //   // console.log(e.target.checked)
  //   setIsChecked(!isChecked);
  //   setIsCheckedZone(!isCheckedZone);
  //   setIsCheckedRoom(!isCheckedRoom);
  // };

  const handleParentCheckboxChange = (event) => {
    const checked = event.target.checked;
    const updatedChildren = children.map((child) => {
      return { ...child, isChecked: checked };
    });
    const updatedRoomChildren = roomChildren.map((child) => {
      return { ...child, isChecked: checked };
    });
    setChildren(updatedChildren);
    setRoomChildren(updatedRoomChildren);
    //console.log(children);
  };

  const handleChildCheckboxChange = (event, childId) => {
    console.log(childId);
    const checked = event.target.checked;
    // console.log(children);
    const updatedChildren = children.map((child) => {
      // console.log(child.zoneName);
      if (child.id === childId) {
        return { ...child, isChecked: checked };
      }
      return child;
    });
    setChildren(updatedChildren);
  };

  const handleChildRoomCheckboxChange = (event, childId) => {
    const checked = event.target.checked;
    const updatedChildren = roomChildren.map((child) => {
      //console.log(child.roomName);
      if (child.id === childId) {
        return { ...child, isChecked: checked };
      }
      return child;
    });
    setRoomChildren(updatedChildren);
  };

  const [brightnessValue, setBrightnessValue] = useState(80);
  const [brightenedColor, setbrightenedColor] = useState([
    "rgba(234, 189, 55, 0.87)",
  ]);

  function handleBrightnessChange(event, index) {
    console.log(index);
    setBrightnessValue(event.target.value);
    setbrightenedColor(`rgba(234, 189, 55, ${brightnessValue / 100})`);
  }

  // const baseColor = "rgba(100, 150, 200, 1)";
  // const brightenedColor = `rgba(234, 189, 55, ${brightnessValue / 100})`;

  return (
    <div className="container"> 
      <div className="mt-3">
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
            {expand === false && (
              <Icon
                icon="fa:plus-circle"
                color="#2596be"
                height={33}
                className="pointer"
                onClick={showAddList}
              />
            )}
            {expand === true && (
              <Icon
                icon="clarity:minus-circle-solid"
                color="#f59127"
                height={36}
                className="pointer"
                onClick={showAddList}
              />
            )}
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
      {homeShow === true && (
        <>
          <div className="row mt-3">
            <div className="col-10 m-0 ModuleHeading">Home</div>
            <div className="col-2 text-end">
              <div className="form-check form-switch">
                {/* <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleParentChange}
                /> */}
                <input
                  id="flexSwitchCheckChecked"
                  className="form-check-input"
                  type="checkbox"
                  onChange={handleParentCheckboxChange}
                />
              </div>
            </div>
            <p className="mt-3 m-0 FormHeading">Zones</p>
          </div>
          <div className="row">
            <div className="col-12">
              {children.map((item, idx) => (
                <div key={idx}>
                  <Card
                    className="mt-3"
                    cover
                    hoverable
                    style={{
                      width: 350,
                      backgroundColor: brightenedColor,
                    }}
                  >
                    <div className="row ">
                      <div
                        className="col-10"
                        onClick={() =>
                          navToZoneLights(item.zoneName, item, idx)
                        }
                      >
                        <p className="m-0 ModuleHeading">{item.zoneName}</p>
                        <p className="m-0">all lines are on</p>
                      </div>
                      <div className="col-2">
                        <div className="form-check form-switch fs-4">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            checked={item.isChecked}
                            onChange={(event) =>
                              handleChildCheckboxChange(event, item.id)
                            }
                          />
                        </div>
                      </div>
                      <div className="m-0 mt-3">
                        <input
                          className="w-100"
                          type="range"
                          min="0"
                          max="100"
                          value={brightnessValue}
                          onChange={(event) =>
                            handleBrightnessChange(event, idx)
                          }
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="row mt-3">
            <p className="mt-2 m-0 FormHeading">Rooms</p>
          </div>
          <div className="row">
            <div className="col-12">
              {roomChildren.map((roomList, roomIndex) => (
                <div key={roomIndex}>
                  <Card
                    style={{
                      width: 350,
                      backgroundColor: brightenedColor,
                    }}
                    className="mt-3"
                    cover
                    hoverable
                  >
                    <div className="row ">
                      <div
                        className="col-10"
                        onClick={() =>
                          navToRoomLights(
                            roomList.roomName,
                            roomList,
                            roomIndex
                          )
                        }
                      >
                        <p className="m-0 ModuleHeading">{roomList.roomName}</p>
                        <p className="m-0">all lines are on</p>
                      </div>
                      <div className="col-2">
                        <div className="form-check form-switch fs-4">
                          {/* <input
                         type="checkbox"
                         checked={isCheckedZone}
                         onChange={handleChangeZones}
                       /> */}

                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            checked={roomList.isChecked}
                            onChange={(event) =>
                              handleChildRoomCheckboxChange(event, roomList.id)
                            }
                          />
                        </div>
                      </div>
                      <div className="m-0 mt-3">
                        <input type="range" className="w-100" />
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
              {/* {roomLists.map((name, index) => (
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
                              <div className="col-2 gx-2" onClick={navToLights}>
                            <Icon
                              icon="material-symbols:home-outline"
                              className=""
                              height={45}
                            />
                          </div> 
                              <div
                                className="col-10"
                                onClick={() => navToRoomsLights(name.section)}
                              >
                                <p className="m-0 ModuleHeading">
                                  {name.section}
                                </p>
                                <p className="m-0">
                                  {" "}
                                  {roomLightCount ? roomLightCount : "No"} lines
                                  are on
                                </p>
                              </div>
                              <div className="col-2">
                                <div className="form-check form-switch fs-4">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="flexSwitchCheckChecked"
                                    checked={isCheckedRoom}
                                    onChange={handleChangeRoom}
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
              ))} */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
