import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiNames, routeNames } from "../../constants/routePath";
import { Apiservice } from "../../services/apiServices";

function RoomLists() {
  const [value, setValue] = useState();
  const [newDeviceLists, setNewDeviceLists] = useState([]);
  const [lineLists, setLineLists] = useState([]);
  const [checked, setChecked] = useState([]);
  const navigate = useNavigate();
  let roomName = useLocation();
  const [roomValue, setRoomValue] = useState(roomName.state);
  // console.log(roomName.state);
  const navToDashboard = () => {
    // console.log(sessionStorage.getItem("redirectname"));
    if (sessionStorage.getItem("redirectname") === "room") {
      navigate(`${routeNames.dashboard}${routeNames.defaultroom}`);
    } else if (sessionStorage.getItem("redirectname") === "zone") {
      navigate(`${routeNames.dashboard}${routeNames.defaultzone}`);
    }
  };
  const [checkBox, setCheckBox] = useState([false, false, false, false]);

  useEffect(() => {
    setValue(sessionStorage.getItem("redirectname"));
    Apiservice.getLists(apiNames.deviceLists) //newDeviceLists
      .then((res) => {
        if (res.length !== 0) {
          const notAvailableDevices = res.filter((room) => {
            return room.sectionId !== null;
          });

          getSection(notAvailableDevices);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getSection = (notAvailableDevices) => {
    Apiservice.getLists(apiNames.sectionLists)
      .then((res) => {
        //console.log(res.length);

        setTimeout(() => {
          const filtered1 = res.filter((number) => {
            return notAvailableDevices.some((zoneId) => {
              return zoneId.sectionId === number.id;
            });
          });

          const filtered2 = notAvailableDevices.filter((number) => {
            return res.some((zoneId) => {
              return zoneId.id === number.sectionId;
            });
          });
          //console.log(filtered1);
          let arr = checked;
          for (let i = 0; i < filtered1.length; i++) {
            arr[i] = { sectionId: 0, value: 0, line: [0, 0, 0, 0] };
          }
          console.log(arr);
          setChecked(arr);
          //console.log(filtered2);
          setNewDeviceLists(filtered1);
          setLineLists(filtered2);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setRoomValue(e.target.value);
  };

  const [selectedOption, setSelectedOption] = useState([]);

  const selectZonesLights = (id, index, e) => {
    if (e.target.checked === true) {
      let check = checkBox.map((x) => true);
      setCheckBox(check);
      let arr = checked;
      arr[index].sectionId = id;
      arr[index].value = 1;
      setChecked([]);
      setChecked(arr);
      //setChecked((checked[index] = e.target.checked));
    } else if (e.target.checked === false) {
      let check = checkBox.map((x) => false);
      setCheckBox(check);
      let arr = checked;
      arr[index].sectionId = id;
      arr[index].value = 0;
      setChecked([]);
      setChecked(arr);
      //setChecked((checked[index] = e.target.checked));
    }
  };

  const addZone = (x, line) => {
    console.log(x);
    console.log(line);
  };

  const roomValueChange = (index) => {
    const newState = [...checkBox];
    newState[index] = !newState[index];
    setCheckBox(newState);
  };

  return (
    <div className="container">
      <div className="row mt-3">
        {value === "zone" ? (
          <>
            {roomValue === "Other" ? (
              <>
                <div className="col-12 ">
                  <label className="ModuleHeading">
                    <Icon
                      icon="material-symbols:arrow-right-alt-rounded"
                      fontSize={32}
                      rotate={2}
                      onClick={navToDashboard}
                      style={{ cursor: "pointer" }}
                    />
                    <span>&nbsp;{roomValue}</span>
                  </label>
                </div>
                <div className="col-md-3 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    value={roomValue}
                    onChange={handleChange}
                  />
                </div>{" "}
              </>
            ) : (
              <>
                {" "}
                <div className="col-12 ">
                  <label className="ModuleHeading">
                    <Icon
                      icon="material-symbols:arrow-right-alt-rounded"
                      fontSize={32}
                      rotate={2}
                      onClick={navToDashboard}
                      style={{ cursor: "pointer" }}
                    />
                    <span>&nbsp;{roomValue}</span>
                  </label>
                </div>
                <div className="col-md-3 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    value={roomValue}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 mt-3">
                  {newDeviceLists.map((roomName, index) => (
                    <div key={index}>
                      {roomName.section && (
                        <>
                          <div className="card mt-3">
                            <div className="card-header accordion">
                              <div className="row">
                                <div className="col-2">
                                  <div className="form-check">
                                    <input
                                      id="defaultCheck1"
                                      className="form-check-input"
                                      type="checkbox"
                                      //value={selectedOption === roomName.id}
                                      checked={
                                        checked[index].value === 1
                                          ? true
                                          : false
                                      }
                                      onChange={(e) =>
                                        selectZonesLights(roomName.id, index, e)
                                      }
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-8 gx-0"
                                  id={index}
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseOne"
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                >
                                  <h5>{roomName.section}</h5>
                                </div>
                                <div className="col-2 text-end">
                                  <span className="">
                                    <Icon
                                      id="accordionExample"
                                      icon="ant-design:caret-down-filled"
                                      className="fs-4"
                                      data-bs-toggle="collapse"
                                      data-bs-target={`#${roomName.section.replace(
                                        /\s+/g,
                                        ""
                                      )}`}
                                      aria-expanded="true"
                                      aria-controls="collapseOne"
                                    />
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div
                              id={`${roomName.section.replace(/\s+/g, "")}`}
                              className="accordion-body accordion-collapse collapse hide"
                              aria-labelledby="headingOne"
                              data-bs-parent="#accordionExample"
                            >
                              {lineLists.map((line, ind) => (
                                <div key={ind}>
                                  {index === ind && (
                                    <>
                                      <div className="d-flex flex-row flex-nowrap overflow-auto">
                                        {Object.values(
                                          JSON.parse(
                                            line.description
                                          )?.lines.map((x, inx) => (
                                            <div key={inx}>
                                              {x.name && (
                                                <>
                                                  <div className="text-center mt-2 mb-2">
                                                    <div
                                                      className="card card-block mx-2 bg_color"
                                                      style={{
                                                        minWidth: "150px",
                                                      }}
                                                    >
                                                      <div
                                                        className="mt-2"
                                                        style={{
                                                          color: "white",
                                                        }}
                                                      >
                                                        <Icon
                                                          icon="material-symbols:database"
                                                          className="fs-2"
                                                        />
                                                      </div>

                                                      <p className="m-0 mt-3 mx-2 FormContent">
                                                        {x.name}
                                                      </p>

                                                      <p
                                                        className="m-0 FormPlaceholder"
                                                        style={{
                                                          color: "white",
                                                        }}
                                                      ></p>

                                                      <div className="form-check form-switch d-flex justify-content-center mb-2">
                                                        <input
                                                          className="form-check-input"
                                                          type="checkbox"
                                                          id="flexSwitchCheckChecked"
                                                          // checked={roomLightStateChange}
                                                          onChange={() =>
                                                            roomValueChange(inx)
                                                          }
                                                          checked={
                                                            checkBox[inx]
                                                          }
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </>
                                              )}
                                            </div>
                                          ))
                                        )}
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                style={{ paddingLeft: "20px", paddingRight: "20px" }}
                onClick={() => addZone(selectedOption, lineLists)}
              >
                add
              </button>
            </div>
          </>
        ) : (
          <>
            {roomValue === "Other" ? (
              <>
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
                      <span>&nbsp;{roomValue}</span>
                    </label>
                  </div>
                  <div className="col-12 mt-3">
                    <input
                      type="text"
                      className="form-control"
                      value={roomValue}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
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
                      <span>&nbsp;{roomValue}</span>
                    </label>
                  </div>
                  <div className="col-12 mt-3">
                    <input
                      type="text"
                      className="form-control"
                      value={roomValue}
                      onChange={handleChange}
                    />
                  </div>
                </div>{" "}
                <p className="m-0 mt-3 mx-2 FormContent">LIGHT 1</p>
                <div className="text-center mt-2 mb-2">
                  <div className="d-flex flex-row flex-nowrap overflow-auto">
                    <div
                      className="card card-block mx-2 bg_color"
                      style={{ minWidth: "150px" }}
                    >
                      <div className="mt-2" style={{ color: "white" }}>
                        <Icon
                          icon="material-symbols:database"
                          className="fs-2"
                        />
                      </div>

                      <p
                        className="m-0 FormPlaceholder"
                        style={{ color: "white" }}
                      ></p>

                      <div className="form-check form-switch d-flex justify-content-center mb-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          // checked={roomLightStateChange}
                          // onChange={roomValueChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="text-center mt-3">
              <button
                className="btn btn-outline-primary btn-sm"
                style={{ paddingLeft: "20px", paddingRight: "20px" }}
              >
                add
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RoomLists;
