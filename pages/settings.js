import React from 'react'
import Setting from '../Components/Setting/Setting'
import styles from "../styles/Home2.module.css";
import { useRouter } from "next/router";
import ChatView from "../Components/ChatView/ChatView";

function Settings() {
  const router = useRouter();
  const { uid, dmId } = router.query;

  return (
    <div className={styles.container}>
      <Setting uid={uid}/>
      {dmId != "undefined" ? (
        <ChatView dmId={dmId ?? -1000} uid={uid} />
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
          <img src="assets/DefaultChat.svg" style={{ maxWidth: "450px" }} />
        </div>
      )}
    </div>
  )
}

export default Settings