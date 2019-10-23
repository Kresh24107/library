import React from "react";
import { connect } from "react-redux";

import AddBookForm from "./AddBookForm";
import Book from "./Book";

const BookList = ({
  books,
  onFindBook,
  onSortByNews,
  onSortByTitles,
  onSortByAuthors,
  onSortByYears,
  onSortByGanres,
  onSortByQuantitys
}) => {
  const findBook = () => {
    const searchInput = document.getElementById("searchInput");
    onFindBook(searchInput.value);
  };

  return (
    <>
      <div>
        Search: <input type="text" id="searchInput" onChange={findBook} />
      </div>
      <div>Sort By:
        <button onClick={onSortByNews}>NEWS</button>
        <button onClick={onSortByTitles}>TITLES</button>
        <button onClick={onSortByAuthors}>AUTHORS</button>
        <button onClick={onSortByYears}>YEARS</button>
        <button onClick={onSortByGanres}>GANRES</button>
        <button onClick={onSortByQuantitys}>QUANTITYS</button>
      </div>
      <div>
        {books.map(book => (
          <Book key={book.id} book={book} />
        ))}
      </div>
      <AddBookForm />
    </>
  );
};

export default connect(
  state => ({
    books: state.books.filter(book =>
      book.title.toLowerCase().includes(state.filterBooks)
    )
  }),
  dispatch => ({
    onFindBook: str => {
      dispatch({ type: "FIND_BOOK", payload: str });
    },
    onSortByNews: () => dispatch({ type: "SORT_BY_ID" }),
    onSortByTitles: () => dispatch({ type: "SORT_BY_TITLE" }),
    onSortByAuthors: () => dispatch({ type: "SORT_BY_AUTHOR" }),
    onSortByYears: () => dispatch({ type: "SORT_BY_YEAR" }),
    onSortByGanres: () => dispatch({ type: "SORT_BY_GANRE" }),
    onSortByQuantitys: () => dispatch({ type: "SORT_BY_QUANTITY" })
  })
)(BookList);
