import React, { useEffect } from "react";
import Logo from "../assets/BookNationLogobyDesigner.png";
import { NavLink } from "react-router-dom";
import { useBookContext } from "../BookContext";
import { useCookies } from "react-cookie";

const Navbar = () => {
   const {mode, setMode}= useBookContext()
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const logout = ()=>{
    removeCookie("token");
    setMode("logged-out")
  }

  return (
    <>
      <div className="fixed left-0 top-0 w-full bg-primary flex items-center justify-between h-20 pr-6 text-gray-200 font-fira z-10">
        <div className="flex items-center">
          <div className="w-24 mix-blend-luminosity">
            <img src={Logo} alt="" />
          </div>
          <div className="text-4xl font-medium"><NavLink to="/">Book Nation</NavLink></div>
          <div className="mx-3 flex gap-3 font-radio">
          <NavLink to="library" className="bg-secondary rounded-full px-4 py-2 hover:bg-emerald-900 duration-100">
            Library
          </NavLink>
          <NavLink to="topbooks" className="bg-secondary rounded-full px-4 py-2 hover:bg-emerald-900 duration-100">
            Top Books
          </NavLink>
          </div>
        </div>
        <div className="flex gap-3 text-lg">
          {mode === "logged-out" ? (
            <NavLink to="login" className="bg-gray-300 text-primary px-6 py-3 font-semibold hover:bg-gray-500 hover:text-gray-300 duration-200">
            Login
          </NavLink>
          ) : (
            <button onClick={logout}>
            <NavLink className="bg-gray-300 text-primary px-6 py-3 font-semibold hover:bg-gray-500 hover:text-gray-300 duration-200">
              Logout
          </NavLink>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
