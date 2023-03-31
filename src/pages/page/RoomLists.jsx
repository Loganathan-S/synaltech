import { Icon } from "@iconify/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiNames, routeNames } from "../../constants/routePath";
import { Apiservice } from "../../services/apiServices";

function RoomLists() {
  const [value, setValue] = useState();
  const [newDeviceLists, setNewDeviceLists] = useState([]);
  const [lineLists, setLineLists] = useState([]);
  const [zoneChecked, setZoneChecked] = useState([]);
  const navigate = useNavigate();
  let roomName = useLocation();
  const [roomValue, setRoomValue] = useState(roomName.state);
  const [checkboxes, setCheckboxes] = useState([]);
  const [mergeArray, setMergedArray] = useState([]);

  const Lights = [
    { lightName: "Light1" },
    { lightName: "Light2" },
    { lightName: "Light3" },
    { lightName: "Light4" },
  ];

  const navToDashboard = () => {
    // console.log(sessionStorage.getItem("redirectname"));
    if (sessionStorage.getItem("redirectname") === "room") {
      navigate(`${routeNames.dashboard}${routeNames.defaultroom}`);
    } else if (sessionStorage.getItem("redirectname") === "zone") {
      navigate(`${routeNames.dashboard}${routeNames.defaultzone}`);
    }
  };


  // const [myState, setMyState] = useState("");

  // useEffect(() => {
  //   const storedState = localStorage.getItem("myState");
  //   if (storedState) {
  //     setMyState(storedState);
  //   }
  // }, []);

  const [isFuncCalled, setIsFuncCalled] = useState(false);

  useEffect(() => {
    
    setValue(sessionStorage.getItem("redirectname"));
  
    Apiservice.getLists(apiNames.deviceLists) //newDeviceLists
      .then((res) => {
        // console.log(res);
        if (res.length !== 0) {
          const notAvailableDevices = res.filter((room) => {
            // console.log(room.checked);
            return room.sectionId !== null;
          });
          getSection(notAvailableDevices);

          if (isFuncCalled) {
            myFunction(); // Call your function here
            setIsFuncCalled(true);
          }
          const storedState = JSON.parse(localStorage.getItem("mystate"));
          if (storedState) {
            setMergedArray(storedState);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }, [isFuncCalled]);

  let myFunction = async () => {
    let linesObj = [];
    for (let item of lineLists) {
      linesObj.push(JSON.parse(item.description).lines);
    }
    const mergedArray = await newDeviceLists.map((item, index) => {
      return {
        ...item,
        lines: linesObj[index],
      };
    });
    setMergedArray(mergedArray);
    localStorage.setItem("mystate", JSON.stringify(mergedArray));
  };


  // const handleStateChange = (event) => {
  //   const newState = event.target.value;
  //   setMyState(newState);
  //   localStorage.setItem("myState", newState);
  // };

  const getSection = (notAvailableDevices) => {
    Apiservice.getLists(apiNames.sectionLists)
      .then((res) => {
        // console.log(res);
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
          // console.log(filtered1);
          // console.log(filtered2);
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

  const handleParentCheckboxChange = (index) => {
    console.log(index);
    const updatedCheckboxes = [...mergeArray];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;

    // update children checkboxes when parent checkbox is checked/unchecked
    updatedCheckboxes[index].lines.forEach(
      (child) => (child.checked = updatedCheckboxes[index].checked)
    );
    // console.log(updatedCheckboxes);
    setCheckboxes(updatedCheckboxes);
  };

  const handleChildCheckboxChange = (parentIndex, childIndex) => {
    const updatedCheckboxes = [...mergeArray];
    updatedCheckboxes[parentIndex].lines[childIndex].checked =
      !updatedCheckboxes[parentIndex].lines[childIndex].checked;
    // update parent checkbox when all children checkboxes are checked
    const allChildrenChecked = updatedCheckboxes[parentIndex].lines.some(
      (child) => child.checked
    );
    updatedCheckboxes[parentIndex].checked = allChildrenChecked;
    setCheckboxes(updatedCheckboxes);
  };

  const addZone = (checkboxes, zoneName) => {
    // console.log(zoneName)
    const checkedItems = checkboxes.filter((item) => item.checked);
    let zoneObj = [];
    zoneObj.push({ zoneName: zoneName, checkedItems });
    console.log(zoneObj);
    axios
      .post("http://localhost:3001/addzone", { zoneObj })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  // const [addedLights, setAddedLight] = useState();
  const [selectedValues, setSelectedValues] = useState([]);

  const roomValueChange = (event) => {
    const value = event.target.value;
    console.log(value);
    if (event.target.checked) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.filter((val) => val !== value));
    }

    // const room = [...zoneChecked];
    // const rm = room.find((r, i) => i === index);
    // rm.valueId = val;
    // rm.lines[0] = val;
    // rm.lines[1] = val;
    // rm.lines[2] = val;
    // rm.lines[3] = val;
    // console.log(room);
    // setZoneChecked(room);
  };

  const lineCheckboxChange = (index, inx, e) => {
    let val;
    if (e.target.checked === true) {
      val = 1;
    } else if (e.target.checked === false) {
      val = 0;
    }

    const room = [...zoneChecked];
    const rm = room.find((r, i) => i === index);
    if (
      (rm.lines[0] === 0 &&
        rm.lines[1] === 0 &&
        rm.lines[2] === 0 &&
        rm.lines[3] === 0) ||
      rm.lines[0] + rm.lines[1] + rm.lines[2] + rm.lines[3] === 1
    ) {
      rm.valueId = val;
    }
    rm.lines[inx] = val;
    console.log(room);
    setZoneChecked(room);
  };

  const addRoom = (roomName, valueSelect) => {
    console.log(roomName);
    console.log(valueSelect);
    axios
      .post("http://localhost:3001/addroom", { roomName, valueSelect })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      {/* <input type="text" value={myState} onChange={handleStateChange} /> */}
      {/* <button onClick={myFunction}> click</button> */}
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
                  {mergeArray.map((roomName, parentIndex) => (
                    <div key={parentIndex}>
                      <div className="card mt-3">
                        <div className="card-header accordion">
                          <div className="row">
                            <div className="col-2">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={roomName.checked}
                                  onChange={() =>
                                    handleParentCheckboxChange(parentIndex)
                                  }
                                />
                              </div>
                            </div>
                            <div
                              className="col-8 gx-0"
                              id={parentIndex}
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              <h5>{roomName.section} </h5>
                            </div>
                            <div className="col-2 text-end">
                              <span className="">
                                <Icon
                                  id="accordionExample"
                                  icon="ant-design:caret-down-filled"
                                  className="fs-4"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#${roomName.section?.replace(
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
                          id={`${roomName.section?.replace(/\s+/g, "")}`}
                          className="accordion-body accordion-collapse collapse hide"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="d-flex flex-row flex-nowrap overflow-auto">
                            {roomName.lines.map((subLineName, childIndex) => (
                              <div key={childIndex}>
                                {subLineName.name && (
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
                                        {subLineName.name}
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
                                          checked={subLineName.checked}
                                          onChange={() =>
                                            handleChildCheckboxChange(
                                              parentIndex,
                                              childIndex
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="text-center mt-3">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      style={{ paddingLeft: "20px", paddingRight: "20px" }}
                      onClick={() => addZone(checkboxes, roomValue)}
                    >
                      add
                    </button>
                  </div>
                </div>
              </>
            )}
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
                <div className="mt-2 mb-2">
                  <div className="row">
                    {Lights.map((light, lightIndex) => (
                      <div key={lightIndex} className="col-6">
                        <p className="mt-2 mx-2 FormContent">
                          {light.lightName}
                        </p>
                        <div
                          className="card card-block mx-2 bg_color text-center"
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
                              value={JSON.stringify(light)}
                              id="flexSwitchCheckChecked"
                              checked={selectedValues.includes(
                                JSON.stringify(light)
                              )}
                              onChange={roomValueChange}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="text-center mt-3">
              <button
                className="btn btn-outline-primary btn-sm"
                style={{ paddingLeft: "20px", paddingRight: "20px" }}
                onClick={() => addRoom(roomValue, selectedValues)}
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
