import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import Search from "./Search";
import OneStarImg from "../assets/ratings/rating-10.png";
import TwoStarImg from "../assets/ratings/rating-20.png";
import ThreeStarImg from "../assets/ratings/rating-30.png";
import FourStarImg from "../assets/ratings/rating-40.png";
import FiveStarImg from "../assets/ratings/rating-50.png";
import { url } from "../helpers/url";
import { useCookies } from "react-cookie";
import AddToLibraryButton from "./AddToLibraryButton";
import { useBookContext } from "../BookContext";
import Comment from "./Comment";

const BookInfo = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { mode } = useBookContext();
  const params = useParams();
  const { bookid } = params;
  const [bookData, setBookData] = useState({});
  const [comment, setComment] = useState("");
  const [inLib, setInLib] = useState(false);
  const [prevComments, setPrevComments] = useState([]);
  const navigate = useNavigate();

  let books = [];

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
          if (typeof response.data.description === "string") {
            description = response.data.description;
          } else {
            description = response.data.description.value;
          }
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
        const findBook = books.find((b) => b.id === `/works/${bookid}`);
        setBookData((prev) => ({ ...findBook, ...moreInfo }));
      });
  };

  const hasBook = async () => {
    const findBook = books.findIndex((b) => b.id === "/works/" + bookid);
    if(findBook === -1){
      const response = await axios.get(url + "book/works/" + bookid);
      setBookData({...response.data.book});
    }else{
      getMoreInfo();
    }
  };

  const postComment = async () => {
    if (comment.trim() !== "") {
      const response = await axios.post(
        url + "comment/" + bookid,
        { comment },
        {
          headers: {
            token: cookies.token,
          },
        }
      );
      const newComment = {
        _id: response.data._id,
        comment: comment,
        deletable: true,
      };
      setPrevComments((prev) => [...prev, newComment]);
    }
    setComment("");
  };

  const isInLibrary = async () => {
    const response = await axios.get(url + "library", {
      headers: {
        token: cookies.token,
      },
    });
    if (response.data.library.length !== 0) {
      const lib = response.data.library[0].library;
      const findBook = lib.findIndex((b) => b == bookid);
      console.log("Mai Andar hu");
      if (findBook !== -1) {
        setInLib(true);
      }
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("books"))) {
      const newBooks = JSON.parse(localStorage.getItem("books"));
      books = [...newBooks];
      hasBook();
    }
    if (mode === "logged-in") {
      isInLibrary();
    }
  }, []);

  return (
    <>
      <div className="mt-28 flex flex-col justify-center items-center font-fira">
        <Search></Search>
        <div className="m-5 xs:m-10 p-5 rounded-lg bg-gray-200 flex flex-col items-center sm:items-start sm:flex-row gap-9 w-11/12">
          <div className="w-2/6 flex flex-col items-center gap-2">
            <img className="max-w-64 max-h-80" src={bookData.coverURL} alt="" />
            <AddToLibraryButton
              bookData={bookData}
              inLib={inLib}
              setInLib={setInLib}
            ></AddToLibraryButton>
          </div>
          <div className="max-w-4/6">
            <div className="font-bold text-3xl sm:text-4xl break-all">
              {bookData.title}
            </div>
            <div className="font-semibold text-lg sm:text-xl break-all">
              {bookData.authorName}
            </div>
            <div className="text-base sm:text-lg break-all">
              {bookData.description}
            </div>
          </div>
        </div>
        <div className="m-5 xs:mx-10 p-5 rounded-lg bg-gray-200 flex gap-10 flex-col sm:flex-row font-bold w-11/12 sm:items-center">
          <div className="flex flex-col gap-4 sm:w-2/6">
            <div className="text-2xl">Ratings:</div>
            <div className="grid grid-cols-2 place-items-center place-content-center">
              <img src={OneStarImg} alt="" />
              <div>{bookData?.ratingsByStars?.one || 0}</div>
              <img src={TwoStarImg} alt="" />
              <div>{bookData?.ratingsByStars?.two || 0}</div>
              <img src={ThreeStarImg} alt="" />
              <div>{bookData?.ratingsByStars?.three || 0}</div>
              <img src={FourStarImg} alt="" />
              <div>{bookData?.ratingsByStars?.four || 0}</div>
              <img src={FiveStarImg} alt="" />
              <div>{bookData?.ratingsByStars?.five || 0}</div>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:w-4/6">
            <div className="text-2xl">Comment:</div>
            <div className="flex gap-3">
              <input
                type="text"
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                className="rounded-full px-5 py-2 w-full"
                placeholder="Write a review"
              />
              {mode === "logged-out" ? (
                <button
                  className="rounded-full px-5 py-2 bg-black text-white w-3/6 sm:w-2/6"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Sign In
                </button>
              ) : (
                <button
                  className="rounded-full px-5 py-2 bg-black text-white"
                  onClick={postComment}
                >
                  Post
                </button>
              )}
            </div>
          </div>
        </div>
        <Comment
          prevComments={prevComments}
          setPrevComments={setPrevComments}
          bookid={bookid}
        ></Comment>
      </div>
      <Footer></Footer>
    </>
  );
};

export default BookInfo;
