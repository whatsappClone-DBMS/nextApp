import React from "react";
import ChatViewHeader from "./ChatViewHeader";
import styles from "./styles.module.css";
function ChatView() {
  return (
    <div className={styles.ChatViewContainer}>
      <ChatViewHeader />
    </div>
  );
}

export default ChatView;
