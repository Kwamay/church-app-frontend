import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import authReducer from "./slices/authSlice";
import memberReducer from "./slices/memberSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  members: memberReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
