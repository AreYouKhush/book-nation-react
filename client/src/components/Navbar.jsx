import React, { useEffect, useState } from "react";
import Logo from "../assets/BookNationLogobyDesigner.png";
import { NavLink } from "react-router-dom";
import { useBookContext } from "../BookContext";
import { useCookies } from "react-cookie";
import { MenuSvg } from "./MenuSvg";
import CloseMenuSvg from "./CloseMenuSvg";
import DropDown from "./DropDown";

const Navbar = () => {
  const { mode, setMode } = useBookContext();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [menuState, setMenuState] = useState(false);

  const logout = () => {
    removeCookie("token");
    setMode("logged-out");
    localStorage.removeItem("library")
  };

  return (
    <>
      <div className="fixed left-0 top-0 w-full bg-primary flex items-center justify-between h-20 pr-6 text-gray-200 font-fira z-10">
        <div className="flex items-center">
          <div className="w-20 sm:w-24 mix-blend-luminosity">
            <img src={Logo} alt="" />
          </div>
          <div className="text-3xl md:text-4xl font-medium">
            <NavLink to="/">Book Nation</NavLink>
          </div>
          <div className="mx-3 sm:flex gap-3 font-radio hidden sm:visible">
            <NavLink
              to="/"
              className="bg-secondary rounded-full px-4 py-2 hover:bg-emerald-900 duration-100"
            >
              Home
            </NavLink>
            <NavLink
              to="library"
              className="bg-secondary rounded-full px-4 py-2 hover:bg-emerald-900 duration-100"
            >
              Library
            </NavLink>
            <NavLink
              to="topbooks"
              className="bg-secondary rounded-full px-4 py-2 hover:bg-emerald-900 duration-100"
            >
              Top Books
            </NavLink>
          </div>
        </div>
        {menuState ? (
          <div className="w-8 sm:hidden">
            <CloseMenuSvg
              onClick={() => {
                setMenuState(false);
              }}
            ></CloseMenuSvg>
            <DropDown></DropDown>
          </div>
        ) : (
          <div
            onClick={() => {
              setMenuState(true);
            }}
            className="w-8 sm:hidden"
          >
            <MenuSvg></MenuSvg>
            <DropDown animate={{ x: 800 }}></DropDown>
          </div>
        )}
        <div className="sm:flex gap-3 text-lg hidden sm:visible">
          {mode === "logged-out" ? (
            <NavLink
              to="login"
              className="bg-gray-300 text-primary px-6 py-3 font-semibold hover:bg-gray-500 hover:text-gray-300 duration-200"
            >
              Login
            </NavLink>
          ) : (
            <button onClick={logout}>
              <a
                href="/"
                className="bg-gray-300 text-primary px-6 py-3 font-semibold hover:bg-gray-500 hover:text-gray-300 duration-200"
              >
                Logout
              </a>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
