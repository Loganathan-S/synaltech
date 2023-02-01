import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../assests/css/global.scss";
import { routeNames } from "../../constants/routePath";

function Automation() {
  const navigateToDashboard = useNavigate();

  const navToDashboard = () => {
    navigateToDashboard(`${routeNames.dashboard}${routeNames.home}`);
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
            <span>&nbsp;Automation</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Automation;
