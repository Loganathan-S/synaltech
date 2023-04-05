import { Icon } from "@iconify/react";
import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../constants/routePath";
import "../../assests/css/global.scss";
import { Configure } from "./configure";
import axios from "axios";
function Lights() {
  const [lines, setLines] = useState([]);
  const [zoneLightStateChange, setZoneLightStateChange] = useState(false);
  // const [lightArray, setLightArray] = useState();
  const navigateToDashboard = useNavigate();

  const navToDashboard = () => {
    navigateToDashboard(`${routeNames.dashboard}${routeNames.home}`);
  };
  const { state } = useLocation();
  console.log(state);
  const [demoarr, setdemoarr] = useState([])
  console.log(demoarr);
  // let lightArray = [];
  // lightArray.push(state);
  // console.log(lightArray);

  useEffect(() => {
    setdemoarr(JSON.parse(state.checkeditem))
    // console.log(Configure.deviceId);
    axios
      .get(`http://192.168.1.46:4000/device/${3}`)
      .then((res) => {
        //console.log(res);
        //JSON.parse(details.description);
        const lines = res.data.description;
        const ln = Configure[0].deviceDetails.map((p) => p.lineId);
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

  const zoneValueChange = () => {
    setZoneLightStateChange(!zoneLightStateChange);
  };


// let lightArray = [];
  // lightArray.push(state);
  // console.log(lightArray);

  const [parentChecked, setParentChecked] = useState(false);

  // const [childCheckboxes, setChildCheckboxes] = useState(demoarr);


  const handleParentCheckboxChange = (event) => {
    setParentChecked(event.target.checked);
    setdemoarr(demoarr.map((checkbox) => ({
      ...checkbox,
       checked: event.target.checked,
    })));
  };
  
  const handleChildCheckboxChange = (index) => {
    setdemoarr(demoarr.map((checkbox, i) => {
      if (i === index) {
        return {
          ...checkbox,
          checked: !checkbox.isChecked,
        };
      }
      return checkbox;
    }));
    setParentChecked(demoarr.every((checkbox) => checkbox.isChecked));
  };

  
  
  return (
    <div className="container">

{/* <div>
    <input type="checkbox" checked={parentChecked} onChange={handleParentCheckboxChange} />
    {childCheckboxes.map((checkbox, index) => (
      <div key={index}>
        <input type="checkbox" checked={checkbox.isChecked} onChange={() => handleChildCheckboxChange(index)} />
        <span>{checkbox.label}</span>
      </div>
    ))}
  </div> */}

      <div className="row bg_color pt-3 pb-3 rounded-bottom">
        <div className="col-10">
          <label className="ModuleHeading">
            <Icon
              icon="material-symbols:arrow-right-alt-rounded"
              fontSize={32}
              rotate={2}
              style={{ cursor: "pointer" }}
              onClick={navToDashboard}
            />
            <span>&nbsp;{sessionStorage.getItem("ZoneName")}</span>
          </label>
        </div>
        <div className="col-2">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
              checked={parentChecked}
              onChange={handleParentCheckboxChange}
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
        {demoarr.map((checkeditems, inx) => (
          <div key={inx}>
            <div className="d-flex flex-row flex-nowrap overflow-auto text-center">
              {checkeditems.lines.map((lineVal, linIndex) => (
                <div key={linIndex}>
                  {lineVal.checked && (
                    <Card
                      cover
                      hoverable
                      className="bg_color"
                      style={{ minWidth: "150px" }}
                    >
                      <div className="row">
                        <div className="col-12">
                          <Icon
                            icon="material-symbols:database"
                            className="fs-2"
                            style={{ color: "white" }}
                          />
                        </div>
                        <div className="col-12">{lineVal.name}</div>
                        <div className="col-12  mt-2 text-center">
                          <div className="form-check form-switch d-flex justify-content-center mb-2">
                            {/* <input
                              className="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckChecked"
                              checked={lineVal.checked}
                              onChange={(event) =>
                                handleChildCheckboxChange(linIndex)
                              }
                            /> */}
                            <input
                            className="form-check-input"
                              type="checkbox"
                              id={lineVal.id}
                              // value={lineVal.value}
                              checked={lineVal.checked}
                              onChange={() => handleChildCheckboxChange(linIndex)}
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
      </div>
    </div>
  );
}

export default Lights;
