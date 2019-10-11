// action types
import { createStore } from "redux";
import books from "./books";

const TAKE_BOOK = "TAKE_BOOK";
const GIVE_BOOK = "GIVE_BOOK";
const ADD_BOOK = "ADD_BOOK";

// action creators
export const takeBook = (value, id) => ({ type: TAKE_BOOK, value, id });
export const giveBook = (value, id) => ({ type: GIVE_BOOK, value, id });
export const addBook = (book, id) => ({ type: ADD_BOOK, book, id });

// selectors
export const getBooks = state => state.books;

const reducer = (state, action) => {
  switch (action.type) {
    case TAKE_BOOK:
      return {
        ...state,
        books: state.books.map(book => {
          if (book.id === action.id) {
            return { ...book, quantity: book.quantity - action.value };
          }
          return book;
        })
      };
    case GIVE_BOOK:
      return {
        ...state,
        books: state.books.map(book => {
          if (book.id === action.id) {
            return { ...book, quantity: book.quantity + action.value };
          }
          return book;
        })
      };
    case ADD_BOOK:
      const { title, author, year, genre, quantity } = action.book;
      const { id = state.books.length + 1 } = action.id;
      return {
        ...state,
        books: [...state.books, { id, title, author, year, genre, quantity }]
      };
    default:
      return state;
  }
};

const store = createStore(reducer, { books });
export default store;
