import { Icon } from "@iconify/react";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { apiNames } from "../../routes/routeNames";
import { Apiservice } from "../../services/apiServices";

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

  useEffect(() => {
    Apiservice.getLists(apiNames.switchBoxLists)
      .then((res) => {
        // console.log(res);
        setSwitchBox(res);
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
    setNoofswitches(e.target.value);
    let selectedValue = e.target.value;
    let genDivs = [];
    for (let i = 0; i < selectedValue; i++) {
      genDivs.push(
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
      setCreateSwitches(genDivs);
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

  return (
    <>
      <div className="row">
        <div className="col-6">
          {" "}
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
              onClick={() => setOpen(true)}
            />
          </div>
        </div>

        {switchBox.length > 0 ? (
          <div className="row pb-4 color">
            {switchBox.map((item, index) => (
              <div
                key={`${item.id}${index}`}
                className="col-sm-12 col-md-6 col-lg-3 col-xl-4 col-xxl-3 mt-2"
              >
                <div className="card card_hover h-100 shadow">
                  <div className="card-body">
                    <div className="mt-2 text-center p-2">
                      <p className="FormContent">Id: {item.id}</p>
                      <p className="FormPlaceholder">Zone: {item.zoneId}</p>
                      {/* <p className="FormPlaceholder">
                        Category: {item.category}
                      </p> */}
                      <p className="FormPlaceholder">
                        Section: {item.sectionId}
                      </p>

                      <p className="FormPlaceholder">
                        Location: {item.locationId}
                      </p>
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
          title="Switch Box"
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
              <div className="form-group pt-3 pb-3">
                <label>Number of switches</label>
                <select
                  value={noofswitches}
                  onChange={switches}
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
                </select>
              </div>

              <div className="row row-cols-auto justify-content-center">
                {createSwitches.map((createSwitch, index) => (
                  <div key={index} className="col p-0">
                    {createSwitch}
                  </div>
                ))}
              </div>

              <div className="text-center pt-3">
                <button
                  type="button"
                  className="btn btn-sm btn-primary text-center"
                  onClick={addData}
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

export default Switchbox;
