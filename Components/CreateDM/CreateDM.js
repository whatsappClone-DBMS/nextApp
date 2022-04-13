import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { Avatar, Button, IconButton, TextField } from "@mui/material";
import Input from "@mui/material/Input";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { useRouter } from "next/router";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CreateGroup from "./CreateGroup";

function CreateDMComponent({ uid }) {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const createChat = async () => {
    if (number != "") {
      var flag = true;
      const response = await fetch(`http://localhost:3000/api/login/${number}`);
      const data = await response.json();
      if (data[0]) {
        // Check if chats already exists and uid is not the same!
        if (data[0]?.uID != uid) {
          const response2 = await fetch(
            `http://localhost:3000/api/chats/dm?uid=${data[0]?.uID}`
          );
          const data2 = await response2.json();

          data2.map((dm) => {
            if (
              (dm.uid1 == uid && dm.uid2 == data[0].uID) ||
              (dm.uid2 == uid && dm.uid1 == data[0].uID)
            ) {
              flag = false;
              router.push(`/home?uid=${uid}&dmId=${dm.dmID}`);
              setError("You already have a chat with this user!");
            }
          });
        } else {
          setError("Cannot create a chat with yourself!");
        }

        if (flag) {
          //Create DM
          const response3 = await fetch(
            `http://localhost:3000/api/create?uid1=${uid}&uid2=${data[0]?.uID}`
          );
          const data3 = await response3.json();

          if (data3) {
            router.push(`/home?uid=${uid}&dmId=${data3}`);
          }
        }
        // router.push(`/chat?uid=${uid}&dmId=${data[0].dmID}`);
      } else {
        setError("User Does not exist");
      }
    }
  };

  return (
    <div className={styles.chatsContainer}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <IconButton
            onClick={() => {
              router.push(`/home?uid=${uid}`);
            }}
          >
            <ArrowBackIcon sx={{ cursor: "pointer", color: "#D9DEE0" }} />
          </IconButton>
          <p
            style={{
              marginLeft: "1rem",
              fontSize: "1.2rem",
              color: "#D9DEE0",
            }}
          >
            Compose Message
          </p>
        </div>
      </div>
      <div className={styles.body}>
        <p style={{ marginTop: 0, textAlign: "center", lineHeight: 2 }}>
          Create A New DM
        </p>
        <div
          className={styles.input}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <p style={{ margin: 0, marginRight: "0.7rem" }}>+91</p>
          <input
            type="text"
            placeholder="Enter Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className={styles.input}
            style={{ border: "none", padding: 0 }}
          />
        </div>

        <div
          className={styles.btn}
          onClick={() => {
            createChat();
          }}
        >
          Start Chatting
        </div>
        <p style={{ textAlign: "center", color: "#04a784" }}>{error}</p>
        <CreateGroup uid={uid} />
      </div>
    </div>
  );
}

export default CreateDMComponent;
