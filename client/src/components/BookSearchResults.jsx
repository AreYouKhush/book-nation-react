import React, { useEffect } from "react";
import { useBookContext } from "../BookContext";
import Search from "./Search";
import PacmanLoader from "react-spinners/PacmanLoader";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";

const BookSearchResults = () => {
  const { books, setBooks, searching, setSearching } = useBookContext();

  return (
    <>
      <div className="mt-24 font-fira px-2 sm:px-10 flex justify-center flex-col items-center">
        <Search></Search>
        {searching ? (
          <PacmanLoader
            color={"#000000"}
            loading={true}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="my-32"
          />
        ) : books.length === 0 ? (
          <div className="my-32 font-bold text-2xl">No Books!</div>
        ) : (
          <div className="grid grid-cols-2 items-center place-items-center sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-10 py-10">
            {books.map((b, key) => {
              return (
                <NavLink to={`/bookinfo` + b.id} key={key}>
                  <div className="max-w-56 cursor-pointer">
                    <div>
                      <img
                        src={b.coverURL}
                        alt=""
                        className="aspect-square h-80 object-contain"
                      />
                    </div>
                    <div className="font-bold">{b.title}</div>
                    <div>{b.authorName}</div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        )}
      </div>
      <Footer></Footer>
    </>
  );
};

export default BookSearchResults;
