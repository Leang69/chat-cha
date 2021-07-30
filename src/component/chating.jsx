import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import "./../style/index.scss";
import config from "./../config.json";
import { useSelector, useDispatch } from "react-redux";
import ChatListHistory from "./chatListHistory";
import Conversation from "./conversation";
import Echo from "laravel-echo";

export default function Chating() {
  const userCredential = useSelector((state) => state.userCredential);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userCredential.token) {
      axios
        .get(config.url + "api/get-massage-history", {
          headers: {
            Authorization: "Bearer " + userCredential.token,
          },
        })
        .then((r) => {
          dispatch({ type: "setChatHistory", payload: r.data.message });
        })
        .catch((e) => {});
    }
  }, [userCredential]);

  useEffect(() => {
    if(userInfo.id){
      window.Echo = new Echo({
        broadcaster: "pusher",
        key: "chatcha12345678broadcast",
        wsHost: window.location.hostname,
        wssHost: window.location.hostname,
        enabledTransports: ["ws"],
        wsPort: 6001,
        forceTLS: false,
        disableStats: true,
        authorizer: () => {
          return {
            authorize: (socketId, callback) => {
              axios
                .post(
                  config.url + "api/broadcasting/auth",
                  {
                    socket_id: socketId,
                    channel_name: "private-messageSession." + userInfo.id,
                  },
                  {
                    headers: {
                      Authorization: "Bearer " + userCredential.token,
                    },
                  }
                )
                .then((response) => {
                  callback(false, response.data);
                  console.log("web socket auth", response.data);
                })
                .catch((error) => {
                  callback(true, error);
                });
            },
          };
        },
      });
  
      window.Echo.private(`messageSession.${userInfo.id}`).listen(
        "SendNewMessage",
        (e) => {
          console.log("web socket", e);
        }
      );
    }
  },[userInfo])

  return (
    <div className="chatingContainer">
      <div class="sideBar">
        <div class="search">
          <p class="title">Chat Cha</p>
          <input type="text" placeholder="search" />
        </div>
        <div class="chatHistory">
          <ChatListHistory />

          {/* <div class="chatPerson clicked">
            <img
              class="chatHistory_profile"
              src="https://www.shareicon.net/data/256x256/2016/07/26/802033_user_512x512.png"
            />
            <div class="info">
              <h3>Ngounmengleang</h3>
              <h4>Last: chat</h4>
            </div>
          </div>
          <div class="chatPerson">
            <img
              class="chatHistory_profile"
              src="https://www.shareicon.net/data/256x256/2016/07/26/802033_user_512x512.png"
            />
            <div class="info">
              <h3>Ngounmengleang</h3>
              <h4>Last: chat</h4>
            </div>
          </div> */}
        </div>
      </div>
      <div class="mainContent">
        <Conversation />
      </div>
    </div>
  );
}
