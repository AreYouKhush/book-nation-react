import React, { useState } from "react";
import { motion } from "framer-motion";
import SearchIcon from "../assets/search.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useBookContext } from "../BookContext";
import { useCookies } from "react-cookie";
import axios from "axios";

const DropDown = ({ animate, setLogoutModal }) => {
  const { mode, setMode, books, setBooks, searching, setSearching } =
    useBookContext();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchBooks = async () => {
    setSearching(true);
    setBooks([]);
    const newBooks = [];
    const result = await axios.get(
      `https://openlibrary.org/search.json?q=${search}`
    );
    let authorName;
    let authorNameProperty = "author_name";
    let coverIdProperty = "cover_i";
    let coverId;
    for (let i = 0; i < Math.min(result.data.docs.length, 20); i++) {
      if (result.data.docs[i].hasOwnProperty(authorNameProperty)) {
        authorName = result.data.docs[i].author_name[0];
      } else {
        authorName = "Unknown";
      }

      if (result.data.docs[i].hasOwnProperty(coverIdProperty)) {
        let c = result.data.docs[i].cover_i;
        coverId = `https://covers.openlibrary.org/b/id/${c}-L.jpg`;

        newBooks.push({
          id: result.data.docs[i].key,
          coverURL: coverId,
          title: result.data.docs[i].title,
          publishYear: result.data.docs[i].first_publish_year,
          authorName: authorName,
        });
      }
    }
    setBooks([...newBooks]);
    setSearching(false);
    navigate("/booksearch");
  };

  return (
    <>
      <motion.div
        animate={animate}
        className={
          mode === "logged-out"
            ? "fixed w-9/12 xs:w-5/12 z-20 right-0 top-20 bottom-0 bg-primary flex flex-col justify-start font-fira items-center"
            : "fixed w-9/12 xs:w-5/12 z-20 right-0 top-20 bottom-0 bg-primary flex flex-col justify-between font-fira items-center"
        }
      >
        {mode === "logged-out" ? (
          <>
            <div className="flex flex-col gap-3 justify-center items-center">
              <div className="relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="bg-gray-300 m-2 rounded-full p-3 shadow-lg shadow-black text-black font-semibold"
                  placeholder="Search a Book"
                />
                <button onClick={searchBooks}>
                  <img
                    src={SearchIcon}
                    alt=""
                    className="absolute h-10 right-3 top-3"
                    onClick={searchBooks}
                  />
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col m-5 gap-3 items-center">
              <button className="font-bold bg-secondary rounded-full px-5 py-3 text-center w-32">
                <NavLink to="login">Login</NavLink>
              </button>
              <button className="font-bold bg-secondary rounded-full px-5 py-3 text-center w-32">
                <NavLink to="register">Register</NavLink>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-3 justify-center items-center">
              <div className="relative">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="bg-gray-300 m-2 rounded-full p-3 shadow-lg shadow-black text-black font-semibold"
                  placeholder="Search a Book"
                />
                <button onClick={searchBooks}>
                  <img
                    src={SearchIcon}
                    alt=""
                    className="absolute h-10 right-3 top-3"
                    onClick={searchBooks}
                  />
                </button>
              </div>
              <button className="rounded-full bg-gray-300 text-primary font-bold w-9/12 px-5 py-3">
                <NavLink to="/">Home</NavLink>
              </button>
              <button className="rounded-full bg-gray-300 text-primary font-bold w-9/12 px-5 py-3">
                <NavLink to="topbooks">Top Books</NavLink>
              </button>
              <button className="rounded-full bg-gray-300 text-primary font-bold w-9/12 px-5 py-3">
                <NavLink to="library">Library</NavLink>
              </button>
              <button className="rounded-full bg-gray-300 text-primary font-bold w-9/12 px-5 py-3">
                <NavLink to="notes">Notes</NavLink>
              </button>
            </div>
            <div className="w-full flex justify-center">
              <button
                onClick={() => setLogoutModal(true)}
                className="m-5 font-bold bg-secondary rounded-full px-5 py-3 text-center opacity-100 hover:bg-red-500 w-32"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default DropDown;
