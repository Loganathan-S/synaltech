import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../../validations/validationSchema";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
//import { userService } from "../../../service/userService";
//import { routePath } from "../../../constants/routePath";
import { Icon } from "@iconify/react";
import "../register/register.css";
const Register = () => {
  const [passwordType, setpasswordType] = useState("password");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  //   const navigateLogin = useNavigate();

  //   const loginForm = () => {
  //     navigateLogin(routePath.auth.login);
  //   };

  const formRegisterHandler = (data) => {
    // console.log(data);
    // console.log(data.firstname);
    // console.log(data.email);
    // console.log(data.industry);
    // console.log(data.mobilenumber);
    // console.log(data.password);
    // userService
    //   .userRegister(
    //     data.firstname,
    //     data.lastname,
    //     data.email,
    //     data.password,
    //     data.mobilenumber,
    //     data.industry
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     //   navigateDashboard("/dashboard");
    //   });
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
                <form
                  className="w-full"
                  onSubmit={handleSubmit(formRegisterHandler)}
                >
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
                    >
                      {/* {passwordType === "password" ? (
                        <FaEye className="fa_eye3" />
                      ) : (
                        <FaEyeSlash className="fa_eye" />
                      )} */}
                    </div>
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

                  {/* <div className="form-outline mb-2 position-relative">
                    <div className="position-absolute top-50 start-0 translate-middle-y ">
                      <Icon icon="ri:lock-password-fill" />
                    </div>
                    <input
                      {...register("fieldfive")}
                      type="password"
                      name="fieldfive"
                      id="fieldfive"
                      placeholder="Field five"
                      className="form-control formControl"
                    />
                  </div>
                  {errors.fieldfive ? (
                    <span className="text-danger fw-bold ">
                      {errors.fieldfive.message}
                    </span>
                  ) : (
                    <></>
                  )}
                  <div className="mb-2 position-relative">
                    <div className="position-absolute top-50 start-0 translate-middle-y ">
                      <Icon icon="bx:mobile" />
                    </div>
                    <input
                      {...register("fieldsix")}
                      type="number"
                      name="fieldsix"
                      id="fieldsix"
                      className="form-control formControl"
                      min="0"
                      placeholder="Field six "
                    />
                  </div>
                  {errors.fieldsix ? (
                    <span className="text-danger fw-bold ">
                      {errors.fieldsix.message}
                    </span>
                  ) : (
                    <></>
                  )} */}

                  {/* <div className="mb-3">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 fw-bold">
                      Country
                    </label>
                    <input
                      {...register("country")}
                      type="text"
                      name="country"
                      id="country"
                      className="form-control"
                    />
                    {errors.country ? (
                      <span className="text-danger fw-bold">
                        {errors.country.message}
                      </span>
                    ) : (
                      <></>
                    )}
                  </div> */}
                  <div className="mt-5 text-center ">
                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary btn-sm">
                        Register
                      </button>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    {/* { showResults ? <Register /> : null } */}
                    <span>Already have an account</span>&nbsp;
                    {/* <a
                      onClick={() => loginForm()}
                      className=""
                      style={{ cursor: "pointer" }}
                    >
                      login
                    </a> */}
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
