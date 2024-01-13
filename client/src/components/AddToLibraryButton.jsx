import axios from "axios";
import React from "react";
import { url } from "../helpers/url";
import { useCookies } from "react-cookie";
import { useBookContext } from "../BookContext";
import { useNavigate } from "react-router-dom";

const AddToLibraryButton = ({ bookData, inLib, setInLib }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const {mode} = useBookContext();
  const navigate = useNavigate();

  const addToLibrary = async () => {
    const response = await axios.post(url + `library` + bookData.id, bookData, {
      headers: {
        token: cookies.token,
      },
    });
    if (response.data.msg === "Added"){
        setInLib(true);
    }
  };

  return (
    <>
      {!inLib ? (
        <button
          className="rounded-lg bg-gray-400 text-white p-4 hover:bg-primary duration-150 text-base text-nowrap"
          onClick={mode === "logged-out" ? () => {navigate("/login")} :addToLibrary}
        >
          Add To Library
        </button>
      ) : (
        <div className="rounded-lg bg-gray-800 text-white p-4 hover:bg-primary duration-150 text-base text-nowrap">
          In Library
        </div>
      )}
    </>
  );
};

export default AddToLibraryButton;
