import React from "react";
import AllChatsHeader from "./AllChatsHeader";
import styles from "./styles.module.css";
function AllChats() {
  return (
    <div className={styles.container}>
      <AllChatsHeader />
    </div>
  );
}

export default AllChats;
