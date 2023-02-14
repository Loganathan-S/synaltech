import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../constants/routePath";

function DefaultRoom() {
  const navigate = useNavigate();

  const navToDashboard = () => {
    navigate(`${routeNames.dashboard}${routeNames.addroomzone}`);
  };

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
            <span>&nbsp;Add Room</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default DefaultRoom;
