import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
    <Navbar></Navbar>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export default App;
