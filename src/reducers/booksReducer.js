import books from "../books.js";

const booksReducer = (state = books, action) => {
  switch (action.type) {
    case "ADD_BOOK":
      return [...state, action.payload];
    case "GIVE_BOOK":
      return state.map(book =>
        book.id === action.payload
          ? { ...book, quantity: +book.quantity + 1 }
          : book
      );
    case "TAKE_BOOK":
      return state.map(book =>
        book.id === action.payload
          ? { ...book, quantity: book.quantity - 1 }
          : book
      );
    case "EDIT_BOOK":
      return state.map(book =>
        book.id === action.payload ? { ...book, editNow: true } : book
      );
    case "SAVE_BOOK":
      return state.map(book =>
        book.id === action.payload.id ? action.payload : book
      );
    case "CANSEL_SAVE":
      return state.map(book =>
        book.id === action.payload ? { ...book, editNow: false } : book
      );
    case "DELETE_BOOK":
      return state.filter(book => book.id !== action.payload);

    case "SORT_BY_ID":
      return [
        ...state.sort((obj1, obj2) => parseFloat(obj1.id) - parseFloat(obj2.id))
      ];
    case "SORT_BY_TITLE":
      return [
        ...state.sort((obj1, obj2) => obj1.title.localeCompare(obj2.title))
      ];
    case "SORT_BY_AUTHOR":
      return [
        ...state.sort((obj1, obj2) => obj1.author.localeCompare(obj2.author))
      ];
    case "SORT_BY_YEAR":
      return [
        ...state.sort(
          (obj1, obj2) => parseFloat(obj1.year) - parseFloat(obj2.year)
        )
      ];
    case "SORT_BY_GANRE":
      return [
        ...state.sort((obj1, obj2) => obj1.ganre.localeCompare(obj2.ganre))
      ];
    case "SORT_BY_QUANTITY":
      return [
        ...state.sort(
          (obj1, obj2) => parseFloat(obj1.quantity) - parseFloat(obj2.quantity)
        )
      ];

    default:
      return state;
  }
};

export default booksReducer;
