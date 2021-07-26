import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/Storeage";
import Echo from "laravel-echo";
import SessionStorage from "./component/sessionStorage";

window.Pusher = require("pusher-js");

window.Echo = new Echo({
  broadcaster: "pusher",
  key: "chatcha12345678broadcast", // hard code
  wsHost: window.location.hostname,
  wssHost: window.location.hostname,
  enabledTransports: ["ws"],
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SessionStorage>
          <App />
        </SessionStorage>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
