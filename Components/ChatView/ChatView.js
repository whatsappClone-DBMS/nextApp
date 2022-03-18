import React from "react";
import ChatViewHeader from "./ChatViewHeader";
import MessageBox from "./MessageBox";
import styles from "./styles.module.css";
function ChatView() {
  return (
    <div className={styles.ChatViewContainer}>
      <ChatViewHeader />
      <MessageBox/>
    </div>
  );
}

export default ChatView;
