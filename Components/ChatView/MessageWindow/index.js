import styles from "./styles.module.css";
import ReceiverBubble from "./ReceiverBubble";
import SenderBubble from "./SenderBubble";
import React, { useEffect, useState } from "react";
import Loading from "../../Loading";

function MessageWindow({ dmId, user }) {
  const [messages, setMessages] = useState([]);
  var personUid = 0;
  const getChats = async () => {
    setMessages([]);
    if (dmId != -1000) {
      const responseDM = await fetch(
        `http://localhost:3000/api/chats/dm?dmId=${dmId}`
      );
      const DMdata = await responseDM.json();
      console.log("DMdataaaa", DMdata);
      const chatHistory = JSON.parse(DMdata[0].chatHistory);
      let messagesArr = [];
      if (chatHistory) {
        chatHistory.forEach(async (mId) => {
          console.log("FINAL MSSAGE TESTS", mId);
          const response = await fetch(
            `http://localhost:3000/api/chats/messages?mId=${mId}`
          );
          const messageObj = await response.json();
          console.log("messageObj", messageObj[0]);
          messagesArr = [...messages, messageObj[0]];
        });
      }

      setMessages(messagesArr);
      console.log("my messages array", messagesArr);
    }
  };

  useEffect(() => {
    if (dmId) {
      setMessages([]);
      console.log("uid123", dmId);
      getChats();
    }
  }, [dmId]);

  useEffect(() => {
    setMessages([]);
  }, []);

  function tConvert(timeString) {
    var hourEnd = timeString.indexOf(":");
    var H = +timeString.substr(0, hourEnd);
    var h = H % 12 || 12;
    var ampm = H < 12 ? " AM" : " PM";
    timeString = h + timeString.substr(hourEnd, 3) + ampm;
    return timeString;
  }

  return (
    <div className={styles.container}>
      {!messages ? (
        <Loading />
      ) : (
        messages.map((message) => {
          return message.sender == user ? (
            <SenderBubble
              message={message.text}
              time={tConvert(message.time)}
            />
          ) : (
            <ReceiverBubble
              message={message.text}
              time={tConvert(message.time)}
            />
          );
        })
      )}
    </div>
  );
}

export default MessageWindow;
