import { Icon } from "@iconify/react";
//import { Card } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiNames, routeNames } from "../../constants/routePath";
import "../../assests/css/global.scss";
import "./scss/Device.scss";
import Form from "react-bootstrap/Form";
import { Apiservice } from "../../services/apiServices";

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
    Apiservice.getLists(apiNames.deviceLists)
      .then((res) => {
        console.log(res);
        if (res.length === 0) {
          setRoomLists([]);
        } else {
          const allRoomNames = res.map((lp) =>
            JSON.parse(lp.description)?.lines.map((p) => p.name)
          );

          const flattened = allRoomNames.flat(2);

          const unique = [...new Set(flattened)];
          console.log(unique);
          setRoomLists(unique);
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
            <span>&nbsp;Configure</span>
          </label>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-12">
          <label className="FormHeading">Select zone:</label>
          <Form.Select aria-label="Default select example">
            <option>Select zone</option>
            {zones.map((zone, index) => (
              <option key={`${zone.id}${index}`} value={zone.id}>
                {zone.zoneName}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-12">
          <label className="FormHeading">Select room:</label>
          <Form.Select aria-label="Default select example">
            <option>Select room</option>
            {rooms &&
              rooms.map(
                (room, index) =>
                  room && (
                    <option key={index} value={room}>
                      {room}
                    </option>
                  )
              )}
          </Form.Select>
        </div>
      </div>
    </div>
  );
}

export default SortRoomZone;
