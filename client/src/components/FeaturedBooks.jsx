import React, { useEffect } from "react";
import { bookData } from "../assets/books";
import { url } from "../helpers/url";
import StarSvg from "./Star";

const FeaturedBooks = () => {
  let bookSet = new Set();
  let bookArr = [];
  while (bookSet.size < 5) {
    let newBook = bookData[Math.floor(Math.random() * 100)];
    bookSet.add(newBook);
  }
  for (const entry of bookSet.keys()) {
    bookArr.push(entry);
  }
  return (
    <>
      <div className="text-gray-200 w-11/12 rounded-xl shadow-xl p-8 my-8 animate-bg">
        <div className=" flex justify-center items-center gap-2 font-fira font-medium text-2xl pb-5">
          <div>
            <StarSvg className="w-8"></StarSvg>
          </div>
          <div>Featured Books</div>
        </div>
      <hr />
        <div className="grid grid-cols-5 place-items-center mt-6">
          {bookArr.map((n) => (
            <div key={n.title} className="w-48 flex flex-col items-center justify-center">
              <div>
                <img
                  src={url + n.imageLink}
                  alt=""
                  className="h-72 object-cover"
                />
              </div>
              <div>
                <p className="font-bold break-all">{n.title}</p>
              </div>
              <p className="break-all">{n.author}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedBooks;
