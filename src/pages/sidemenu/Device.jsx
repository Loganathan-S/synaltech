/* Received from Elumalai */
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Apiservice } from "../../services/apiServices";
import { apiNames } from "../../routes/routeNames";
import { Modal } from "antd";
import axios from "axios";
import "../../assests/css/global.css";

function Device() {
  const [open, setOpen] = useState(false);
  const [zoneList, setZoneList] = useState([]);
  const [zoneName, setZoneName] = useState("");
  const [deviceList, setDeviceList] = useState([]);
  const [deviceName, setDeviceName] = useState("");
  const [loactionList, setLocationList] = useState([]);
  const [loactionname, setLocationname] = useState("");
  const [sectionList, setSectionList] = useState([]);
  const [deviceLists, setDeviceLists] = useState([]);

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
        //console.log(res);
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

    Apiservice.getLists(apiNames.deviceLists)
      .then((res) => {
        setDeviceList(res);
        //console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const fetchapi = async () => {
      const data = await fetch("http://192.168.1.46:4000/deviceList");
      const dataj = await data.json();
      //console.log(dataj);
      setDeviceLists(dataj);
    };
    fetchapi();
  }, []);

  const zoneListChange = (e) => {
    var index = e.target.selectedIndex;
    var optionElement = e.target.childNodes[index];
    console.log(index);
    console.log(optionElement.value);
    console.log(e.target.value);
    setZoneName(e.target.value);
    setTimeout(() => {
      console.log(zoneName);
    }, 1);
  };

  const sectionListChange = (e) => {
    console.log(e.target.value);
    setLocationname(e.target.value);
  };

  const deviceListChange = (e) => {
    setDeviceName(e.target.value);
  };

  const sumbitform = () => {
    axios
      .post("http://192.168.1.46:4000/newDeviceList", {
        deviceName: deviceName,
        zoneId: zoneName,
        sectionId: loactionname,
      })
      .then((res) => {
        setZoneList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-6">
          <h4>Device</h4>
        </div>
        <div className="col-6 text-end">
          <div>
            <Icon
              icon="fa:plus-circle"
              color="#2596be"
              width="35"
              height="35"
              onClick={() => setOpen(true)}
              className="pointer"
            />
          </div>
        </div>

        {deviceLists.length > 0 ? (
          <div className="row pb-4 color">
            {deviceLists.map((item, index) => (
              <div
                key={`${item.device_ID}${index}`}
                className="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mt-3"
              >
                <div className="card h-100">
                  <div className="card-body">
                    <div className="text-center p-2">
                      <label className="FormContent">
                        Device Id: {item.id}
                      </label>
                      <br />

                      <label className="FormPlaceholder">
                        Device name: {item.deviceName}
                      </label>
                      <br />

                      <label className="FormPlaceholder">
                        Zone: {item.zoneId}
                      </label>
                      <br />

                      <label className="FormPlaceholder">
                        Section: {item.sectionId}
                      </label>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h5>Loading devices...</h5>
          </div>
        )}

        <Modal
          title={
            deviceLists.length === 0
              ? "Device not found"
              : `${deviceLists.length} Device found`
          }
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={600}
          footer={null}
          maskClosable={false}
        >
          <div className="row col-12 mt-3">
            <form>
              <div className="form-group">
                {deviceLists.map((list, indexm) => (
                  <div key={indexm} className="card mt-1">
                    <div className="card-body">
                      <div className="row ">
                        <div className="col-12 ">
                          <label className="FormPlaceholder">
                            {list.deviceName}
                          </label>
                        </div>
                        <div className="col-12 mt-3">
                          <label>Zone</label>
                          <select
                            className="form-select mt-1"
                            aria-label="Default select example"
                            name="zoneList"
                            value={zoneName}
                            style={{ width: "50%" }}
                            onChange={(e, index) => zoneListChange(e, index)}
                          >
                            <option value="">select</option>
                            {zoneList.map((list, index) => (
                              <option
                                value={`${list.id}`}
                                key={`${list.id}${index}`}
                                selected={index}
                              >
                                {list.zoneName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-12 mt-3">
                          <label>Section</label>
                          <select
                            className="form-select mt-1"
                            aria-label="Default select example"
                            name="loactionList"
                            value={loactionname}
                            onChange={sectionListChange}
                            style={{ width: "50%" }}
                          >
                            {loactionList.map((list, index) => (
                              <option
                                value={list.id}
                                key={`${list.id}${index}`}
                              >
                                {list.section}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-12  mx-5 mt-2">
                          <button
                            type="button"
                            onClick={() => sumbitform(list.id)}
                            className="btn btn-sm btn btn-primary"
                          >
                            update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Device;
