import React from "react";
import { connect } from "react-redux";
import { getBooks, addBook } from "./store";

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correctInput: true,
      title: "Title",
      author: "Vadim",
      year: 2019,
      genre: "code",
      quantity: 1
    };
    this.updateInputValue = this.updateInputValue.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(e) {
    e.preventDefault();
    const { title, author, quantity } = this.state;
    if (title && author && quantity >= 1) {
      this.props.addBook(this.state);
      this.setState(() => ({
        correctInput: true,
        title: "",
        author: "",
        year: 2000,
        genre: "",
        quantity: 1
      }));
    } else {
      this.setState(state => ({ ...state, correctInput: false }));
    }
  }

  render() {
    return (
      <>
        <form>
          <label>
            Title{" "}
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.updateInputValue}
              style={this.state.correctInput ? {} : { borderColor: "red" }}
            />
          </label>
          <label>
            Author{" "}
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.updateInputValue}
              style={this.state.correctInput ? {} : { borderColor: "red" }}
            />
          </label>
          <label>
            Year{" "}
            <input
              type="number"
              name="year"
              value={this.state.year}
              onChange={this.updateInputValue}
            />
          </label>
          <label>
            Genre{" "}
            <input
              type="text"
              name="genre"
              value={this.state.genre}
              onChange={this.updateInputValue}
            />
          </label>
          <label>
            Quantity{" "}
            <input
              type="number"
              name="quantity"
              value={this.state.quantity}
              onChange={this.updateInputValue}
              style={this.state.correctInput ? {} : { borderColor: "red" }}
            />
          </label>
          <button onClick={e => this.handleClick(e)}>Add Book!</button>
        </form>
      </>
    );
  }
}

const getData = state => ({ books: getBooks(state) });

export default connect(
  getData,
  { addBook }
)(AddForm);
