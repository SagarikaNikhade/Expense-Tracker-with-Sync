import {
  EXPENSE_REQUEST,
  EXPENSE_FAILURE,
  GET_EXPENSES,
  DELETE_EXPENSE_REQUEST,
  DELETE_EXPENSE_SUCCESS,
  DELETE_EXPENSE_FAILURE,
  ADD_EXPENSE_SUCCESS,
  ADD_EXPENSE_FAILURE,
  ADD_EXPENSE_REQUEST,
} from "./actionTypes";

const initialState = {
  expenses: [],
  isLoading: false,
  isError: false,
  deletingId: null,
  lastSyncTime:
    localStorage.getItem("lastSyncTime") || new Date(0).toISOString(),
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPENSE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_EXPENSES:
      return { ...state, isLoading: false, expenses: action.payload };
    case EXPENSE_FAILURE:
      return { ...state, isLoading: false, isError: true };
    case DELETE_EXPENSE_REQUEST:
      return { ...state, deletingId: action.payload };
    case DELETE_EXPENSE_SUCCESS:
      return {
        ...state,
        deletingId: null,
        expenses: state.expenses.map((exp) =>
      exp._id === action.payload ? { ...exp, isDeleted: true } : exp
    ),
        // expenses: state.expenses.filter((exp) => exp._id !== action.payload),
      };

    case DELETE_EXPENSE_FAILURE:
      return { ...state, deletingId: null, isError: true };
    case ADD_EXPENSE_REQUEST:
      return { ...state, isLoading: true };
    case ADD_EXPENSE_SUCCESS:
          return { ...state, isLoading: false};  
    case ADD_EXPENSE_FAILURE:
          return { ...state, isLoading: false, isError: true};      
    default:
      return state;
  }
};
