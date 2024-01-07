import React, { useEffect } from "react";
import { bookData } from "../assets/books";

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
      <div className="bg-primary text-gray-200 w-full shadow-xl p-5 my-8">
        <div className="text-center font-fira font-medium text-2xl pb-5">
          <span className="mr-4">-</span>Featured Books
          <span className="ml-4">-</span>
        </div>

        <div className="grid grid-cols-5 place-items-center">
          {bookArr.map((n) => (
            <div key={n.title}>
              <div>
                <img src={`http://localhost:3000/` + n.imageLink} alt="" className="w-48"/>
              </div>
              <p>{n.title}</p>
              <p>{n.author}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedBooks;
