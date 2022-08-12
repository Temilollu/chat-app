import React, { useState } from "react";

import ChatBox from "react-chat-plugin";
import EmptyImg from "../assets/emptyImage.svg";
import { getUser } from "../reusables/getUser";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      author: {
        username: getUser(),
        id: 1,
        avatarUrl: EmptyImg,
      },
      text: "Hi",
      type: "text",
      timestamp: 1578366393250,
    },

    {
      author: {
        username: getUser(),
        id: 1,
        avatarUrl: EmptyImg,
      },
      text: "What's up?",
      type: "text",
      timestamp: 1578366425250,
      //   hasError: true,
    },
  ]);

  const handleOnSendMessage = (message) => {
    setMessages(
      messages.concat({
        author: {
          username: getUser(),
          id: 1,
          avatarUrl: EmptyImg,
        },
        text: message,
        timestamp: +new Date(),
        type: "text",
      })
    );
  };

  return (
    <div className="chat-container">
      <ChatBox
        messages={messages}
        userId={1}
        onSendMessage={handleOnSendMessage}
        height="580px"
      />
    </div>
  );
}
