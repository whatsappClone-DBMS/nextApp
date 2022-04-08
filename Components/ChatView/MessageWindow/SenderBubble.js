import React from "react";
import styles from "./styles.module.css";

function SenderBubble({ message, time }) {
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
            <Link href={`/settings?uid=${uid}&dmId=${dmId}`}>
              Delete For Everyone
            </Link>
          </div>
        </IconButton>
      </span>
    </div>
  );
}

export default SenderBubble;
