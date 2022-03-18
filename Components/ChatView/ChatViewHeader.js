import React from "react";
import styles from "./styles.module.css";
import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";

function ChatViewHeader() {
  return (
    <div className={styles.container}>
      <div style={{ display: "flex" }}>
        <Avatar
          alt="Remy Sharp"
          src="http://sc01.alicdn.com/kf/HTB1jA_RXrj1gK0jSZFuq6ArHpXab.jpg"
          style={{ marginRight: 15 }}
        />
        <div>
          <h1 style={{ margin: "0" }}>Aryan Teng</h1>
          <p style={{ margin: "0", fontSize: "0.8rem" }}>online</p>
        </div>
      </div>
      <div
        style={{ display: "flex", marginRight: "2rem", alignItems: "center" }}
      >
        <IconButton style={{ color: "#AEBAC1" }}>
          <SearchIcon />
        </IconButton>
        <IconButton style={{ color: "#AEBAC1" }}>
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatViewHeader;
