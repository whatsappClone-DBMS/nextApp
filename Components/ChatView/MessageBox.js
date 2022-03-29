import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";

function MessageBox({ sender, dmId }) {
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const router = useRouter();

  const sendMessage = async () => {
    if (message != "") {
      const today = new Date();
      const response = await fetch(
        `http://localhost:3000/api/chats/messages?sender=${sender}&receiver=${receiver}&text=${message}&date=${formatDate()}&time=${
          today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        }`
      );
      const data = await response.json();
      if (data[0]) {
        const response2 = await fetch(
          `http://localhost:3000/api/chats/dm?dmId=${dmId}&mId=${data[0]}`
        );
        const data2 = await response2.json();
        if (data2[0]) {
          router.reload();
        }
      }
      setMessage("");
    }
  };

  useEffect(async () => {
    if (dmId) {
      const responseDM = await fetch(
        `http://localhost:3000/api/chats/dm?dmId=${dmId}`
      );
      const DMdata = await responseDM.json();
      console.log("hi2", DMdata);
      var uid2;

      DMdata[0]?.uid1 == sender
        ? (uid2 = DMdata[0]?.uid2)
        : (uid2 = DMdata[0]?.uid1);

      setReceiver(uid2);
    }
  }, [dmId]);

  function formatDate() {
    var d = new Date(),
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
        <SendIcon
          sx={{ marginLeft: "-1.5rem", marginRight: "1rem", color: "#7B8B95" }}
        />
      </IconButton>
    </div>
  );
}

export default MessageBox;
