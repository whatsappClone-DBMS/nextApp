import React from "react";
import styles from "./styles.module.css";

function ReceiverBubble({ message, time }) {
  return (
    <div className={styles.receiverBubble}>
      {message}
      <span style={{ marginLeft: 10, fontSize: "0.55rem", opacity: 0.7 }}>
        {time}
      </span>
    </div>
  );
}

export default ReceiverBubble;
