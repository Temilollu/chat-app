import React, { useState, useRef, useEffect } from "react";

import ChatBox from "react-chat-plugin";
import io from "socket.io-client";
import EmptyImg from "../assets/emptyImage.svg";
import { getUser } from "../reusables/getUser";

export default function Chat() {
  const [messages, setMessages] = useState([
    // {
    //   author: {
    //     username: getUser(),
    //     id: 1,
    //     avatarUrl: EmptyImg,
    //   },
    //   text: "Hi",
    //   type: "text",
    //   timestamp: 1578366393250,
    // },
    // {
    //   author: {
    //     username: getUser(),
    //     id: 1,
    //     avatarUrl: EmptyImg,
    //   },
    //   text: "What's up?",
    //   type: "text",
    //   timestamp: 1578366425250,
    // },
  ]);

  const socketRef = useRef();

  useEffect(() => {
    if (sessionStorage.getItem("messages")) {
      const storedMessages = JSON.parse(sessionStorage.getItem("messages"));
      setMessages(storedMessages);
    }
  }, []);

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:4000");
    socketRef.current.on("message", (message) => {
      setMessages([...messages, message]);
    });
    return () => socketRef.current.disconnect();
  }, [messages]);

  const handleOnSendMessage = (message) => {
    const newMessage = {
      author: {
        username: getUser(),
        id: getUser(),
        avatarUrl: EmptyImg,
      },
      text: message,
      timestamp: +new Date(),
      type: "text",
    };

    socketRef.current.emit("message", newMessage);

    sessionStorage.setItem(
      "messages",
      JSON.stringify([...messages, newMessage])
    );
  };

  return (
    <div className="chat-container">
      <ChatBox
        messages={messages}
        userId={getUser()}
        onSendMessage={handleOnSendMessage}
        height="580px"
      />
    </div>
  );
}
