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
  const getGroups = async () => {
    if (uid) {
      const response = await fetch(
        `http://localhost:3000/api/chats/groups?uid=${uid}`
      );
      const data = await response.json();
      console.log("User chats", data[0].groups);
      setChats(JSON.parse(data[0].userGroups));
    }
  };

  useEffect(() => {
    getGroups();
  }, [uid]);
  return (
    <div className={styles.chatsContainer}>
      <AllChatsHeader uid={uid} />
      <div style={{ paddingTop: 65 }}>
        {!chats ? (
          <Loading />
        ) : (
          chats?.map((chat) => {
            return (
              <div
                onClick={() => {
                  router.push(`/groups?uid=${uid}&gId=${chat}`);
                }}
              >
                <GroupsComponent gId={chat} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AllGroupChats;
