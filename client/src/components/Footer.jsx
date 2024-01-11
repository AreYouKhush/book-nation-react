import React from "react";
import InstagramIcon from "../assets/instagram.png";
import TwitterIcon from "../assets/twitter.png";
import FacebookIcon from "../assets/facebook.png";
import BookNationLogo from "../assets/BookNationLogobyDesigner.png";

const Footer = () => {
  return (
    <>
      <div className="relative w-full h-96 bg-primary mt-7 text-white flex flex-col justify-center items-center">
        <div className="flex w-full justify-center items-center">
          <div className="flex-1 flex items-center w-96 justify-center">
            <div className="w-36">
              <img src={BookNationLogo} alt="" />
            </div>
            <div>
              <div className="text-3xl font-bold">Book Nation</div>
              <div className="text-2xl">
                Ultimate Destination for Book Lovers
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="flex gap-4 items-end">
              <div>
                <div className="p-3 font-semibold">
                  Sign up to our New Letter*
                </div>
                <input
                  placeholder="Enter your Email:"
                  type="email"
                  className="rounded-full bg-secondary shadow-md px-10 py-3"
                />
              </div>
              <button className="rounded-full bg-gray-300 text-black font-bold px-5 hover:bg-gray-500 hover:text-gray-300 duration-200 h-12">
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex flex-col">
              <div className="font-bold py-2">Follow Us:</div>
              <div className="flex gap-2">
                <img
                  src={InstagramIcon}
                  alt=""
                  className="h-10 cursor-pointer"
                />
                <img
                  src={FacebookIcon}
                  alt=""
                  className="h-10 cursor-pointer"
                />
                <img src={TwitterIcon} alt="" className="h-10 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-full p-5 bottom-0">
          <hr />
          <div className="text-center pt-2">
            2024 Book Nation. Powered by{" "}
            <a href="https://openlibrary.org/">Open Library</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
