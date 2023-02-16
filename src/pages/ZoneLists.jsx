import { Icon } from '@iconify/react';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { routeNames } from '../constants/routePath';

function ZoneLists() {
    const navigate = useNavigate();
    let zoneName = useLocation();
    console.log(zoneName.state)
    const navToDashboard = () => {
      navigate(`${routeNames.dashboard}${routeNames.defaultzone}`);
    };
  return (
    <div className="container">
    <div className="row mt-3">
      <div className="col-12 ">
        <label className="ModuleHeading">
          <Icon
            icon="material-symbols:arrow-right-alt-rounded"
            fontSize={32}
            rotate={2}
            onClick={navToDashboard}
            style={{ cursor: "pointer" }}
          />
          <span>&nbsp;{zoneName.state}</span>
        </label>
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
              <div className="col-2 gx-5">
                <span className="text-end">
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
                    <Icon icon="material-symbols:database" className="fs-2" />
                  </div>

                  <p
                    className="m-0 FormPlaceholder"
                    style={{ color: "white" }}
                  ></p>
                  {/* <p className="m-0 FormPlaceholder" style={{ color: "white" }}>
                unreachable
              </p> */}
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

      <div className="col-12 mt-3">
        <div className="card">
          <div className="card-header accordion">
            <div className="row">
              <div className="col-2">
                <input type="radio" name="" id="" />
              </div>
              <div className="col-8 gx-0">
                <h5>Kitchen</h5>
              </div>
              <div className="col-2 gx-5">
                <span className="text-end">
                  <Icon
                    id="accordionExample"
                    icon="ant-design:caret-down-filled"
                    className="fs-4"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="true"
                    aria-controls="collapseTwo"
                  />
                </span>
              </div>
            </div>
          </div>
          <div
            id="collapseTwo"
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
                    <Icon icon="material-symbols:database" className="fs-2" />
                  </div>

                  <p
                    className="m-0 FormPlaceholder"
                    style={{ color: "white" }}
                  ></p>
                  {/* <p className="m-0 FormPlaceholder" style={{ color: "white" }}>
                unreachable
              </p> */}
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
    </div>
  </div> 
  )
}

export default ZoneLists