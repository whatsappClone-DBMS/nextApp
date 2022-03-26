import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Avatar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";

function Profile({ uid }) {
  const [user, setUser] = useState({});
  const router = useRouter();
  const getUserDetails = async () => {
    if (uid) {
      const response = await fetch(`http://localhost:3000/api/user/${uid}`);
      const data = await response.json();
      console.log("User Detailsss", data);
      setUser(data[0]);
    }
  };

  useEffect(() => {
    console.log("uid", uid);
    getUserDetails();
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
            <ArrowBackIcon sx={{ cursor: "pointer" }} />
          </IconButton>
          <p
            style={{
              marginLeft: "1rem",
              fontSize: "1.2rem",
              color: "#fff",
              opacity: "0.6",
            }}
          >
            Profile
          </p>
        </div>
      </div>
      <div className={styles.body}>
        <Avatar
          alt={user?.name ?? "Your Name"}
          src={
            user?.imgSrc ??
            "http://sc01.alicdn.com/kf/HTB1jA_RXrj1gK0jSZFuq6ArHpXab.jpg"
          }
          sx={{ width: 200, height: 200, cursor: "pointer" }}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
        <p style={{ color: "#025D4B" }}>Your name</p>
        <div className={styles.editInfo}>
          {user?.name ?? "Aryan Teng"}
          <EditIcon sx={{ cursor: "pointer" }} />
        </div>
        <p
          style={{
            opacity: "0.7",
            fontSize: "0.85rem",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          This is not your username or pin. This name will be visible to your
          WhatsApp contacts.
        </p>
        <p style={{ color: "#025D4B" }}>About</p>
        <div className={styles.editInfo}>
          {user?.status ?? "Hi There! I'm Using WhatsApp!"}
          <EditIcon sx={{ cursor: "pointer" }} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
