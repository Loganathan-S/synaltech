import { Icon } from "@iconify/react";
//import { Card } from "antd";
//import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiNames, routeNames } from "../../constants/routePath";
import "../../assests/css/global.scss";
import "./scss/Device.scss";
import Form from "react-bootstrap/Form";
import { Apiservice } from "../../services/apiServices";
import { Multiselect } from "multiselect-react-dropdown";
import axios from "axios";

function SortRoomZone() {
  const navigateToDashboard = useNavigate();
  const [zones, setZonesLists] = useState([]);
  const [options, setOptions] = useState([]);
  const [deviceDetails, setDeviceDetails] = useState([]);
  const [zoneID, setZoneID] = useState("");

  useEffect(() => {
    getZoneLists();
    getSectionLists();
  }, []);

  const getZoneLists = () => {
    Apiservice.getLists(apiNames.zonelists)
      .then((res) => {
        //console.log(res);
        if (res.length === 0) {
          setZonesLists([]);
        } else {
          setZonesLists(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSectionLists = () => {
    Apiservice.getLists(apiNames.deviceLists)
      .then((res) => {
        //console.log(res);
        if (res.length !== 0) {
          const allRoomNames = res.map((lp) =>
            JSON.parse(lp.description)?.lines.map((p) => ({
              deviceid: lp.id,
              name: p.name,
              lineid: p.id,
            }))
          );
          const flatRoomNames = allRoomNames.flat(2);
          // const unique = [...new Set(flatRoomNames)];
          // const removedEmptyValues = unique.filter(function (e) {
          //   return e;
          // });

          // const options = flatRoomNames.map((x, index) => ({
          //   name: x,
          //   id: flatLineID[index],
          //   ide: 1,
          // }));

          //console.log(flatRoomNames);
          setOptions(flatRoomNames);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navToDashboard = () => {
    navigateToDashboard(`${routeNames.dashboard}${routeNames.home}`);
  };

  const zoneChange = (zoneid) => {
    setZoneID(zoneid);
  };

  const onSelect = (selectedList, selectedItem) => {
    //console.log(selectedList);
    setDeviceDetails(selectedList);
    // const name = selectedList.map((names) => {
    //   return names.name;
    // });
    //const roomNameInString = name.toString();
    //setRoomNames(roomNameInString);
    //console.log(roomNameInString);
    //console.log(selectedList);
    //console.log(selectedItem.name);
  };

  const onRemove = (selectedList, removedItem) => {
    setDeviceDetails(selectedList);
    // const name = selectedList.map((names) => {
    //   return names.name;
    // });
    //const roomNameInString = name.toString();
    //setRoomNames(roomNameInString);
    //console.log(roomNameInString);
    //console.log(selectedList);
    //console.log(removedItem.name);
  };

  const updateConfigure = () => {
    //console.log("User_ID " + localStorage.getItem("userId"));
    //console.log("Zone_ID " + zoneID);
    //console.log(roomNames);
    //console.log(deviceDetails);
    const createZone = {
      userId: localStorage.getItem("userId"),
      zoneId: zoneID,
      deviceDetails: deviceDetails,
    };

    console.log(createZone);

    axios
      .post("http://192.168.1.46:4000/configureZone", createZone)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
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

        <div className="row mt-3">
          <div className="col-12">
            <label className="FormHeading">Select zone:</label>
            <Form.Select
              aria-label="Default select example"
              className="mt-1"
              onChange={(e) => zoneChange(e.target.value)}
            >
              <option>Select</option>
              {zones &&
                zones.map(
                  (zone, index) =>
                    zone.zoneName && (
                      <option key={`${zone.id}${index}`} value={zone.id}>
                        {zone.zoneName}
                      </option>
                    )
                )}
            </Form.Select>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <label className="FormHeading">Select room:</label>
            <Multiselect
              placeholder="Select"
              // disablePreSelectedValues={true}
              // showCheckbox={true}
              showArrow
              options={options} // Options to display in the dropdown
              //selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
              onSelect={onSelect} // Function will trigger on select event
              onRemove={onRemove} // Function will trigger on remove event
              displayValue="name" // Property name to display in the dropdown options
              className="mt-1"
            />
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button
          type={"button"}
          className={"btn btn-sm btn-outline-primary"}
          onClick={updateConfigure}
        >
          Update
        </button>
      </div>
    </>
  );
}

export default SortRoomZone;
