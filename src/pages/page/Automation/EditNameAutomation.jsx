import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../../constants/routePath";

function EditNameAutomation() {

  const[automationname,setAutoname]=useState('')

  const navigate = useNavigate();

  const navToDashboard = () => {
    navigate(`${routeNames.dashboard}${routeNames.automation}`);
  };

  useEffect(() => {
    
    setAutoname(sessionStorage.getItem('autoname'))
  
  }, [])

  const onchangeName=(e)=>{
setAutoname(e.target.value)
  }
  
  return (
    <div className="container ">
      <div className="row  min-vh-100">
        <div className="col-12 mt-2">
          <label className="ModuleHeading ">
            <Icon
              icon="material-symbols:arrow-right-alt-rounded"
              fontSize={32}
              rotate={2}
              onClick={navToDashboard}
              style={{ cursor: "pointer" }}
            />
            {/* <span >&nbsp;Automation</span> */}
          </label>

          <h4 className="mt-2 ">Name Your Automation</h4>

          <div className="card col-12" style={{ backgroundColor: "#3f3d3d" }}>
            <div className="mt-2">
              <form className="p-2" style={{ backgroundColor: "#3f3d3d" }}>
                <label className="fontRepeat text-white">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control fontRepeat text-white"
                  value={automationname}
                  style={{ backgroundColor: "#3f3d3d" }}
                  onChange={(e)=>onchangeName(e)}
                />
                <i className="fa fa-times"></i>
              </form>
            </div>

            <div className="col-12 mt-2 p-2 text-center">
              <button
                className="btn btn-sm btn-primary"
                onClick={() =>
                  navigate(
                    `${routeNames.dashboard}${routeNames.editlightcongif}`
                  )
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditNameAutomation;
