import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Apiservice } from "../../services/apiServices";
import { apiNames } from "../../routes/routeNames";
import { Modal } from "antd";

function Switchbox() {
  const [switchBox, setSwitchBox] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    Apiservice.getLists(apiNames.switchbox)
      .then((res) => {
        //console.log(res);
        setSwitchBox(res.splice(0, 9));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
          <div className="row pb-4 justify-content-center color">
            {switchBox.map((item, index) => (
              <div
                key={`${item.id}${index}`}
                className="col-sm-12 col-md-6 col-lg-3 col-xl-4 col-xxl-3 mt-2"
              >
                <div className="card card_hover h-100 shadow">
                  <div className="card-body">
                    <div className="mt-2 text-center p-2">
                      <p className="FormContent">Id: {item.id}</p>
                      <p className="FormPlaceholder">
                        switch box-1: {item.switchbox1}
                      </p>
                      <p className="FormPlaceholder">
                        switch box-2: {item.switchbox2}
                      </p>
                      <p className="FormPlaceholder">
                        switch box-3: {item.switchbox2}
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
          title="Device (Properties)"
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={600}
          footer={null}
        >
          <div className="row col-12 mt-3">
            <form>
              <div className="form-group">
                <label>Switch box-1</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  // placeholder="Enter Device ID"
                />
              </div>
              <div className="form-group mt-3">
                <label>Switch box-2</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  //placeholder="Device Name"
                />
              </div>
              <div className="form-group mt-3">
                <label>Switch box-3</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  //placeholder="Enter Device ID"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary mt-3 text-center"
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
