import axios from "axios";
import React from "react";
import { url } from "../helpers/url";
import { useCookies } from "react-cookie";
import { useBookContext } from "../BookContext";
import { NavLink, useNavigate } from "react-router-dom";
import arrowIcon from "../assets/arrows.png";

const AddToLibraryButton = ({ bookData, inLib, setInLib }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { mode } = useBookContext();
  const navigate = useNavigate();

  const addToLibrary = async () => {
    const response = await axios.post(url + `library` + bookData.id, bookData, {
      headers: {
        token: cookies.token,
      },
    });
    if (response.data.msg === "Added") {
      setInLib(true);
    }
    localStorage.removeItem("library");
  };

  const removeBook = async () => {
    const bookid = bookData.id.replace("/works", "");
    const res = await axios.delete(url + `library` + bookid, {
      headers: {
        token: cookies.token,
      },
    });
    setInLib(false);
    localStorage.removeItem("library");
  };

  return (
    <>
      {!inLib ? (
        <button
          className="rounded-lg bg-gray-400 text-white p-4 hover:bg-primary duration-150 text-base text-nowrap cursor-pointer"
          onClick={
            mode === "logged-out"
              ? () => {
                  navigate("/login");
                }
              : addToLibrary
          }
        >
          Add To Library
        </button>
      ) : (
        <div className="rounded-lg bg-secondary text-white p-4 hover:bg-primary duration-150 text-base text-nowrap cursor-pointer flex gap-1 items-center justify-center">
          <NavLink to={"/notes" + bookData.id}>Notes</NavLink>
          <div className="w-5">
            <img src={arrowIcon} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

export default AddToLibraryButton;
