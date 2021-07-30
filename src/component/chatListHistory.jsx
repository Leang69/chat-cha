import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function ChatListHistory() { 

    const userInfo = useSelector(state => state.userInfo)
    const chatHistory = useSelector(state => state.chatHistory)
    const dispatch = useDispatch()
    console.log(chatHistory);

    const listChatHistory = chatHistory.map( chatHistory => 
        <div key={chatHistory.withUser.id} class="chatPerson newMessage" onClick={() => selectPartner(chatHistory.withUser)}>
            <img
            class="chatHistory_profile"
            src="https://www.shareicon.net/data/256x256/2016/07/26/802033_user_512x512.png"
            />
            <div class="info">
            <h3>{chatHistory.withUser.username}</h3>
            <h4>{chatHistory.sender.id === userInfo.id ? "you" : chatHistory.sender.username}: {chatHistory.content}</h4>
            </div>
        </div>
    )

    const selectPartner = (partner) => {
        dispatch({type: "setChattingPartner", payload: partner})
    }

    return (
        <>
            {
                listChatHistory
            }
        </>
        
    )
}