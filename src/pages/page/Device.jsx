import { Icon } from "@iconify/react";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import "../../assests/css/global.scss";
import { apiNames, routeNames } from "../../constants/routePath";
import { Apiservice } from "../../services/apiServices";
import "./scss/Device.scss";
import Autosuggest from "react-autosuggest";
import { useNavigate } from "react-router-dom";

const Device = () => {
  const [newDeviceLists, setNewDeviceLists] = useState([]);
  const [changeLinesNamePopup, setChangeLinesNamePopup] = useState(false);
  const [id, setId] = useState("");
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [lines, setLines] = useState([]);
  const [deviceName, setDeviceName] = useState("");
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [section, setSection] = useState([]);
  const navigateToDashboard = useNavigate();

  useEffect(() => {
    newDevices();
    getSection();
  }, []);

  const newDevices = () => {
    Apiservice.getLists(apiNames.deviceLists) //newDeviceLists
      .then((res) => {
        if (res.length === 0) {
          setNewDeviceLists([]);
        } else {
          const availableDevices = res.filter((room) => {
            return room.sectionId === null;
          });

          const notAvailableDevices = res.filter((room) => {
            return room.sectionId !== null;
          });

          const concat = availableDevices.concat(notAvailableDevices);
          setNewDeviceLists(concat);
          console.log(res);
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

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : section.filter(
          (lang) =>
            lang.section.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValue = (suggestion) => suggestion.section;

  const renderSuggestion = (suggestion) => <div>{suggestion.section}</div>;

  const onChangeVal = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Enter name",
    value,
    onChange: onChangeVal,
  };

  const updateDeviceRoomName = (roomid, devicename, deviceid) => {
    Apiservice.updateDeviceRoomName(
      apiNames.updateDevice,
      deviceid,
      roomid,
      devicename
    )
      .then((res) => {
        //console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateRoomDeviceName = () => {
    let result = section.find((f) => f.section === value);
    if (result !== undefined) {
      updateDeviceRoomName(result.id, deviceName, id);
      newDevices();
      getSection();
      setShowDeviceDetails(false);
      setChangeLinesNamePopup(true);
    }
    if (result === undefined) {
      Apiservice.addSection(apiNames.newSection, value)
        .then((res) => {
          updateDeviceRoomName(res.id, deviceName, id);
          newDevices();
          getSection();
          setShowDeviceDetails(false);
          setChangeLinesNamePopup(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const updateLineName = () => {
    let descObj = {
      description: {
        lines: lines,
      },
    };
    Apiservice.addLines(`${apiNames.lines}${id}`, descObj)
      .then((response) => {
        //console.log(response);
        setChangeLinesNamePopup(false);
        newDevices();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showDeviceData = (details, desc, Id, index) => {
    if (details.deviceName !== null) {
      setDeviceName(details.deviceName);
    } else if (details.deviceName === null) {
      setDeviceName(`Device ${index + 1}`);
    }

    if (details.sectionId !== null) {
      let result = section.find((f) => f.id === details.sectionId);
      console.log(result);
      if (result !== null) {
        setValue(result.section);
      }
    }

    setId(Id);
    setShowDeviceDetails(true);
    let json = JSON.parse(desc);
    let description = JSON.parse(details.description);
    setLines(json.lines);
    setModalData(description);
  };

  const onChangeType = (e, inputIndex) => {
    const { value } = e.target;
    setLines((type) =>
      type?.map((list, index) =>
        index === inputIndex ? { ...list, type: value } : list
      )
    );
  };

  const onChangeName = (e, inputIndex) => {
    const { value } = e.target;
    setLines((name) =>
      name?.map((list, index) =>
        index === inputIndex ? { ...list, name: value } : list
      )
    );
  };

  const changeDeviceName = (e) => {
    setDeviceName(e.target.value);
  };

  const navToDashboard = () => {
    navigateToDashboard(`${routeNames.dashboard}${routeNames.settings}`);
  };

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col-8">
          <label className="ModuleHeading">
            <Icon
              icon="material-symbols:arrow-right-alt-rounded"
              fontSize={32}
              rotate={2}
              onClick={navToDashboard}
              style={{ cursor: "pointer" }}
            />
            <span>&nbsp;Device lists</span>
          </label>
        </div>

        <div className="col-4 text-end">
          <div>
            <Icon
              icon="fa:plus-circle"
              color="#2596be"
              width="35"
              height="35"
              className="pointer"
            />
          </div>
        </div>
      </div>

      <div className="row text-center">
        {newDeviceLists &&
          newDeviceLists.map((deviceDetails, index) => (
            <div
              key={`${deviceDetails.id}${index}`}
              className="col-sm-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3 mt-3"
            >
              <div
                onClick={() =>
                  showDeviceData(
                    deviceDetails,
                    deviceDetails.description,
                    deviceDetails.id,
                    index
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <div className="card mt-2 position-relative">
                  {deviceDetails.sectionId === null && (
                    <div className="position-absolute top-0 end-0 mx-2">
                      <span>
                        <Icon icon="clarity:new-line" className="newIcon" />
                      </span>
                    </div>
                  )}

                  <div className="card-body FormContent">
                    <p>ID : {deviceDetails.deviceId}</p>
                    {deviceDetails.deviceName ? (
                      <p>Name : {deviceDetails.deviceName}</p>
                    ) : (
                      <p>Name : Device {index + 1}</p>
                    )}
                    <span>
                      Mac ID : {JSON.parse(deviceDetails.description)?.mac}
                    </span>
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
              <div className="card">
                <div className="card-body FormContent">
                  {modalData && (
                    <>
                      <div className="row mt-1 align-items-center">
                        <div className="col-4 FormContent">Name</div>
                        <div className="col-8 FormContent">
                          <input
                            type={"text"}
                            value={deviceName}
                            placeholder="Enter device name"
                            className="form-control"
                            onChange={changeDeviceName}
                          />
                        </div>
                      </div>

                      <div className="row mt-3 align-items-center">
                        <div className="col-4 FormContent">Channel</div>
                        <div className="col-8 FormContent">
                          {modalData.name}
                        </div>
                      </div>

                      <div className="row mt-3 align-items-center">
                        <div className="col-4 FormContent">Room</div>
                        <div className="col-8 FormContent">
                          <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={
                              onSuggestionsFetchRequested
                            }
                            onSuggestionsClearRequested={
                              onSuggestionsClearRequested
                            }
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                          />
                        </div>
                      </div>
                    </>
                  )}
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
              Update
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        title={<label className="FormHeading">Edit line and room name</label>}
        centered
        open={changeLinesNamePopup}
        onOk={() => setChangeLinesNamePopup(false)}
        onCancel={() => {
          setChangeLinesNamePopup(false);
        }}
        width={300}
        footer={null}
        maskClosable={false}
        //bodyStyle={{ overflowY: "auto", maxHeight: "calc(150vh - 200px)" }}
      >
        <div className="text-center">
          <div className="card">
            <div className="card-body">
              {Object.keys(lines).map((item, index) => (
                <div
                  key={`${lines[item].Id}${index}`}
                  className="FormContent mb-2"
                >
                  <div className="row">
                    <div className="col-4 mt-2">Line{index + 1}</div>
                    <div className="col-8 mt-1">
                      <input
                        name="line"
                        value={lines[item].type}
                        type="text"
                        className="form-control"
                        onChange={(e) => onChangeType(e, index)}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4 mt-3">Room</div>
                    <div className="col-8 mt-2">
                      <input
                        name="line"
                        value={lines[item].name}
                        type="text"
                        className="form-control"
                        placeholder={value}
                        onChange={(e) => onChangeName(e, index)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center pt-3">
            <button
              type="button"
              onClick={updateLineName}
              className="btn btn-sm btn-outline-primary"
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Device;
