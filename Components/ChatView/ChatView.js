import React from "react";
import ChatViewHeader from "./ChatViewHeader";
import MessageBox from "./MessageBox";
import MessageWindow from "./MessageWindow";
import styles from "./styles.module.css";
function ChatView({ dmId, uid, gId, refresh }) {
  return (
    <div className={styles.ChatViewContainer}>
      <ChatViewHeader dmId={dmId} uid={uid} gId={gId} />
      <MessageWindow dmId={dmId} user={uid} refresh={refresh} gId={gId} />
      <MessageBox sender={uid} dmId={dmId} gId={gId} />
    </div>
  );
}

export default ChatView;
