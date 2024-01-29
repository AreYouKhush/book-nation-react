import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Search from "./Search";
import { url } from "../helpers/url";
import { useCookies } from "react-cookie";
import { useBookContext } from "../BookContext";
import deleteIcon from "../assets/delete_3807871.png";
import GridLoader from "react-spinners/GridLoader";

const Library = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const { mode, setMenuState } = useBookContext();
  const [lib, setLib] = useState();
  const [temp, setTemp] = useState();
  const [toDelete, setToDelete] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const deleteFromLib = (id) => {
    const findBook = lib.find((l) => l.id === id);
    let modLib;
    if (findBook.selected === false) {
      modLib = lib.map((l) => {
        return {
          ...l,
          selected: l.selected || id === l.id,
        };
      });
      setToDelete((prev) => [...prev, id]);
    } else {
      modLib = lib.map((l) => ({
        ...l,
        selected: l.id === id ? false : l.selected,
      }));
      const filtered = toDelete.filter((t) => t !== id);
      setToDelete([...filtered]);
    }
    setLib([...modLib]);
  };

  const saveDeleteChanges = async () => {
    try {
      await axios.post(
        url + "library/delete",
        { bookArr: toDelete },
        {
          headers: { token: cookies.token },
        }
      );
      const filter = lib.filter((l) => !toDelete.some((t) => t === l.id));
      setLib([...filter]);
    } catch (err) {}
  };

  const getLib = async () => {
    const response = await axios.get(url + "library", {
      headers: {
        token: cookies.token,
      },
    });
    const libRecieved = response.data.library;
    const bookStats = response.data.bookStats;
    try {
      const modLib = libRecieved.map((l) => ({
        ...l,
        read: bookStats.some((bs) => {
          if (l.id === bs.bookid) {
            return bs.read;
          }
        }),
        selected: false,
      }));
      setLib([...modLib]);
      setTemp([...modLib]);
      setLoading(false);
    } catch (err) {}
  };

  const toRead = () => {
    try {
      const filtered = temp.filter((t) => t.read === false);
      setLib([...filtered]);
    } catch (err) {}
    // del = del.sort((a, b) => a.deletable === b.deletable ? 0 : a.deletable? 1 : -1);
  };

  const alreadyRead = () => {
    try {
      const filtered = temp.filter((t) => t.read === true);
      setLib([...filtered]);
    } catch (err) {}
  };

  const allBooks = () => {
    try {
      setLib([...temp]);
    } catch (err) {}
  };

  useEffect(() => {
    getLib();
    setMenuState(false);
    // console.log(lib);
  }, []);

  return (
    <>
      <div className="mt-24 font-fira">
        <div className="xs:px-10 px-3 flex flex-col gap-5 ">
          <div className="flex gap-4 sm:items-center sm:flex-row flex-col-reverse">
            <div className="flex gap-2 xs:gap-4 items-center justify-center">
              <div
                className="rounded-full text-sm xs:text-base px-5 py-3 bg-gray-300 shadow-md hover:shadow-lg shadow-neutral-300 cursor-pointer hover:bg-gray-500 duration-150 font-semibold hover:text-white active:bg-black"
                onClick={allBooks}
              >
                All
              </div>
              <div
                className="rounded-full text-sm xs:text-base px-5 py-3 bg-gray-300 shadow-md hover:shadow-lg shadow-neutral-300 cursor-pointer hover:bg-gray-500 duration-150 font-semibold hover:text-white"
                onClick={toRead}
              >
                To Read
              </div>
              <div
                className="rounded-full text-sm xs:text-base px-5 py-3 bg-gray-300 shadow-md hover:shadow-lg shadow-neutral-300 cursor-pointer hover:bg-gray-500 duration-150 font-semibold hover:text-white"
                onClick={alreadyRead}
              >
                Already Read
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <Search></Search>
            </div>
          </div>
          {lib?.length === 0 || mode === "logged-out" ? (
            <div className="h-96 flex justify-center items-center bg-slate-100 rounded-lg shadow-md relative">
              <div className="absolute text-black font-bold text-xl top-3 w-11/12 text-center">
                Your Library
                <hr className="border-black mt-2" />
              </div>
              <NavLink
                to="/topbooks"
                className="bg-black text-white px-10 py-3 text-xl rounded-full font-semibold shadow-md shadow-gray-400 hover:bg-gray-800 duration-150"
              >
                Add Books
              </NavLink>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="px-2 sm:px-10 flex justify-center flex-col items-center bg-gray-200 rounded-md p-3 w-fit relative">
                <div className="w-full">
                  <div className=" text-black font-bold text-xl text-center">
                    My Library
                  </div>
                  <hr className="border-black w-full pb-3 sm:pb-0 lg:pb-3" />
                </div>
                {loading ? (
                  <div>
                    <GridLoader color="black" size={90} />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 items-center place-items-center sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-10">
                    {lib?.map((b, key) => {
                      return (
                        <div
                          key={key}
                          className={
                            b.selected
                              ? "max-w-56 cursor-pointer opacity-50"
                              : "max-w-56 cursor-pointer"
                          }
                        >
                          <NavLink to={`/bookinfo` + b.id}>
                            <div>
                              <img
                                src={b.coverURL}
                                alt=""
                                className="aspect-square h-60 sm:h-80 object-contain"
                              />
                            </div>
                          </NavLink>
                          {deleteMode && (
                            <div
                              className="my-2 flex justify-between bg-gray-500 items-center text-white font-bold p-2 rounded-full hover:bg-opacity-80 shadow-md hover:shadow-lg active:shadow-md"
                              onClick={() => {
                                deleteFromLib(b.id);
                              }}
                            >
                              <div className="px-5">Remove</div>
                              <div className="w-8">
                                <img src={deleteIcon} alt="" />
                              </div>
                            </div>
                          )}
                          <div className="h-5 font-bold overflow-hidden max-w-56 break-all">
                            {b.title}
                          </div>
                          <div className="h-5 overflow-hidden max-w-56 break-all">
                            {b.authorName}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {deleteMode ? (
                  <div
                    className="bg-gray-400 absolute top-1 right-1 font-bold px-2 py-1 rounded-md text-white cursor-pointer hover:bg-primary duration-150"
                    onClick={() => {
                      setDeleteMode(false);
                      saveDeleteChanges();
                    }}
                  >
                    Save
                  </div>
                ) : (
                  <div
                    className="bg-gray-400 absolute top-1 right-1 font-bold px-2 py-1 rounded-md text-white cursor-pointer hover:bg-primary duration-150"
                    onClick={() => setDeleteMode(true)}
                  >
                    Edit
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Library;
