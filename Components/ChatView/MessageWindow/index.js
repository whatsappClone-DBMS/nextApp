import React from "react";
import styles from "./styles.module.css";
import ReceiverBubble from "./ReceiverBubble";
import SenderBubble from "./SenderBubble";

function MessageWindow() {
  return (
    <div className={styles.container}>
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
    </div>
  );
}

export default MessageWindow;
