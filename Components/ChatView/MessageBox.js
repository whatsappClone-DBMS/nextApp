import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import FavoriteIcon from "@mui/icons-material/Favorite";

function MessageBox({ sender, dmId, gId }) {
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const [mId, setMId] = useState("");
  const router = useRouter();

  const sendMessage = async () => {
    if (message != "" && dmId) {
      const today = new Date();
      const response = await fetch(
        `http://localhost:3000/api/chats/messages?sender=${sender}&receiver=${receiver}&text=${message}&date=${formatDate()}&time=${
          today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        }&dmId=${dmId}`
      );
      setMessage("");
      router.reload();
      const data = await response.json();
      // if (data) {
      setMId(data[0]?.mID);
      // addMId(data[0].mID);
      // }
    } else if (message != "" && gId) {
      const today = new Date();
      const response = await fetch(
        `http://localhost:3000/api/chats/messages?sender=${sender}&receiver=${-1}&text=${message}&date=${formatDate()}&time=${
          today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        }&gId=${gId}`
      );
      setMessage("");
      router.reload();
      const data = await response.json();
      setMId(data[0]?.mID);
    }
  };

  useEffect(async () => {
    if (dmId) {
      const responseDM = await fetch(
        `http://localhost:3000/api/chats/dm?dmId=${dmId}`
      );
      const DMdata = await responseDM.json();
      var uid2;
      // if (DMdata[0]){
      //   if(uid === DMdata[0].uid1){
      //     uid2 = DMdata[0].uid2;
      //   }
      //   else{
      //     uid2 = DMdata[0].uid1;
      //   }
      // }
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
      <IconButton
        onClick={() => {
          setMessage("??????");
          sendMessage();
        }}
      >
        <FavoriteIcon sx={{ marginRight: "1rem", color: "#E80758" }} />
      </IconButton>
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
