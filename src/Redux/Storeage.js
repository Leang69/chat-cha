import axios from "axios";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import config from "./../config.json"

const initStore = {
    userCredential: {
        token: null,
        isVerify: null,
    },
    userInfo: {
        username: null,
        email: null
    }
}

const actions = {
    setUserCredential: (store, actionPayload) => {
        return {
            ...store,
            userCredential: {
                token   : actionPayload.token,
                isVerify: actionPayload.isVerify,
            }
        }
    },
    setUserInfo: (store, actionPayload) => {
        return {
            ...store,
            userInfo: {
                ...actionPayload
            }
        }
    }
}

const reducer = (store = initStore, action) => {
    switch (action.type){
        case "setUserCredential":
            return actions.setUserCredential(store, action.payload)
        case "setUserInfo":
            return actions.setUserInfo(store, action.payload)
        default:
            return store
    }
}

export const store = createStore(reducer, initStore, applyMiddleware(thunk));