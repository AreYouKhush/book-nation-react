import React, { useEffect, useState } from "react";
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
  const [user, setUser] = useState(null);

  const getUser = async() => {
    try{
      const {data} = await axios.get(url + "auth/login/success", {withCredentials: true});
      setUser(data.user._json);
      setMode("logged-in");
      console.log(data.user._json)
    }catch(err){
      console.log({err});
    }
  }

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
    getUser();
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
