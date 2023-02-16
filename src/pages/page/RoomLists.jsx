import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routeNames } from "../../constants/routePath";

function RoomLists() {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  let roomName = useLocation();
  const [roomValue, setRoomValue] = useState(roomName.state);
  console.log(roomName.state);
  const navToDashboard = () => {
    // console.log(sessionStorage.getItem("redirectname"));
    if (sessionStorage.getItem("redirectname") === "room") {
      navigate(`${routeNames.dashboard}${routeNames.defaultroom}`);
    } else if (sessionStorage.getItem("redirectname") === "zone") {
      navigate(`${routeNames.dashboard}${routeNames.defaultzone}`);
    }
  };
  useEffect(() => {
    setValue(sessionStorage.getItem("redirectname"));
  }, []);

  const handleChange = (e) => {
    setRoomValue(e.target.value);
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
                  <div className="card">
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
                          <h5>Hall</h5>
                        </div>
                        <div className="col-2 text-end">
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
                Done
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
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RoomLists;
