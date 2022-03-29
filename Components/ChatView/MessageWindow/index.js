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

  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
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
