import React from "react";
import { connect } from "react-redux";
import { getBooks } from "./store";

const Header = ({ books }) => (
  <>
    <h1>Library</h1>
    <p>
      Unique books {books.filter(book => book.quantity > 0).length}; Total{" "}
      {books.reduce((sum, current) => sum + current.quantity, 0)}
    </p>
  </>
);

const getData = state => ({ books: getBooks(state) });

export default connect(getData)(Header);
