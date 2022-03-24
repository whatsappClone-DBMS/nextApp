import React from "react";
import ChatViewHeader from "./ChatViewHeader";
import MessageBox from "./MessageBox";
import MessageWindow from "./MessageWindow";
import styles from "./styles.module.css";
function ChatView({ selectedChat }) {
  return (
    <div className={styles.ChatViewContainer}>
      <ChatViewHeader />
      <MessageWindow dmId={selectedChat} />
      <MessageBox />
    </div>
  );
}

export default ChatView;
