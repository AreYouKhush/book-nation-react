import { createContext, useContext, useState } from "react";

const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);

const AppBookContext = (props) => {
  const [books, setBooks] = useState([]);
  const [mode, setMode] = useState("logged-out");

  return (
    <BookContext.Provider value={{ books, setBooks, mode, setMode }}>
        {props.children}
    </BookContext.Provider>
  );
};

export default AppBookContext;