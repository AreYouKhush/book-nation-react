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
  const [logoutModal, setLogoutModal] = useState(false);

  const logout = () => {
    removeCookie("token");
    setMode("logged-out");
    localStorage.removeItem("library");
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
          <div className="mx-3 md:flex gap-3 font-radio hidden md:visible">
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
            <NavLink
              to="notes"
              className="bg-secondary rounded-full px-4 py-2 hover:bg-emerald-900 duration-100"
            >
              Notes
            </NavLink>
          </div>
        </div>
        {menuState ? (
          <div className="w-8 md:hidden">
            <CloseMenuSvg
              onClick={() => {
                setMenuState(false);
              }}
            ></CloseMenuSvg>
            <DropDown setLogoutModal={setLogoutModal}></DropDown>
          </div>
        ) : (
          <div
            onClick={() => {
              setMenuState(true);
            }}
            className="w-8 md:hidden"
          >
            <MenuSvg></MenuSvg>
            <DropDown
              setLogoutModal={setLogoutModal}
              animate={{ x: 800 }}
            ></DropDown>
          </div>
        )}
        <div className="md:flex gap-3 text-lg hidden md:visible">
          {mode === "logged-out" ? (
            <NavLink
              to="login"
              className="bg-gray-300 text-primary px-6 py-3 font-semibold hover:bg-gray-500 hover:text-gray-300 duration-200"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={() => {
                setLogoutModal(true);
              }}
              className="bg-gray-300 text-primary px-4 py-3 font-semibold hover:bg-gray-500 hover:text-gray-300 duration-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
      {logoutModal && (
        <div className="fixed w-full bg-transparent backdrop-blur-sm top-0 right-0 bottom-0 z-50 flex justify-center items-center text-white font-fira">
          <div className="flex flex-col gap-5 bg-primary px-10 xs:px-16 py-10 rounded-xl justify-center items-center shadow-lg">
            <div className="text-base xs:text-xl">Are you sure about that?</div>
            <div className="flex justify-between gap-5">
              <div
                className="bg-secondary rounded-full px-5 py-2 cursor-pointer hover:opacity-75 duration-100 text-sm xs:text-base"
                onClick={() => setLogoutModal(false)}
              >
                No, Take me back!
              </div>
              <a href="/">
                <div
                  className="bg-red-700 rounded-full px-5 py-2 cursor-pointer hover:opacity-75 duration-100 text-sm xs:text-base"
                  onClick={() => {
                    setLogoutModal(false);
                    logout();
                  }}
                >
                  Yes
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
