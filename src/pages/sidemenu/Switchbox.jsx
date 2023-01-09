import { Icon } from "@iconify/react";
import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiNames } from "../../routes/routeNames";
import { Apiservice } from "../../services/apiServices";

function Switchbox() {
  const [switchBox, setSwitchBox] = useState([]);
  const [open, setOpen] = useState(false);
  const [noofswitches, setNoofswitches] = useState();
  const [createSwitches, setCreateSwitches] = useState([]);
  const [zoneList, setZoneList] = useState([]);
  const [zoneName, setZoneName] = useState("");
  const [sectionList, setSectionList] = useState([]);
  const [sectionName, setSectionName] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
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

    // axios
    //   .post("http://115.160.243.131:64937/Api/getdetailsswitchbox")
    //   .then((res) => {
    //     //console.log(res);
    //     setSwitchBox(res.data.splice(0, 9));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  const sectionListChange = (e) => {
    setSectionName(e.target.value);
  };

  const zoneListChange = (e) => {
    setZoneName(e.target.value);
  };

  const locationListChange = (e) => {
    setLocationName(e.target.value);
  };

  const switches = (e) => {
    setNoofswitches(e.target.value);
    let selectedValue = e.target.value;
    let genDivs = [];
    for (let i = 0; i < selectedValue; i++) {
      genDivs.push(
        <>
          <div className="border mt-3">
            <div className="p-2">
              <select name="" id="" className="form-select">
                <option>Select</option>
                <option value="fan">Fan</option>
                <option value="light">Light</option>
                <option value="usb">Usb</option>
                <option value="socket">Socket</option>
              </select>
            </div>
          </div>
        </>
      );
    }
    setTimeout(() => {
      setCreateSwitches(genDivs);
    }, 1);
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
                      <p className="FormPlaceholder">Zone: {item.zone}</p>
                      {/* <p className="FormPlaceholder">
                        Category: {item.category}
                      </p> */}
                      <p className="FormPlaceholder">Section: {item.section}</p>

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
                  className="form-select"
                  aria-label="Default select example"
                  name="zoneList"
                  value={zoneName}
                  onChange={zoneListChange}
                >
                  <option>Select</option>
                  {zoneList.map((list, index) => (
                    <option key={`${list.id}${index}`} value={list.zoneName}>
                      {list.zoneName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mt-3">
                <label>Section</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="sectionList"
                  value={sectionName}
                  onChange={sectionListChange}
                >
                  <option>Select</option>
                  {sectionList.map((list, index) => (
                    <option key={`${list.id}${index}`} value={list.section}>
                      {list.section}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mt-3">
                <label>Location</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="sectionList"
                  value={locationName}
                  onChange={locationListChange}
                >
                  <option>Select</option>
                  {locationList.map((list, index) => (
                    <option key={`${list.id}${index}`} value={list.location}>
                      {list.location}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group mt-3">
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

              {createSwitches.length > 4 ? (
                <div className=" row d-flex justify-content-center">
                  {createSwitches.map((createSwitch, index) => (
                    <div key={index} className="col-4">
                      {createSwitch}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="d-flex justify-content-center">
                  {createSwitches.map((createSwitch, index) => (
                    <div key={index}>{createSwitch}</div>
                  ))}
                </div>
              )}

              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-sm btn-primary mt-3 text-center"
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
