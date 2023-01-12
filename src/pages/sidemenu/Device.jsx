import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Modal } from "antd";
import axios from "axios";
import "../../assests/css/global.css";
import "./Device.css";
import { Apiservice } from "../../services/apiServices";
import { apiNames } from "../../routes/routeNames";

function Device() {
  const [newDeviceLists, setNewDeviceLists] = useState([]);
  const [availableDevices, setAvailableDevices] = useState([]);
  const [availableDevicesPopup, setAvailableDevicesPopup] = useState(false);
  const [zoneList, setZoneList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [zoneId, setZoneId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [addDevicePlacePopup, setAddDevicePlacePopup] = useState(false);
  const [secondPopup, setSecondPopup] = useState(false);

  useEffect(() => {
    Apiservice.getLists(apiNames.newDeviceLists)
      .then((res) => {
        console.log(res[0].description);
        setNewDeviceLists(res[0].description);
      })
      .catch((err) => {
        console.log(err);
      });

    Apiservice.getLists(apiNames.deviceLists)
      .then((res) => {
        //console.log(res);
        setAvailableDevices(res);
      })
      .catch((err) => {
        console.log(err);
      });

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
  }, []);

  const zoneListChange = (e) => {
    setZoneId(e.target.value);
  };

  const sectionListChange = (e) => {
    setSectionId(e.target.value);
  };

  const locationListChange = (e) => {
    setLocationId(e.target.value);
  };

  return (
    <>
      <div className="row">
        <div className="col-6">
          <h4>Connected devices</h4>
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

      <div className="row pb-4 color">
        {availableDevices.map((deviceDetails, index) => (
          <div
            key={`${deviceDetails.id}${index}`}
            className="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mt-3"
          >
            <div className="card h-100">
              <div className="card-body">
                <p>{deviceDetails.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title={<label className="FormContent">Add device</label>}
        centered
        open={availableDevicesPopup}
        onOk={() => setAvailableDevicesPopup(false)}
        onCancel={() => setAvailableDevicesPopup(false)}
        width={600}
        footer={null}
        maskClosable={false}
        //bodyStyle={{ overflowY: "auto", maxHeight: "calc(150vh - 200px)" }}
      >
        <div className="row pb-1 color">
          {Object.values(newDeviceLists)}
          <div className="text-center">
            <button
              onClick={() => setSecondPopup(true)}
              className="btn btn-sm btn-outline-primary"
            >
              Configure
            </button>
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
                      onClick={() => setSecondPopup(true)}
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
        title={<label className="FormContent">Setup device</label>}
        centered
        open={secondPopup}
        onOk={() => setSecondPopup(false)}
        onCancel={() => setSecondPopup(false)}
        width={500}
        footer={null}
        maskClosable={false}
        //bodyStyle={{ overflowY: "auto", maxHeight: "calc(150vh - 200px)" }}
      >
        <div className="row col-12 mt-3 p-2">
          <form>
            <div className="form-group">
              <label className="FormLabel">Zone</label>
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
              <label className="FormLabel">Section</label>
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
              <label className="FormLabel">Location</label>
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
              <button
                //onClick={() => setSecondPopup(true)}
                className="btn btn-sm btn-outline-primary"
              >
                Save
              </button>
            </div>
          </form>
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
