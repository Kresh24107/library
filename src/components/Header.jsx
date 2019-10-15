import React from "react";
import { connect } from "react-redux";

const Header = ({ books }) => {
  return (
    <header>
      <h1>Librarry!</h1>
      <p>Unique books {books.filter(book => book.quantity > 0).length}</p>
      <p>
        Total books {books.reduce((sum, current) => sum + +current.quantity, 0)}
      </p>
    </header>
  );
};

export default connect(state => ({
  books: state.books.filter(book =>
    book.title.toLowerCase().includes(state.filterBooks)
  )
}))(Header);
