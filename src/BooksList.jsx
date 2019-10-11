import React from "react";
import { connect } from "react-redux";
import { getBooks } from "./store";
import Book from "./Book";

const BooksList = ({ books }) => {
  return (
    <div>
      {books.map(book => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  );
};

const getData = state => ({ books: getBooks(state) });

export default connect(getData)(BooksList);
