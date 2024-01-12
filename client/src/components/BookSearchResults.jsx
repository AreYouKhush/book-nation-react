import React, { useEffect} from "react";
import { useBookContext } from "../BookContext";
import Search from "./Search";
import PacmanLoader from "react-spinners/PacmanLoader";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";

const BookSearchResults = () => {
  const { books, setBooks, searching, setSearching } = useBookContext();

  useEffect(()=> {
    if(JSON.parse(localStorage.getItem("books"))){
      if(JSON.parse(localStorage.getItem("books")).length !== 0){
        const newBooks = JSON.parse(localStorage.getItem("books"))
        setBooks([...newBooks]);
        setSearching(false);
      }else{
        setSearching(true);
      }
    }
  }, [])

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
        ) : (
          <div className="grid grid-cols-2 items-center place-items-center sm:grid-cols-3 md:grid-cols-4 gap-10 py-10">
            {books.map((b, key) => {
              return (
                <NavLink to={`/bookinfo`+ b.id } key={key}>
                <div className="max-w-56 cursor-pointer">
                  <div>
                    <img src={b.coverURL} alt="" className="" />
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
