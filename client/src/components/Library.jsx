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
  const { mode } = useBookContext();
  const [lib, setLib] = useState();

  const getLib = async () => {
    const response = await axios.get(url + "library", {
      headers: {
        token: cookies.token,
      },
    });
    setLib([...response.data.library]);
  };

  useEffect(() => {
    getLib();
  }, []);

  return (
    <>
      <div className="mt-24 font-fira">
        <div className="xs:px-10 px-3 flex flex-col gap-5 ">
          <div className="flex gap-4 sm:items-center sm:flex-row flex-col-reverse">
            <div className="flex gap-2 xs:gap-4 items-center justify-center">
              <div className="rounded-full text-sm xs:text-base px-5 py-3 bg-gray-300 shadow-md hover:shadow-lg shadow-neutral-300 cursor-pointer hover:bg-gray-500 duration-150 font-semibold hover:text-white">
                Books To Read
              </div>
              <div className="rounded-full text-sm xs:text-base px-5 py-3 bg-gray-300 shadow-md hover:shadow-lg shadow-neutral-300 cursor-pointer hover:bg-gray-500 duration-150 font-semibold hover:text-white">
                Books You've Finished
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <Search></Search>
            </div>
          </div>
          {lib?.length === 0 ? (
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
              <div className="px-2 sm:px-10 flex justify-center flex-col items-center bg-gray-200 rounded-md p-3 w-fit">
                <div className="w-full">
                  <div className=" text-black font-bold text-xl text-center">
                    My Library
                  </div>
                  <hr className="border-black w-full" />
                </div>
                <div className="grid grid-cols-2 items-center place-items-center sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-10">
                  {lib?.map((b, key) => {
                    return (
                      <NavLink to={`/bookinfo` + b.id} key={key}>
                        <div className="max-w-56 cursor-pointer">
                          <div>
                            <img
                              src={b.coverURL}
                              alt=""
                              className="aspect-square h-60 sm:h-80 object-contain"
                            />
                          </div>
                          <div className="font-bold">{b.title}</div>
                          <div>{b.authorName}</div>
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
