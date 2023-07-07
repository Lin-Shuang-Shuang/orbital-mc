import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function ChatBody({messages}) {
  const username = localStorage.getItem("username");
  return (
    <>
      <header className="chat-mainHeader">
        <p>Chat with collaborator </p>
      </header>
      {/*messages received by you*/}
      <div className="message-container">
        {messages.map((message) =>
          message.name === username ? (
            <div className="message-chats" key={message.id}>
              <p className="sender-name">You</p>
              <div className="message-sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message-chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message-recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}


        {/*When a user is typing, this is shown*/}
        <div className="message-status">
          <p>Someone is typing...</p>
        </div>
      </div>

    </>
  )

}