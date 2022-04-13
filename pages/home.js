import AllChats from "../Components/AllChats/AllChats";
import ChatView from "../Components/ChatView/ChatView";
import styles from "../styles/Home2.module.css";
import { useRouter } from "next/router";
import React from "react";

export default function HomeAfterLogin() {
  const router = useRouter();
  const { uid, dmId, refresh } = router.query;

  return (
    <div className={styles.container}>
      <AllChats uid={uid} />
      {dmId ? (
        <ChatView dmId={dmId ?? -1000} uid={uid} refresh={refresh} />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "70vw",
            backgroundColor: "#212E35",
          }}
        >
          <img src="assets/DefaultChat.svg" className={styles.defaultImg} />
        </div>
      )}
    </div>
  );
}
