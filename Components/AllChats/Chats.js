import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";

function Chats({ uid, flag, dmId, removeArchive, removeBlock, mainUser }) {
  const [user, setUser] = useState({});
  const [lastMsg, setLastMsg] = useState();
  const [clickFlag, setClickFlag] = useState(false);
  const router = useRouter();

  const unArchiveUser = async () => {
    if (mainUser) {
      const response = await fetch(
        `http://localhost:3000/api/user/unarchive?uid=${mainUser}&uid2=${uid}`
      );
      console.log("hehehehehhe");
      router.reload();
      const data = await response.json();
    }
  };
  const unBlockUser = async () => {
    if (mainUser) {
      const response = await fetch(
        `http://localhost:3000/api/user/unblock?uid=${mainUser}&uid2=${uid}`
      );
      router.reload();
      const data = await response.json();
    }
  };

  const getUserDetails = async () => {
    if (uid) {
      const response = await fetch(`http://localhost:3000/api/user/${uid}`);
      const data = await response.json();
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
    getUserDetails();
    getChats();
  }, [uid]);
  return (
    <div className={styles.component}>
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
        {removeArchive && (
          <div className={styles.dropdown}>
            <IconButton style={{ color: "#AEBAC1" }}>
              <KeyboardArrowDownIcon />
              <div className={styles.dropdownContent}>
                <p onClick={() => unArchiveUser()}>Unarchive</p>
              </div>
            </IconButton>
          </div>
        )}
        {removeBlock && (
          <div className={styles.dropdown}>
            <IconButton style={{ color: "#AEBAC1" }}>
              <KeyboardArrowDownIcon />
              <div className={styles.dropdownContent}>
                <p onClick={() => unBlockUser()}>Unblock</p>
              </div>
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chats;
