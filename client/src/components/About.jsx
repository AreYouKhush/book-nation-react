import React from "react";
import BookShelf from "../assets/Bookshelf.png";
import CommunityImg from "../assets/Community.png";
import BookImg from "../assets/Book.png";

const About = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row my-7 text-lg md:text-2xl gap-12 lg:gap-24">
        <div className="flex flex-col justify-center items-center shadow-lg shadow-gray-400 rounded-lg p-10 hover:bg-gray-200 duration-150 hover:shadow-xl hover:shadow-gray-400">
          <div className="w-24 lg:w-52">
            <img src={BookImg} alt="" />
          </div>
          <div className="font-bold text-primary">
            Take Notes and Learn
          </div>
        </div>
        <div className="flex flex-col justify-center items-center shadow-lg shadow-gray-400 rounded-lg p-10 hover:bg-gray-200 duration-150 hover:shadow-xl hover:shadow-gray-400">
          <div className="w-24 lg:w-52">
            <img src={BookShelf} alt="" />
          </div>
          <div className="font-bold text-primary">Organize your library</div>
        </div>
        <div className="flex flex-col justify-center items-center shadow-lg shadow-gray-400 rounded-lg p-10 hover:bg-gray-200 duration-150 hover:shadow-xl hover:shadow-gray-400">
          <div className="w-24 lg:w-52">
            <img src={CommunityImg} alt="" />
          </div>
          <div className="font-bold text-primary">Build a Community</div>
        </div>
      </div>
    </>
  );
};

export default About;
