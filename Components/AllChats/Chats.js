import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
function Chats({ uid, flag, dmId }) {
  const [user, setUser] = useState({});
  const [lastMsg, setLastMsg] = useState();
  const [clickFlag, setClickFlag] = useState(false);
  const router = useRouter();

  const getUserDetails = async () => {
    if (uid) {
      const response = await fetch(`http://localhost:3000/api/user/${uid}`);
      const data = await response.json();
      console.log("User Detailsss", data);
      setUser(data[0]);
    }
  };
  const getChats = async () => {
    if (dmId) {
      const responseDM = await fetch(
        `http://localhost:3000/api/chats/dm?dmId=${dmId}`
      );
      const DMdata = await responseDM.json();
      const chatHistory = JSON.parse(DMdata[0]?.chatHistory);
      if (chatHistory) {
        const response = await fetch(
          `http://localhost:3000/api/chats/messages?mId=${
            chatHistory[chatHistory.length - 1]
          }`
        );
        const messageObj = await response.json();
        if (messageObj) {
          setLastMsg(tConvert(messageObj[0].time));
        }
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
  useEffect(() => {
    console.log("uid", uid);
    getUserDetails();
    getChats();
  }, [uid]);
  return (
    <div
      className={styles.component}
      onClick={() => {
        console.log("dmID");
      }}
    >
      <Avatar
        alt={user?.name ?? "Name..."}
        src={user?.imgSrc ?? "Name..."}
        sx={{ width: 45, height: 45 }}
        style={{ marginRight: 15 }}
      />
      <div className={styles.nameFlex}>
        <p className={styles.name}>{user?.name ?? "Name..."}</p>
        {flag && !clickFlag ? (
          <></>
        ) : (
          <p className={styles.message}>Click To Open</p>
        )}
      </div>
      <div className={styles.timeFlex}>
        {flag ? (
          <></>
        ) : (
          <>
            <p className={styles.time}>{lastMsg ?? ""}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Chats;
