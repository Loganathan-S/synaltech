import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../../validations/validationSchema";
import "../register/register.css";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../../constants/routePath";

const Register = () => {
  const [passwordType, setpasswordType] = useState("password");
  const navigateLogin = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const loginForm = (data) => {
    navigateLogin(routeNames.auth.login);
  };

  const togglePassword = (e) => {
    if (passwordType === "password") {
      setpasswordType("text");
      return;
    }
    setpasswordType("password");
  };

  return (
    <>
      <div className="container">
        <div className="row align-items-center min-vh-100 ">
          <div className="col-7"></div>
          <div className="col-5">
            <div className="card shadow p-3">
              <div className="card-body">
                <form className="w-full" onSubmit={handleSubmit(loginForm)}>
                  <h3 className="">Register</h3>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-outline position-relative">
                        <div className="position-absolute top-50 start-0 translate-middle-y ">
                          <Icon icon="bxs:user" />
                        </div>
                        <input
                          {...register("fieldone")}
                          type="text"
                          name="fieldone"
                          id="firstname"
                          className="form-control formControl"
                          placeholder="Field One"
                        />
                      </div>
                      {errors.fieldone ? (
                        <span className="text-danger fw-bold position-absolute ">
                          {errors.fieldone.message}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="col-12 mt-4">
                      <div className="form-outline mb-2 position-relative ">
                        <div className="position-absolute top-50 start-0 translate-middle-y ">
                          <Icon icon="bxs:user" />
                        </div>
                        <input
                          {...register("fieldtwo")}
                          type="text"
                          name="fieldtwo"
                          id="fieldtwo"
                          className="form-control formControl"
                          placeholder="Field two"
                        />
                      </div>
                      {errors.fieldtwo ? (
                        <span className="text-danger fw-bold position-absolute">
                          {errors.fieldtwo.message}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="form-outline mt-4 position-relative">
                    <div className="position-absolute top-50 start-0 translate-middle-y ">
                      <Icon icon="ic:round-email" />
                    </div>
                    <input
                      {...register("fieldthree")}
                      type="text"
                      name="fieldthree"
                      id="fieldthree"
                      className="form-control formControl"
                      placeholder="Field three"
                    />
                  </div>
                  {errors.fieldthree ? (
                    <span className="text-danger fw-bold position-absolute">
                      {errors.fieldthree.message}
                    </span>
                  ) : (
                    <></>
                  )}
                  <div className=" form-outline  mt-4 position-relative">
                    <div
                      onClick={() => togglePassword()}
                      className="position-absolute top-50 end-0 translate-middle-y mx-2"
                    ></div>
                    <div className="position-absolute top-50 start-0 translate-middle-y ">
                      <Icon icon="ri:lock-password-fill" />
                    </div>

                    <input
                      {...register("fieldfour")}
                      type={passwordType}
                      name="fieldfour"
                      id="fieldfour"
                      className="form-control formControl"
                      placeholder="Field four"
                    />
                  </div>
                  {errors.fieldfour ? (
                    <span className="text-danger fw-bold position-absolute ">
                      {errors.fieldfour.message}
                    </span>
                  ) : (
                    <></>
                  )}
                  <div className="mt-5 text-center ">
                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary btn-sm">
                        Register
                      </button>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <span>Already have an account</span>&nbsp;
                    <a
                      onClick={loginForm}
                      className=""
                      style={{ cursor: "pointer" }}
                    >
                      login
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </>
  );
};

export default Register;
