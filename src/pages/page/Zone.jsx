import { Icon } from "@iconify/react";
import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../constants/routePath";
import "../../assests/css/global.scss";
import { Configure } from "./configure";
import axios from "axios";
function Lights() {
  const rooms = [
    "Theater_Fan",
    "Theater_Light",
    "Theater_PowerSocket",
    "Theater_AC",
  ];
  const [lines, setLines] = useState([]);
  const [zoneLightStateChange, setZoneLightStateChange] = useState(false);
  const navigateToDashboard = useNavigate();

  const navToDashboard = () => {
    navigateToDashboard(`${routeNames.dashboard}${routeNames.home}`);
  };

  const { state } = useLocation();
  console.log(state);

  let lightArray = [];
  lightArray.push(state);
  console.log(lightArray);

  useEffect(() => {
    setChildren(lightArray)
    // axios
    //   .get("http://localhost:3001/addzone")
    //   .then((response) => {
    //     console.log(response.data);
    //     // setZoneLists(state);
    //   })
    //   .catch((error) => console.log(error));

    console.log(Configure.deviceId);
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

  const [children, setChildren] = useState([]);

  // const handleParentCheckboxChange = (event) => {
  //   const checked = event.target.checked;
  //   const updatedChildren = children.map((child) => {
  //     return { ...child, isChecked: checked };
  //   });
  //   const updatedRoomChildren = roomChildren.map((child) => {
  //     return { ...child, isChecked: checked };
  //   });
  //   setChildren(updatedChildren);
  //   setRoomChildren(updatedRoomChildren);
  //   //console.log(children);
  // };

  const handleChildCheckboxChange = (event, childId,linesval) => {
    console.log(linesval)
    const checked = event.target.checked;
    console.log(checked)

    const updateChild = linesval.map((line) => {
      if (line.id === childId) {
        return {...linesval, checked: checked}
      } else {
        return lightArray
      }  
    })

    console.log(updateChild);

    //  setChildren(updateChild)
    //  console.log(children)
    // console.log(lineVal.id);
    // const checked = event.target.checked;
    // // console.log(children);
    // const updatedChildren = children.map((child) => {
    //    console.log(child.checked);
    //   if (child.id === childId) {
    //     return { ...child, checked: checked };
        
    //   }
    //   console.log(child)
    //   return child;
    // });
    
    // setChildren(updatedChildren);
  };

  return (
    <div className="container">
      {/* <input
        id="flexSwitchCheckChecked"
        className="form-check-input"
        type="checkbox"
         onChange={handleParentCheckboxChange}
      /> */}

      {/* <input
        className="form-check-input"
        type="checkbox"
        id="flexSwitchCheckChecked"
        checked={item.isChecked}
        onChange={(event) => handleChildCheckboxChange(event, item.id)}
      /> */}


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
              // onChange={handleParentCheckboxChange}
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

        {lightArray.map((item, index) => (
          <div key={index}>
            {item.checkedItems.map((checkItem, checkIndex) => (
              <div key={checkIndex}>
                <p className="m-0 my-2">{checkItem.section}</p>
                <div className="d-flex flex-row flex-nowrap overflow-auto text-center">
                  {checkItem.lines.map((lineVal, linIndex) => (
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
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="flexSwitchCheckChecked"
                                  checked={lineVal.checked}
                                  onChange={(event) => handleChildCheckboxChange(event,lineVal.id,checkItem.lines )}
                                />
                                {/* {JSON.stringify(lineVal.checked)} */}
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
        ))}
      </div>
    </div>
  );
}

export default Lights;
