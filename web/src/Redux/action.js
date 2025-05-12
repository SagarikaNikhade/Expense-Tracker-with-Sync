import {
  ADD_EXPENSE,
  SET_EXPENSES,
  DELETE_EXPENSE,
  SET_LOADING,
  SET_ERROR,
} from "./actionTypes";
import axios from "axios";

const API_URL = 'http://localhost:8080';

export const getExpenses = (lastSyncTime) => (dispatch) =>{
   dispatch({ type: SET_LOADING });
    axios
        .get(`${API_URL}/expenses?lastSyncTime=${lastSyncTime}`)
        .then((res) => {
            console.log(res)
            dispatch({ type: SET_EXPENSES , payload:res})
        })
        .catch(() => {
            dispatch({ type: SET_ERROR })
        })
}