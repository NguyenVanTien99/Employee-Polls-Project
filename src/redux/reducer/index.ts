import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../reducer/authUser";

const authUser = authReducer.reducer
 
export default combineReducers({
  authUser,
});
