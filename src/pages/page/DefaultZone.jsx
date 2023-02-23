import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiNames, routeNames } from "../../constants/routePath";
import { Apiservice } from "../../services/apiServices";

function DefaultZone() {

   const [zoneLists, setZoneLists] = useState([]);

  const navigate = useNavigate();

  const navToDashboard = () => {
    
    navigate(`${routeNames.dashboard}${routeNames.addroomzone}`);
  };

  useEffect(() => {
    Apiservice.getLists(apiNames.zoneLists)
    .then((res) => {
      console.log(res);
      setZoneLists(res);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [])
  
  const levelsIcon = [
    <Icon icon="tabler:stairs-down" className=" text-white" />,
    <Icon icon="tabler:stairs-up" className=" text-white" />,
    <Icon icon="material-symbols:garage-home" className=" text-white" />,
    <Icon icon="material-symbols:garage-home" className=" text-white" />,
    <Icon icon="material-symbols:garage-home" className=" text-white" />,
  ];

  // const levels = ["Downstairs", "Upstairs", "Ground floor", "Dancing floor", "Other"];

  const addZones = (idx,name) => {
    sessionStorage.setItem("redirectname","zone")
    navigate(`${routeNames.dashboard}${routeNames.zonelists}`,{state: name})
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
            <span>&nbsp;Add Zone</span>
          </label>
        </div>
        <div className="col-12 mt-2">
          <h5 className="mt-2 mb-3">What kind of zone would you like to add ?</h5>
          <p className="mb-1 fw-bold">LEVELS</p>
          <div className="card bg_Levels_Card">
            <div className="card-body">
              <div className="row">
                {zoneLists.map((level, inx) => (
                  <div key={inx} className="col-4 text-center mt-2">
                    {levelsIcon.map((icon, index) => (
                      <div key={index}>
                        {inx === index && (
                          <>
                            <div className="iconBackground   mx-auto" onClick={()=> addZones(index,level.zoneName)}>
                              <p className="pt-1 fs-4">{icon}</p>
                            </div>
                            <p className="text-white">{level.zoneName}</p>
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

export default DefaultZone;
