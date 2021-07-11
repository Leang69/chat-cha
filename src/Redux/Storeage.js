import { createStore } from "redux";

const initStore = {
    user: {
        token: null,
        isVerify: null,
        username: null
    }
}

const actions = {
    loginAction: (store, actionPayload) => {
        return {
            ...store,
             user:{
                token   : actionPayload.token,
                isVerify: actionPayload.isVerify,
                username: actionPayload.username
            }
        }
    }
}

const reducer = (store = initStore,action) => {
    switch (action.type){
        case "loginAction":
            return actions.loginAction(store, action.payload)
        default:
            return store
    }
}

export const store = createStore(reducer,initStore);