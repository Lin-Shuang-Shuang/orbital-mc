import React, { useState } from 'react';

export default function ChatFooter({socket}) {
  const [message, setMessage] = useState('');
  const username = localStorage.getItem('username'); // Retrieve the username from local storage


  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && username) {
      socket.emit('message', {
        text: message,
        name: username,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      })
    }
    console.log(message)
    setMessage('');
  };

  return (
    <>
      <div className="chat-footer">
        <form className="chat-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Write message"
            className="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="sendBtn">Send</button>
        </form>
      </div>
    </>
  )

}