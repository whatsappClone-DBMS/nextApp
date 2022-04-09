import { Router } from "@mui/icons-material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import AllChatsHeader from "./AllChatsHeader";
import Chats from "./Chats";
import GroupsComponent from "./GroupsComponent";
import styles from "./styles.module.css";

function AllGroupChats({ uid }) {
  const [chats, setChats] = useState();
  const router = useRouter();
  var personUid = 0;
  const getChats = async () => {
    if (uid) {
      const response = await fetch(
        `http://localhost:3000/api/chats/groups?uid=${uid}`
      );
      const data = await response.json();
      console.log("User chats", data);
      setChats(data);
    }
  };

  useEffect(() => {
    getChats();
  }, [uid]);
  return (
    <div className={styles.chatsContainer}>
      <AllChatsHeader uid={uid} />
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
                  router.push(`/home?uid=${uid}&dmId=${chat?.dmID}`);
                }}
              >
                <GroupsComponent gId={personUid} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AllGroupChats;
