import React from "react";
import { connect } from "react-redux";

const AddBookForm = ({ onAddBook }) => {
  const addBook = () => {
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const year = document.getElementById("year");
    const ganre = document.getElementById("ganre");
    const quantity = document.getElementById("quantity");

    const newBook = {
      title: title.value,
      author: author.value,
      year: year.value,
      ganre: ganre.value,
      quantity: quantity.value
    };

    onAddBook(newBook);
    title.value = "";
    author.value = "";
    year.value = "";
    ganre.value = "";
    quantity.value = "";
  };

  return (
    <div>
      <input type="text" id="title" />
      Title <br />
      <input type="text" id="author" />
      Author <br />
      <input type="number" id="year" />
      Year <br />
      <input type="text" id="ganre" />
      Genre <br />
      <input type="number" id="quantity" />
      Quantity <br />
      <button onClick={addBook}>Add Book!</button>
    </div>
  );
};

export default connect(
  state => ({ books: state.books }),
  dispatch => ({
    onAddBook: ({ title, author, year, genre, quantity }) => {
      const payload = {
        id: Date.now().toString(),
        title,
        author,
        year,
        genre,
        quantity
      };
      dispatch({ type: "ADD_BOOK", payload });
    }
  })
)(AddBookForm);
