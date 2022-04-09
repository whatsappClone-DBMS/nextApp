import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { Avatar, Button, IconButton, TextField } from "@mui/material";
import Input from "@mui/material/Input";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { useRouter } from "next/router";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

function CreateDMComponent({ uid }) {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const createChat = async () => {
    if (number != "") {
      const response = await fetch(`http://localhost:3000/api/login/${number}`);
      const data = await response.json();
      if (data) {
        console.log("data of number", data);
        // router.push(`/chat?uid=${uid}&dmId=${data[0].dmID}`);
      } else {
        setError("User Does not exist");
      }
    }
  };

  useEffect(() => {
    console.log("uid", uid);
  }, [uid]);

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
            Start A New Chat
          </p>
        </div>
      </div>
      <div className={styles.body}>
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
      </div>
    </div>
  );
}

export default CreateDMComponent;
