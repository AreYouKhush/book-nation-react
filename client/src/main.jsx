import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Library from "./components/Library.jsx";
import TopBooks from "./components/TopBooks.jsx";
import Register from "./components/Register.jsx";
import BookSearchResults from "./components/BookSearchResults.jsx";
import AppBookContext from "./BookContext.jsx";
import BookInfo from "./components/BookInfo.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route index element={<Home></Home>}></Route>
      <Route path="login" element={<Login></Login>}></Route>
      <Route path="register" element={<Register></Register>}></Route>
      <Route path="library" element={<Library></Library>}></Route>
      <Route path="topbooks" element={<TopBooks></TopBooks>}></Route>
      <Route path="booksearch" element={<BookSearchResults></BookSearchResults>}></Route>
      <Route path="bookinfo/works/:bookid" element={<BookInfo/>}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppBookContext>
    <RouterProvider router={router}></RouterProvider>
    </AppBookContext>
  </React.StrictMode>
);
