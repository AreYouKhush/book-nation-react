import React from "react";
import InstagramIcon from "../assets/instagram.png";
import TwitterIcon from "../assets/twitter.png";
import FacebookIcon from "../assets/facebook.png";
import BookNationLogo from "../assets/BookNationLogobyDesigner.png";
import GithubIcon from "../assets/github-mark-white.png";

const Footer = () => {
  return (
    <>
      <div className="relative w-full h-96 bg-primary mt-7 text-white flex flex-col justify-center items-center">
        <div className="flex flex-col md:flex-row w-full justify-center items-center gap-3 pb-5">
          <div className="flex-1 flex items-center xs:w-96 justify-center">
            <div className="w-36">
              <img src={BookNationLogo} alt="" />
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold">Book Nation</div>
              <div className="text-xl lg:text-2xl">
                Ultimate Destination for Book Lovers
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="flex xs:gap-4 items-end">
              <div>
                <div className="p-3 font-semibold text-base">
                  Sign up to our New Letter*
                </div>
                <input
                  placeholder="Enter your Email:"
                  type="email"
                  className="rounded-full bg-secondary shadow-md px-3 py-2 xs:px-10 xs:py-3"
                />
              </div>
              <button className="rounded-full bg-gray-300 text-black font-bold xs:px-5 hover:bg-gray-500 hover:text-gray-300 duration-200 h-10 xs:h-12 w-20 xs:w-24 text-sm lg:text-lg lg:w-28">
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex flex-col">
              <div className="font-bold py-2 text-sm ">Follow Us:</div>
              <div className="flex gap-2">
                <a href="https://twitter.com/are_you_khushh">
                  <img
                    src={InstagramIcon}
                    alt=""
                    className="h-7 md:h-10 cursor-pointer"
                  />
                </a>
                <a href="https://twitter.com/are_you_khushh">
                  <img
                    src={FacebookIcon}
                    alt=""
                    className="h-7 md:h-10 cursor-pointer"
                  />
                </a>
                <a href="https://twitter.com/are_you_khushh">
                  <img
                    src={TwitterIcon}
                    alt=""
                    className="h-7 md:h-10 cursor-pointer"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-full p-2 md:p-5 bottom-0">
          <hr />
          <div className="text-center pt-2 xs:text-base text-sm flex justify-center items-center gap-3">
            <div>
              2024 Book Nation. Powered by{" "}
              <a href="https://openlibrary.org/">Open Library.</a>
            </div>
            <a href="https://github.com/AreYouKhush">
              <img src={GithubIcon} alt="" className="w-6" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
