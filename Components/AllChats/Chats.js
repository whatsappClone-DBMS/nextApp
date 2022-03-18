import { Avatar } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";
function Chats() {
  return (
    <div className={styles.component}>
      <Avatar
        alt="Remy Sharp"
        src="http://sc01.alicdn.com/kf/HTB1jA_RXrj1gK0jSZFuq6ArHpXab.jpg"
        sx={{ width: 56, height: 56 }}
        style={{ marginRight: 15 }}
      />
      <div className={styles.nameFlex}>
        <p className={styles.name}>Aryan Teng</p>
        <p className={styles.message}>Meet pe aajaaaa</p>
      </div>
      <div className={styles.timeFlex}>
        <p className={styles.time}>11:30 pm</p>
        <p className={styles.unread}>3</p>
      </div>
    </div>
  );
}

export default Chats;
