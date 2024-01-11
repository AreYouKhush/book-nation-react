import React, { useState } from "react";
import { Formik, Form } from "formik";
import { RegisterSchema } from "../helpers/FormSchema";
import { NavLink, useNavigate } from "react-router-dom";
import CustomInput from "./CustomInput";
import CircleLoader from "react-spinners/CircleLoader";
import PleaseRegisterImg from "../assets/PleaseRegister.png";
import axios from "axios";
import { url } from "../helpers/url";

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
    if(response.data.msg === "Success"){
        navigate('/');
    }
    actions.resetForm();
  };

  return (
    <div className="mt-24 flex justify-center items-center">
      <div className="w-2/6">
        <img src={PleaseRegisterImg} alt="" />
      </div>
      <div className="w-2/6">
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 font-semibold items-center">
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
              <NavLink to="/login" className="hover:opacity-85 text-sm">
                already registered? login
              </NavLink>
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
      </div>
    </div>
  );
};

export default Register;
