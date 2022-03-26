import { Router } from "@mui/icons-material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import AllChatsHeader from "./AllChatsHeader";
import Chats from "./Chats";
import styles from "./styles.module.css";

function AllChats({ uid, selectedChat, setSelectedChat }) {
  const [chats, setChats] = useState();
  const router = useRouter();
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
        {!chats ? (
          <Loading />
        ) : (
          chats?.map((chat) => {
            chat?.uid1 == uid
              ? (personUid = chat.uid2)
              : (personUid = chat.uid1);
            return (
              <div
                onClick={() => {
                  console.log("dmID", chat);
                  setSelectedChat(chat?.dmID);
                  router.push("/home?dmID=" + chat?.dmID);
                }}
              >
                <Chats
                  uid={personUid}
                  setSelectedChat={setSelectedChat}
                  selectedChat={selectedChat}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AllChats;
