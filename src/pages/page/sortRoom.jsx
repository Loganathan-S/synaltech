import { Icon } from "@iconify/react";
import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { routeNames } from "../../routes/routeNames";

function SortRoomZone() {
  const [zones, setZonesLists] = useState([]);

  const [rooms, setRoomLists] = useState([]);
  const navigateToDashboard = useNavigate();

  useEffect(() => {
    getZoneLists();
    getSectionLists();
  }, []);

  const getZoneLists = () => {
    axios
      .get("http://192.168.1.46:3000/zoneList")
      .then((res) => {
        console.log(res);
        if (res.length === 0) {
          setZonesLists([]);
        } else {
          setZonesLists(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSectionLists = () => {
    axios
      .get("http://192.168.1.46:3000/sectionList")
      .then((res) => {
        console.log(res);
        if (res.length === 0) {
          setRoomLists([]);
        } else {
          setRoomLists(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            <span>&nbsp;Sort Zone/Room</span>
          </label>
        </div>
      </div>

      <div className="row mt-2">
        {zones ? <h5>Zone:</h5> : null}
        {zones.map((zone, index) => (
          <div key={index} className="col-sm-12 col-md-4  mt-2">
            <Card cover hoverable>
              <div className="row">
                <div className="col-9">
                  <p className="fs-5 m-0">{zone.zoneName}</p>
                </div>
                <div className="col-3 text-end">
                  <p className="fs-5 m-0">
                    <Icon icon="mdi:database-eye-outline" />
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="row mt-2">
        {rooms ? <h5>Room:</h5> : null}
        {rooms.map((room, index) => (
          <div key={index} className="col-sm-12 col-md-4  mt-2">
            <Card cover hoverable>
              <div className="row">
                <div className="col-9">
                  <p className="fs-5 m-0">{room.section}</p>
                </div>
                <div className="col-3 text-end">
                  <p className="fs-5 m-0">
                    <Icon icon="mdi:database-eye-outline" />
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SortRoomZone;
