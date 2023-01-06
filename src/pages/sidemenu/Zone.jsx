import axios from "axios";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Modal } from "antd";

function Zone() {
  const [zoneList, setZoneList] = useState([]);
  const [zoneName, setZoneName] = useState("");
  const [open, setOpen] = useState(false);
  const [addZone, setAddZone] = useState("");

  useEffect(() => {
    axios
      .get("http://192.168.1.46:3000/zoneList")
      .then((res) => {
        setZoneList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const zoneListChange = (e) => {
    setZoneName(e.target.value);
  };

  return (
    <>
      <div className=" container">
        <div className="row">
          <div className="col-6">
            {" "}
            <h4>Zone</h4>
          </div>
          <div className="col-6 text-end">
            <div>
              <Icon
                icon="fa:plus-circle"
                color="#2596be"
                width="35"
                height="35"
                className="pointer"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>
        <Modal
          title="Zone"
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
                <label>Add Zone</label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  value={addZone}
                  onChange={(e) => setAddZone(e.target.value)}
                  // placeholder="Enter Device ID"
                />
              </div>
              {/* <div className="form-group mt-3">
                <label></label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  //placeholder="Device Name"
                />
              </div>
              <div className="form-group mt-3">
                <label>Location</label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  //placeholder="Enter Device ID"
                />
              </div> */}

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

        <div className="row">
          <div className="col-md-5">
            <form>
              <div class="mb-3">
                <select
                  class="form-select"
                  aria-label="Default select example"
                  name="zoneList"
                  value={zoneName}
                  onChange={zoneListChange}
                >
                  {zoneList.map((list, index) => (
                    <>
                      <option value={list.zoneName}>{list.zoneName}</option>
                    </>
                  ))}
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Zone;
