import React from "react";
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

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { mode, setMode } = useBookContext();
  const navigate = useNavigate();

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
  };

  return (
    <>
      <div className="h-dvh flex flex-col-reverse sm:flex-row justify-center items-center">
        <div className="w-6/6 lg:w-2/6 sm:static absolute sm:3/6 -z-10">
          <img src={PleaseLoginImg} alt="" />
        </div>
        <div className="w-3/6 lg:w-2/6">
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
                <NavLink to="/register" className="hover:opacity-85 text-sm">
                  new? register now
                </NavLink>
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
        </div>
      </div>
    </>
  );
};

export default Login;
