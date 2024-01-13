import React, { useEffect, useState } from "react";
import deleteIcon from "../assets/delete.png";
import { useCookies } from "react-cookie";
import { useBookContext } from "../BookContext";
import axios from "axios";
import { url } from "../helpers/url";

const Comment = ({ bookid, prevComments, setPrevComments }) => {
  const [deleteMsg, setDeleteMsg] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { mode } = useBookContext();

  const getComments = async () => {
    if(mode === "logged-in"){
        const response = await axios.get(url + "comment/auth/" + bookid, {
            headers: {
                token: cookies.token
            }
        });
        const allComments = response.data.comments;
        const userCommentId = response.data.userComments[0].comments;
        let del = allComments.map(c => ({...c, deletable: userCommentId.some(uc => uc === c._id)}));
        del = del.sort((a, b) => a.deletable === b.deletable ? 0 : a.deletable? 1 : -1);
        setPrevComments([...del]);
    }else{
        const response = await axios.get(url + "comment/" + bookid);
        setPrevComments([...response.data.comments])
    }
  };

  const deleteComment = async (commentId) => {
    const response = await axios.delete(url + "comment/" + commentId, {
      headers: {
        token: cookies.token,
      },
    });
    if (response.data !== "Not Authorized") {
      const filtered = prevComments.filter((c) => c._id !== commentId);
      setPrevComments([...filtered]);
    } else {
      setDeleteMsg("Not Authorized");
      setTimeout(() => {
        setDeleteMsg("");
      }, 2000);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      <div className="m-5 xs:mx-10 p-5 rounded-lg bg-gray-200 flex gap-3 flex-col-reverse font-bold w-11/12 items-stretch break-all">
        {prevComments.map((c) => {
          return (
            <div
              className="bg-gray-300 text-black rounded-lg px-4 py-2 relative"
              key={c._id}
            >
              {mode === "logged-in" && c.deletable && (
                <img
                  onClick={() => deleteComment(c._id)}
                  src={deleteIcon}
                  alt=""
                  className="absolute w-6 right-3 opacity-30 hover:opacity-75 duration-100"
                />
              )}
              <div>{c.comment}</div>
            </div>
          );
        })}
        {prevComments.length === 0 && (
          <div className="bg-gray-300 text-black rounded-lg px-4 py-2">
            {"No Comments Yet :("}
          </div>
        )}
        {deleteMsg !== "" && (
          <div className="text-end text-red-700">{deleteMsg}</div>
        )}
        <div className="font-bold text-lg">All Comments: </div>
      </div>
    </>
  );
};

export default Comment;
