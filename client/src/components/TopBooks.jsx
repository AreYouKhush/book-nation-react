import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { bookData } from "../assets/books";
import { url } from "../helpers/url";
import Search from "./Search";

const TopBooks = () => {

  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <div className="mt-24 font-fira px-2 sm:px-10 flex justify-center flex-col items-center">
        <Search searchInput={searchInput} setSearchInput={setSearchInput}></Search>
        <div className="grid grid-cols-2 items-center place-items-center sm:grid-cols-3 md:grid-cols-4 gap-10 py-10">
          {bookData.map((b, key) => {
            return (
              <div key={key} className="max-w-56 cursor-pointer" onClick={() => {setSearchInput(b.title)}}>
                <div>
                  <img src={url + b.imageLink} alt="" className="aspect-square h-80 object-contain"/>
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
