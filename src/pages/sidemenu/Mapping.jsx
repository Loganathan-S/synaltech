import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../assests/css/global.css";
import { apiNames } from "../../routes/routeNames";
import { Apiservice } from "../../services/apiServices";
import "./Device.css";
import { Tabs } from "antd";

function Mapping() {
  const [availableDevices, setAvailableDevices] = useState([]);
  const [setLightConfiguPopup, setSetupLightConfiguPopup] = useState(false);
  const [popupDetails, setPopupDetails] = useState([]);
  const [modalId, setModalId] = useState("");
  const [type, settype] = useState("");

  useEffect(() => {
    devices();
  }, []);

  const modalOpen = (details, id) => {
    console.log(details);
    setModalId(id);
    console.log(id);
    setSetupLightConfiguPopup(true);
    settype(details.type);

    setPopupDetails(details);
  };

  const devices = () => {
    Apiservice.getLists(apiNames.deviceLists)
      .then((res) => {
        setAvailableDevices(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeTabs = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: <h5>Light</h5>,
      children: (
        <>
          <div className="row">
            {availableDevices.map((deviceDetails, index) => (
              <>
                {deviceDetails.description &&
                  JSON.parse(deviceDetails.description)
                    ?.lines.filter((d) => d.type === "light")
                    .map((item, index) => (
                      <>
                        <div className="col-sm-12 col-md-8 col-lg-12 col-xl-4 col-xxl-6 mt-2">
                          <div className="card mt-1">
                            <div className="card-body">
                              <div className="row">
                                <div key={index} className="col-8 FormHeading">
                                  {item.name}
                                </div>
                                <div className="col-4 text-end ">
                                  <button
                                    className="btn-sm btn btn-outline-primary"
                                    onClick={() =>
                                      modalOpen(item, deviceDetails.id)
                                    }
                                  >
                                    Config
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
              </>
            ))}
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: <h5>Switches</h5>,
      children: (
        <>
          <div className="row">
            {availableDevices.map((deviceDetails, index) => (
              <>
                {deviceDetails.description &&
                  JSON.parse(deviceDetails.description)
                    ?.lines.filter((d) => d.type === "switch")
                    .map((item, index) => (
                      <>
                        <div className="col-sm-12 col-md-8 col-lg-12 col-xl-4 col-xxl-6 mt-2">
                          <div className="card mt-1">
                            <div className="card-body">
                              <div className="row">
                                <div key={index} className="col-8 FormHeading">
                                  {item.name}
                                </div>
                                <div className="col-4 text-end ">
                                  <button
                                    className="btn-sm btn btn-outline-primary"
                                    onClick={() => modalOpen(item, item.id)}
                                  >
                                    Config
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
              </>
            ))}
          </div>
        </>
      ),
    },
    {
      key: "3",
      label: <h5>PowerPoint</h5>,
      children: (
        <>
          <div className="row">
            {availableDevices.map((deviceDetails, index) => (
              <>
                {deviceDetails.description &&
                  JSON.parse(deviceDetails.description)
                    ?.lines.filter((d) => d.type === "powerpoint")
                    .map((item, index) => (
                      <>
                        <div className="col-sm-12 col-md-8 col-lg-12 col-xl-4 col-xxl-6 mt-2">
                          <div className="card mt-1">
                            <div className="card-body">
                              <div className="row">
                                <div key={index} className="col-8 FormHeading">
                                  {item.name}
                                </div>
                                <div className="col-4 text-end ">
                                  <button
                                    className="btn-sm btn btn-outline-primary"
                                    onClick={() => modalOpen(item, item.id)}
                                  >
                                    Config
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
              </>
            ))}
          </div>
        </>
      ),
    },
  ];

  const onChangeModal = (e, id, modalId) => {
    let boolean;
    if (e.target.checked === false) {
      boolean = 0;
    } else if (e.target.checked === true) {
      boolean = 1;
    }

    let descObj = {
      id: id,
      value: boolean,
    };

    axios
      .post(`http://192.168.1.46:4000/device/line/action/${modalId}`, descObj)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="row">
        <Tabs defaultActiveKey="1" items={items} onChange={onChangeTabs} />
        <div className="col-6"></div>
        <div className="col-6 text-end">
          <div></div>
        </div>
      </div>

      <Modal
        title={<label className="FormHeading">{type} Info</label>}
        centered
        open={setLightConfiguPopup}
        onOk={() => setSetupLightConfiguPopup(false)}
        onCancel={() => setSetupLightConfiguPopup(false)}
        width={500}
        footer={null}
        maskClosable={false}
      >
        <div className="card ">
          <div className="card-body">
            <div className="row ">
              <div className="col-3  FormHeadingLight">Name:</div>
              <div className="col-9 ">{popupDetails.name}</div>
              <hr />
              <div className="col-3 FormHeadingLight">Type:</div>
              <div className="col-9 ">{popupDetails.type}</div>
              <hr />
              <div className="col-3 FormHeadingLight">Value:</div>
              <div className="col-9 p-1">
                <label class="switch">
                  <input
                    type="checkbox"
                    autocapitalize={popupDetails.name}
                    autocomplete={popupDetails.type}
                    dir={popupDetails.status}
                    dirName={popupDetails.enable}
                    elementTiming={popupDetails.forceValue}
                    enterKeyHint={popupDetails.ts}
                    formMethod={popupDetails.dim}
                    formTarget={popupDetails.dimValue}
                    innerText={popupDetails.group}
                    onChange={(e) => onChangeModal(e, popupDetails.id, modalId)}
                  />
                  <span class="slider round"></span>
                </label>
              </div>
              <hr />
              <div className="col-3 FormHeadingLight">Status:</div>
              <div className="col-9">{popupDetails.status}</div> <hr />
              <div className="col-3 FormHeadingLight">Enable:</div>
              <div className="col-9">{popupDetails.enable}</div> <hr />
              <div className="col-3 FormHeadingLight">ForceValue:</div>
              <div className="col-9">{popupDetails.forceValue}</div> <hr />
              <div className="col-3 FormHeadingLight">Ts:</div>
              <div className="col-9">{popupDetails.ts}</div> <hr />
              <div className="col-3 FormHeadingLight">Dim:</div>
              <div className="col-9">{popupDetails.dim}</div> <hr />
              <div className="col-3 FormHeadingLight">DimValue:</div>
              <div className="col-9">{popupDetails.dimValue}</div> <hr />
              <div className="col-3 FormHeadingLight">Group:</div>
              <div className="col-9">{popupDetails.group}</div> <hr />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Mapping;
