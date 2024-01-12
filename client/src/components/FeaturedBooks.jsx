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
      <div className="text-gray-200 w-11/12 rounded-xl shadow-xl px-3 py-8 md:p-8 my-8 animate-bg">
        <div className=" flex justify-center items-center gap-2 font-fira font-medium text-2xl pb-5">
          <div>
            <StarSvg className="w-8"></StarSvg>
          </div>
          <div>Featured Books</div>
        </div>
      <hr />
        <div className="grid grid-cols-2 gap-3 place-items-center md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 md:place-items-center mt-6">
          {bookArr.map((n) => (
            <div key={n.title} className="w-36 lg:w-36 xl:w-48 flex flex-col justify-center whitespace-nowrap overflow-hidden text-ellipsis">
              <div className="flex justify-center">
                <img
                  src={url + n.imageLink}
                  alt=""
                  className="h-60 lg:h-60 xl:h-72 object-cover"
                />
              </div>
              <div>
                <p className="font-bold">{n.title}</p>
              </div>
              <p className="">{n.author}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedBooks;
