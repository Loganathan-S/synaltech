import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Apiservice } from "../../services/apiServices";
import { apiNames } from "../../routes/routeNames";
import { Modal } from "antd";
import "../../assests/css/global.css";

function Mapping() {
  const [mapLists, setMapLists] = useState([]);
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   Apiservice.getLists(apiNames.mapping)
  //     .then((res) => {
  //       //console.log(res);
  //       setMapLists(res.splice(0, 9));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  return (
    <>
      <div className="row">
        <div className="col-6">
          <h4>Mapping</h4>
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

        {mapLists.length > 0 ? (
          <div className="row pb-4 color">
            {mapLists.map((item, index) => (
              <div
                key={`${item.id}${index}`}
                className="col-sm-12 col-md-6 col-lg-3 col-xl-3 col-xxl-3 mt-2"
              >
                <div className="card h-100">
                  <div className="card-body">
                    <div className="mt-2 text-center p-2">
                      <label className="FormContent">Id: {item.id}</label>
                      <br />
                      <label className="FormPlaceholder">
                        Mapping-1: {item.Mapping1}
                      </label>
                      <br />
                      <label className="FormPlaceholder">
                        Mapping-2: {item.Mapping2}
                      </label>
                      <br />
                      <label className="FormPlaceholder">
                        Mapping-3: {item.Mapping3}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h5>Loading mapping...</h5>
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
          maskClosable={false}
          bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 180px)" }}
        >
          <div className="row col-12 mt-3">
            <form>
              <div className="form-group">
                <label>Mapping-1</label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  //placeholder="Enter Device ID"
                />
              </div>
              <div className="form-group mt-3">
                <label>Mapping-2</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  //placeholder="Device Name"
                />
              </div>
              <div className="form-group mt-3">
                <label>Mapping-3</label>
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  //placeholder="Enter Device ID"
                />
              </div>

              <div className="text-center">
                <button
                  type="button"
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

export default Mapping;
