import axios from "axios";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Modal } from "antd";
import { Apiservice } from "../../services/apiServices";
import { apiNames } from "../../routes/routeNames";

function Location() {
  const [locationList, setLocationList] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [open, setOpen] = useState(false);
  const [addLocation, setAddLocation] = useState("");
  const [id, setId] = useState(1);

  useEffect(() => {
    Apiservice.getLists(apiNames.locationLists)
      .then((res) => {
        setLocationList(res);
        //console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const locationListChange = (e) => {
    setLocationName(e.target.value);
  };

  const locationRegisterHandler = () => {
    axios
      .post(" http://192.168.1.46:4000/newLocation", { location: addLocation })
      .then((res) => {
        setId(res.data.id);
        setAddLocation("");
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" container">
      <div className="row">
        <div className="col-6">
          <h4>Location</h4>
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
                name="sectionList"
                value={locationName}
                onChange={locationListChange}
              >
                {locationList.map((list, index) => (
                  <option key={`${list.id}${index}`} value={list.location}>
                    {list.location}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </div>

      <Modal
        title="Add location"
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
                value={addLocation}
                onChange={(e) => setAddLocation(e.target.value)}
              />
            </div>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-primary mt-3 text-center"
                onClick={locationRegisterHandler}
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

export default Location;
