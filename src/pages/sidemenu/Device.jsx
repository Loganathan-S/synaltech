import { Icon } from "@iconify/react";
import { Modal, Popover } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../assests/css/global.css";
import { apiNames } from "../../routes/routeNames";
import { Apiservice } from "../../services/apiServices";
import "./Device.css";
import { Switch } from "antd";
import { Tabs } from "antd";

function Device() {
  const [newDeviceLists, setNewDeviceLists] = useState([]);
  const [availableDevices, setAvailableDevices] = useState([]);
  const [availableDevicesPopup, setAvailableDevicesPopup] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [setupDevicePopup, setSetupDevicePopup] = useState(false);

  const [setLightConfiguPopup, setSetupLightConfiguPopup] = useState(false);

  const [switchType1, setSwitchType1] = useState("");
  const [switchType2, setSwitchType2] = useState("");
  const [switchType3, setSwitchType3] = useState("");
  const [switchType4, setSwitchType4] = useState("");
  const [error, setError] = useState("");

  const [result, setResult] = useState([]);

  useEffect(() => {
    //newDevices();
    devices();
  }, []);

  const newDevices = () => {
    Apiservice.getLists(apiNames.newDeviceLists)
      .then((res) => {
        console.log(res);
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
        setAvailableDevices(res);
        console.log(res);
        //  for (let i = 0; i < res.length; i++) {

        //setResult((oldArray) => [...oldArray, res[i].description]);
        //  }

        //setTheArray(oldArray => [...oldArray, newElement]);
        // console.log(res[0]);
        // if (res.length === 0) {
        //
        // } else if (res.length !== 0) {
        //   let jsonObj = res[0].description;
        // let jsonObj1 = res[1].description;
        //  let jsonObj2 = res[2].description;

        //let newDeviceLi =JSON.parse(jsonObj);

        // let newDeviceLi1 = JSON.parse(jsonObj1);
        // let newDeviceLi2 = JSON.parse(jsonObj2);

        //let jsonLines = newDeviceLi.lines;

        // let jsonLines1 = newDeviceLi1.lines;

        // let jsonLines2 = newDeviceLi2.lines;

        //console.log(jsonLines);
        // console.log(jsonLines1);
        // console.log(jsonLines2);

        //   setAvailableDevices(res);
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const content = (deviceDetails) => {
    // console.log(deviceDetails.description);
    /// let jsonObj = deviceDetails.description;
    // let newDeviceLi = JSON.parse(jsonObj);

    return (
      <div className="card">
        {/* <div className="card-body">
         
          <br />
          Name: {deviceDetails.deviceId}
          <br />
          DeviceName: {deviceDetails.deviceName}
          <br></br>
          name: {newDeviceLi.name}
          <br />
          MacId: {newDeviceLi.mac}
          <br />
          Line 1: {newDeviceLi.lines[0].t}
          <br />
          Line 2: {newDeviceLi.lines[1].t}
          <br />
          Line 3: {newDeviceLi.lines[2].t}
          <br />
          Line 4: {newDeviceLi.lines[3].t}
          <br /> */}
        {/* </div> */}
      </div>
    );
  };

  const deviceNameChange = (e) => {
    setDeviceName(e.target.value);
  };

  const configureSwitch1 = (e) => {
    setSwitchType1(e.target.value);
  };

  const configureSwitch2 = (e) => {
    setSwitchType2(e.target.value);
  };

  const configureSwitch3 = (e) => {
    setSwitchType3(e.target.value);
  };

  const configureSwitch4 = (e) => {
    setSwitchType4(e.target.value);
  };

  const updateSwitchType = () => {
    if (
      deviceName !== "" &&
      switchType1 !== "" &&
      switchType2 !== "" &&
      switchType3 !== "" &&
      switchType4 !== ""
    ) {
      setError("");
      console.log(deviceName);
      console.log(switchType1);
      console.log(switchType2);
      console.log(switchType3);
      console.log(switchType4);
      // let upd = newDeviceLists.lines[0];
      // upd.Name = switchType1;
      // console.log(upd);
      //let zzz = newDeviceLists.lines[0].Add(upd);
      //console.log(zzz);
    } else {
      setError("All the fields are required");
    }

    // axios
    //   .post(`http://192.168.1.46:4000/updateDevice/${deviceId}`, {
    //     deviceName: deviceName,
    //     // zoneId: zoneId,
    //     // sectionId: sectionId,
    //     // locationId: locationId,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setAvailableDevicesPopup("");
    //     setSetupDevicePopup("");
    //     setDeviceName("");
    //     devices();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const onChangeTabs = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: <h5>Light</h5>,
      // children: `Content of Tab Pane 1`,
    },
    {
      key: "2",
      label: <h5>Switches</h5>,
      // children: `Content of Tab Pane 2`,
    },
    {
      key: "3",
      label: <h5>PowerPoint</h5>,
      // children: `Content of Tab Pane 3`,
    },
  ];
  return (
    <>
      <div className="row">
        <Tabs defaultActiveKey="1" items={items} onChange={onChangeTabs} />
        <div className="col-6"></div>
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
        {/* {availableDevices.length !== 0 ? ( */}
        <>
          {/* {availableDevices.map((deviceDetails, index) => (
            <div
              key={`${deviceDetails.id}${index}`}
              className="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mt-3"
            >
              <Popover
                content={content(deviceDetails)}
                trigger="hover"
                placement="bottom"
              >
                <div className="card h-100">
                  <div className="card-body">
                    <p className="FormContent">ID: {deviceDetails.deviceId}</p>
                    <p className="FormContent">
                      Name: {deviceDetails.deviceName}
                    </p>
                  </div>
                </div>
              </Popover>
            </div>
          ))} */}

          <div class="container">
            <div class="row">
              <div class="col-2"></div>
              <div class="col-8">
                <div className=" col-12 text-center">
                  <div className="col-md-12 mt-4 ">
                    <div
                      onClick={() => {
                        setSetupLightConfiguPopup(true);
                      }}
                    >
                      <div className="card-body">
                        {availableDevices.map((deviceDetails, index) => (
                          <div
                            key={`${deviceDetails.id}${index}`}
                            className="col-sm-12 col-md-8 col-lg-12 col-xl-12 col-xxl-3 mt-3"
                          >
                            <div className="card mt-3">
                              <p className="FormContent">
                                <div>
                                  {JSON.parse(deviceDetails.description)?.id}
                                  {deviceDetails.description &&
                                    JSON.parse(
                                      deviceDetails.description
                                    )?.lines.map((item, index) => (
                                      <>
                                        <div key={index}>{item.name}</div>

                                        {/* <div>{item.type}</div> */}
                                      </>
                                    ))}
                                </div>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-2"></div>
            </div>
          </div>
        </>
        {/* ) : ( 
        <div className="col-12 mt-3">
           <p className="FormContent">No devices found</p>
         
        </div>
         )} */}
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
              {/* {newDeviceLists.length === 0 ? ( */}
              {/* <div className="col-12">
                  <p className="FormContent">No devices found</p>
                </div> */}
              {/* ) : ( */}
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
              {/* )} */}
            </div>
          </div>
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
              className="form-control FormPlaceholder mt-1"
              name="deviceName"
              value={deviceName}
              onChange={deviceNameChange}
              placeholder="Enter device name"
            />

            <label className="FormContent mt-3">Switch 1</label>
            <select
              className="form-select FormPlaceholder mt-1"
              name="switchType1"
              value={switchType1}
              onChange={configureSwitch1}
            >
              <option>Select switch type</option>
              <option value="Fan">Fan</option>
              <option value="CeilingLight">Ceiling Light</option>
              <option value="AirConditioner">Air Conditioner</option>
              <option value="PowerSocket">Power Socket</option>
            </select>

            <label className="FormContent mt-3">Switch 2</label>
            <select
              className="form-select FormPlaceholder mt-1"
              name="switchType2"
              value={switchType2}
              onChange={configureSwitch2}
              multiple={false}
            >
              <option>Select switch type</option>
              <option value="Fan">Fan</option>
              <option value="CeilingLight">Ceiling Light</option>
              <option value="AirConditioner">Air Conditioner</option>
              <option value="PowerSocket">Power Socket</option>
            </select>

            <label className="FormContent mt-3">Switch 3</label>
            <select
              className="form-select FormPlaceholder mt-1"
              name="switchType3"
              value={switchType3}
              onChange={configureSwitch3}
              multiple={false}
            >
              <option>Select switch type</option>
              <option value="Fan">Fan</option>
              <option value="CeilingLight">Ceiling Light</option>
              <option value="AirConditioner">Air Conditioner</option>
              <option value="PowerSocket">Power Socket</option>
            </select>

            <label className="FormContent mt-3">Switch 4</label>
            <select
              className="form-select FormPlaceholder mt-1"
              name="switchType4"
              value={switchType4}
              onChange={configureSwitch4}
              multiple={false}
            >
              <option>Select switch type</option>
              <option value="Fan">Fan</option>
              <option value="CeilingLight">Ceiling Light</option>
              <option value="AirConditioner">Air Conditioner</option>
              <option value="PowerSocket">Power Socket</option>
            </select>
          </div>

          <div className="position-relative text-danger">
            <div
              className="position-absolute mt-2"
              style={{ marginLeft: "29%" }}
            >
              {error}
            </div>
            <div className="text-center mt-4 pt-2">
              <button
                type="button"
                onClick={updateSwitchType}
                className="btn btn-sm btn-outline-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        title={<label className="FormHeading">Light Info</label>}
        centered
        open={setLightConfiguPopup}
        onOk={() => setSetupLightConfiguPopup(false)}
        onCancel={() => setSetupLightConfiguPopup(false)}
        width={500}
        footer={null}
        maskClosable={false}
        //bodyStyle={{ overflowY: "auto", maxHeight: "calc(150vh - 200px)" }}
      >
        <div className="card-body">
          {availableDevices.map((deviceDetails, index) => (
            <div
              key={`${deviceDetails.id}${index}`}
              className="col-sm-12 col-md-8 col-lg-12 col-xl-12 col-xxl-3 mt-3"
            >
              <div className="card mt-3">
                <p className="FormContent">
                  <div>
                    {JSON.parse(deviceDetails.description)?.id}
                    {deviceDetails.description &&
                      JSON.parse(deviceDetails.description)?.lines.map(
                        (item, index) => (
                          <>
                            <div key={index}>{item.name}</div>

                            {/* <div>{item.type}</div> */}
                          </>
                        )
                      )}
                  </div>
                </p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}

export default Device;
