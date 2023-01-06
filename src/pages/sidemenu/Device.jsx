import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Apiservice } from "../../services/apiServices";
import { apiNames } from "../../routes/routeNames";
import { Modal } from "antd";
import axios from "axios";

function Device() {
  const [deviceLists, setDeviceLists] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    Apiservice.getLists(apiNames.device)
      .then((res) => {
        //console.log(res);
        setDeviceLists(res.splice(0, 9));
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .get("http://192.168.1.46:3000/newDeviceList", {
    //     headers: { "Access-Control-Allow-Credentials": true },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);
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

        {deviceLists.length > 0 ? (
          <div className="row pb-4 color">
            {deviceLists.map((item, index) => (
              <div
                key={`${item.device_ID}${index}`}
                className="col-sm-12 col-md-6 col-lg-3 col-xl-4 col-xxl-3 mt-2"
              >
                <div className="card card_hover h-100 shadow">
                  <div className="card-body">
                    <div className="mt-2 text-center p-2">
                      <p className="FormContent">Device Id: {item.device_ID}</p>
                      <p className="FormPlaceholder">
                        Device name: {item.devicename}
                      </p>
                      <p className="FormPlaceholder">
                        Device type: {item.devicetype}
                      </p>
                      <p className="FormPlaceholder">Zone: {item.zone}</p>
                      <p className="FormPlaceholder">
                        Location: {item.location}
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
          title="Device (Properties)"
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
                <label>Device name</label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter device name"
                />
              </div>
              <div className="form-group mt-3">
                <label>Device type</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter device type"
                />
              </div>
              <div className="form-group mt-3">
                <label>Zone</label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter zone"
                />
              </div>
              <div className="form-group mt-3">
                <label>Location</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter location"
                />
              </div>

              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary mt-3 text-center"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Device;
