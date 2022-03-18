import React from "react";
import styles from "./styles.module.css";
import Avatar from "@mui/material/Avatar";
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function AllChatsHeader() {
  return (
    <div className={styles.header}>
      <IconButton>
        <Avatar
          alt="Remy Sharp"
          src="http://sc01.alicdn.com/kf/HTB1jA_RXrj1gK0jSZFuq6ArHpXab.jpg"
        />
      </IconButton>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton style={{ color: "#AEBAC1" }}>
          <ChatIcon />
        </IconButton>
        <IconButton style={{ color: "#AEBAC1" }}>
          <KeyboardArrowDownIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default AllChatsHeader;
