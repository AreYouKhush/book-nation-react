import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import Search from "./Search";
import { url } from "../helpers/url";
import { useCookies } from "react-cookie";
import { useBookContext } from "../BookContext";
import ReadToggle from "./ReadToggle";
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit.png";

const BookInfo = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { mode } = useBookContext();
  const params = useParams();
  const { bookid } = params;
  const [bookData, setBookData] = useState({});
  const [inLib, setInLib] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [toggleMore, setToggleMore] = useState(false);
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
    if (findBook === -1) {
      const response = await axios.get(url + "book/works/" + bookid);
      setBookData({ ...response.data.book });
    } else {
      getMoreInfo();
    }
  };

  const postNote = async () => {
    if (title.trim() !== "" && description.trim !== "") {
      const response = await axios.post(
        url + "notes/" + bookid,
        { title: title, description: description },
        {
          headers: {
            token: cookies.token,
          },
        }
      );
      const newNotes = {
        _id: response.data._id,
        title: title,
        description: description,
      };
      setNotes((prev) => [...prev, newNotes]);
    }
    setTitle("");
    setDescription("");
  };

  const deletePost = async (id) => {
    await axios.delete(url + "notes/" + id, {
      headers: {
        token: cookies.token,
      },
    });
    const filtered = notes.filter((n) => n._id !== id);
    setNotes([...filtered]);
  };

  const getNotes = async () => {
    const response = await axios.get(url + "notes/" + bookid, {
      headers: {
        token: cookies.token,
      },
    });
    setNotes([...response.data.notes]);
  };

  const isInLibrary = async () => {
    try {
      const response = await axios.get(url + "library", {
        headers: {
          token: cookies.token,
        },
      });
      if (response.data.library.length !== 0) {
        const lib = response.data.library;
        const findBook = lib.findIndex((b) => b.id === "/works/" + bookid);
        if (findBook !== -1) {
          setInLib(true);
        }
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("books"))) {
      const newBooks = JSON.parse(localStorage.getItem("books"));
      books = [...newBooks];
      hasBook();
    }
    isInLibrary();
    getNotes();
  }, []);

  return (
    <>
      <div className="mt-28 flex flex-col justify-center items-center font-fira">
        <Search></Search>
        <div className="m-5 xs:m-10 p-5 rounded-lg bg-gray-200 flex sm:items-start gap-4 w-11/12 relative">
          <div className="w-2/6 flex flex-col items-center gap-2">
            <img className="w-40" src={bookData.coverURL} alt="" />
            <div className="flex gap-3 flex-row justify-center items-center sm:flex-col">
              {inLib && (
                <ReadToggle
                  inLib={inLib}
                  isRead={isRead}
                  setIsRead={setIsRead}
                  bookid={bookid}
                ></ReadToggle>
              )}
            </div>
          </div>
          <div className="max-w-4/6">
            <div className="font-bold text-xl sm:text-4xl break-all flex flex-row justify-between items-center">
              {bookData.title}
            </div>
            <div className="font-semibold text-base sm:text-xl break-all">
              {bookData.authorName}
            </div>
            <div className={toggleMore ? "h-fit" : "h-36 overflow-hidden"}>
              {bookData.description}
            </div>
          </div>
          {toggleMore ? (
            <button
              className="absolute bottom-2 right-2 font-semibold text-sm"
              onClick={() => setToggleMore(false)}
            >
              See Less...
            </button>
          ) : (
            <button
              className="absolute bottom-2 right-2 font-semibold text-sm"
              onClick={() => setToggleMore(true)}
            >
              See More...
            </button>
          )}
        </div>
        <div className="xs:mx-10 p-5 rounded-lg bg-gray-200 flex gap-10 flex-col font-bold w-11/12 ">
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <input
                type="text"
                name=""
                id=""
                placeholder="Title"
                className="outline-none px-3 flex-1 rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                className="bg-black text-white rounded-lg px-5 py-3"
                onClick={postNote}
              >
                Add
              </button>
            </div>
            <div className="flex">
              <textarea
                type=""
                name=""
                id=""
                placeholder="Description"
                className="outline-none px-3 flex-1 py-2 min-h-20 rounded-lg max-h-56"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="m-5 xs:m-10 p-5 rounded-lg bg-gray-200 flex gap-10 flex-col font-bold w-11/12 ">
          <div>
            <div>
              <div className="text-center text-xl">Notes</div>
              <hr className="border-black" />
            </div>
            {notes.length === 0 ? (
              <div className="flex justify-center items-center h-52">
                <div className="bg-black rounded-full px-5 py-3 text-white">
                  No notes yet!!
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6 mt-3">
                {notes.map((n, key) => {
                  return (
                    <div
                      key={key}
                      className="rounded-lg bg-gray-300 p-3 relative"
                    >
                      <div>
                        <div className="text-xl break-all w-10/12">
                          {n.title}
                        </div>
                      </div>
                      <hr className="border-gray-400 my-3" />
                      <div>{n.description}</div>
                      <div
                        className="absolute top-2 right-2 w-5 opacity-50 hover:opacity-75"
                        onClick={() => {
                          deletePost(n._id);
                        }}
                      >
                        <img src={deleteIcon} alt="" />
                      </div>
                      <div className="absolute top-2 right-7 w-5 opacity-50 hover:opacity-75">
                        <img src={editIcon} alt="" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default BookInfo;
