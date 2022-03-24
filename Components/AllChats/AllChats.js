import React, { useEffect, useState } from "react";
import AllChatsHeader from "./AllChatsHeader";
import Chats from "./Chats";
import styles from "./styles.module.css";


function AllChats({ uid }) {
  const [chats, setChats] = useState();
  var personUid = 0;
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
<<<<<<< HEAD
        {chats?.map((chat) => {
          {
            chat.uid1 == uid
              ? (personUid = chat.uid2)
              : (personUid = chat.uid1);
            <Chats uid={personUid} />;
          }
=======
        {chats.map((chat) => {
          chat.uid1 == uid ? (personUid = chat.uid2) : (personUid = chat.uid1);
          return <Chats uid={personUid} />;
>>>>>>> ee4a576c1e8bb56c24a20465e18a076f27e5c804
        })}
      </div>
    </div>
  );
}

export default AllChats;
