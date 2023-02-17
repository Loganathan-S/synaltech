import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../assests/css/global.scss";
import { routeNames } from "../../../constants/routePath";

function AddLightConfig() {
  const navigate = useNavigate();

  const navToDashboard = () => {
    navigate(`${routeNames.dashboard}${routeNames.automationname}`);
  };

  return (
    <div className="container" >
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
          <h4 className="mt-2">Choose your Light</h4>

          <div className="col-12 mt-3 " style={{backgroundColor:"#3f3d3d" }}>
            <div className="card " style={{backgroundColor:"#3f3d3d" }}>
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
                      style={{ minWidth: "150px" }}
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

          <div className="col-12 mt-3" style={{backgroundColor:"#3f3d3d" }}>
            <div className="card" style={{backgroundColor:"#3f3d3d" }}>
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
                  <div className="col-2 text-end" >
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
                      style={{ minWidth: "150px" }}
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
           
            </div>
            <div className="text-center mt-3">
              <button
                className="btn btn-outline-primary btn-sm "
                style={{ paddingLeft: "20px", paddingRight: "20px" }}
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
