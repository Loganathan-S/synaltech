import { Icon } from "@iconify/react";
import { Button, Modal, Space } from "antd";
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
  const [deviceName, setDeviceName] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [setupDevicePopup, setSetupDevicePopup] = useState(false);
  const [switchType1, setSwitchType1] = useState("");
  const [switchType2, setSwitchType2] = useState("");
  const [switchType3, setSwitchType3] = useState("");
  const [switchType4, setSwitchType4] = useState("");
  const [error, setError] = useState("");
  const [sample, setsample] = useState("");
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);
  const [dataArray, setDataArry] = useState([]);
  const [show, setShow] = React.useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [first, setfirst] = useState([]);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    newDevices();
    devices();
    //showDeviceData()
  }, []);

  const jparse = (_value) => {
    setsample(JSON.parse(_value));
    return JSON.parse(_value);
  };

  const newDevices = () => {
    Apiservice.getLists(apiNames.newDeviceLists)
      .then((res) => {
        console.log(res);
        if (res.length === 0) {
          setNewDeviceLists([]);
        } else {
          // let jsonObj = res[0].description;
          // let newDeviceLi = JSON.parse(jsonObj);
          //setDeviceId(res[0].id);
          setNewDeviceLists(res);
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
        if (res.length === 0) {
          setAvailableDevices([]);
        } else if (res.length !== 0) {
          let jsonObj = res[0].description;
          // let newDeviceLi = JSON.parse(jsonObj);
          // let jsonLines = newDeviceLi.lines;
          setAvailableDevices(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const content = (deviceDetails) => {
    // console.log(deviceDetails.description);
    let jsonObj = deviceDetails.description;
    let newDeviceLi = JSON.parse(jsonObj);

    return (
      <div className="card">
        <div className="card-body">
          {/* Id: {deviceDetails.id} */}
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
          <br />
        </div>
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
    console.log(lines);
    // if (
    //   deviceName !== "" &&
    //   switchType1 !== "" &&
    //   switchType2 !== "" &&
    //   switchType3 !== "" &&
    //   switchType4 !== ""
    // ) {
    //   setError("");
    //   let upd = newDeviceLists.lines[0];
    //   upd.Name = switchType1;
    //   console.log(upd);
    //   let zzz = newDeviceLists.lines[0].Add(upd);
    //   console.log(zzz);
    // } else {
    //   setError("All the fields are required");
    // }

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

  const showDeviceData = (details, desc) => {
    setShowDeviceDetails(true);
    let json = JSON.parse(desc);
    //  console.log(json.lines);
    //  console.log(details);
    let description = JSON.parse(details.description);
    console.log(description);
    setLines(json.lines);
    setModalData(description);
  };

  const handlePassInfoShow = (data) => {
    setShow(true);
    console.log(data);
  };

  const onchangeinput = (e, id) => {
    //console.log(e);
    //console.log(lines);
    const { name, accept, value, align, alt, accessKey } = e.target;
    const newItems = lines.map((item) => {
      if (item.Id !== id) {
        return { ...item };
      }
      return {
        Id: id,
        enable: name,
        forceValue: accept,
        line: value,
        status: align,
        t: alt,
        value: accessKey,
      };
    });
    setLines(newItems);
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

      <div className="row text-center">
        {newDeviceLists.map((deviceDetails, index) => (
          <div
            key={`${deviceDetails.id}${index}`}
            className="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 mt-3"
          >
            <div
              onClick={() =>
                showDeviceData(deviceDetails, deviceDetails.description)
              }
              style={{ cursor: "pointer" }}
            >
              <div className="card mt-3">
                <div className="card-body FormContent">
                  {JSON.parse(deviceDetails.description)?.id}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title={<label className="FormHeading">Device details</label>}
        centered
        open={showDeviceDetails}
        onOk={() => setShowDeviceDetails(false)}
        onCancel={() => setShowDeviceDetails(false)}
        width={500}
        footer={null}
        maskClosable={false}
        //bodyStyle={{ overflowY: "auto", maxHeight: "calc(150vh - 200px)" }}
      >
        <div className="row col-12">
          <div className="form-group">
            <>
              <div>
                <div
                  className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 mt-3"
                  style={{ cursor: "pointer" }}
                >
                  <div className="card mt-1">
                    <div className="card-body FormContent">
                      {/* <p className="FormContent">ID: {modalData.id}</p> */}
                      {/* <p className="FormContent">Mac Id: {modalData.mac}</p> */}
                      {/* <p className="FormContent">
                        NoOfChennel: {modalData.NoOfChennel}
                      </p> */}

                      {Object.keys(lines).map((item, index) => (
                        <div
                          key={lines[item].Id}
                          className="row mt-2 align-items-center"
                        >
                          <div className="col-2 ">Line{index + 1} :</div>
                          <div className="col-10">
                            <input
                              name={lines[item].enable}
                              accept={lines[item].forceValue}
                              value={lines[item].line}
                              align={lines[item].status}
                              alt={lines[item].t}
                              accessKey={lines[item].value}
                              type="text"
                              className="form-control"
                              onChange={(e) => onchangeinput(e, lines[item].Id)}
                            />
                          </div>
                        </div>
                      ))}
                      <>
                        {/* <p className="FormContent">ID:     {modalData?.id}</p>
                     <p className="FormContent">Device ID: {modalData?.deviceId}</p>
                     <p className="FormContent">mac Id: {JSON.parse(modalData.description)?.mac}</p>
                     <p className="FormContent">NoOfChennel: {JSON.parse(modalData.description)?.NoOfChennel}</p> */}

                        {/* {JSON.parse(modalData.description)?.lines.map((item,i) => {
                        return (
                          <div key={item.Id} className="row mt-2 align-items-center">
                            <div className="col-2 ">
                            Line :
                            </div>
                            <div className="col-10">
                            <input
                                name="roomRent"
                                type="text"
                                value={item.line}
                                className="form-control"
                                onChange={(e) => onchangeinput(e,item.Id)}
                              />
                            </div>
                          </div>
                        );
                      })} */}
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>

          <div className="text-center mt-4 pt-2">
            <button
              type="button"
              onClick={updateSwitchType}
              className="btn btn-sm btn-outline-primary"
            >
              Update
            </button>
          </div>
        </div>
      </Modal>

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
    </>
  );
}

// function Device() {
//   const [items, setItems] = useState([
//     { id: 1, name: "first", text: "first" },
//     { id: 2, name: "second", text: "second" },
//     { id: 3, name: "third", text: "third" },
//   ]);

//   const handleChange = (evt, id) => {
//     const { name, value } = evt.target;

//     const newItems = items.map((item) => {
//       if (item.id !== id) {
//         return { ...item };
//       }

//       return { id, name, text: value };
//     });

//     setItems(newItems);
//   };

//   const submit = () => {
//     alert(JSON.stringify(items));
//   };

//   return (
//     <div className="App">
//       <h1>Example</h1>
//       <form>
//         {items.map((item) => (
//           <div key={item.id}>
//             <input
//               name={item.name}
//               value={item.text}
//               onChange={(evt) => handleChange(evt, item.id)}
//             />
//           </div>
//         ))}
//         <button onClick={submit}>Submit</button>
//       </form>
//     </div>
//   );
// }

export default Device;
