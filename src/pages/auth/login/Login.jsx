import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../../validations/validationSchema";
import { Icon } from "@iconify/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { routeNames } from "../../../constants/routePath";
import "./Login.css";

const Login = () => {
  const navigateDashboard = useNavigate();
  const navigateRegister = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [passwordType, setpasswordType] = useState("password");

  const registerForm = () => {
    navigateRegister(routeNames.auth.register);
  };

  const formSubmitHandler = () => {
    navigateDashboard(`${routeNames.dashboard}${routeNames.home}`);
  };

  const togglePassword = (e) => {
    if (passwordType === "password") {
      setpasswordType("text");
      return;
    }
    setpasswordType("password");
  };

  return (
    <div className="container ">
      <div className="row align-items-center justify-content-center min-vh-100">
        <div className="col-sm-12 col-md-7"></div>
        <div className="col-sm-12 col-md-5">
          <div className="card shadow p-3">
            <div className="card-body">
              <form onSubmit={handleSubmit(formSubmitHandler)}>
                <h3 className="pb-3">Login</h3>
                <div className="form-outline mt-2 position-relative">
                  <div className="position-absolute top-50 start-0 translate-middle-y ">
                    <Icon icon="bxs:user" />
                  </div>
                  <input
                    {...register("email")}
                    type="email"
                    name="email"
                    id="email"
                    className="form-control formControl"
                    placeholder="Email Address"
                  />
                </div>
                {errors.email ? (
                  <span className="text-danger fw-bold">
                    {errors.email.message}
                  </span>
                ) : (
                  <></>
                )}
                <div className=" form-outline mt-3 position-relative">
                  <div
                    onClick={() => togglePassword()}
                    className="position-absolute top-50 end-0 translate-middle-y mx-2  "
                  >
                    {passwordType === "password" ? (
                      <FaEye className="fa_eye3" />
                    ) : (
                      <FaEyeSlash className="fa_eye" />
                    )}
                  </div>
                  <div className="position-absolute top-50 start-0 translate-middle-y ">
                    <Icon icon="ri:lock-password-fill" />
                  </div>
                  <input
                    {...register("password")}
                    type={passwordType}
                    name="password"
                    id="password"
                    className="form-control formControl"
                    placeholder="Password"
                  />
                </div>
                {errors.password ? (
                  <span className="text-danger fw-bold ">
                    {errors.password.message}
                  </span>
                ) : (
                  <></>
                )}
                <div className="text-end mt-3">
                  <label className="text-primary" style={{ cursor: "pointer" }}>
                    Forgot Password
                  </label>
                </div>
                <div className="mt-3 mb-3 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    style={{ paddingRight: "40px", paddingLeft: "40px" }}
                  >
                    Login
                  </button>
                </div>

                <div className="text-center mt-4">
                  <span>Don't have an account</span>&nbsp;
                  <label
                    onClick={() => registerForm()}
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                  >
                    create an account
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
