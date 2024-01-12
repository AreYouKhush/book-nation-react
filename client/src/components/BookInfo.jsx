import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBookContext } from "../BookContext";
import Footer from "./Footer";
import axios from "axios";
import Search from "./Search";

const BookInfo = () => {
  const params = useParams();
  const { bookid } = params;
  const { books, setBooks } = useBookContext();
  const [bookData, setBookData] = useState({});

  function decodeHtmlEntities(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  }

  const getMoreInfo = () => {
    axios
      .get(`https://openlibrary.org/works/${bookid}.json`)
      .then((response) => {
        let description;
        let links = [];
        if (response.data.hasOwnProperty("description")) {
          description = response.data.description;
          description = decodeHtmlEntities(description);
        }
        if (response.data.hasOwnProperty("links")) {
          for (let i = 0; i < response.data.links.length; i++) {
            links.push(response.data.links[i].url);
          }
        }
        let moreInfo = {
          description: description,
          links: links,
        };
        setBookData((prev) => ({ ...prev, ...moreInfo }));
      });
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("books"))) {
      const newBooks = JSON.parse(localStorage.getItem("books"));
      const findBook = books.find((b) => b.id === `/works/${bookid}`);
      setBookData({ ...findBook });
      setBooks([...newBooks]);
    }
    getMoreInfo();
  }, []);

  return (
    <>
      <div className="mt-28 mx-10 flex flex-col justify-center items-center">
        <Search></Search>
        <div className="py-10">
          <div>
            <img className="h-96" src={bookData.coverURL} alt="" />
          </div>
          <div className="font-bold">{bookData.title}</div>
          <div>{bookData.authorName}</div>
          <div>{bookData.description}</div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default BookInfo;
