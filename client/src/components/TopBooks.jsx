import React from "react";
import Footer from "./Footer";
import { bookData } from "../assets/books";
import { url } from "../helpers/url";
import Search from "./Search";

const TopBooks = () => {
  return (
    <>
      <div className="mt-24 font-fira px-10 flex justify-center flex-col items-center">
        <Search></Search>
        <div className="grid grid-cols-2 items-center place-items-center sm:grid-cols-3 md:grid-cols-4 gap-10 py-10">
          {bookData.map((b, key) => {
            return (
              <div key={key} className="w-56">
                <div>
                  <img src={url + b.imageLink} alt="" className=""/>
                </div>
                <div className="font-bold">{b.title}</div>
                <div>{b.author}</div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default TopBooks;
