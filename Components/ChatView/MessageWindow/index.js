import styles from "./styles.module.css";
import ReceiverBubble from "./ReceiverBubble";
import SenderBubble from "./SenderBubble";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../../Loading";

function MessageWindow({ dmId, user, refresh, gId }) {
  const [messages, setMessages] = useState([]);
  const endMessageRef = useRef(null);

  var personUid = 0;
  let messagesArr = [];
  const getChats = async () => {
    setMessages([]);
    if (dmId) {
      const responseDM = await fetch(
        `http://localhost:3000/api/chats/dm?dmId=${dmId}`
      );
      const DMdata = await responseDM.json();
      console.log("DMdataaaa", DMdata);
      const chatHistory = JSON.parse(DMdata[0].chatHistory);
      if (chatHistory) {
        chatHistory.map(async (mId) => {
          console.log("FINAL MSSAGE TESTS", mId);
          const response = await fetch(
            `http://localhost:3000/api/chats/messages?mId=${mId}`
          );
          const messageObj = await response.json();
          console.log("messageObj", messageObj[0]);
          if (messageObj) {
            console.log("yele");
            messagesArr = [...messagesArr, messageObj[0]];

            console.log("my messages array", messagesArr);
            console.log("000");
            messagesArr.sort((a, b) => {
              if (a.mID < b.mID) return -1;
              return a.mID > b.mID ? 1 : 0;
            });
            console.log("000");
            setMessages(messagesArr);
            console.log("msgs", messagesArr);
          }
        });
      }
    } else if (gId) {
      const responseDM = await fetch(
        `http://localhost:3000/api/chats/groups?gId=${gId}`
      );
      const DMdata = await responseDM.json();
      console.log("DMdataaaa", DMdata);
      const chatHistory = JSON.parse(DMdata[0].chatHistory);
      if (chatHistory) {
        chatHistory.map(async (mId) => {
          console.log("FINAL MSSAGE TESTS", mId);
          const response = await fetch(
            `http://localhost:3000/api/chats/messages?mId=${mId}`
          );
          const messageObj = await response.json();
          console.log("messageObj", messageObj[0]);
          if (messageObj) {
            console.log("yele");
            messagesArr = [...messagesArr, messageObj[0]];

            console.log("my messages array", messagesArr);
            console.log("000");
            messagesArr.sort((a, b) => {
              if (a.mID < b.mID) return -1;
              return a.mID > b.mID ? 1 : 0;
            });
            console.log("000");
            setMessages(messagesArr);
            console.log("msgs", messagesArr);
          }
        });
      }
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
    if (gId) {
      setMessages([]);
      console.log("uid123", gId);
      getChats();
    }
  }, [gId]);

  useEffect(() => {
    setMessages([]);
  }, []);

  useEffect(() => {
    if (refresh) {
      setMessages([]);
      getChats();
    }
  }, [refresh]);

  const gotoRef = () => {
    if (messages) {
      if (endMessageRef) {
        console.log("atiffffffs", endMessageRef);
        endMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  function tConvert(timeString) {
    var hourEnd = timeString?.indexOf(":");
    var H = +timeString?.substr(0, hourEnd);
    var h = H % 12 || 12;
    var ampm = H < 12 ? " AM" : " PM";
    timeString = h + timeString?.substr(hourEnd, 3) + ampm;
    return timeString;
  }

  return (
    <div className={styles.container}>
      {!messages ? (
        <Loading />
      ) : (
        messages.map((message, index) => {
          console.log(index);
          var flag2 = false;
          if (index == messages.length - 2) {
            flag2 = true;
          }
          if (index == messages.length - 1) {
            gotoRef();
          }
          return message?.sender == user ? (
            <SenderBubble
              message={message?.text}
              time={tConvert(message?.time)}
              dmId={dmId}
              mId={message?.mID}
              ref={endMessageRef}
            />
          ) : (
            <ReceiverBubble
              message={message?.text}
              time={tConvert(message?.time)}
              ref={endMessageRef}
            />
          );
        })
      )}
    </div>
  );
}

export default MessageWindow;
