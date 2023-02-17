import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../../constants/routePath";

function AutomationName() {
  const [value, setValue] = useState("00:00");

  const [selectedButtonIndices, setSelectedButtonIndices] = useState([]);

  const [selectedlabel, setlabel] = useState([]);

  const navigate = useNavigate();

  const navToDashboard = () => {
    navigate(`${routeNames.dashboard}${routeNames.addautomation}`);
  };

  const weeklist = [
    { id: 1, label: "S", value: "Sun" },
    { id: 2, label: "M", value: "Mon" },
    { id: 3, label: "T", value: "Tue" },
    { id: 4, label: "W", value: "Wen" },
    { id: 5, label: "T", value: "Thu" },
    { id: 6, label: "F", value: "Fri" },
    { id: 7, label: "S", value: "Sat" }
  ];

  const handleButtonClick = (index, level) => {
    console.log(level);

    setlabel((prevState) => [...prevState, level]);
    console.log(selectedlabel);

    if (selectedButtonIndices.includes(index, level)) {
      setSelectedButtonIndices(
        selectedButtonIndices.filter((i) => i !== index)
      );
    } else {
      setSelectedButtonIndices([...selectedButtonIndices, index]);
    }
  };

  return (
    <div className="container " >
      <div className="row  min-vh-100">
        <div className="col-12 mt-2">
          <label className="ModuleHeading ">
            <Icon
              icon="material-symbols:arrow-right-alt-rounded"
              fontSize={32}
              rotate={2}
              onClick={navToDashboard}
              style={{ cursor: "pointer" }}
            />
            {/* <span >&nbsp;Automation</span> */}
          </label>

          <h4 className="mt-2 ">
            When do you want to start dimming your lights?
          </h4>


          <div className="card  mt-3"style={{backgroundColor:"#3f3d3d" }} >
<div className="card-body">
<div class="row ">
            <div class="col-4 text-center mt-2 text-white">Time:</div>
            <div class="col-8 p-2 fontRepeat">
              <input
                type="time"
                onChange={(ev) => setValue(ev.target.value)}
                min="00:00"
                max="23:59"
                step="60"
                value={value}
              />
            </div>

            <div className="container col-12  p-3 mx-2 mt-3 " >


            <p className="fontRepeat text-white">Reapeat: {""}</p>  


              <div className="mx-2 ">
                {weeklist.map((level, index) => {
                  return (
                    <>

                   
                      <button
                        onClick={() => handleButtonClick(index, level)}
                        style={{
                          backgroundColor: selectedButtonIndices.includes(index)
                            ? "#4d94ff"
                            : "white",
                            color: selectedButtonIndices.includes(index)
                            ? "white"
                            : "black"
                        }}
                        className="btn-circle mx-1"
                      >
                        {level.label}
                      </button>
                     
                    </>
                  );
                })}

                <div class="d-flex flex-row ">
                  {selectedlabel.map((item) => (
                    <span className=" mx-2 text-white">{item.value}</span>
                  ))}
                </div>
              </div>
             
            </div>


           
          </div>
</div>
        
          
        </div>
        <div className="text-center  p-3 ">
                <button className="btn btn-primary" onClick={()=>navigate(`${routeNames.dashboard}${routeNames.addautolight}`)}>Next</button>
              </div>
        </div>

       
      </div>
    </div>
  );
}

export default AutomationName;
