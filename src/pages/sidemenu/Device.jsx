import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import useModal from "antd/es/modal/useModal";
import Modal from "../Modal";

function Device() {
  const [posts, setPosts] = useState([]);
  const {isShowing, toggle} = useModal();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.splice(0, 10)); // new
      });
  }, []);
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
            />
          </div>
        </div>
       
          {posts.length > 0 ? (
            <div className="row pb-4 justify-content-center color">
              {posts.map((item, index) => (
                <div
                  key={`${item.userId}${index}`}
                  className="col-sm-12 col-md-6 col-lg-3 col-xl-4 col-xxl-3 mt-2"
                 
                >
                  <div  onClick={toggle}  className="card card_hover h-100 shadow">
                    <div className="card-body">
                      <div className="mt-2 text-center p-2">
                        <p className="FormContent"onClick={toggle} >Id: {item.id}</p>

                        <p className="FormPlaceholder" onClick={toggle}>Title: {item.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <h3>Loading Devices...</h3>
          )}
         <Modal
        isShowing={isShowing}
        hide={toggle}
      />
      </div>
    </>
  );
}

export default Device;
