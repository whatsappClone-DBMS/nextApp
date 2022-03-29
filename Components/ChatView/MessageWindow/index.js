import styles from "./styles.module.css";
import ReceiverBubble from "./ReceiverBubble";
import SenderBubble from "./SenderBubble";
import React, { useEffect, useState } from "react";
import Loading from "../../Loading";

function MessageWindow({ dmId, user }) {
  const [messages, setMessages] = useState([]);
  var personUid = 0;
  const getChats = async () => {
    if (dmId != -1000) {
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
          console.log("messageObj", messageObj[0]);
          setMessages([...messages, messageObj[0]]);
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

  function tConvert(timeString) {
    var hourEnd = timeString.indexOf(":");
    var H = +timeString.substr(0, hourEnd);
    var h = H % 12 || 12;
    var ampm = H < 12 ? "AM" : "PM";
    timeString = h + timeString.substr(hourEnd, 3) + ampm;
    return timeString;
  }

  return (
    <div className={styles.container}>
      {!messages ? (
        <Loading />
      ) : (
        messages.map((message) =>
          message.sender == user ? (
            <SenderBubble
              message={message.text}
              time={tConvert(message.time.split(":").slice(0, 2).join(":"))}
            />
          ) : (
            <ReceiverBubble
              message={message.text}
              time={tConvert(message.time.split(":").slice(0, 2).join(":"))}
            />
          )
        )
      )}
    </div>
  );
}

export default MessageWindow;
