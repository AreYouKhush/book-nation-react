import React, { useState } from "react";
import { Formik, Form } from "formik";
import { RegisterSchema } from "../helpers/FormSchema";
import { NavLink, useNavigate } from "react-router-dom";
import CustomInput from "./CustomInput";
import CircleLoader from "react-spinners/CircleLoader";
import PleaseRegisterImg from "../assets/PleaseRegister.png";
import axios from "axios";
import { url } from "../helpers/url";
import googleIcom from "../assets/google.png";

const Register = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    const response = await axios.post(url + "user/signup", values);
    if (response.data.msg === "Success") {
      navigate("/login");
    }
    setMsg(response.data.msg);
    setTimeout(() => {
      setMsg("");
    }, 2000);
    actions.resetForm();
  };

  const googleAuth = () => {
    window.open(url + "auth/google/callback", "_self");
  };

  return (
    <div className="h-dvh flex flex-col-reverse sm:flex-row justify-center items-center p-10">
      <div className="w-6/6 hidden md:flex lg:w-2/6 sm:static absolute sm:3/6 -z-10">
        <img src={PleaseRegisterImg} alt="" />
      </div>
      <div className="w-3/6 lg:w-2/6 flex flex-col justify-center items-center gap-3">
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 font-semibold items-center text-sm mt-14">
              <CustomInput
                label="Username"
                name="username"
                type="text"
                placeholder="Username"
              />
              <CustomInput
                type="text"
                name="email"
                placeholder="Enter your email"
                label="E-mail"
              />
              <CustomInput
                type="password"
                name="password"
                placeholder="Enter your password"
                label="Password"
              />
              <CustomInput
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                label="Confirm Password"
              />
              <NavLink
                to="/login"
                className="hover:opacity-85 text-sm font-bold underline whitespace-nowrap"
              >
                already registered? login
              </NavLink>
              {msg !== "" && (
                <div className="text-red-500 font-bold text-sm">{msg}</div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className={
                  isSubmitting
                    ? "bg-primary text-white px-16 py-5 text-xl opacity-75"
                    : "bg-primary text-white px-10 py-5 text-xl hover:bg-secondary duration-150"
                }
              >
                {isSubmitting ? (
                  <>
                    <CircleLoader
                      color={"#ffffff"}
                      loading={true}
                      size={25}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </Form>
          )}
        </Formik>
        <button
          className="flex items-center justify-center gap-3 bg-gray-200 p-2 rounded-lg w-fit text-nowrap"
          onClick={googleAuth}
        >
          <div className="w-10">
            <img src={googleIcom} alt="" />
          </div>
          <span>Sign up with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
