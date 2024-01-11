import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import "./App.css"
import axios from "axios";
import { url } from "./helpers/url";
import { useCookies } from "react-cookie";
import { useBookContext } from "./BookContext";

const App = () => {

  const [cookies, setCookie, removeCookie] = useCookies(["token"])
  const {setMode} = useBookContext();

  const authVerifyToken = async () => {
    const response = await axios.get(`${url}user/auth`, {
      headers: {
        token: cookies.token,
      },
    });
    if (response.data.msg === "Success") {
      setMode("logged-in");
    } else {
      setMode("logged-out");
    }
  };

  useEffect(() => {
    if (cookies.token) {
      setMode("logged-in");
    }
    authVerifyToken();
  }, []);

  return (
    <>
    <Navbar></Navbar>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default App;
