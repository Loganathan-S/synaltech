import { Icon } from "@iconify/react";
import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../assests/css/global.css";
import { apiNames } from "../../routes/routeNames";
import { Apiservice } from "../../services/apiServices";
import "./Device.css";

function Device() {
  const [newDeviceLists, setNewDeviceLists] = useState([]);
  const [availableDevices, setAvailableDevices] = useState([]);
  const [availableDevicesPopup, setAvailableDevicesPopup] = useState(false);
  const [zoneList, setZoneList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [deviceName, setDeviceName] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [addDevicePlacePopup, setAddDevicePlacePopup] = useState(false);
  const [setupDevicePopup, setSetupDevicePopup] = useState(false);

  useEffect(() => {
    Apiservice.getLists(apiNames.zoneLists)
      .then((res) => {
        setZoneList(res);
      })
      .catch((err) => {
        console.log(err);
      });

    Apiservice.getLists(apiNames.sectionLists)
      .then((res) => {
        setSectionList(res);
      })
      .catch((err) => {
        console.log(err);
      });

    Apiservice.getLists(apiNames.locationLists)
      .then((res) => {
        setLocationList(res);
      })
      .catch((err) => {
        console.log(err);
      });

    newDevices();
    devices();
  }, []);

  const newDevices = () => {
    Apiservice.getLists(apiNames.newDeviceLists)
      .then((res) => {
        //console.log(res);
        if (res.length === 0) {
          setNewDeviceLists([]);
        } else {
          let jsonObj = res[0].description;
          let newDeviceLi = JSON.parse(jsonObj);
          setDeviceId(res[0].id);
          setNewDeviceLists(newDeviceLi);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const devices = () => {
    Apiservice.getLists(apiNames.deviceLists)
      .then((res) => {
        //console.log(res);
        setAvailableDevices(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deviceNameChange = (e) => {
    setDeviceName(e.target.value);
  };

  const zoneListChange = (e) => {
    setZoneId(e.target.value);
  };

  const sectionListChange = (e) => {
    setSectionId(e.target.value);
  };

  const locationListChange = (e) => {
    setLocationId(e.target.value);
  };

  const update = () => {
    axios
      .post(`http://192.168.1.46:4000/updateDevice/${deviceId}`, {
        deviceName: deviceName,
        zoneId: zoneId,
        sectionId: sectionId,
        locationId: locationId,
      })
      .then((res) => {
        console.log(res);
        setAvailableDevicesPopup("");
        setSetupDevicePopup("");
        setDeviceName("");
        setZoneId("");
        setSectionId("");
        setLocationId("");
        devices();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-6">
          <label className="ModuleHeading">Connected devices</label>
        </div>
        <div className="col-6 text-end">
          <div>
            <Icon
              icon="fa:plus-circle"
              color="#2596be"
              width="35"
              height="35"
              className="pointer"
              onClick={() => {
                setAvailableDevicesPopup(true);
              }}
            />
          </div>
        </div>
      </div>

      <div className="row pb-4 color text-center">
        {availableDevices.map((deviceDetails, index) => (
          <div
            key={`${deviceDetails.id}${index}`}
            className="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mt-3"
          >
            <div className="card h-100">
              <div className="card-body">
                <p className="FormContent">ID: {deviceDetails.deviceId}</p>
                <p className="FormContent">Name: {deviceDetails.deviceName}</p>
                <button className="btn btn-outline-primary btn-sm">
                  Configuare
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title={<label className="FormHeading">Add device</label>}
        centered
        open={availableDevicesPopup}
        onOk={() => setAvailableDevicesPopup(false)}
        onCancel={() => setAvailableDevicesPopup(false)}
        width={300}
        footer={null}
        maskClosable={false}
        //bodyStyle={{ overflowY: "auto", maxHeight: "calc(150vh - 200px)" }}
      >
        <div className="row pb-1 color text-center">
          <div className="card">
            <div className="card-body">
              {newDeviceLists.length === 0 ? (
                <div className="col-12">
                  <p className="FormContent">No devices found</p>
                </div>
              ) : (
                <>
                  <div className="col-12">
                    <div className="FormContent">ID: {newDeviceLists.id}</div>
                    <div className="mt-1 FormContent">
                      Name: {newDeviceLists.name}
                    </div>
                  </div>
                  <div className="text-center mt-3">
                    <button
                      onClick={() => setSetupDevicePopup(true)}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Setup
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* {newDeviceLists.map((availableDeviceDetails, index) => (
            <div
              key={`${availableDeviceDetails.id}${index}`}
              className="col-sm-12 col-md-6 col-lg-4 col-xl-12 col-xxl-4 mt-3"
            >
              <div className="card h-100">
                <div className="card-body text-center">                 
                  <div className="text-center">
                    <button
                      onClick={() => setSetupDevicePopup(true)}
                      className="btn btn-sm btn-outline-primary"
                    >
                      Configure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))} */}
        </div>
      </Modal>

      <Modal
        title={<label className="FormHeading">Setup device</label>}
        centered
        open={setupDevicePopup}
        onOk={() => setSetupDevicePopup(false)}
        onCancel={() => setSetupDevicePopup(false)}
        width={500}
        footer={null}
        maskClosable={false}
        //bodyStyle={{ overflowY: "auto", maxHeight: "calc(150vh - 200px)" }}
      >
        <div className="row col-12">
          <div className="form-group">
            <label className="FormContent">Device name</label>
            <input
              type={"text"}
              className="form-control mt-1 FormPlaceholder"
              name="deviceName"
              value={deviceName}
              onChange={deviceNameChange}
              placeholder={"Enter device name"}
            />
          </div>
          <div className="form-group pt-3">
            <label className="FormContent">Zone</label>
            <select
              className="form-select mt-1 FormPlaceholder"
              aria-label="Default select example"
              name="zoneList"
              value={zoneId}
              onChange={zoneListChange}
            >
              <option>Select</option>
              {zoneList.map((list, index) => (
                <option key={`${list.id}${index}`} value={list.id}>
                  {list.zoneName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group pt-3">
            <label className="FormContent">Section</label>
            <select
              className="form-select mt-1 FormPlaceholder"
              aria-label="Default select example"
              name="sectionList"
              value={sectionId}
              onChange={sectionListChange}
            >
              <option>Select</option>
              {sectionList.map((list, index) => (
                <option key={`${list.id}${index}`} value={list.id}>
                  {list.section}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group pt-3">
            <label className="FormContent">Location</label>
            <select
              className="form-select mt-1 FormPlaceholder"
              aria-label="Default select example"
              name="sectionList"
              value={locationId}
              onChange={locationListChange}
            >
              <option>Select</option>
              {locationList.map((list, index) => (
                <option key={`${list.id}${index}`} value={list.id}>
                  {list.location}
                </option>
              ))}
            </select>
          </div>
          <div className="text-center mt-3">
            <button onClick={update} className="btn btn-sm btn-outline-primary">
              Save
            </button>
          </div>
        </div>
        {/* <div className="row pb-4 color">
          <div className="col-12 mt-3">
            <form action="">
              <div className="mb-3">
                <label htmlFor="">Zone</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="zoneList"
                  value={zoneName}
                  onChange={zoneListChange}
                >
                  <option>select</option>
                  {zoneList.map((list, index) => (
                    <option key={`${list.id}${index}`} value={list.zoneName}>
                      {list.zoneName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="">Section</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="sectionList"
                  value={sectionName}
                  onChange={sectionListChange}
                >
                  <option>select</option>
                  {sectionList.map((list, index) => (
                    <option key={`${list.id}${index}`} value={list.section}>
                      {list.section}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div> */}
      </Modal>
    </>
  );
}

export default Device;
