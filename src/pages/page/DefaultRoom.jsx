import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../constants/routePath";
import "../../assests/css/global.scss";

function DefaultRoom() {
  const navigate = useNavigate();

  const navToDashboard = () => {
    navigate(`${routeNames.dashboard}${routeNames.addroomzone}`);
  };

  const levelsIcon = [
    <Icon icon="tabler:stairs-down" className=" text-white" />,
    <Icon icon="tabler:stairs-up" className=" text-white" />,
    <Icon icon="material-symbols:garage-home" className=" text-white" />,
    <Icon icon="material-symbols:garage-home" className=" text-white" />,
    <Icon icon="material-symbols:garage-home" className=" text-white" />,
  ];

  const levels = ["Living room", "Kitchen", "Dining", "Bedroom", "Other"];

  const addRoom = (idx,name) => {
    // console.log(idx,name)
    sessionStorage.setItem("redirectname","room")
    navigate(`${routeNames.dashboard}${routeNames.roomlists}`,{state:name})
  }

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
        <div className="col-12 mt-2">
          <h5 className="mt-2 mb-3">What kind of Room would you like to add ?</h5>
          <p className="mb-1 fw-bold">LEVELS</p>
          <div className="card bg_Levels_Card">
            <div className="card-body">
              <div className="row">
                {levels.map((level, inx) => (
                  <div key={inx} className="col-4 text-center mt-2">
                    {levelsIcon.map((icon, index) => (
                      <div key={index}>
                        {inx === index && (
                          <>
                            <div className="iconBackground   mx-auto"  onClick={()=> addRoom(index,level)}>
                              <p className="pt-1 fs-4">{icon}</p>
                            </div>
                            <p className="text-white">{level}</p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultRoom;
