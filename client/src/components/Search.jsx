import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useBookContext } from "../BookContext";
import axios from "axios";

const Search = () => {
  const [search, setSearch] = useState("");
  const { books, setBooks, searching, setSearching } = useBookContext();

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
          totalRating: result.data.docs[i].ratings_average,
          ratingsByStars: {
            one: result.data.docs[i].ratings_count_1,
            two: result.data.docs[i].ratings_count_2,
            three: result.data.docs[i].ratings_count_3,
            four: result.data.docs[i].ratings_count_4,
            five: result.data.docs[i].ratings_count_5
          },
          characters: result.data.docs[i].person,
          editions: result.data.docs[i].edition_key
        });
      }
    }
    setBooks([...newBooks]);
    setSearching(false);
    localStorage.setItem("books", JSON.stringify(newBooks));
  };

  return (
    <>
      <div className="w-9/12 flex relative">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search a book"
          className="w-full px-10 py-4 rounded-full bg-gray-300 font-semibold text-primary shadow-md shadow-gray-300 focus:outline-none focus:shadow-lg"
        />
        <button
          className="absolute right-1 top-1 bg-primary text-white font-semibold px-6 py-3 rounded-full"
          onClick={searchBooks}
        >
          <NavLink to="/booksearch">Search</NavLink>
        </button>
      </div>
    </>
  );
};

export default Search;
