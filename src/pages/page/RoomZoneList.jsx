import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiNames, routeNames } from "../../constants/routePath";
import { Card } from "antd";
import { Modal } from "antd";
import { message, Popconfirm } from "antd";
import { Apiservice } from "../../services/apiServices";

function RoomZoneList() {
  const [zones, setZonesLists] = useState([]);
  const [rooms, setRoomLists] = useState([]);
  const [editZoneDetails, setEditZoneDetails] = useState(false);
  const [editRoomDetails, setEditRoomDetails] = useState(false);
  const [zoneName, setZoneName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const navigateToDashboard = useNavigate();

  const navToDashboard = () => {
    navigateToDashboard(`${routeNames.dashboard}${routeNames.addroomzone}`);
  };

  useEffect(() => {
    getZoneLists();
    getSectionLists();
  }, []);

  const getZoneLists = () => {
    Apiservice.getLists(apiNames.zonelists)
      .then((res) => {
        console.log(res);
        if (res.length === 0) {
          setZonesLists([]);
        } else {
          setZonesLists(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSectionLists = () => {
    Apiservice.getLists(apiNames.sectionlists)
      .then((res) => {
        // console.log(res);
        if (res.length === 0) {
          setRoomLists([]);
        } else {
          setRoomLists(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editZonePopup = (id, zoneName) => {
    setZoneName(zoneName);
    setZoneId(id);
    setEditZoneDetails(true);
  };

  const editSectionPopup = (id, sectionName) => {
    setSectionId(id);
    setSectionName(sectionName);
    setEditRoomDetails(true);
  };

  const handleChangeZone = (e) => {
    setZoneName(e.target.value);
  };

  const handleChangeSection = (e) => {
    setSectionName(e.target.value);
  };

  const updateZoneName = () => {
    Apiservice.updateZoneName(apiNames.updatezone, zoneId, zoneName)
      .then((res) => {
        console.log(res);
        setEditZoneDetails(false);
        getZoneLists();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateRoomName = () => {
    Apiservice.updateSectionName(apiNames.updatesection, sectionId, sectionName)
      .then((res) => {
        console.log(res);
        setEditRoomDetails(false);
        getSectionLists();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteZone = (id) => {
    Apiservice.deleteZone(apiNames.deletezone, id)
      .then((res) => {
        console.log(res);
        //  seteditZoneDetails(false);
        getZoneLists();
      })
      .catch((err) => {
        console.log(err);
      });
    message.success("Successfully Removed");
  };

  const cancelZone = (e) => {
    console.log(e);
    message.error("Cancelled");
  };

  const deleteSection = (id) => {
    Apiservice.deleteSection(apiNames.deletesection, id)
      .then((res) => {
        console.log(res);
        getSectionLists();
      })
      .catch((err) => {
        console.log(err);
      });
    message.success("Successfully Removed");
  };

  const cancelSection = (e) => {
    console.log(e);
    message.error("Cancelled");
  };

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-12">
          <label className="ModuleHeading">
            <Icon
              icon="material-symbols:arrow-right-alt-rounded"
              fontSize={32}
              rotate={2}
              onClick={navToDashboard}
              style={{ cursor: "pointer" }}
            />
            <span>&nbsp; Zone/Room List</span>
          </label>
        </div>
      </div>

      <div className="row mt-2">
        {zones ? <h5>Zone List:</h5> : null}
        {zones.map((zone, index) => (
          <div key={index} className="col-sm-12 col-md-4  mt-2">
            <Card cover>
              <div className="row">
                <div className="col-8">
                  <p className="fs-5 m-0">{zone.zoneName}</p>
                </div>
                <div className="col-2 text-end ">
                  <p className="fs-5 m-0 ">
                    <Icon
                      icon="material-symbols:edit"
                      onClick={() => editZonePopup(zone.id, zone.zoneName)}
                    />
                  </p>
                </div>

                <div className="col-2 text-end ">
                  <p className="fs-5 m-0">
                    <Popconfirm
                      title="Remove Zone"
                      description="Are you sure to Remove this Zone?"
                      onConfirm={() => deleteZone(zone.id)}
                      onCancel={cancelZone}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Icon icon="ic:baseline-delete-outline" />
                    </Popconfirm>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="row mt-2">
        {rooms ? <h5>Room List:</h5> : null}

        {rooms.map((room, index) => (
          <div key={index} className="col-sm-12 col-md-4  mt-2">
            <Card cover>
              <div className="row">
                <div className="col-8">
                  <p className="fs-5 m-0">{room.section}</p>
                </div>
                <div className="col-2 text-end hover">
                  <p className="fs-5 m-0">
                    <Icon
                      icon="material-symbols:edit"
                      onClick={() => editSectionPopup(room.id, room.section)}
                    />
                  </p>
                </div>

                <div className="col-2 text-end">
                  <p className="fs-5 m-0">
                    <Popconfirm
                      title="Remove Section"
                      description="Are you sure to Remove this Section?"
                      onConfirm={(e) => deleteSection(room.id)}
                      onCancel={cancelSection}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Icon icon="ic:baseline-delete-outline" />
                    </Popconfirm>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <Modal
        title={<label className="FormHeading">Edit details</label>}
        centered
        open={editZoneDetails}
        onOk={() => setEditZoneDetails(false)}
        onCancel={() => {
          setEditZoneDetails(false);
        }}
        width={600}
        footer={null}
        maskClosable={false}
      >
        <div className="row col-12">
          <div className="form-group">
            <div
              className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"
              style={{ cursor: "pointer" }}
            >
              <input
                type="text"
                value={zoneName}
                className="form-control"
                onChange={handleChangeZone}
              />
            </div>
          </div>

          <div className="text-center pt-3">
            <button
              type="submit"
              onClick={() => updateZoneName(sectionId, zoneId)}
              className="btn btn-sm btn-outline-primary"
            >
              Update
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        title={<label className="FormHeading">Edit details</label>}
        centered
        open={editRoomDetails}
        onOk={() => setEditRoomDetails(false)}
        onCancel={() => {
          setEditRoomDetails(false);
        }}
        width={600}
        footer={null}
        maskClosable={false}
      >
        <div className="row col-12">
          <div className="form-group">
            <div
              className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12"
              style={{ cursor: "pointer" }}
            >
              <input
                type="text"
                value={sectionName}
                className="form-control"
                onChange={handleChangeSection}
              />
            </div>
          </div>

          <div className="text-center pt-3">
            <button
              type="button"
              onClick={() => updateRoomName(sectionId, zoneId)}
              className="btn btn-sm btn-outline-primary"
            >
              Update
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default RoomZoneList;
