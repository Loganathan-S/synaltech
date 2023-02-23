import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assests/css/global.scss";
import { apiNames, routeNames } from "../../../constants/routePath";
import { Apiservice } from "../../../services/apiServices";

function AddLightConfig() {
  const [lineLists, setLineLists] = useState([]);
  const [newDeviceLists, setnewDeviceLists] = useState([]);

  const [selectedOption, setSelectedOption] = useState([]);
  const [peopleInfo, setPeopleInfo] = useState([]);
  const navigate = useNavigate();

  const navToDashboard = () => {
    navigate(`${routeNames.dashboard}${routeNames.automationname}`);
  };

  useEffect(() => {
    Apiservice.getLists(apiNames.deviceLists) //newDeviceLists
      .then((res) => {
        console.log(res);
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
    // getSection();
  }, []);

  const getSection = (notAvailableDevices) => {
    Apiservice.getLists(apiNames.sectionLists)
      .then((res) => {
        console.log(res);

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
          console.log(filtered1);
          console.log(filtered2);
          setnewDeviceLists(filtered1);
          setLineLists(filtered2);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectZonesLights = (id) => {
    if (document.getElementById("defaultCheck1").checked) {
      console.log("checked");
      setSelectedOption((prevState) => [...prevState, id]);
    } else {
      setSelectedOption("");
      console.log("un-checked");
    }
  };

  const roomValueChange = (a, b, item) => {
    console.log(a, b);

    console.log(peopleInfo);
  };

  const savedata = () => {
    console.log(peopleInfo);

    // fetch('http://localhost:3001/Automation/', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     id: 3,
    //     name: automationname,
    //     Time:value,
    //     Repeat: selectedlabel,

    //   }),
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    // }).then((response) => response.json()).then((result) => {
    //   alert("Record inserted")

    // })
  };

  return (
    <div className="container">
      <div className="row pt-3">
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
          <h4 className="mt-2 mx-2">Choose your Light</h4>

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
                              value={selectedOption === roomName.id}
                              //checked={selectedOption === roomName.id}
                              onChange={() => selectZonesLights(roomName.id)}
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
                                  JSON.parse(line.description)?.lines.map(
                                    (x, inx) => (
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

                                                <div className=" justify-content-center mb-2">
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="flexSwitchCheckChecked"
                                                    // checked={roomLightStateChange}
                                                    onChange={() =>
                                                      roomValueChange(
                                                        roomName.id,
                                                        x.name
                                                      )
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    )
                                  )
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

          {/* <div className="col-12 mt-3 " style={{ backgroundColor: "#3f3d3d" }}>
            <div className="card " style={{ backgroundColor: "#3f3d3d" }}>
              <div className="card-header accordion">
                <div className="row">
                  <div className="col-2">
                    <input type="radio" name="" id="" />
                  </div>
                  <div
                    className="col-8 gx-0"
                    id="accordionExample"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <h5 className="text-white">Hall</h5>
                  </div>
                  <div className="col-2 text-end text-white">
                    <span className="">
                      <Icon
                        id="accordionExample"
                        icon="ant-design:caret-down-filled"
                        className="fs-4"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div
                id="collapseOne"
                className="accordion-body accordion-collapse collapse hide"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <p className="m-0 mt-3 mx-2 FormContent text-white">LIGHT 1</p>
                <div className="text-center mt-2 mb-2">
                  <div className="d-flex flex-row flex-nowrap overflow-auto">
                    <div
                      className="card card-block mx-2 bg_color"
                      style={{ minWidth: "130px" }}
                    >
                      <div className="mt-2" style={{ color: "white" }}>
                        <Icon
                          icon="material-symbols:database"
                          className="fs-2 "
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
              </div>
            </div>
          </div>

          <div className="col-12 mt-3" style={{ backgroundColor: "#3f3d3d" }}>
            <div className="card" style={{ backgroundColor: "#3f3d3d" }}>
              <div className="card-header accordion">
                <div className="row">
                  <div className="col-2">
                    <input type="radio" name="" id="" />
                  </div>
                  <div
                    className="col-8 gx-0"
                    id="accordionExample1"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <h5 className="text-white">Room</h5>
                  </div>
                  <div className="col-2 text-end">
                    <span className="">
                      <Icon
                        id="accordionExample1"
                        icon="ant-design:caret-down-filled"
                        className="fs-4 text-white"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne1"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div
                id="collapseOne1"
                className="accordion-body accordion-collapse collapse hide"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample1"
              >
                <p className="m-0 mt-3 mx-2 FormContent text-white">LIGHT 2</p>
                <div className="text-center mt-2 mb-2">
                  <div className="d-flex flex-row flex-nowrap overflow-auto">
                    <div
                      className="card card-block mx-2 bg_color"
                      style={{ minWidth: "130px" }}
                    >
                      <div className="mt-2 " style={{ color: "white" }}>
                        <Icon
                          icon="material-symbols:database"
                          className="fs-2 text-white"
                        />
                      </div>

                      <p
                        className="m-0 FormPlaceholder"
                        style={{ color: "white" }}
                      ></p>

                      <div className="form-check form-switch d-flex justify-content-center mb-2">
                        <input
                          className="form-check-input "
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          // checked={roomLightStateChange}
                          // onChange={roomValueChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="text-center mt-3">
            <button
              className="btn btn-outline-primary btn-sm "
              style={{ paddingLeft: "20px", paddingRight: "20px" }}
              onClick={() => savedata()}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLightConfig;
