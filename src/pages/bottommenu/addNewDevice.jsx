import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { routeNames } from "../../routes/routeNames";

function AddNewDevice() {
  const navigateToDashboard = useNavigate();
  const people = [
    {
      id: 1,
      deviceId: 1,
      deviceName: "Kitchen",
      sectionId: 1,
      zoneId: 1,
    },
    {
      id: 2,
      deviceId: 2,
      deviceName: "Hall",
      sectionId: 2,
      zoneId: 2,
    },
    { id: 3, deviceId: 3, deviceName: "Bedroom", sectionId: 3, zoneId: 3 },
    {
      id: 4,
      deviceId: 4,
      deviceName: "masterbedroom",
      sectionId: 4,
      zoneId: 4,
    },
    {
      id: 5,
      deviceId: 5,
      deviceName: "masterbedroom",
      sectionId: 5,
      zoneId: 5,
    },
  ];

  const [search, setNewSearch] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [item, setItem] = useState([]);

  useEffect(() => {
    const item = people.filter((person) =>
      person.deviceName.toLowerCase().includes(search.toLowerCase())
    );
    setItem(item);
  }, [item]);

  const searchHandleSearch = (e) => {
    setIsShow(true);
  };

  const searchOnchage = (e) => {
    if (e.target.value === "") {
      setIsShow(false);
    }

    setNewSearch(e.target.value);
  };
  const navToDashboard = () => {
    navigateToDashboard(routeNames.dashboard);
  };
  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-sm-12 col-md-12">
          <label className="ModuleHeading">
            <Icon
              icon="material-symbols:arrow-right-alt-rounded"
              fontSize={32}
              rotate={2}
              onClick={navToDashboard}
              style={{ cursor: "pointer" }}
            />
            <span>&nbsp;Add Device</span>
          </label>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body ">
          <div className="row mt-2 text-center">
            <div className="col-sm-12 col-md-12">
              <input
                className="form-control"
                type="text"
                placeholder="Enter Device Name"
                value={search}
                onChange={searchOnchage}
              />
            </div>
            <div>
              <button
                className="btn btn-sm btn-outline-primary mt-3"
                onClick={searchHandleSearch}
              >
                Search
              </button>
            </div>
          </div>

          {isShow ? (
            <>
              {item.map((person) => {
                return (
                  <div className="text-center" key={person.id}>
                    <div className="card mt-3">
                      <div className="card-body">{person.deviceName}</div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AddNewDevice;
