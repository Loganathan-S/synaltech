import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../../constants/routePath";

function EditAutoLightConfig() {
  const [value, setValue] = useState("00:00");

  const [selectedButtonIndices, setSelectedButtonIndices] = useState([]);

  const [selectedlabel, setlabel] = useState([]);

  const navigate = useNavigate();

  const navToDashboard = () => {
    navigate(`${routeNames.dashboard}${routeNames.editname}`);
  };

  const weeklist = [
    { id: 1, label: "S", value: "Sun" },
    { id: 2, label: "M", value: "Mon" },
    { id: 3, label: "T", value: "Tue" },
    { id: 4, label: "W", value: "Wen" },
    { id: 5, label: "T", value: "Thu" },
    { id: 6, label: "F", value: "Fri" },
    { id: 7, label: "S", value: "Sat" },
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
    <div className="container ">
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
            <span>
              &nbsp;Edit Automation{" "}
              <butto className="btn btn-primary text-end mx-4">save</butto>{" "}
            </span>
          </label>

          <div
            className="card col-12 mt-3"
            style={{ backgroundColor: "#3f3d3d" }}
          >
            <div className="mt-2" style={{ backgroundColor: "#3f3d3d" }}>
              <form className="p-2" style={{ backgroundColor: "#3f3d3d" }}>
                <label
                  className="fontRepeat text-white"
                  style={{ backgroundColor: "#3f3d3d" }}
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control fontRepeat text-white"
                  value="Go To Sleep"
                  style={{ backgroundColor: "#3f3d3d" }}
                />
              </form>
            </div>

            <div className="col-12 mt-2 p-2 text-center"></div>
          </div>

          <div className="card  mt-3" style={{ backgroundColor: "#3f3d3d" }}>
            <div className="card-body">
              <div class="row ">
                <div class="col-4 text-center fontRepeat mt-2 text-white">
                  Time:
                </div>
                <div class="col-8 p-2 ">
                  <input
                    type="time"
                    onChange={(ev) => setValue(ev.target.value)}
                    min="00:00"
                    max="23:59"
                    step="60"
                    value={value}
                  />
                </div>

                <div className="container col-12  p-3 mx-2 mt-3 ">
                  <div className="row col-12">
                    <div className="col-6">
                      <p className="fontRepeat text-white">Reapeat: {""}</p>
                    </div>
                    <div className="col-6 form-check form-switch d-flex justify-content-end mb-2 text-end">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckChecked"
                        // checked={roomLightStateChange}
                        // onChange={roomValueChange}
                      />
                    </div>
                  </div>

                  <div className="mx-2 ">
                    {weeklist.map((level, index) => {
                      return (
                        <>
                          <button
                            onClick={() => handleButtonClick(index, level)}
                            style={{
                              backgroundColor: selectedButtonIndices.includes(
                                index
                              )
                                ? "blue"
                                : "white",
                            }}
                            className="btn-circle mx-1 "
                          >
                            <p> {level.label}</p>
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

          <div className="mt-4 col-12 mx-2 ">
            <div className="row">
              <div className="col-6">
                {" "}
                <p className="fontRepeat">Light</p>
              </div>
              <div className="col-6 text-end">
                <button className="btn btn-sm btn-primary">Edit</button>
              </div>
              <div className="col-6">
                {" "}
                <div className="card " style={{ backgroundColor: "#3f3d3d" }}>
                  <div className="card-body">
                    <Icon
                      icon="mdi:silverware-fork-knife"
                      color="white"
                      height={40}
                    />
                    <p className="fontRepeat mt-2 text-white">Dinner</p>
                    <p className="text-white">Light</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAutoLightConfig;
