import React from "react";
import styles from "./styles.module.css";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";


function SenderBubble({ message, time, mId, dmId }) {
  return (
    <div className={styles.senderBubble}>
      {message}
      <span style={{ marginLeft: 10, fontSize: "0.55rem", opacity: 0.7 }}>
        {time}
      </span>
      <span className={styles.dropdown}>
        <IconButton style={{ color: "#AEBAC1" }}>
          <KeyboardArrowDownIcon
            style={{ marginRight: 10, fontSize: "0.55rem", opacity: 0.7 }}
          />
          <div className={styles.dropdownContent}>
            <Link href={`/api/chats/deleteMessage?mId=${mId}&dmId=${dmId}`}>
              Delete For Everyone
            </Link>
          </div>
        </IconButton>
      </span>
    </div>
  );
}

export default SenderBubble;
