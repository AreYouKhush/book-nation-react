import React, { useEffect, useState } from "react";
import axios from "axios";
import HeroImg from "../assets/Hero Image.png";
import FeaturedBooks from "./FeaturedBooks";

const Home = () => {

  return (
    <>
      <div className="mt-24 flex flex-col items-center justify-center">
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
      </div>
    </>
  );
};

export default Home;
