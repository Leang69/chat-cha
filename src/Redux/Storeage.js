import axios from "axios";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import config from "./../config.json";

const initStore = {
  userCredential: {
    token: null,
  },
  userInfo: {
    id: null,
    username: null,
    email: null,
    profile: null,
    userFrom: null,
    email_verified_at: null,
  },
  chatHistory: [],
  chatting: {
    partner: null,
    conversation: []
  }
};

const actions = {
  loadStateFromSessionStorage: (actionPayload) => {
    return actionPayload
  },
  setChatHistory: (store, actionPayload) => {
    return {
      ...store,
      chatHistory: [...actionPayload],
    }
  },
  setChattingPartner: (store, actionPayload) => {
    return {
      ...store,
      chatting: {
        partner: actionPayload,
        conversation: store.chatting.conversation
      }
    }
  },
  setChattingConversation: (store, actionPayload) => {
    return {
      ...store,
      chatting: {
        conversation: actionPayload,
        partner: store.chatting.partner
      }
    }
  },
  setUserCredential: (store, actionPayload) => {
    return {
      ...store,
      userCredential: {
        token: actionPayload.token,
      },
    };
  },
  setUserInfo: (store, actionPayload) => {
    return {
      ...store,
      userInfo: actionPayload,
    };
  },
  requestUserInfo: () => {
    return (dispatch, getState) => {
      return axios.get(config.url + "api/user", {
        headers: {
          Authorization: "Bearer " + getState().userCredential.token,
        },
      })
        .then((r) => {
          dispatch({
            type: "setUserInfo",
            payload: r.data,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    };
  }
};

const reducer = (store = initStore, action) => {
  switch (action.type) {
    case "setUserCredential":
      return actions.setUserCredential(store, action.payload);
    case "setChatHistory":
      return actions.setChatHistory(store, action.payload);
    case "setChattingPartner":
      return actions.setChattingPartner(store, action.payload);
    case "setChattingConversation":
      return actions.setChattingConversation(store, action.payload);
    case "setUserInfo":
      return actions.setUserInfo(store, action.payload);
    case "loadStateFromSessionStorage":
      return actions.loadStateFromSessionStorage(action.payload)
    default:
      return store;
  }
};

export const requestUserInfo = actions.requestUserInfo;

export const store = createStore(
  reducer,
  initStore,
  composeWithDevTools(applyMiddleware(thunk))
);
