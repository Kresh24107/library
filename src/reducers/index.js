import { combineReducers } from "redux";

import books from "./booksReducer";
import filterBooks from "./filterBooks";

export default combineReducers({
  books,
  filterBooks
});
