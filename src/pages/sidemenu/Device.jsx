/* Elumalai did this */
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Modal } from "antd";
import axios from "axios";
import "../../assests/css/global.css";
import "./Device.css";

function Device() {
  const [deviceLists, setDeviceLists] = useState([]);
  const [open, setOpen] = useState(false);

  const [zoneList, setZoneList] = useState([]);
  const [zoneName, setZoneName] = useState("");

  const [newDeviceList, setDeviceList] = useState([]);
  const [deviceName, setDeviceName] = useState("");
  const [loactionList, setLocationList] = useState([]);
  const [loactionname, setLocationname] = useState("");

  const [deviceCount, setDeviceCount] = useState("");

  const [post, setPost] = useState([]);
  const [number, setNumber] = useState(1);
  const postPerPage = 1;

  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;

  const currentPost = post.slice(firstPost, lastPost);
  //console.log(currentPost);

  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(post.length / postPerPage); i++) {
    pageNumber.push(i);
  }

  const ChangePage = (pageNumber) => {
    setNumber(pageNumber);
  };

  useEffect(() => {
    axios
      .get("http://192.168.1.46:4000/zoneList")
      .then((res) => {
        setZoneList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://192.168.1.46:4000/sectionList")
      .then((res) => {
        setLocationList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://192.168.1.46:4000/newDeviceList")
      .then((res) => {
        setDeviceList(res.data);
        setPost(res.data);
        //console.log(res.data);

        setDeviceCount(res.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const fetchapi = async () => {
      const data = await fetch("http://192.168.1.46:4000/deviceList");
      const dataj = await data.json();
      //console.log(dataj);
      setDeviceLists(dataj);
    };
    fetchapi();
  }, []);

  const zoneListChange = (e) => {
    var index = e.target.selectedIndex;

    var optionElement = e.target.childNodes[index];
    console.log(index);
    console.log(optionElement.value);

    console.log(e.target.value);

    setZoneName(e.target.value);

    setTimeout(() => {
      console.log(zoneName);
    }, 1);
  };

  const sectionListChange = (e) => {
    console.log(e.target.value);

    setLocationname(e.target.value);
  };

  const deviceListChange = (e) => {
    setDeviceName(e.target.value);

    console.log(e.target.value);
  };

  const sumbitform = (id) => {
    axios
      .post(`http://192.168.1.46:4000/updateDevice/${id}`, {
        deviceName: deviceName,
        zoneId: zoneName,
        sectionId: loactionname,
      })
      .then((res) => {
        // setZoneList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setOpen(false);
  };

  const indexvaluechange = () => {
    setTimeout(() => {
      setZoneList([]);
      setZoneName("");
      setLocationList([]);
      setLocationname("");
      setDeviceName("");

      axios
        .get("http://192.168.1.46:4000/zoneList")
        .then((res) => {
          setTimeout(() => {
            setZoneList(res.data);
          }, 1);

          console.log(zoneList);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get("http://192.168.1.46:4000/sectionList")
        .then((res) => {
          setTimeout(() => {
            setLocationList(res.data);
          }, 2);
          console.log(loactionList);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 3);

    setTimeout(() => {
      setNumber(number - 1);
    }, 4);
  };

  const indexvaluechangezone = () => {
    setTimeout(() => {
      setZoneList([]);
      setZoneName("");
      setLocationList([]);
      setLocationname("");
      setDeviceName("");

      axios
        .get("http://192.168.1.46:4000/zoneList")
        .then((res) => {
          setTimeout(() => {
            setZoneList(res.data);
          }, 1);

          console.log(zoneList);
        })
        .catch((err) => {
          console.log(err);
        });
      axios
        .get("http://192.168.1.46:4000/sectionList")
        .then((res) => {
          setLocationList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1);
    setTimeout(() => {
      setNumber(number + 1);
    }, 2);
  };

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
                      {/* <p className="FormContent">Device Id: {item.device_ID}</p> */}
                      <p className="FormPlaceholder">
                        Device name: {item.deviceName}
                      </p>
                      <p className="FormPlaceholder">Zone: {item.zoneId}</p>

                      <p className="FormPlaceholder">
                        Section: {item.sectionId}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : deviceLists.length > 0 ? (
          <div>Loading devices</div>
        ) : (
          <h5>Device Not found</h5>
        )}

        <Modal
          title={
            currentPost.length === deviceCount
              ? `${deviceCount}  "Device found"`
              : "Device not found"
          }
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
                {currentPost.length > 0 ? (
                  <>
                    <div class="pagination">
                      <div className="row col-12">
                        <div className="col-6">
                          <a href="#" onClick={indexvaluechange}>
                            ❮
                          </a>
                        </div>
                        <div className="col-6"></div>
                      </div>

                      <a
                        href="#"
                        className="text-end"
                        onClick={indexvaluechangezone}
                      >
                        ❯
                      </a>
                    </div>
                  </>
                ) : null}

                {currentPost.map((list, indexm) => (
                  <div key={indexm} className="card mt-1">
                    <div className="card-body">
                      <div className="row ">
                        <div className="col-12 ">
                          <label>DeviceName</label>
                          <p className="FormPlaceholder"> {list.deviceName}</p>

                          <input
                            type="text"
                            className="form-control"
                            onChange={deviceListChange}
                            value={deviceName}
                            style={{ width: "50%" }}
                          />
                        </div>

                        <div className="col-12 mt-1">
                          <label>Zone</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="zoneList"
                            value={zoneName}
                            style={{ width: "50%" }}
                            onChange={(e, index) => zoneListChange(e, index)}
                          >
                            <option value="">select</option>
                            {zoneList.map((list, index) => (
                              <option
                                value={`${list.id}`}
                                key={`${list.id}${index}`}
                                selected={index}
                              >
                                {list.zoneName}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-12 mt-2">
                          <label>Section</label>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            name="loactionList"
                            value={loactionname}
                            onChange={sectionListChange}
                            style={{ width: "50%" }}
                          >
                            <option value="">select</option>
                            {loactionList.map((list, index) => (
                              <option
                                value={list.id}
                                key={`${list.id}${index}`}
                              >
                                {list.section}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-12  mx-5 mt-2">
                          <button
                            type="button"
                            onClick={() => sumbitform(list.id)}
                            className="btn btn-sm btn btn-primary"
                          >
                            update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Device;
