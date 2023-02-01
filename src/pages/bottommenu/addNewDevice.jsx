import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { apiNames, routeNames } from "../../routes/routeNames";
import { Apiservice } from "../../services/apiServices";
import Autosuggest from "react-autosuggest";
import { Modal } from "antd";

function AddNewDevice() {
  const navigateToDashboard = useNavigate();
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
  const [avaliableDevice, setAvaliableDevice] = useState([]);
  const [search, setNewSearch] = useState("");
  const [item, setItem] = useState([]);
  const [countDevice, setCountDevice] = useState("");
  const [show, setShow] = useState(false);

  const searchHandleSearch = () => {
    console.log(search);
    const deviceLists = avaliableDevice.filter(
      (person) =>
        person.deviceName.toLowerCase().includes(search.toLowerCase()) &&
        person.sectionId === null
    );
    console.log(deviceLists);
    const count = avaliableDevice.filter((p) => p.sectionId === null);
    setCountDevice(count.length);
    setItem(deviceLists);
    setShow(true);
  };

  const searchOnchage = (e) => {
    setNewSearch(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    newDevices();
    getSection();
  }, []);

  const newDevices = () => {
    Apiservice.getLists(apiNames.deviceLists)
      .then((res) => {
        setAvaliableDevice(res);
        const devices = avaliableDevice.filter((person) =>
          person.deviceName.toLowerCase().includes(search.toLowerCase())
        );
        setItem(devices);
        const count = avaliableDevice.filter((p) => p.sectionId === null);
        setCountDevice(count.length);
        if (res.length === 0) {
          setNewDeviceLists([]);
        } else {
          setNewDeviceLists(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navToDashboard = () => {
    navigateToDashboard(`${routeNames.dashboard}${routeNames.home}`);
  };

  const getSection = () => {
    Apiservice.getLists(apiNames.sectionLists)
      .then((res) => {
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
    let json = JSON.parse(desc);
    let description = JSON.parse(details.description);
    setLines(json.lines);
    setModalData(description);
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
      <div className="card mt-3">
        <div className="card-body ">
          <div className="row mt-2 text-center">
            <div className="col-sm-12 col-md-12">
              <input
                className="form-control"
                type="text"
                placeholder="Enter Device Name"
                value={search}
                onChange={searchOnchage}
              />
            </div>
            <div>
              <button
                className="btn btn-sm btn-outline-primary mt-3"
                onClick={searchHandleSearch}
              >
                Search
              </button>
            </div>
          </div>

          {show && (
            <>
              {item.length > 0 ? (
                <>
                  {item.map((deviceDetails, index) => (
                    <div className="text-center" key={deviceDetails.id}>
                      <div className="text-center mt-2">
                        {countDevice} Device Found
                      </div>
                      <div
                        className="card mt-3"
                        onClick={() =>
                          showDeviceData(
                            deviceDetails,
                            deviceDetails.description,
                            deviceDetails.id,
                            index
                          )
                        }
                      >
                        <div className="card-body">
                          {deviceDetails.deviceName}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-center">No device Found</p>
              )}
            </>
          )}

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
                  Add Device
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default AddNewDevice;
