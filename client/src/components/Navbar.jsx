import React from "react";
import Logo from "../assets/BookNationLogobyDesigner.png";

const Navbar = () => {
  return (
    <>
      <div className="fixed left-0 top-0 w-full bg-primary flex items-center justify-between h-20 pr-6 text-gray-200 font-fira">
        <div className="flex items-center">
          <div className="w-24 mix-blend-luminosity">
            <img src={Logo} alt="" />
          </div>
          <div className="text-4xl font-medium">Book Nation</div>
          <div className="mx-3 flex gap-3 font-radio">
          <button className="bg-secondary rounded-full px-4 py-2 hover:bg-emerald-900 duration-100">
            Library
          </button>
          <button className="bg-secondary rounded-full px-4 py-2 hover:bg-emerald-900 duration-100">
            Top Books
          </button>
          </div>
        </div>
        <div className="flex gap-3 text-lg">
          <button className="bg-gray-300 text-primary px-6 py-3 font-semibold hover:bg-gray-500 hover:text-gray-300 duration-200">
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
