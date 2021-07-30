import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/Storeage";
import SessionStorage from "./component/sessionStorage";

window.Pusher = require("pusher-js");



// window.Echo = new Echo({
//   broadcaster: "pusher",
//   cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//   key: "chatcha12345678broadcast",
//   encrypted: true,
//   key: process.env.MIX_PUSHER_APP_KEY,
//   authorizer: (channel, options) => {
//       return {
//           authorize: (socketId, callback) => {
//               axios.post('/api/broadcasting/auth', {
//                   socket_id: socketId,
//                   channel_name: channel.name
//               })
//               .then(response => {
//                   callback(false, response.data);
//                   console.log();
//               })
//               .catch(error => {
//                   callback(true, error);
//               });
//           }
//       };
//   },
// })


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
