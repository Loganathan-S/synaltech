import { Icon } from "@iconify/react";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import "../../assests/css/global.css";
import { apiNames } from "../../routes/routeNames";
import { Apiservice } from "../../services/apiServices";
import "./Device.css";

function Device() {
  const [newDeviceLists, setNewDeviceLists] = useState([]);
  const [availableDevices, setAvailableDevices] = useState([]);
  const [availableDevicesPopup, setAvailableDevicesPopup] = useState(false);
  const [id, setId] = useState("");
  const [showDeviceDetails, setShowDeviceDetails] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    newDevices();
    devices();
  }, []);

  const newDevices = () => {
    Apiservice.getLists(apiNames.newDeviceLists)
      .then((res) => {
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

  const devices = () => {
    Apiservice.getLists(apiNames.deviceLists)
      .then((res) => {
        if (res.length === 0) {
          setAvailableDevices([]);
        } else if (res.length !== 0) {
          let jsonObj = res[0].description;
          setAvailableDevices(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateSwitchType = () => {
    // console.log(lines);
    //console.log(newDeviceLists);

    let descObj = {
      description: {
        lines: lines,
      },
    };

    Apiservice.addLines(`${apiNames.lines}${id}`, descObj)
      .then((response) => {
        //console.log(response);
        setShowDeviceDetails(false);
        newDevices();
        devices();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showDeviceData = (details, desc, Id) => {
    setId(Id);
    setShowDeviceDetails(true);
    let json = JSON.parse(desc);
    let description = JSON.parse(details.description);
    setLines(json.lines);
    setModalData(description);
    //console.log(description);
  };

  const onchangeinput = (e, inputIndex) => {
    //console.log(inputIndex);
    const { value } = e.target;
    setLines((line) =>
      line?.map((list, index) =>
        index === inputIndex ? { ...list, line: value } : list
      )
    );
  };

  // const onchangeinput = (e, id) => {
  //   const { name, accept, value, align, alt, accessKey } = e.target;
  //   const newItems = lines.map((item) => {
  //     if (item.Id !== id) {
  //       return { ...item };
  //     }
  //     return {
  //       Id: id,
  //       enable: name,
  //       forceValue: accept,
  //       line: value,
  //       status: align,
  //       t: alt,
  //       value: accessKey,
  //     };
  //   });
  //   setLines(newItems);
  // };

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
                showDeviceData(
                  deviceDetails,
                  deviceDetails.description,
                  deviceDetails.id
                )
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
                      {modalData && (
                        <>
                          <div className="row mt-2 align-items-center">
                            <div className="col-3 FormContent">ID:</div>
                            <div className="col-9 FormContent">
                              {modalData.id}
                            </div>
                          </div>
                          <div className="row mt-2 align-items-center">
                            <div className="col-3 FormContent">Mac Id:</div>
                            <div className="col-9 FormContent">
                              {modalData.mac}
                            </div>
                          </div>
                          <div className="row mt-2 align-items-center">
                            <div className="col-3 FormContent">Channels:</div>
                            <div className="col-9 FormContent">
                              {modalData.NoOfChennel}
                            </div>
                          </div>
                        </>
                      )}

                      {Object.keys(lines).map((item, index) => (
                        <div
                          key={lines[item].Id}
                          className="row mt-3 mb-3 align-items-center"
                        >
                          <div className="col-3">Line{index + 1} :</div>
                          <div className="col-9">
                            <input
                              name="line"
                              value={lines[item].line}
                              type="text"
                              className="form-control"
                              onChange={(e) => onchangeinput(e, index)}
                            />

                            {/* <input
                              name={lines[item].enable}
                              accept={lines[item].forceValue}
                              value={lines[item].line}
                              align={lines[item].status}
                              alt={lines[item].t}
                              accessKey={lines[item].value}
                              type="text"
                              className="form-control"
                              onChange={(e) => onchangeinput(e, lines[item].Id)}
                            /> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>

          <div className="text-center mt-2 pt-2">
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
                  <button className="btn btn-sm btn-outline-primary">
                    Setup
                  </button>
                </div>
              </>
              {/* )} */}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Device;
