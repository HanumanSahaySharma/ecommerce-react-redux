import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/* Import Bootstrap CSS */
import "bootstrap/dist/css/bootstrap.min.css";

/* Import APP.CSS */
import "./App.css";

/* Import Store and React-redux Provider */
import store from "./redux/index";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <Provider store={store}>
         <App />
      </Provider>
   </React.StrictMode>
);
