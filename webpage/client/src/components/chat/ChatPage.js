import React, { useEffect, useState } from 'react'
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';


export default function ChatPage({socket}) {


  const [messages, setMessages] = useState([]);

  //error is likely caused by this
  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages])

  return (
    <div className="chat">
      <ChatBar/>
      <div className="chat-main">
        <ChatBody messages={messages}/>
        <ChatFooter socket={socket}/>
      </div>

    </div>
  )

}