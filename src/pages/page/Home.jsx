import React from "react";
import { Card } from "antd";
import { Icon } from "@iconify/react";
import { useState } from "react";
import "../../assests/css/global.scss";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../constants/routePath";

function Home() {
  const [listShow, setListShow] = useState(false);
  const addLists = ["Add Device", "Add Zone & Room", "Configure Zone"];
  const icons = [
    <Icon icon="ic:round-device-hub" inline={true} />,
    <Icon icon="ic:baseline-meeting-room" inline={true} />,
    <Icon icon="mdi:sort-calendar-descending" inline={true} />,
  ];
  const navigate = useNavigate();
  const navToLogout = useNavigate();

  const showAddList = () => {
    setListShow(!listShow);
  };

  const logout = () => {
    navToLogout(routeNames.auth.login);
  };

  const addDevice = (list, id) => {
    if (addLists[id] === "Add Device") {
      navigate(`${routeNames.dashboard}${routeNames.addnewdevice}`);
    } else if (addLists[id] === "Add Zone & Room") {
      //console.log("Add new Room/Zone");
      navigate(`${routeNames.dashboard}${routeNames.addroomzone}`);
    } else if (addLists[id] === "Configure Zone") {
      // console.log("Sort Zone/Room");
      navigate(`${routeNames.dashboard}${routeNames.sortroom}`);
    }
  };

  return (
    <div className="container">
      <div className=" mt-3">
        <div className="row">
          <div className="col-8">
            <h3 className="ModuleHeading" style={{ cursor: "pointer" }}>
              SynalTech
            </h3>
          </div>
          <div className="col-4 text-end">
            <button className="btn btn-sm btn-secondary" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <div className="text-end">
            <Icon
              icon="fa:plus-circle"
              color="#2596be"
              width="35"
              height="35"
              className="pointer"
              onClick={showAddList}
            />
          </div>
          {listShow ? (
            <div className="row">
              {icons.map((icon, iconIndex) => (
                <div key={iconIndex} className="col-sm-12 col-md-4 mt-3">
                  {addLists.map(
                    (list, listIndex) =>
                      iconIndex === listIndex && (
                        <Card
                          key={listIndex}
                          cover
                          hoverable
                          style={{
                            width: 350,
                          }}
                          onClick={() => addDevice(list, listIndex)}
                        >
                          <div className="row">
                            <div className="col-9">
                              <p className="hoverLink FormContent m-0">
                                {icon}&nbsp;&nbsp;&nbsp;{list}
                              </p>
                            </div>
                            <div className="col-3 text-end">
                              {/* <Icon
                              icon="fa:plus-circle"
                              color="#2596ba"
                              width="25"
                              height="25"
                              className="pointer"
                            /> */}
                            </div>
                          </div>
                        </Card>
                      )
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Home;
