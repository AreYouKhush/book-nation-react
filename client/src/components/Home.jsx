import React, { useEffect } from "react";
import HeroImg from "../assets/Hero Image.png";
import FeaturedBooks from "./FeaturedBooks";
import About from "./About";
import Footer from "./Footer";
import Search from "./Search";
import { useBookContext } from "../BookContext";
import { NavLink } from "react-router-dom";

const Home = () => {

  const {mode, setMenuState} = useBookContext();

  useEffect(() => {
    setMenuState(false);
  }, [])

  return (
    <>
      <div className="mt-24 flex flex-col items-center justify-center font-fira">
        <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-12 p-2 sm:px-24 py-8">
          <div className="sm:w-3/6 lg:w-2/6 flex flex-col justify-center items-center gap-3 md:gap-6">
            <div className="font-fira text-4xl sm:text-2xl md:text-4xl text-center">
              The Ultimate Community for Book Lovers
            </div>
            <div className="font-oxygen text-base md:text-xl text-center">
              Discover, Share, and Enjoy Books of All Genres and Topics
            </div>
            {mode === "logged-out" ? (
              <button className="bg-primary px-8 py-4 text-white font-fira font-bold text-xl hover:bg-secondary duration-150">
                <NavLink to="login">
              Join Now
                </NavLink>
            </button>
            ) : (
              <button className="bg-primary px-8 py-4 text-white font-fira font-bold text-xl hover:bg-secondary duration-150">
                <NavLink to="topbooks">
              Find Books
                </NavLink>
            </button>
            )}
          </div>
          <div className="sm:w-3/6 lg:w-2/6">
            <img src={HeroImg} alt="" />
          </div>
        </div>
        <FeaturedBooks></FeaturedBooks>
        <About></About>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Home;
