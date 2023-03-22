import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useNavigate , useLocation} from "react-router-dom";
import "../../../assests/css/global.scss";
import { apiNames, routeNames } from "../../../constants/routePath";
import { Apiservice } from "../../../services/apiServices";


function AddLightConfig() {
  const [lineLists, setLineLists] = useState([]);


  const [newDeviceLists, setNewDeviceLists] = useState([]);
  let roomName = useLocation();
  const [roomValue, setRoomValue] = useState(roomName.state);
  const [checkboxes, setCheckboxes] = useState([]);
  const [mergeArray, setMergedArray] = useState([]);

  const [autoname,setautoname]=useState('');
  const [valuetime,settime]=useState('');
  const [repeat,setrepeat]=useState([]);

  const [auto,setauto]=useState()




  const handleParentCheckboxChange = (index) => {
    const updatedCheckboxes = [...mergeArray];
    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;

    // update children checkboxes when parent checkbox is checked/unchecked
    updatedCheckboxes[index].lines.forEach(
      (child) => (child.checked = updatedCheckboxes[index].checked)
    );
    // console.log(updatedCheckboxes);
    setCheckboxes(updatedCheckboxes);
  };

  const handleChildCheckboxChange = (parentIndex, childIndex) => {
    const updatedCheckboxes = [...mergeArray];
    updatedCheckboxes[parentIndex].lines[childIndex].checked =
      !updatedCheckboxes[parentIndex].lines[childIndex].checked;
    // update parent checkbox when all children checkboxes are checked
    const allChildrenChecked = updatedCheckboxes[parentIndex].lines.some(
      (child) => child.checked
    );
    updatedCheckboxes[parentIndex].checked = allChildrenChecked;
    setCheckboxes(updatedCheckboxes);
  };

  const addZone = (checkboxes) => {

    console.log(checkboxes);

    const checkedItems = checkboxes.filter((item) => item.checked);
    const arr = JSON.stringify(checkedItems);
    console.log(arr);

    const newArray = [];

    checkedItems.map((item) => {
  // Update the item as needed
  const updatedItem = {
    ...item,
    autoname: autoname,
    valuetime:valuetime,
    repeat:repeat
  };
  newArray.push(updatedItem);
});


console.log(JSON.stringify(newArray));
const arre = newArray.map((item) => {
  return item.autoname

})
setauto(arre)

setTimeout(() => {
  console.log(auto);
},1);

    // fetch("http://192.168.1.46:4000/automation", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     automationname:auto
    //   }),
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result);
    //     alert("Record inserted");
    //   });

   
    // axios
    //   .post("http://localhost:3001/Automation", checkedItems)
    //   .then((response) => console.log(response))
    //   .catch((error) => console.log(error));
  };

  


  const navigate = useNavigate();

  const navToDashboard = () => {
    navigate(`${routeNames.dashboard}${routeNames.automationname}`);
  };

 


  const [isFuncCalled, setIsFuncCalled] = useState(false);

  useEffect(() => {
    
   setautoname(sessionStorage.getItem("data"))
   settime(sessionStorage.getItem("value"))
   setrepeat(JSON.parse(sessionStorage.getItem("label")))
  
    Apiservice.getLists(apiNames.deviceLists) //newDeviceLists
      .then((res) => {
         console.log(res);
        if (res.length !== 0) {
          const notAvailableDevices = res.filter((room) => {
            // console.log(room.checked);
            return room.sectionId !== null;
          });
          getSection(notAvailableDevices);
  
          if (isFuncCalled) {
          // alert('sdf')
            myFunction(); // Call your function here
            setIsFuncCalled(true);
          }
          const storedState = JSON.parse(localStorage.getItem("mystate"));
          if (storedState) {
            setMergedArray(storedState);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }, [isFuncCalled]);

  let myFunction = async () => {

    let linesObj = [];
    for (let item of lineLists) {
      linesObj.push(JSON.parse(item.description).lines);
    }
    const mergedArray = await newDeviceLists.map((item, index) => {
      return {
        ...item,
        lines: linesObj[index],
      };
    });
    setMergedArray(mergedArray);
    localStorage.setItem("mystate", JSON.stringify(mergedArray));
  };


  const getSection = (notAvailableDevices) => {
    Apiservice.getLists(apiNames.sectionLists)
      .then((res) => {
         console.log(res);

        setTimeout(() => {
          const filtered1 = res.filter((number) => {
            return notAvailableDevices.some((zoneId) => {
              return zoneId.sectionId === number.id;
            });
          });

          const filtered2 = notAvailableDevices.filter((number) => {
            return res.some((zoneId) => {
              return zoneId.id === number.sectionId;
            });
          });
          // console.log(filtered1);
          // console.log(filtered2);
          setNewDeviceLists(filtered1);
          setLineLists(filtered2);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //  let myFunction = async () => {
 
  //   console.log(lineLists);
  //   let linesObj = [];
  //   for (let item of lineLists) {
  //     linesObj.push(JSON.parse(item.description).lines);
  //   }
  //   const mergedArray = await newDeviceLists.map((item, index) => {
  //     return {
  //       ...item,
  //       lines: linesObj[index],automationname:autoname,
        
  //       time:valuetime,
  //       mode:repeat
  //     };
  //   }, []);
  //   console.log(mergedArray);
  //   setMergedArray(mergedArray);
  //   localStorage.setItem("mystate", JSON.stringify(mergedArray));
  // };
 





 

 
  


  return (
    <div className="container">
      <div className="row pt-3">
        <div className="col-12">
          <label className="ModuleHeading">
            <Icon
              icon="material-symbols:arrow-right-alt-rounded"
              fontSize={32}
              rotate={2}
              onClick={navToDashboard}
              style={{ cursor: "pointer" }}
            />
          </label>
          <h4 className="mt-2 mx-2">Choose your Light</h4>
          {mergeArray.map((roomName, parentIndex) => (
                    <div key={parentIndex}>
                      <div className="card mt-3">
                        <div className="card-header accordion">
                          <div className="row">
                            <div className="col-2">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={roomName.checked}
                                  onChange={() =>
                                    handleParentCheckboxChange(parentIndex)
                                  }
                                />
                              </div>
                            </div>
                            <div
                              className="col-8 gx-0"
                              id={parentIndex}
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              <h5>{roomName.section}</h5>
                            </div>
                            <div className="col-2 text-end">
                              <span className="">
                                <Icon
                                  id="accordionExample"
                                  icon="ant-design:caret-down-filled"
                                  className="fs-4"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#${roomName.section?.replace(
                                    /\s+/g,
                                    ""
                                  )}`}
                                  aria-expanded="true"
                                  aria-controls="collapseOne"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          id={`${roomName.section?.replace(/\s+/g, "")}`}
                          className="accordion-body accordion-collapse collapse hide"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="d-flex flex-row flex-nowrap overflow-auto">
                            {roomName.lines.map((subLineName, childIndex) => (
                              <div key={childIndex}>
                                {subLineName.name && (
                                  <div className="text-center mt-2 mb-2">
                                    <div
                                      className="card card-block mx-2 bg_color"
                                      style={{
                                        minWidth: "150px",
                                      }}
                                    >
                                      <div
                                        className="mt-2"
                                        style={{
                                          color: "white",
                                        }}
                                      >
                                        <Icon
                                          icon="material-symbols:database"
                                          className="fs-2"
                                        />
                                      </div>

                                      <p className="m-0 mt-3 mx-2 FormContent">
                                        {subLineName.name}
                                      </p>

                                      <p
                                        className="m-0 FormPlaceholder"
                                        style={{
                                          color: "white",
                                        }}
                                      ></p>

                                      <div className="form-check form-switch d-flex justify-content-center mb-2">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          checked={subLineName.checked}
                                          onChange={() =>
                                            handleChildCheckboxChange(
                                              parentIndex,
                                              childIndex
                                            )
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

        
          <div className="text-center mt-3">
            <button
              className="btn btn-outline-primary btn-sm "
              style={{ paddingLeft: "20px", paddingRight: "20px" }}
              onClick={() => addZone(checkboxes)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  
  );
}

export default AddLightConfig;
