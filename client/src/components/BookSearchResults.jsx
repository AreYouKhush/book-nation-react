import React from "react";
import { useBookContext } from "../BookContext";
import Search from "./Search";
import PacmanLoader from "react-spinners/PacmanLoader";
import Footer from "./Footer";

const BookSearchResults = () => {
  const { books } = useBookContext();

  return (
    <>
      <div className="mt-24 font-fira px-10 flex justify-center flex-col items-center">
        <Search></Search>
        {books.length === 0 ? (
          <PacmanLoader
            color={"#000000"}
            loading={true}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
            className="my-32"
          />
        ) : (
          <div className="grid grid-cols-2 items-center place-items-center sm:grid-cols-3 md:grid-cols-4 gap-10 py-10">
            {books.map((b, key) => {
              return (
                <div key={key} className="w-56">
                  <div>
                    <img src={b.coverURL} alt="" className="" />
                  </div>
                  <div className="font-bold">{b.title}</div>
                  <div>{b.authorName}</div>
                </div>
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
