import { Icon } from "@iconify/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../../constants/routePath";
import { useState } from "react";
import wakeup from "../../../assests/images/nolistlight.jpg";
import axios from "axios";
import AddAutomation from "./AddAutomation";
import Automation from "./AutomationHome";

function HomeList() {
  const [data, setdata] = useState([]);
  const [createAutomation, setAutomation] = useState(false);
  const [addautomation, setAddAutomation] = useState(false);
  const navigate = useNavigate();

  const navToDashboard = () => {
    navigate(`${routeNames.dashboard}${routeNames.home}`);
  };

  const navToAutomation = () => {
    navigate(`${routeNames.dashboard}${routeNames.addautomation}`);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("http://localhost:3001/Automation")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setdata(result);
        if (result.length !== 0) {
          setAddAutomation(!addautomation);
        } else {
          setAutomation(!createAutomation);
        }
      });
  };

  return (
    <>
      {createAutomation === true && (
        <div className="container">
          <div className="row mt-2">
            <div className="col-sm-12 col-md-12">
              <label className="ModuleHeading">
                <Icon
                  icon="material-symbols:arrow-right-alt-rounded"
                  fontSize={32}
                  rotate={2}
                  onClick={navToDashboard}
                  style={{ cursor: "pointer" }}
                />
              </label>
            </div>
          </div>
          <div className="text-center">
            <img
              src={wakeup}
              alt="addlight"
              className="img-fluid rounded-circle"
              style={{ borderRadius: "50%" }}
              height={300}
            />
          </div>
          <div className="mt-1 text-center ">
            <h4>You don't any automations yet</h4>

            <br />
          </div>
          <div className="mt-0 text-center">
            <p>
              <small className="text-muted ">
                Trigger your lights to turn on of off at a specified time :turn
                ont he bedroomat full brigtness in the morning or shut off the
                entire house at bedtime,for example.
              </small>
            </p>
          </div>

          <div className="text-center">
            <button
              className="btn btn-primary"
              onClick={() =>
                navigate(`${routeNames.dashboard}${routeNames.addautomation}`)
              }
            >
              create Autmation
            </button>
          </div>
        </div>
      )}
      {addautomation === true && <Automation />}
    </>
  );
}

export default HomeList;
