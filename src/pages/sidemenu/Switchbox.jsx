import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Apiservice } from "../../services/api-services/apiServices";
import { apiNames } from "../../routes/routeNames";

function Switchbox() {
  const [switchBox, setSwitchBox] = useState([]);

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
                        Content1: {item.content1}
                      </p>
                      <p className="FormPlaceholder">
                        Content2: {item.content2}
                      </p>
                      <p className="FormPlaceholder">
                        Content3: {item.content3}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3>Loading Switches...</h3>
        )}
      </div>
    </>
  );
}

export default Switchbox;
