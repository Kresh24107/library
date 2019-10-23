import React from "react";
import { connect } from "react-redux";

const Book = ({
  book,
  onGiveBook,
  onTakeBook,
  onEditBook,
  onDeleteBook,
  onSaveBook,
  onCansel
}) => {
  const { id, title, author, year, ganre, quantity, editNow } = book;
  const saveBook = () => {
    const title = document.getElementById(`title-${id}`);
    const author = document.getElementById(`author-${id}`);
    const year = document.getElementById(`year-${id}`);
    const ganre = document.getElementById(`ganre-${id}`);
    const quantity = document.getElementById(`quantity-${id}`);

    const editedBook = {
      id,
      title: title.value,
      author: author.value,
      year: year.value,
      ganre: ganre.value,
      quantity: quantity.value,
      editNow: false
    };

    onSaveBook(editedBook);
  };

  return (
    <div
      style={{
        width: "220px",
        border: "1px solid black",
        padding: "5px",
        margin: "10px",
        display: "inline-block"
      }}
    >
      <div style={{ display: `${editNow ? "none" : "block"}` }}>
        <h2>{title}</h2>
        <p>{author}</p>
        <p>Genre: {ganre}</p>
        <p>{year}</p>
        <p>Quantity: {quantity}</p>
        <button onClick={() => onGiveBook(id)}>Give</button>
        <button disabled={quantity <= 0} onClick={() => onTakeBook(id)}>
          Take
        </button>
        <button onClick={() => onEditBook(id)}>Edit</button>
        <button onClick={() => onDeleteBook(id)}>Delete</button>
      </div>
      <div style={{ display: `${editNow ? "block" : "none"}` }}>
        <input type="text" defaultValue={title} id={`title-${id}`} />
        Title
        <input type="text" defaultValue={author} id={`author-${id}`} />
        Author
        <input type="number" defaultValue={year} id={`year-${id}`} />
        Year
        <input type="text" defaultValue={ganre} id={`ganre-${id}`} />
        Genre
        <input type="number" defaultValue={quantity} id={`quantity-${id}`} />
        Quantity
        <button onClick={saveBook}>Save</button>
        <button onClick={() => onCansel(id)}>Cansel</button>
      </div>
    </div>
  );
};

export default connect(
  state => ({ books: state.books }),
  dispatch => ({
    onGiveBook: id => dispatch({ type: "GIVE_BOOK", payload: id }),
    onTakeBook: id => dispatch({ type: "TAKE_BOOK", payload: id }),
    onEditBook: id => dispatch({ type: "EDIT_BOOK", payload: id }),
    onDeleteBook: id => dispatch({ type: "DELETE_BOOK", payload: id }),
    onSaveBook: editedBook =>
      dispatch({ type: "SAVE_BOOK", payload: editedBook }),
    onCansel: id => dispatch({ type: "CANSEL_SAVE", payload: id })
  })
)(Book);
