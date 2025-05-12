import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import {reducer as expenseReducer} from "./reducer";

const rootReducer = combineReducers({
    expenseReducer
})

export const store = legacy_createStore(rootReducer , applyMiddleware(thunk))