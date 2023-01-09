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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const zoneListChange = (e) => {
    setZoneName(e.target.value);
  };

  const sectionListChange = (e) => {
    //console.log(e.target.value);
    setLocationname(e.target.value);
  };

  const deviceListChange = (e) => {
    setDeviceName(e.target.value);
  };

  const sumbitform = () => {
    zoneRegisterHandler();
  };

  const zoneRegisterHandler = () => {
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
          {" "}
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

        {deviceList.length > 0 ? (
          <div className="row pb-4 color">
            {deviceList.map((item, index) => (
              <div
                key={`${item.device_ID}${index}`}
                className="col-sm-12 col-md-6 col-lg-3 col-xl-4 col-xxl-3 mt-2"
              >
                <div className="card card_hover h-100 shadow">
                  <div className="card-body">
                    <div className="mt-2 text-center p-2">
                      <p className="FormContent">Id: {item.id}</p>
                      <p className="FormPlaceholder">
                        Device id: {item.deviceId}
                      </p>
                      <p className="FormPlaceholder">
                        Device name: {item.deviceName}
                      </p>
                      <p className="FormPlaceholder">Zone id: {item.zoneId}</p>
                      <p className="FormPlaceholder">
                        Section id: {item.sectionId}
                      </p>
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
          title="3 Device found"
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
                {deviceList.map((list, inde) => (
                  <div key={inde} className="card mt-1">
                    <div className="card-body">
                      <div className="row ">
                        <div className="col-12 ">
                          <p className="FormPlaceholder"> {list.deviceName}</p>
                        </div>

                        <div className="col-12 mt-1">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="zoneList"
                            value={zoneName}
                            style={{ width: "50%" }}
                            onChange={(e) => zoneListChange(e)}
                          >
                            <option>Select</option>
                            {zoneList.map((list, index) => (
                              <option
                                value={`${inde}${list.id}${index}`}
                                key={`${list.id}${index}`}
                              >
                                {list.zoneName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-12 mt-2">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="loactionList"
                            value={loactionname}
                            onChange={sectionListChange}
                            style={{ width: "50%" }}
                          >
                            <option>Select</option>
                            {sectionList.map((list, index) => (
                              <option
                                value={`${inde}${list.id}${index}`}
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
