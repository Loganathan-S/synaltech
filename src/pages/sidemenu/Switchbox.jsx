import { Icon } from "@iconify/react";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { apiNames } from "../../routes/routeNames";
import { Apiservice } from "../../services/apiServices";
import "../../assests/css/global.css";
import axios from "axios";

function Switchbox() {
  const [switchBox, setSwitchBox] = useState([]);
  const [open, setOpen] = useState(false);
  const [noofswitches, setNoofswitches] = useState("");
  const [createSwitches, setCreateSwitches] = useState([]);
  const [zoneList, setZoneList] = useState([]);
  const [zoneId, setZoneId] = useState("");
  const [sectionList, setSectionList] = useState([]);
  const [sectionId, setSectionId] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [locationId, setLocationId] = useState("");
  const [noOfFans, setNoOfFans] = useState(0);
  const [noOfLights, setNoOfLights] = useState(0);
  const [noOfUsbs, setNoOfUsbs] = useState(0);
  const [noOfSockets, setNoOfSockets] = useState(0);
  const [id, setId] = useState(1);
  const [editSwitchBoxLists, setEditSwitchBoxLists] = useState([]);

  useEffect(() => {
    Apiservice.getLists(apiNames.switchBoxLists)
      .then((res) => {
        //console.log(res[0]);
        setSwitchBox(res[0]);
      })
      .catch((err) => {
        console.log(err);
      });

    Apiservice.getLists(apiNames.zoneLists)
      .then((res) => {
        setZoneList(res);
      })
      .catch((err) => {
        console.log(err);
      });

    Apiservice.getLists(apiNames.sectionLists)
      .then((res) => {
        setSectionList(res);
        //console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    Apiservice.getLists(apiNames.locationLists)
      .then((res) => {
        setLocationList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const sectionListChange = (e) => {
    setSectionId(e.target.value);
  };

  const zoneListChange = (e) => {
    setZoneId(e.target.value);
  };

  const locationListChange = (e) => {
    setLocationId(e.target.value);
  };

  const numerOfSwitches = (event) => {
    if (event.target.value === "fan") {
      setNoOfFans((prevState) => prevState + 1);
    } else if (event.target.value === "light") {
      setNoOfLights((prevState) => prevState + 1);
    } else if (event.target.value === "usb") {
      setNoOfUsbs((prevState) => prevState + 1);
    } else if (event.target.value === "socket") {
      setNoOfSockets((prevState) => prevState + 1);
    }
  };

  const switches = (e) => {
    console.log(e);
    setNoofswitches(e);
    let selectedValue = e;
    let generateSwitches = [];
    for (let i = 0; i < selectedValue; i++) {
      generateSwitches.push(
        <div className="border">
          <div className="p-2">
            <select
              className="form-select form-select-sm"
              onChange={numerOfSwitches}
            >
              <option>Select</option>
              <option value="fan">Fan</option>
              <option value="light">Light</option>
              <option value="usb">Usb</option>
              <option value="socket">Socket</option>
            </select>
          </div>
        </div>
      );
    }
    setTimeout(() => {
      setCreateSwitches(generateSwitches);
    }, 1);
  };

  const addData = () => {
    Apiservice.addSwitchBox(
      apiNames.newSwitchBox,
      zoneId,
      sectionId,
      locationId,
      noOfLights,
      noOfFans,
      noOfSockets,
      noOfUsbs
    )
      .then((res) => {
        //console.log(res);
        setId(res.id);
        setZoneId("");
        setSectionId("");
        setLocationId("");
        setNoofswitches("");
        setCreateSwitches([]);
        setNoOfLights(0);
        setNoOfFans(0);
        setNoOfSockets(0);
        setNoOfUsbs(0);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetEditModal = () => {
    setEditSwitchBoxLists([]);
    setZoneId("");
    setSectionId("");
    setLocationId("");
    setNoofswitches("");
    setCreateSwitches([]);
  };

  const changeNoofFans = (e) => {
    setNoOfFans(e.target.value);
  };

  const changeNoofLights = (e) => {
    setNoOfLights(e.target.value);
  };

  const changeNoofUsb = (e) => {
    setNoOfUsbs(e.target.value);
  };

  const changeNoofSockets = (e) => {
    setNoOfSockets(e.target.value);
  };

  const editModal = (id) => {
    axios
      .get(`http://192.168.1.46:4000/switchBox/${id}`)
      .then((res) => {
        //console.log(res.data);
        setEditSwitchBoxLists(res.data);
        setZoneId(res.data.zoneId);
        setSectionId(res.data.sectionId);
        setLocationId(res.data.locationId);
        setNoOfFans(res.data.noOfFans);
        setNoOfLights(res.data.noOfLights);
        setNoOfSockets(res.data.noOfSockets);
        setNoOfUsbs(res.data.noOfUSBS);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setOpen(true);
    }, 5);
  };

  return (
    <div className="row">
      <div className="col-6">
        <h4>Switch box</h4>
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
              setEditSwitchBoxLists([]);
              setOpen(true);
            }}
          />
        </div>
      </div>

      {switchBox.length > 0 ? (
        <div className="row pb-4 color">
          {switchBox.map((item, index) => (
            <div
              key={`${item.id}${index}`}
              className="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mt-3"
            >
              <div className="card h-100">
                <div className="text-end">
                  <button className="border-0">
                    <Icon
                      icon="material-symbols:edit"
                      width="19"
                      height="19"
                      className="rounded-button"
                      onClick={() => editModal(item.id)}
                    />
                  </button>
                </div>
                <div className="card-body">
                  <div className="text-center">
                    <label className="FormContent">Id: {item.id}</label>
                    <br />

                    <label className="FormPlaceholder">
                      Zone: {item.zoneName}
                    </label>
                    <br />

                    <label className="FormPlaceholder">
                      Section: {item.section}
                    </label>
                    <br />

                    <label className="FormPlaceholder">
                      Location: {item.location}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h5>Loading switches...</h5>
        </div>
      )}

      <Modal
        title={
          editSwitchBoxLists.length === 0 ? "Add switch box" : "Edit switch box"
        }
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => {
          resetEditModal();
          setOpen(false);
        }}
        width={600}
        footer={null}
        maskClosable={false}
      >
        <div className="row col-12 mt-3">
          <form>
            <div className="form-group">
              <label>Zone</label>
              <select
                className="form-select mt-1"
                aria-label="Default select example"
                name="zoneList"
                value={zoneId}
                onChange={zoneListChange}
              >
                <option>Select</option>
                {zoneList.map((list, index) => (
                  <option key={`${list.id}${index}`} value={list.id}>
                    {list.zoneName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group pt-3">
              <label>Section</label>
              <select
                className="form-select mt-1"
                aria-label="Default select example"
                name="sectionList"
                value={sectionId}
                onChange={sectionListChange}
              >
                <option>Select</option>
                {sectionList.map((list, index) => (
                  <option key={`${list.id}${index}`} value={list.id}>
                    {list.section}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group pt-3">
              <label>Location</label>
              <select
                className="form-select mt-1"
                aria-label="Default select example"
                name="sectionList"
                value={locationId}
                onChange={locationListChange}
              >
                <option>Select</option>
                {locationList.map((list, index) => (
                  <option key={`${list.id}${index}`} value={list.id}>
                    {list.location}
                  </option>
                ))}
              </select>
            </div>

            {editSwitchBoxLists.length === 0 ? (
              <div className="form-group pt-3 pb-3">
                <label>Number of switches</label>
                <select
                  value={noofswitches}
                  onChange={(e) => switches(e.target.value)}
                  className="form-select mt-1"
                >
                  <option>Select</option>
                  <option value={1}>one</option>
                  <option value={2}>Two</option>
                  <option value={3}>Three</option>
                  <option value={4}>Four</option>
                  <option value={5}>Five</option>
                  <option value={6}>Six</option>
                  <option value={7}>Seven</option>
                  <option value={8}>Eight</option>
                  <option value={9}>Nine</option>
                  <option value={10}>Ten</option>
                </select>
              </div>
            ) : (
              <div>
                <div className="form-group pt-3">
                  <label>Number of fans</label>
                  <input
                    type={"text"}
                    className="form-control mt-1"
                    aria-label="Default select example"
                    name="noOfFans"
                    value={noOfFans}
                    onChange={changeNoofFans}
                  />
                </div>

                <div className="form-group pt-3">
                  <label>Number of lights</label>
                  <input
                    type={"text"}
                    className="form-control mt-1"
                    aria-label="Default select example"
                    name="noOfLights"
                    value={noOfLights}
                    onChange={changeNoofLights}
                  />
                </div>

                <div className="form-group pt-3">
                  <label>Number of usb</label>
                  <input
                    type={"text"}
                    className="form-control mt-1"
                    aria-label="Default select example"
                    name="noOfUsbs"
                    value={noOfUsbs}
                    onChange={changeNoofUsb}
                  />
                </div>

                <div className="form-group pt-3">
                  <label>Number of sockets</label>
                  <input
                    type={"text"}
                    className="form-control mt-1"
                    aria-label="Default select example"
                    name="noOfSockets"
                    value={noOfSockets}
                    onChange={changeNoofSockets}
                  />
                </div>
              </div>
            )}

            <div className="row row-cols-auto justify-content-center">
              {createSwitches.map((createSwitch, index) => (
                <div key={index} className="col p-0">
                  {createSwitch}
                </div>
              ))}
            </div>

            {editSwitchBoxLists.length === 0 ? (
              <div className="text-center pt-3">
                <button
                  type="button"
                  className="btn btn-sm btn-primary text-center"
                  onClick={addData}
                >
                  Submit
                </button>
              </div>
            ) : (
              <div className="row pt-3">
                <div className="col-6 text-start">
                  <button
                    type="button"
                    className="btn btn-sm btn-danger text-center"
                    //onClick={addData}
                  >
                    Delete
                  </button>
                </div>
                <div className="col-6 text-end">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary text-center"
                    //onClick={addData}
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Switchbox;
