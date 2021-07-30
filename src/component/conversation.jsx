import axios from "axios";
import react, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import config from "./../config.json";

export default function Conversation() {
  const chatting = useSelector((state) => state.chatting);
  const userInfo = useSelector((state) => state.userInfo);
  const userCredential = useSelector((state) => state.userCredential);
  const chatRef = useRef();
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (chatting.partner) {
      axios
        .post(
          config.url + "api/get-massage",
          {
            with_user_id: chatting.partner.id,
          },
          {
            headers: {
              Authorization: "Bearer " + userCredential.token,
            },
          }
        )
        .then((r) =>
          dispatch({ type: "setChattingConversation", payload: r.data.message })
        )
        .catch((e) => console.log(e));
    }
  }, [chatting.partner]);

  const displayChat = () => {
    let chat = [];
    for (let n in chatting.conversation) {
      if (chatting.conversation[n].from_user_id === userInfo.id) {
        chat.push(
          <div class="you">
            <img
              class="chating_profile"
              src="https://www.shareicon.net/data/256x256/2016/07/26/802033_user_512x512.png"
            />
            <div class="message">
              <p class="content">{chatting.conversation[n].content}</p>
            </div>
          </div>
        );
      } else {
        chat.push(
          <div class="they">
            <img
              class="chating_profile"
              src="https://www.shareicon.net/data/256x256/2016/07/26/802033_user_512x512.png"
            />
            <div class="message">
              {chatting.partner && (
                <p class="header">{chatting.partner.username}</p>
              )}
              <p class="content">{chatting.conversation[n].content}</p>
            </div>
          </div>
        );
      }
    }
    return chat;
  };

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight
  },[chatting.conversation])

  const sendMessage = (data) => {
    reset({ content_massage: "" });
    dispatch({
      type: "setChattingConversation",
      payload: [
        ...chatting.conversation,
        {
          id: -1,
          content: data.content_massage,
          from_user_id: userInfo.id,
          to_user_id: chatting.partner.id,
        },
      ],
    });
    axios
      .post(
        config.url + "api/send-massage",
        {
          content_massage: data.content_massage,
          to_user_id: chatting.partner.id,
        },
        {
          headers: {
            Authorization: "Bearer " + userCredential.token,
          },
        }
      )
      .then((r) => console.log(r.data))
      .catch((e) => console.log(e));
    console.log(data);
  };

  return (
    <div class="chat">
      <ul class="chartBar">
        {chatting.partner && (
          <li class="chatPersonName">{chatting.partner.username}</li>
        )}
      </ul>

      <div ref={chatRef} class="chating">
        {displayChat()}
      </div>

      <form onSubmit={handleSubmit(sendMessage)} class="input-chart">
        <input
          class="input-text"
          placeholder="write a massage..."
          type="text"
          {...register("content_massage", { required: true })}
        />
        <button class="send" type="submit">
          <span class="material-icons"> send </span>
        </button>
      </form>
    </div>
  );
}
