import React from "react";
import ChatViewHeader from "./ChatViewHeader";
import MessageBox from "./MessageBox";
import MessageWindow from "./MessageWindow";
import styles from "./styles.module.css";
function ChatView({ dmId, uid, refresh }) {
  return (
    <div className={styles.ChatViewContainer}>
      <ChatViewHeader dmId={dmId} uid={uid}/>
      <MessageWindow dmId={dmId} user={uid} refresh={refresh} />
      <MessageBox sender={uid} dmId={dmId} />
    </div>
  );
}

export default ChatView;
