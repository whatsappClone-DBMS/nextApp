import ChatView from "../Components/ChatView/ChatView";
import styles from "../styles/Home2.module.css";
import { useRouter } from "next/router";
import React from "react";
import AllGroupChats from "../Components/AllChats/AllGroupChats";

export default function Groups() {
  const router = useRouter();
  const { uid, gId, refresh } = router.query;

  return (
    <div className={styles.container}>
      <AllGroupChats uid={uid} />
      {gId ? (
        <ChatView gId={gId ?? -1000} uid={uid} refresh={refresh} />
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
