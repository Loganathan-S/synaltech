import React from "react";
import { Card, Tabs } from "antd";
import { Icon } from "@iconify/react";
import { useState } from "react";
import "../../assests/css/global.scss";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../constants/routePath";

function Settings() {
  const [settingLists, setSettingList] = useState([
    "Account",
    "Device List",
    "Bridge Details",
  ]);
  const [settingIcons, setSettingIcons] = useState([
    <Icon icon="ic:baseline-account-circle" />,
    <Icon icon="ic:round-device-hub" inline={true} />,
    <Icon icon="tabler:list-details" />,
  ]);
  const navigate = useNavigate();
  const navigateToDashboard = useNavigate();

  const showDeviceList = (id, list) => {
    // console.log(id);
    if (settingLists[id] === "Account") {
      console.log("Account");
    } else if (settingLists[id] === "Device List") {
      navigate(`${routeNames.dashboard}${routeNames.device}`);
    } else if (settingLists[id] === "Bridge Details") {
      console.log("Bridge Details");
    }
  };

  const navToDashboard = () => {
    navigateToDashboard(`${routeNames.dashboard}${routeNames.home}`);
  };

  return (
    <div className="container">
      <div className=" mt-3">
        <label className="ModuleHeading">
          <Icon
            icon="material-symbols:arrow-right-alt-rounded"
            fontSize={32}
            rotate={2}
            onClick={navToDashboard}
            style={{ cursor: "pointer" }}
          />
          <span>&nbsp;Settings</span>
        </label>
      </div>
      <div className="row">
        {settingLists.map((settingList, listIndex) => (
          <div
            key={listIndex}
            className="col-sm-12 col-md-4 mt-3"
            onClick={(e) => showDeviceList(listIndex, settingList)}
          >
            {settingIcons.map(
              (settingIcon, iconIndex) =>
                listIndex === iconIndex && (
                  <Card
                    key={iconIndex}
                    cover
                    hoverable
                    style={{
                      width: 350,
                    }}
                  >
                    <p className="hoverLink FormContent m-0">
                      {settingIcon}&nbsp;&nbsp;&nbsp;{settingList}
                    </p>
                  </Card>
                )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Settings;
