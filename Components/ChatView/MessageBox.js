import React from "react";
import styles from "./styles.module.css";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

function MessageBox({ sender, receiver }) {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (message != "") {
      const today = new Date();
      const response = await fetch(
        `http://localhost:3000/api/chats/messages?sender=${sender}&receiver=${receiver}&text=${message}&date=${formatDate(
          today
        )}&time=${
          today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        }`
      );
      const data = await response.json();
      setMessage("");
    }
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  return (
    <div className={styles.messageContainer}>
      <input
        className={styles.textMessage}
        style={{ marginRight: "2rem" }}
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <IconButton onClick={sendMessage}>
        <SendIcon sx={{ marginRight: "2rem" }} />
      </IconButton>
    </div>
  );
}

export default MessageBox;
