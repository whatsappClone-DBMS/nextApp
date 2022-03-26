import styles from "./styles.module.css";
import ReceiverBubble from "./ReceiverBubble";
import SenderBubble from "./SenderBubble";
import React, { useEffect, useState } from "react";
import Loading from "../../Loading";

function MessageWindow({ dmId, user }) {
  const [messages, setMessages] = useState([]);
  var personUid = 0;
  const getChats = async () => {
    if (dmId) {
      const responseDM = await fetch(
        `http://localhost:3000/api/chats/dm?dmId=${dmId}`
      );
      const DMdata = await responseDM.json();
      console.log("DMdataaaa", DMdata);
      const chatHistory = JSON.parse(DMdata[0].chatHistory);
      if (chatHistory) {
        chatHistory.forEach(async (mId) => {
          const response = await fetch(
            `http://localhost:3000/api/chats/messages?mId=${mId}`
          );
          const messageObj = await response.json();
          console.log("messageObj", messageObj);
          setMessages([...messages, messageObj]);
        });
      }
    }
  };

  useEffect(() => {
    if (dmId) {
      console.log("uid123", dmId);
      getChats();
    }
  }, [dmId]);

  return (
    <div className={styles.container}>
      {!messages ? (
        <Loading />
      ) : (
        messages.map((message) =>
          message.sender == user ? (
            <SenderBubble message={message.text} time={message.time} />
          ) : (
            <ReceiverBubble message={message.text} time={message.time} />
          )
        )
      )}
    </div>
  );
}

export default MessageWindow;
