import {
  ADD_EXPENSE,
  SET_EXPENSES,
  DELETE_EXPENSE,
  SET_LOADING,
  SET_ERROR,
} from "./actionTypes";

const initialState = {
  expenses: [],
  loading: true,
  error: null,
  lastSyncTime:localStorage.getItem("lastSyncTime") || new Date(0).toISOString(),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
        loading: false,
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense._id !== action.payload
        ),
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
