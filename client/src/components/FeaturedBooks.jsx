import React, { useEffect } from "react";
import { bookData } from "../assets/books";
import { url } from "../helpers/url";

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
      <div className="bg-gradient-to-r from-primary to-secondary text-gray-200 w-11/12 rounded-xl shadow-xl p-5 my-8">
        <div className="relative text-center font-fira font-medium text-2xl pb-5">
          <span className="mr-4">-</span>Featured Books
          <span className="ml-4">-</span>
        </div>

        <div className="grid grid-cols-5 place-items-center">
          {bookArr.map((n) => (
            <div key={n.title} className="w-48">
              <div>
                <img
                  src={url + n.imageLink}
                  alt=""
                  className="h-72 object-cover"
                />
              </div>
              <div>
                <p className="font-bold">{n.title}</p>
              </div>
              <p>{n.author}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedBooks;
