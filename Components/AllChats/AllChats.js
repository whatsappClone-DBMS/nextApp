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
  const [archived, setArchived] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const router = useRouter();
  const { dmId } = router.query;
  var personUid = 0;

  const getChats = async () => {
    if (uid) {
      const response = await fetch(
        `http://localhost:3000/api/chats/dm?uid=${uid}`
      );
      const data = await response.json();
      setChats(data);
      if (data) {
        getArchived();
        getBlocked();
      }
    }
  };

  const getArchived = async () => {
    if (uid) {
      const response = await fetch(
        `http://localhost:3000/api/user/archived?uid=${uid}`
      );
      const data = await response.json();
      if (data) {
        setArchived(JSON.parse(data[0].archived));
      }
    }
  };
  const getBlocked = async () => {
    if (uid) {
      const response = await fetch(
        `http://localhost:3000/api/user/blocked?uid=${uid}`
      );
      const data = await response.json();
      if (data) {
        setBlocked(JSON.parse(data[0].blocked));
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
            return archived.length > 0 && blocked.length > 0 ? (
              !archived.contains(personUid) && !blocked.contains(personUid) ? (
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
              ) : (
                <></>
              )
            ) : (
              <></>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AllChats;
