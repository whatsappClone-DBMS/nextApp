import React, { useEffect, useState } from "react";
import AllChatsHeader from "./AllChatsHeader";
import Chats from "./Chats";
import styles from "./styles.module.css";
function AllChats({ uid }) {
  const [chats, setChats] = useState();
  const getChats = async () => {
    if (uid) {
      const response = await fetch(
        `http://localhost:3000/api/chats/dm?uid=${uid}`
      );
      const data = await response.json();
      console.log("User chats", data);
      setChats(data);
    }
  };

  useEffect(() => {
    console.log("uid", uid);
    getChats();
  }, [uid]);
  return (
    <div className={styles.chatsContainer}>
      <AllChatsHeader />
      <div style={{ paddingTop: 65 }}>
        <Chats />
        <Chats />
        <Chats />
        <Chats />
        <Chats />
        <Chats />
        <Chats />
        <Chats />
        <Chats />
        <Chats />
        <Chats />
        <Chats />
      </div>
    </div>
  );
}

export default AllChats;
