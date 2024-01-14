import axios from "axios";
import React, { useEffect } from "react";
import { url } from "../helpers/url";
import { useCookies } from "react-cookie";
import CheckedIcon from "../assets/checked.png";

const ReadToggle = ({ isRead, setIsRead, bookid }) => {
  const [cookies, setCookie, removeCookies] = useCookies(["token"]);

  const getBookData = async () => {
    const response = await axios.get(url + "book/read/" + bookid, {
      headers: {
        token: cookies.token,
      },
    });
    localStorage.setItem("library", JSON.stringify(response.data.library));
    checkIfRead();
  };

  const checkIfRead = () => {
    const LibBooks = JSON.parse(localStorage.getItem("library"));
    const { read } = LibBooks.find((l) => l.bookid === bookid);
    setIsRead(read);
  };

  const makeItRead = async () => {
    await axios.post(
      url + "book/read/" + bookid,
      {
        isRead: isRead,
      },
      {
        headers: {
          token: cookies.token,
        },
      }
    );
    getBookData();
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("library"))) {
      checkIfRead();
    } else {
      getBookData();
    }
  }, []);

  return (
    <>
      {isRead ? (
        <div
          className="rounded-lg bg-secondary text-white p-4 duration-150 text-base text-nowrap flex gap-2 justify-center items-center cursor-pointer hover:bg-red-700"
          onClick={makeItRead}
        >
          <div>Read</div>
          <div className="w-6">
            <img src={CheckedIcon} alt="" />
          </div>
        </div>
      ) : (
        <div
          className="rounded-lg bg-gray-400 text-white p-4 hover:bg-primary duration-150 text-base text-nowrap cursor-pointer"
          onClick={makeItRead}
        >
          Already Read?
        </div>
      )}
    </>
  );
};

export default ReadToggle;
