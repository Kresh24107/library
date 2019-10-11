import React from "react";
import { connect } from "react-redux";
import { getBooks, addBook, takeBook, giveBook } from "./store";

class Book extends React.Component {
  constructor(props) {
    super(props);
    const { title, author, year, genre, quantity, id } = this.props.book;
    this.state = {
      correctInput: true,
      editing: false,
      id,
      title,
      author,
      year,
      genre,
      quantity
    };
    this.updateInputValue = this.updateInputValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const e = event;
    e.preventDefault();
    const {
      correctInput,
      editing,
      id,
      title,
      author,
      year,
      genre,
      quantity
    } = this.state;

    console.log(
      correctInput,
      editing,
      id,
      title,
      author,
      year,
      genre,
      quantity
    );

    switch (e.target.name) {
      case "takeBook":
        this.setState(state => ({ ...state, quantity: state.quantity-- }));
        this.props.takeBook(1, id);
        break;
      case "giveBook":
        this.props.giveBook(1, id);
        break;
      case "editBook":
        this.setState(state => ({ ...state, editing: true }));
        break;
      case "saveBook":
        if (title && author && quantity >= 1) {
          this.props.addBook(this.state, id);
          this.setState(state => ({
            ...state,
            editing: false,
            correctInput: true
          }));
        } else {
          this.setState(state => ({ ...state, correctInput: false }));
        }
        break;
      case "deleteBook":
        break;
      default:
        break;
    }
  }

  updateInputValue(event) {
    const targetEl = event.target;
    switch (targetEl.name) {
      case "title":
        this.setState(state => ({ ...state, title: targetEl.value }));
        break;
      case "author":
        this.setState(state => ({ ...state, author: targetEl.value }));
        break;
      case "year":
        this.setState(state => ({ ...state, year: targetEl.value }));
        break;
      case "genre":
        this.setState(state => ({ ...state, genre: targetEl.value }));
        break;
      case "quantity":
        this.setState(state => ({ ...state, quantity: targetEl.value }));
        break;
      default:
        return this.state;
    }
  }

  render() {
    const {
      correctInput,
      editing,
      id,
      title,
      author,
      year,
      genre,
      quantity
    } = this.state;
    return (
      <>
        <div style={editing ? { display: "none" } : { display: "block" }}>
          <h2>{title}</h2>
          <p>{author}</p>
          <p>Amount: {quantity}</p>
          <button
            name="takeBook"
            onClick={this.handleClick}
            disabled={quantity <= 0}
          >
            Take
          </button>
          <button name="giveBook" onClick={this.handleClick}>
            Give
          </button>
          <button name="editBook" onClick={this.handleClick}>
            Edit
          </button>
          <button name="deleteBook" onClick={this.handleClick}>
            Delete
          </button>
        </div>
        <form style={editing ? { display: "block" } : { display: "none" }}>
          <label>
            Title{" "}
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.updateInputValue}
              style={correctInput ? {} : { borderColor: "red" }}
            />
          </label>
          <label>
            Author{" "}
            <input
              type="text"
              name="author"
              value={author}
              onChange={this.updateInputValue}
              style={correctInput ? {} : { borderColor: "red" }}
            />
          </label>
          <label>
            Year{" "}
            <input
              type="number"
              name="year"
              value={year}
              onChange={this.updateInputValue}
            />
          </label>
          <label>
            Genre{" "}
            <input
              type="text"
              name="genre"
              value={genre}
              onChange={this.updateInputValue}
            />
          </label>
          <label>
            Quantity{" "}
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={this.updateInputValue}
              style={correctInput ? {} : { borderColor: "red" }}
            />
          </label>
          <button name="saveBook" onClick={e => this.handleClick(e)}>
            Save
          </button>
        </form>
      </>
    );
  }
}

const getData = state => ({ books: getBooks(state) });

export default connect(
  getData,
  { addBook, takeBook, giveBook }
)(Book);
