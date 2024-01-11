import React from "react";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";

const Library = () => {
  return (
    <>
      <div className="mt-24 font-fira">
        <div className="px-10 flex flex-col gap-5">
          <div className="flex gap-4">
            <div className="rounded-full px-5 py-3 bg-gray-300 shadow-md hover:shadow-lg shadow-neutral-300 cursor-pointer hover:bg-gray-500 duration-150 font-semibold hover:text-white">
              Books To Read
            </div>
            <div className="rounded-full px-5 py-3 bg-gray-300 shadow-md hover:shadow-lg shadow-neutral-300 cursor-pointer hover:bg-gray-500 duration-150 font-semibold hover:text-white">
              Books You've Finished
            </div>
          </div>
          <div className="h-96 flex justify-center items-center bg-slate-100 rounded-lg shadow-md relative">
            <div className="absolute text-black font-bold text-xl top-3 w-11/12 text-center">
                Your Library
                <hr className="border-black mt-2"/>
            </div>
            <NavLink to="/topbooks" className="bg-black text-white px-10 py-3 text-xl rounded-full font-semibold shadow-md shadow-gray-400 hover:bg-gray-800 duration-150">Add Books</NavLink>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Library;
