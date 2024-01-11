import React, { useEffect, useState } from "react";
import axios from "axios";
import HeroImg from "../assets/Hero Image.png";
import FeaturedBooks from "./FeaturedBooks";
import About from "./About";
import Footer from "./Footer";
import Search from "./Search";

const Home = () => {

  return (
    <>
      <div className="mt-24 flex flex-col items-center justify-center font-fira">
        <div className="flex w-full justify-center items-center gap-12 px-24 py-8">
          <div className="w-2/6 flex flex-col justify-center items-center gap-6">
            <div className="font-fira text-4xl text-center">
              The Ultimate Community for Book Lovers
            </div>
            <div className="font-oxygen text-xl text-center">
              Discover, Share, and Enjoy Books of All Genres and Topics
            </div>
            <button className="bg-primary px-8 py-4 text-white font-fira font-bold text-xl hover:bg-secondary duration-150">
              Join Now
            </button>
          </div>
          <div className="w-2/6">
            <img src={HeroImg} alt="" />
          </div>
        </div>
        <FeaturedBooks></FeaturedBooks>
        {/* <div className="w-9/12 flex relative">
          <input type="text" placeholder="Search a book" className="w-full px-10 py-4 rounded-full bg-gray-300 font-semibold text-primary shadow-md shadow-gray-300 focus:outline-none focus:shadow-lg"/>
          <button className="absolute right-1 top-1 bg-primary text-white font-semibold px-6 py-3 rounded-full">Search</button>
        </div> */}
        <Search></Search>
        <About></About>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Home;
