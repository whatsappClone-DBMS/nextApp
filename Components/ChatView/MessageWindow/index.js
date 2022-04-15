import styles from "./styles.module.css";
import ReceiverBubble from "./ReceiverBubble";
import SenderBubble from "./SenderBubble";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../../Loading";
import GroupReceiverBubble from "./GroupReceiverBubble";
function MessageWindow({ dmId, user, refresh, gId }) {
  const [messages, setMessages] = useState([]);
  const endMessageRef = useRef(null);

  var personUid = 0;
  let messagesArr = [];
  const getChats = async () => {
    setMessages([]);
    if (dmId || dmId != "undefined") {
      const responseDM = await fetch(
        `http://localhost:3000/api/chats/dm?dmId=${dmId}`
      );
      const DMdata = await responseDM.json();
      if (DMdata[0]) {
        const chatHistory = JSON.parse(DMdata[0]?.chatHistory);
        if (chatHistory) {
          chatHistory.map(async (mId) => {
            const response = await fetch(
              `http://localhost:3000/api/chats/messages?mId=${mId}`
            );
            const messageObj = await response.json();

            if (messageObj) {
              messagesArr = [...messagesArr, messageObj[0]];

              messagesArr.sort((a, b) => {
                if (a.mID < b.mID) return -1;
                return a.mID > b.mID ? 1 : 0;
              });

              setMessages(messagesArr);
            }
          });
        }
      }
    } else if (gId) {
      const responseDM = await fetch(
        `http://localhost:3000/api/chats/groups?gId=${gId}`
      );
      const DMdata = await responseDM.json();

      const chatHistory = JSON.parse(DMdata[0].chatHistory);
      if (chatHistory) {
        chatHistory.map(async (mId) => {
          const response = await fetch(
            `http://localhost:3000/api/chats/messages?mId=${mId}`
          );
          const messageObj = await response.json();

          if (messageObj) {
            messagesArr = [...messagesArr, messageObj[0]];

            messagesArr.sort((a, b) => {
              if (a.mID < b.mID) return -1;
              return a.mID > b.mID ? 1 : 0;
            });

            setMessages(messagesArr);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (dmId) {
      setMessages([]);

      getChats();
    }
  }, [dmId]);

  useEffect(() => {
    if (gId) {
      setMessages([]);

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
          ) : gId ? (
            <GroupReceiverBubble
              uid={message?.sender}
              message={message?.text}
              time={tConvert(message?.time)}
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
