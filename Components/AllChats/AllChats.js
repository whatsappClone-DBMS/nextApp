import { Router } from "@mui/icons-material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import AllChatsHeader from "./AllChatsHeader";
import Chats from "./Chats";
import styles from "./styles.module.css";

function AllChats({ uid }) {
  const [chats, setChats] = useState();
  const [dmID, SetDmID] = useState();
  const router = useRouter();
  const { dmId } = router.query;
  var personUid = 0;

  const getChats = async () => {
    if (uid) {
      const response = await fetch(
        `http://localhost:3000/api/chats/dm?uid=${uid}`
      );
      const data = await response.json();
      var myChats = data;
      var blocked = [];
      var archived = [];
      if (data) {
        const responseArchived = await fetch(
          `http://localhost:3000/api/user/archived?uid=${uid}`
        );
        const dataArchived = await responseArchived.json();
        if (dataArchived) {
          archived = [JSON.parse(dataArchived[0].archived)];
          const responseBlocked = await fetch(
            `http://localhost:3000/api/user/blocked?uid=${uid}`
          );
          const dataBlocked = await responseBlocked.json();
          if (dataBlocked) {
            blocked = [JSON.parse(dataBlocked[0].blocked)];

            if (
              (blocked.length > 0 || archived.length > 0) &&
              myChats.length > 0
            ) {
              myChats?.map((chat, index) => {
                var personUid = 0;
                chat?.uid1 == uid
                  ? (personUid = chat.uid2)
                  : (personUid = chat.uid1);
                console.log("person uid", personUid);
                if (
                  blocked.includes(personUid) ||
                  archived.includes(personUid)
                ) {
                  myChats.splice(index, 1);
                }
              });
              console.log("my chats after deletion", myChats);
              setChats(myChats);
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    getChats();
  }, [uid]);

  useEffect(() => {
    if (dmId) SetDmID(dmId);
  }, [router.query]);

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
                <Chats
                  uid={personUid}
                  flag={dmID === chat?.dmID ? true : false}
                  dmId={chat?.dmID}
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
