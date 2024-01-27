import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Search from "./Search";
import { url } from "../helpers/url";
import { useCookies } from "react-cookie";
import { useBookContext } from "../BookContext";

const Library = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const { mode, setMenuState } = useBookContext();
  const [lib, setLib] = useState();

  const getLib = async () => {
    const response = await axios.get(url + "library", {
      headers: {
        token: cookies.token,
      },
    });
    const notesResponse = await axios.get(url + "notes/single/library", {
      headers: {
        token: cookies.token,
      },
    });
    const libRecieved = response.data.library;
    const bookStats = response.data.bookStats;
    try {
      let modLib = libRecieved.map((l) => ({
        ...l,
        read: bookStats.some((bs) => {
          if (l.id === bs.bookid) {
            return bs.read;
          }
        }),
      }));
      modLib = modLib.map((l) => ({
        ...l,
        note:
          notesResponse.data.notes.find(
            (nr) => "/works/" + nr.bookid === l.id
          ) || null,
      }));
      // del = del.sort((a, b) =>
      //   a.deletable === b.deletable ? 0 : a.deletable ? 1 : -1
      // );
      modLib = modLib.sort((a, b) => (a.note === null ? 1 : -1));
      setLib([...modLib]);
    } catch (err) {}
  };

  useEffect(() => {
    getLib();
    setMenuState(false);
  }, []);

  return (
    <>
      <div className="mt-24 font-fira">
        <div className="xs:px-10 px-3 flex flex-col gap-5 ">
          <div className="flex gap-4 sm:items-center sm:flex-row flex-col-reverse">
            {/* Can Add Filters Here */}
            <div className="flex-1 flex justify-center">
              <Search></Search>
            </div>
          </div>
          {lib?.length === 0 || mode === "logged-out" ? (
            <div className="h-96 flex justify-center items-center bg-slate-100 rounded-lg shadow-md relative">
              <div className="absolute text-black font-bold text-xl top-3 w-11/12 text-center">
                Your Notes
                <hr className="border-black mt-2" />
              </div>
              <NavLink
                to="/topbooks"
                className="bg-black text-white px-10 py-3 text-xl rounded-full font-semibold shadow-md shadow-gray-400 hover:bg-gray-800 duration-150"
              >
                Add Notes
              </NavLink>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="px-2 sm:px-10 flex justify-center flex-col items-center bg-gray-200 rounded-md p-3 w-fit">
                <div className="w-full">
                  <div className=" text-black font-bold text-xl text-center">
                    My Notes
                  </div>
                  <hr className="border-black w-full pb-3 mb-3 sm:pb-0 lg:pb-3" />
                </div>
                <div className="flex flex-col gap-5 sm:gap-10 md:grid md:grid-cols-2 lg:grid-cols-3">
                  {lib?.map((b, key) => {
                    return (
                      <NavLink
                        to={`/notes` + b.id}
                        key={key}
                        className="relative"
                      >
                        <div className="flex cursor-pointer gap-2 bg-gray-300 p-2 rounded-lg hover:bg-gray-400 duration-150 h-44 max-h-52">
                          <div className="flex items-center lg:w-2/5">
                            <img
                              src={b.coverURL}
                              alt=""
                              className="w-24 object-contain"
                            />
                          </div>
                          <div className="lg:w-3/5 overflow-hidden">
                            <div className="font-bold w-56">{b.title}</div>
                            <hr className="border-black"/>
                            <div className="overflow-hidden pt-2">
                              {b.note ? (
                                <div className="max-w-56">
                                  <div className="font-semibold text-sm">{b.note.title}</div>
                                  <hr />
                                  <div className="text-sm">{b.note.description}</div>
                                </div>
                              ) : (
                                <div className="text-sm">No Notes to Preview</div>
                              )}
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 text-xs font-semibold bg-primary text-white px-3 py-1 rounded-full cursor-pointer">
                            {b.note ? "Show more ->" : "Add Note ->"}
                          </div>
                        </div>
                      </NavLink>
                    );
                  })}
                </div>
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
