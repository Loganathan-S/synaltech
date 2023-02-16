import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { apiNames, routeNames } from "../../constants/routePath";
import { Apiservice } from "../../services/apiServices";
import zoneImage from "../../assests/images/Zone.jpg";
import roomImage from "../../assests/images/Room.jpg";

function AddRoomZone() {
  // const [zone, setZone] = useState("");
  // const [section, setSection] = useState("");

  const navigate = useNavigate();

  const navToDashboard = () => {
    navigate(`${routeNames.dashboard}${routeNames.home}`);
  };

  // const handleZoneChange = (e) => {
  //   setZone(e.target.value);
  // };

  // const handleSectionChange = (e) => {
  //   setSection(e.target.value);
  // };

  // const addZone = () => {
  //   let zoneObj = zone;
  //   Apiservice.addZoneList(apiNames.newZone, zoneObj)
  //     // .then((res) => {
  //     //   console.log(res);
  //     // })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setZone("");
  // };

  // const addSection = () => {
  //   let addSection = section;
  //   Apiservice.addSectionList(apiNames.newSection, addSection)
  //     // .then((res) => {
  //     //   console.log(res);
  //     // })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   setSection("");
  // };

  // const viewRoomZoneList = () => {
  //   navigate(`${routeNames.dashboard}${routeNames.roomzonelist}`);
  // };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12">
          <label className="ModuleHeading">
            <Icon
              icon="material-symbols:arrow-right-alt-rounded"
              fontSize={32}
              rotate={2}
              onClick={navToDashboard}
              style={{ cursor: "pointer" }}
            />
            <span>&nbsp;Add Zone/Room</span>
          </label>
        </div>

        <div className="col-12 col-md-3 mt-4">
          <div
            className="card position-relative rounded" 
            onClick={() =>
              navigate(`${routeNames.dashboard}${routeNames.defaultzone}`)
            }
          >
            <div className="position-absolute top-0 start-0 p-3">
              <h4 className="text-white">Zone</h4>
            </div>
            <img src={zoneImage} className="card-img-top img-fluid" alt="..." />
          </div>
        </div>

        <div className="col-12 col-md-3 mt-4 b" >
          <div
            className="card position-relative rounded"
            onClick={() =>
              navigate(`${routeNames.dashboard}${routeNames.defaultroom}`)
            }
          >
            <div className="position-absolute top-0 start-0 p-3">
              <h4 className="text-white">Room</h4>
            </div>
            <img src={roomImage} className="card-img-top img-fluid" alt="..." />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRoomZone;
