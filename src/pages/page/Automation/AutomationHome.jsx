import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assests/css/global.scss";
import { routeNames } from "../../../constants/routePath";
import { Button, Modal } from "antd";
import { useState } from "react";
import wakeup from "../../../assests/images/wakeuplight.jpg";
import gotosleep from "../../../assests/images/gotosleep.jpg";
import leavehome from "../../../assests/images/leavinghome.jpg";
import enterhome from "../../../assests/images/enterhome.jpg";

function Automation(props) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [label,setlabel]=useState([])

  const navToDashboard = () => {
    navigate(`${routeNames.dashboard}${routeNames.home}`);
  };

  const navToAutomation = () => {
    navigate(`${routeNames.dashboard}${routeNames.addautomation}`);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    
    fetch("http://192.168.1.46:4000/automationlist")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result);
        setlabel(JSON.parse(result[0].repeatmode)
          )
console.log(JSON.parse(result[0].repeatmode));
          // setTimeout(() => {
            

          //   let linesObj = [];
          //   for (let item of label) {
          //     linesObj.push(JSON.parse(item.lines));
          //   }
          //   console.log(linesObj);
          // }, 2);
         

      });
  };

  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute +  (hour < 12 ? "AM" : "PM");
}

const automationnavigate=(name,i)=>{
  console.log(name);
  console.log(i);

  sessionStorage.setItem("autoname",name)
  sessionStorage.setItem("automationid",i)

  navigate(
    `${routeNames.dashboard}${routeNames.editname}`, {state: { name }}
  )
}


  return (
    <div className="container ">
      <div className="mt-3">
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
              <span className="">&nbsp;Automation</span>
            </label>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <div className="text-end">
            <Icon
              icon="fa:plus-circle"
              color="#2596be"
              height={33}
              className="pointer"
              onClick={navToAutomation}
            />
          </div>

          <div className="container">
            <div className="row mt-1">
              <div className="col-12 mt-2">
                <div className=" position-relative">
                  <div className=" p-0">
                    {/* <h4 className="mx-2 ">GoTo Sleep </h4> */}


                    
 
       
            {data.map((item,i) => {
              return (
                <div className="mt-2">
                <h4 className="mx-2 mt-2">{item.automationname} </h4>
                <div
                  className="card "
                  style={{ backgroundColor: "#3f3d3d" }}
                >
                  <div className="card-body">
                    <div
                      className="row col-12"
                      style={{ backgroundColor: "#3f3d3d" }}
                    >
                      <div
                        className="col-8"
                        onClick={() =>automationnavigate(item.automationname,item.id)
                         
                        }
                      >
                        <p className="fontRepeat text-white">
                          
                       <span className="">    {formatTime(item.autotime)}</span>
                        </p>
                        <p className="fontRepeat text-white space-between mx-1">
                     
                          {label.map((i) => {
                            return <>
                            
                           <span className="mx-1"> {i.value
}</span></>;
                          })}
                        {/* {JSON.parse(item.repeatmode)} */}
                        </p>
                      </div>
                      <div className="col-4 form-check form-switch d-flex justify-content-end mb-2 text-end">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                           checked={item.checked}
                          // onChange={roomValueChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
         
     

                    {/* {data.map((item) => {

                      return (
                        <div>
                          <h4 className="mx-2 ">{item.name} </h4>
                          <div
                            className="card "
                            style={{ backgroundColor: "#3f3d3d" }}
                          >
                            <div className="card-body">
                              <div
                                className="row col-12"
                                style={{ backgroundColor: "#3f3d3d" }}
                              >
                                <div
                                  className="col-8"
                                  onClick={() =>
                                    navigate(
                                      `${routeNames.dashboard}${routeNames.editname}`
                                    )
                                  }
                                >
                                  <p className="fontRepeat text-white">
                                    {item.Time} . {item.name}
                                  </p>
                                  <p className="fontRepeat text-white space-between">
                                    {item.Repeat.map((i) => {
                                      return <>{i.value}</>;
                                    })}
                                  </p>
                                </div>
                                <div className="col-4 form-check form-switch d-flex justify-content-end mb-2 text-end">
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
                      );
                    })} */}
                  </div>

                  {/* <div className="card " style={{ backgroundColor: "#3f3d3d" }}>
                    <div className="card-body">
                      <div
                        className="row col-12"
                        style={{ backgroundColor: "#3f3d3d" }}
                      >
                        <div
                          className="col-8"
                          onClick={() =>
                            navigate(
                              `${routeNames.dashboard}${routeNames.editname}`
                            )
                          }
                        >
                          <p className="fontRepeat text-white">
                            7:30 AM . GoToSleep
                          </p>
                          <p className="fontRepeat text-white">Wenesday</p>
                        </div>
                        <div className="col-4 form-check form-switch d-flex justify-content-end mb-2 text-end">
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
                  </div> */}
                  {/* <img
                    src={enterhome}
                    className="card-img-top"
                    alt="..."
                    height={150}
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Automation;
