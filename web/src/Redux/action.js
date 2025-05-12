import {
  EXPENSE_REQUEST,
    EXPENSE_FAILURE,
  ADD_EXPENSE_FAILURE,
    ADD_EXPENSE_SUCCESS,
  ADD_EXPENSE_REQUEST,
  GET_EXPENSES,
   DELETE_EXPENSE_REQUEST,
  DELETE_EXPENSE_SUCCESS,
  DELETE_EXPENSE_FAILURE,
} from "./actionTypes";
import axios from "axios";

const API_URL = 'http://localhost:8080';

export const getExpenses = (lastSyncTime) => (dispatch) =>{
   dispatch({ type: EXPENSE_REQUEST });
    axios
        .get(`${API_URL}/expenses`)
            // ?lastSyncTime=${lastSyncTime}`)
        .then((res) => {
            console.log(res.data)
            dispatch({ type: GET_EXPENSES , payload:res.data})
        })
        .catch(() => {
            dispatch({ type: EXPENSE_FAILURE })
        })
}

export const deleteExpense = (_id) => (dispatch) => {
  dispatch({ type: DELETE_EXPENSE_REQUEST, payload: _id });

  return axios
    .delete(`${API_URL}/expenses/${_id}`)
    .then(() => {
      dispatch({ type: DELETE_EXPENSE_SUCCESS, payload: _id });
    })
    .catch(() => {
      dispatch({ type: DELETE_EXPENSE_FAILURE });
    });
};

export const addExpense = (data) => (dispatch) => {
    dispatch({ type: ADD_EXPENSE_REQUEST})
    axios
        .post(`${API_URL}/expenses/`, data)
        .then((res) => {
            console.log(res.data)
            dispatch({ type: ADD_EXPENSE_SUCCESS})
        })
        .catch((err) => {
            dispatch({ type: ADD_EXPENSE_FAILURE })
        })
}