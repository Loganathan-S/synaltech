import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Apiservice } from "../../services/apiServices";
import { apiNames } from "../../routes/routeNames";
import { Modal } from "antd";
import axios from "axios";

function Switchbox() {
  const [switchBox, setSwitchBox] = useState([]);
  const [open, setOpen] = useState(false);
  const [noofswitches, setNoofswitches] = useState();
  
  

  useEffect(() => {
    axios
      .post("http://115.160.243.131:64937/Api/getdetailsswitchbox")
      .then((res) => {
        console.log(res);
        setSwitchBox(res.data.splice(0, 9));
      })
      .catch((err) => {
        console.log(err);
      });
    // Apiservice.getLists(apiNames.switchbox)
    //   .then((res) => {
    //     //console.log(res);
    //     setSwitchBox(res.splice(0, 9));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  const switches = (e) => {
    setNoofswitches(e.target.value);
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
                      <p className="FormPlaceholder">
                        Category: {item.category}
                      </p>
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
                  <option value={9}>Nine</option>
                  <option value={10}>Ten</option>
                </select>
              </div>
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
