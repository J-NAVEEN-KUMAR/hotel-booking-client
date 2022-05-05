import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import 'antd/dist/antd.css'; 
import 'antd/dist/antd.less'

//redux state management
//1. import from react-redux and redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducers";

//2. create user reducer function
// created auth file in reducers directory

//3. combine multiple reducers
//Here we can combine all the reducers into one so that we can access them easily
//created index file in reducers directory where all the reducers will be combined+

//4. create redux store
const store = createStore(rootReducer, composeWithDevTools());

//5. provide redux store to the entire app

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
