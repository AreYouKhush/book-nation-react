import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useBookContext } from "../BookContext";
import axios from "axios";
import CircleLoader from "react-spinners/CircleLoader";

const Search = ({ searchInput }) => {
  const [search, setSearch] = useState("");
  const { books, setBooks, searching, setSearching } = useBookContext();
  const [bookSearching, setBookSearching] = useState(false);
  const navigate = useNavigate();
  let topBookName;

  const searchBooks = async () => {
    let temp = "";
    if (search !== "") {
      temp = search;
    } else if (topBookName !== undefined) {
      temp = topBookName;
    }
    if (temp.trim() !== "") {
      localStorage.removeItem("books");
      setSearching(true);
      setBookSearching(true);
      setBooks([]);
      const newBooks = [];
      const result = await axios.get(
        `https://openlibrary.org/search.json?q=${temp}`
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
            totalRating: result.data.docs[i].ratings_average,
            ratingsByStars: {
              one: result.data.docs[i].ratings_count_1,
              two: result.data.docs[i].ratings_count_2,
              three: result.data.docs[i].ratings_count_3,
              four: result.data.docs[i].ratings_count_4,
              five: result.data.docs[i].ratings_count_5,
            },
            characters: result.data.docs[i].person,
            editions: result.data.docs[i].edition_key,
          });
        }
      }
      setBooks([...newBooks]);
      setSearching(false);
      setBookSearching(false);
      localStorage.setItem("books", JSON.stringify(newBooks));
      topBookName = "";
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("books"))) {
      if (JSON.parse(localStorage.getItem("books")).length !== 0) {
        const newBooks = JSON.parse(localStorage.getItem("books"));
        setBooks([...newBooks]);
        setSearching(false);
      } else {
        setSearching(true);
      }
    }
  }, []);

  useEffect(() => {
    topBookName = searchInput;
    if (searchInput !== undefined && topBookName !== "") {
      searchBooks();
      navigate("/booksearch");
    }
  }, [searchInput]);

  return (
    <>
      <div className="w-10/12 flex relative">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search a book"
          className="w-full px-10 py-4 rounded-full bg-gray-300 font-semibold text-primary shadow-md shadow-gray-300 focus:outline-none focus:shadow-lg"
        />
        {bookSearching ? (
          <div className="absolute right-1 top-1 bg-primary text-white font-semibold px-6 py-3 rounded-full">
            <CircleLoader color={"#ffffff"} size={25} />
          </div>
        ) : (
          <button
            className="absolute right-1 top-1 bg-primary text-white font-semibold px-6 py-3 rounded-full"
            onClick={searchBooks}
          >
            <NavLink to="/booksearch">Search</NavLink>
          </button>
        )}
      </div>
    </>
  );
};

export default Search;
