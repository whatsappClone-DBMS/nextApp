import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { Avatar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import BlockIcon from "@mui/icons-material/Block";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import Chats from "../AllChats/Chats";

function Setting({ uid }) {
  const [user, setUser] = useState();
  const [archived, setArchived] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [isArchived, setIsArchived] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const getUserDetails = async () => {
    if (uid) {
      const response = await fetch(`http://localhost:3000/api/user/${uid}`);
      const data = await response.json();
      console.log("User Details", data);
      setUser(data[0]);
    }
  };
  const getArchived = async () => {
    if (uid) {
      const response = await fetch(
        `http://localhost:3000/api/user/archived?uid=${uid}`
      );
      const data = await response.json();
      if (data) {
        setArchived(data[0].archived);
      }
      console.log("mdrfkr", archived);
    }
  };
  const getBlocked = async () => {
    if (uid) {
      const response = await fetch(
        `http://localhost:3000/api/user/blocked?uid=${uid}`
      );
      const data = await response.json();
      if (data) {
        setBlocked(JSON.parse(data[0].blocked));
      }
      console.log("mdrfkr2", blocked);
    }
  };
  const router = useRouter();
  const { dmId } = router.query;
  useEffect(() => {
    console.log("uid", uid);
    getUserDetails();
    getArchived();
    getBlocked();
  }, [uid]);

  return (
    <div className={styles.settingContainer}>
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
            Settings
          </p>
        </div>
      </div>
      <div className={styles.body}>
        <div
          className={styles.userData}
          onClick={() => {
            router.push(`/profile?uid=${uid}&dmId=${dmId}`);
          }}
        >
          <Avatar
            alt={user?.name ?? "Your Name"}
            src={
              user?.imgSrc ??
              "https://www.gravatar.com/avatar/82dd46c8fcb52e72641a80159b8e94e8.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
            }
            sx={{ width: 80, height: 80, cursor: "pointer" }}
          />
          <div style={{ flex: "1", marginLeft: "1rem" }}>
            <h1>{user?.name ?? "Your Name"}</h1>
            <p>{user?.status ?? "Your Status"}</p>
          </div>
        </div>
        <div className={styles.option} onClick={() => setIsBlocked(!isBlocked)}>
          <BlockIcon />
          <h3>Blocked</h3>
        </div>
        {isBlocked && (
          <div className={styles.chatsContainer}>
            <div style={{ paddingTop: 5 }}>
              {!blocked ? (
                <Loading />
              ) : (
                blocked?.map((item) => {
                  return (
                    <div>
                      <Chats uid={item} flag={true} />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
        <div
          className={styles.option}
          onClick={() => setIsArchived(!isArchived)}
        >
          <VolumeMuteIcon />
          <h3>Archived Chats</h3>
        </div>
        {isArchived && <div>hi</div>}
      </div>
    </div>
  );
}

export default Setting;
