import React from "react";
import ChatViewHeader from "./ChatViewHeader";
import MessageBox from "./MessageBox";
import MessageWindow from "./MessageWindow";
import styles from "./styles.module.css";
function ChatView({ dmId, uid }) {
  return (
    <div className={styles.ChatViewContainer}>
      <ChatViewHeader dmId={dmId} uid={uid}/>
      <MessageWindow dmId={dmId} user={uid} />
      <MessageBox />
    </div>
  );
}

export default ChatView;
