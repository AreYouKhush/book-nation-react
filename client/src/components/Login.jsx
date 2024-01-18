import React, { useState } from "react";
import PleaseLoginImg from "../assets/PleaseLogin.png";
import { Formik, Form } from "formik";
import CustomInput from "./CustomInput";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginSchema } from "../helpers/FormSchema";
import CircleLoader from "react-spinners/CircleLoader";
import { url } from "../helpers/url";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useBookContext } from "../BookContext";
import googleIcom from "../assets/google.png";

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { mode, setMode } = useBookContext();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values, actions) => {
    const response = await axios.post(url + "user/signin", values);
    if (response.data.token) {
      setCookie("token", response.data.token, { path: "/" });
      setMode("logged-in");
      navigate("/");
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
    <>
      <div className="h-dvh flex flex-col-reverse sm:flex-row justify-center items-center p-10">
        <div className="hidden md:flex w-6/6 lg:w-2/6 sm:static absolute sm:3/6 -z-10">
          <img src={PleaseLoginImg} alt="" />
        </div>
        <div className="w-6/6 lg:w-2/6 flex flex-col justify-center items-center gap-3">
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4 font-semibold items-center">
                <CustomInput
                  type="text"
                  name="email"
                  placeholder="Enter your E-mail"
                  label="E-mail"
                />
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  label="Password"
                />
                <NavLink
                  to="/register"
                  className="hover:opacity-85 text-sm font-bold underline"
                >
                  new? register now
                </NavLink>
                {msg !== "" && (
                  <div className="text-red-500 font-bold text-sm">{msg}</div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={
                    isSubmitting
                      ? "bg-primary text-white px-14 py-5 text-xl opacity-75"
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
                    "Login"
                  )}
                </button>
              </Form>
            )}
          </Formik>
          <button
            className="flex items-center justify-center gap-3 bg-gray-200 p-2 rounded-lg w-fit"
            onClick={googleAuth}
          >
            <div className="w-10">
              <img src={googleIcom} alt="" />
            </div>
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
