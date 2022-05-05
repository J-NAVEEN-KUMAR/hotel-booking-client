//3. combine multiple reducers
//Here we can combine all the reducers into one so that we can access them easily

import { combineReducers } from "redux";
import { authReducer } from "./auth";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
