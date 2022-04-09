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
  const router = useRouter();

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
            router.push("/home?uid=1");
          }}
        >
          Start Chatting
        </div>
      </div>
    </div>
  );
}

export default CreateDMComponent;
