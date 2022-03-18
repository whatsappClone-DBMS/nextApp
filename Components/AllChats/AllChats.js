import React from "react";
import AllChatsHeader from "./AllChatsHeader";
import Chats from "./Chats";
import styles from "./styles.module.css";
function AllChats() {
  return (
    <div className={styles.chatsContainer}>
      <AllChatsHeader />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
      <Chats />
    </div>
  );
}

export default AllChats;
