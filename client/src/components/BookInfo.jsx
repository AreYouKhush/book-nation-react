import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import Search from "./Search";
import OneStarImg from "../assets/ratings/rating-10.png";
import TwoStarImg from "../assets/ratings/rating-20.png";
import ThreeStarImg from "../assets/ratings/rating-30.png";
import FourStarImg from "../assets/ratings/rating-40.png";
import FiveStarImg from "../assets/ratings/rating-50.png";
import deleteIcon from "../assets/delete.png"
import { url } from "../helpers/url";
import { useCookies } from "react-cookie";

const BookInfo = () => {
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const params = useParams();
  const { bookid } = params;
  const [bookData, setBookData] = useState({});
  const [comment, setComment] = useState("");
  const [prevComments, setPrevComments] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState("");
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

  const postComment = async () => {
    if(comment.trim() !== ""){
        const response = await axios.post(url + "comment/" + bookid, {comment}, {
            headers: {
                token: cookies.token
            }
        })
        const newComment = {
            _id: response.data._id,
            comment: comment
        }
        console.log(newComment)
        setPrevComments(prev => [...prev, newComment])
    }
    setComment("");
  }

  const getComments = async () => {
    const response = await axios.get(url + "comment/" + bookid);
    setPrevComments([...response.data.comments]);
  }

  const deleteComment = async (commentId) => {
    const response = await axios.delete(url + "comment/" + commentId, {
        headers: {
            token: cookies.token
        }
    })
    if(response.data !== "Not Authorized"){
        const filtered = prevComments.filter((c) => c._id !== commentId);
        setPrevComments([...filtered]);
    }else{
        setDeleteMsg("Not Authorized");
        setTimeout(() => {
            setDeleteMsg("");
        }, 2000);
    }
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("books"))) {
      const newBooks = JSON.parse(localStorage.getItem("books"));
      books = [...newBooks];
    }
    getMoreInfo();
    getComments();
  }, []);

  return (
    <>
      <div className="mt-28 flex flex-col justify-center items-center font-fira">
        <Search></Search>
        <div className="m-5 xs:m-10 p-5 rounded-lg bg-gray-200 flex flex-col items-center sm:items-start sm:flex-row gap-9 w-11/12">
          <div className="w-2/6 flex flex-col items-center gap-2">
            <img className="max-w-64 max-h-80" src={bookData.coverURL} alt="" />
            <button className="rounded-lg bg-gray-400 text-white p-4 hover:bg-primary duration-150 text-base text-nowrap">
              Add To Library
            </button>
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
                <div>{bookData?.ratingsByStars?.one}</div>
                <img src={TwoStarImg} alt="" />
                <div>{bookData?.ratingsByStars?.two}</div>
                <img src={ThreeStarImg} alt="" />
                <div>{bookData?.ratingsByStars?.three}</div>
                <img src={FourStarImg} alt="" />
                <div>{bookData?.ratingsByStars?.four}</div>
                <img src={FiveStarImg} alt="" />
                <div>{bookData?.ratingsByStars?.five}</div>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:w-4/6">
            <div className="text-2xl">Comments:</div>
            <div className="flex gap-3">
                <input type="text" value={comment} onChange={(e) => {setComment(e.target.value)}} className="rounded-full px-5 py-2 w-full" placeholder="Write a review"/>
                <button className="rounded-full px-5 py-2 bg-black text-white" onClick={postComment}>Post</button>
            </div>
          </div>
        </div>
        <div className="m-5 xs:mx-10 p-5 rounded-lg bg-gray-200 flex gap-3 flex-col-reverse font-bold w-11/12 items-stretch break-all">
            {prevComments.map((c) => {
                return <div className="bg-gray-400 text-black rounded-lg px-4 py-2 relative" key={c._id}>
                    <img onClick={() => deleteComment(c._id)} src={deleteIcon} alt="" className="absolute w-6 right-3"/>
                    <div>{c.comment}</div>
                </div>
            })}
            {prevComments.length === 0 && (<div>
                {"No Comments Yet :("}
            </div>)}
            {deleteMsg !== "" && <div className="text-end text-red-700">{deleteMsg}</div>}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default BookInfo;
