import axios from "axios";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Modal } from "antd";
import { apiNames } from "../../routes/routeNames";
import { Apiservice } from "../../services/apiServices";

function Zone() {
  const [zoneList, setZoneList] = useState([]);
  const [zoneName, setZoneName] = useState("");
  const [open, setOpen] = useState(false);
  const [addZone, setAddZone] = useState("");
  const [id, setId] = useState(1);

  useEffect(() => {
    Apiservice.getLists(apiNames.zoneLists)
      .then((res) => {
        setZoneList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const zoneListChange = (e) => {
    setZoneName(e.target.value);
  };

  const sumbitZone = () => {
    Apiservice.addZone(apiNames.newZone, addZone)
      .then((res) => {
        setId(res.id);
        setAddZone("");
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
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
      <div className="row">
        <div className="col-md-5">
          <form>
            <div className="mb-3">
              <select
                className="form-select"
                aria-label="Default select example"
                name="zoneList"
                value={zoneName}
                onChange={zoneListChange}
              >
                {zoneList.map((list, index) => (
                  <option key={`${list.id}${index}`} value={list.zoneName}>
                    {list.zoneName}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </div>

      <Modal
        title="Add zone"
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
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                value={addZone}
                onChange={(e) => setAddZone(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-primary mt-3 text-center"
                onClick={sumbitZone}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Zone;
