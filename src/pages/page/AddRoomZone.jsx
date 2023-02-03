import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { apiNames, routeNames } from "../../constants/routePath";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Apiservice } from "../../services/apiServices";
import { Card, Col, Row } from "react-bootstrap";

function AddRoomZone() {
  const [zone, setZone] = useState("");
  const [section, setSection] = useState("");

  const navigateToDashboard = useNavigate();

  const navToDashboard = () => {
    navigateToDashboard(`${routeNames.dashboard}${routeNames.home}`);
  };

  const handleZoneChange = (e) => {
    setZone(e.target.value);
  };

  const handleSectionChange = (e) => {
    setSection(e.target.value);
  };

  const addZone = () => {
    let zoneObj = zone;
    Apiservice.addZoneList(apiNames.newZone, zoneObj)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setZone("");
  };

  const addSection = () => {
    let addSection = section;
    Apiservice.addSectionList(apiNames.newSection, addSection)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setSection("");
  };

  const viewRoomZoneList = () => {
    navigateToDashboard(`${routeNames.dashboard}${routeNames.roomzonelist}`);
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
            <span>&nbsp;Add Zone/Room</span>
          </label>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-xxl-6  mt-3">
          <Card>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Zone :</Form.Label>
                <Row className="align-items-center">
                  <Col sm={10}>
                    <Form.Control
                      value={zone}
                      onChange={handleZoneChange}
                      type="text"
                      placeholder="enter zone ex: Ground floor"
                    />
                  </Col>
                  <Col
                    sm={2}
                    className="text-end mt-sm-2 mt-md-0 mt-lg-0 mt-xl-0 mt-xxl-0 mt-3"
                  >
                    <Button
                      variant="outline-secondary"
                      type="button"
                      size="sm"
                      onClick={addZone}
                    >
                      Add
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
              <Form>
                <Form.Group className="mb-3 mt-3">
                  <Form.Label>Room :</Form.Label>

                  <Row className="align-items-center">
                    <Col sm={10}>
                      <Form.Control
                        value={section}
                        onChange={handleSectionChange}
                        type="text"
                        placeholder="enter zone ex: Hall"
                      />
                    </Col>
                    <Col
                      sm={2}
                      className="text-end mt-sm-2 mt-md-0 mt-lg-0 mt-xl-0 mt-xxl-0 mt-3"
                    >
                      <Button
                        variant="outline-secondary"
                        type="button"
                        size="sm"
                        onClick={addSection}
                      >
                        Add
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
                <Col>
                  <Button
                    variant="outline-secondary"
                    type="button"
                    size="sm"
                    onClick={viewRoomZoneList}
                  >
                    View Room/Zone List&nbsp;&nbsp;
                    <Icon icon="mdi:comment-eye-outline" className="fs-4" />
                  </Button>
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AddRoomZone;
