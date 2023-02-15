import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { apiNames, routeNames } from "../../constants/routePath";
import { Apiservice } from "../../services/apiServices";
import { Modal } from "antd";
import Light from "../../assests/images/smart-bulbs.jpg";
import "./scss/Device.scss";

function AddNewDevice() {
  const navigateToDashboard = useNavigate();
  const [id, setId] = useState("");
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [value, setValue] = useState("");
  const [section, setSection] = useState([]);
  const [avaliableDevice, setAvaliableDevice] = useState([]);
  const [search, setNewSearch] = useState("");
  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);
  const [roomName, setRoomName] = useState("");

  const searchHandleSearch = () => {
    //console.log(search);
    const deviceLists = avaliableDevice.filter(
      (person) =>
        person.deviceName.toLowerCase().includes(search.toLowerCase()) &&
        person.sectionId === null
    );
    console.log(deviceLists);
    const count = avaliableDevice.filter((p) => p.sectionId === null);
    setItem(deviceLists);
    setShow(true);
  };

  const searchOnchage = (e) => {
    setNewSearch(e.target.value);
    //console.log(e.target.value);
  };

  useEffect(() => {
    newDevices();
    getSection();
  }, []);

  // const textInput = (input) => {
  //   if (input) {
  //     setTimeout(() => {
  //       input.focus();
  //     }, 100);
  //   }
  // };
  const navToDashboard = () => {
    navigateToDashboard(`${routeNames.dashboard}${routeNames.home}`);
  };

  const newDevices = () => {
    Apiservice.getLists(apiNames.deviceLists)
      .then((res) => {
        if (res.length === 0) {
          setAvaliableDevice([]);
        } else {
          setAvaliableDevice(res);
          const devices = avaliableDevice.filter(
            (person) =>
              person.deviceName.toLowerCase().includes(search.toLowerCase()) &&
              person.sectionId === null
          );
          setItem(devices);
          const count = avaliableDevice.filter((p) => p.sectionId === null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSection = () => {
    Apiservice.getLists(apiNames.sectionLists)
      .then((res) => {
        //console.log(res);
        setSection(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateDeviceRoomName = (roomid, devicename, deviceid) => {
    Apiservice.updateDeviceRoomName(
      apiNames.updateDevice,
      deviceid,
      roomid,
      devicename
    )
      .then((res) => {
        newDevices();
        searchHandleSearch();
        // getSection();
        setShowDeviceDetails(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateRoomDeviceName = () => {
    let result = section.find((f) => f.section === roomName);
    if (result !== undefined) {
      updateDeviceRoomName(result.id, deviceName, id);
    }
    if (result === undefined) {
      Apiservice.addSection(apiNames.newSection, roomName)
        .then((res) => {
          updateDeviceRoomName(res.id, deviceName, id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const showDeviceData = (details, desc, Id, index) => {
    if (details.deviceName !== null) {
      setDeviceName(details.deviceName);
    } else if (details.deviceName === null) {
      setDeviceName(`Device ${index + 1}`);
    }

    if (details.sectionId !== null) {
      let result = section.find((f) => f.id === details.sectionId);
      if (result !== null) {
        setValue(result.section);
      }
    }

    setId(Id);
    setShowDeviceDetails(true);
  };

  const onRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const roomNameChange = (name, id) => {
    setRoomName(name);
  };

  const changeDeviceName = (e) => {
    setDeviceName(e.target.value);
  };

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-sm-12 col-md-12">
          <label className="ModuleHeading">
            <Icon
              icon="material-symbols:arrow-right-alt-rounded"
              fontSize={32}
              rotate={2}
              onClick={navToDashboard}
              style={{ cursor: "pointer" }}
            />
            <span>&nbsp;Add Device</span>
          </label>
        </div>
      </div>
      <div className="text-center">
        <img
          src={Light}
          alt="addlight"
          className="img-fluid"
          style={{ borderRadius: "50%" }}
        />
      </div>
      <div className="mt-2 text-center">
        <h4>Add device</h4>
        <label>Make sure the lights and smart plugs you</label>
        <br />
        <label className="m-0">want to add are connected to power</label>
      </div>
      <div className="mt-3 text-center">
        <p>
          <small className="text-muted">
            You can also find lights using the seriel number which
          </small>
          <small className="text-muted">
            can be found on the lamp or label
          </small>
        </p>
      </div>
      <div className="row mt-3 row d-flex justify-content-center">
        <input
          className="form-control w-50"
          type="text"
          placeholder="Use serial number"
          value={search}
          onChange={searchOnchage}
        />
      </div>
      <div className="text-center">
        <p>
          <button
            className="btn btn-sm btn-outline-primary mt-3"
            onClick={searchHandleSearch}
          >
            Search
          </button>
        </p>
      </div>
      {show && (
        <div className="card mt-3 liteback">
          <div className="card-body">
            <h6 className="whitecolor"> Devices</h6>
            <>
              {item.length > 0 ? (
                <div className="row">
                  {item.map((deviceDetails, index) => (
                    <div
                      className="col-4 text-center mt-3 whitecolor"
                      key={deviceDetails.id}
                      onClick={() =>
                        showDeviceData(
                          deviceDetails,
                          deviceDetails.description,
                          deviceDetails.id,
                          index
                        )
                      }
                    >
                      <Icon icon="file-icons:devicetree" height={30} />
                      <br />
                      {deviceDetails.deviceName}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center mt-2 text-danger">
                  No devices are there
                </p>
              )}
            </>
            <Modal
              title={
                <label className="FormHeading">
                  <input
                    type={"text"}
                    value={deviceName}
                    placeholder="Enter device name"
                    className="form-control formControl p-2 m-0 shadow-none"
                    onChange={changeDeviceName}
                    //ref={() => textInput}
                  />
                </label>
              }
              centered
              open={showDeviceDetails}
              onOk={() => setShowDeviceDetails(false)}
              onCancel={() => {
                setShowDeviceDetails(false);
                setValue("");
              }}
              width={600}
              footer={null}
              maskClosable={false}
              //bodyStyle={{ overflowY: "auto", maxHeight: "calc(150vh - 200px)" }}
            >
              <div className="row col-12">
                <div className="form-group">
                  <div
                    className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card liteback">
                      <div className="card-body FormContent">
                        <div className="row">
                          <div className="col-4 whitecolor mt-1">Room</div>
                          <div className="col-8">
                            <input
                              type={"text"}
                              placeholder="Choose/Enter"
                              className="form-control"
                              name={"roomName"}
                              value={roomName}
                              onChange={onRoomNameChange}
                            />
                          </div>
                        </div>
                        <div className="row mt-3 text-center">
                          {section.map((roomname, index) => (
                            <div
                              className="col-6 mt-3"
                              key={`${roomname.id}${index}`}
                            >
                              <div
                                className="whitecolor"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  roomNameChange(roomname.section, roomname.id)
                                }
                              >
                                <Icon icon="material-symbols:nest-multi-room" />
                                <br />
                                {roomname.section}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-3">
                  <button
                    type="button"
                    onClick={updateRoomDeviceName}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Add Device
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddNewDevice;
