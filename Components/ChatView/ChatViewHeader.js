import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Avatar } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";
import Link from "next/link";

function ChatViewHeader({ uid, dmId, gId }) {
  const [user, setUser] = useState({});
  const [group, setGroup] = useState({});
  const router = useRouter();
  const getUserDetails = async () => {
    if (dmId) {
      const responseDM = await fetch(
        `http://localhost:3000/api/chats/dm?dmId=${dmId}`
      );
      const DMdata = await responseDM.json();
      console.log("hi2", DMdata);
      var uid2;
      // if (DMdata[0]){
      //   if(uid === DMdata[0].uid1){
      //     uid2 = DMdata[0].uid2;
      //   }
      //   else{
      //     uid2 = DMdata[0].uid1;
      //   }
      // }
      DMdata[0]?.uid1 == uid
        ? (uid2 = DMdata[0]?.uid2)
        : (uid2 = DMdata[0]?.uid1);
      // const uid2 = (uid == DMdata[0]?.uid1 ? DMdata[0]?.uid2 : DMdata[0]?.uid1);
      if (uid2) {
        const response = await fetch(`http://localhost:3000/api/user/${uid2}`);
        const data = await response.json();
        console.log("hi", data);
        setUser(data[0]);
      }
    } else if (gId) {
      const response = await fetch(
        `http://localhost:3000/api/chats/groups?gId=${gId}`
      );
      const data = await response.json();
      console.log("groups Data", data);
      setGroup(data[0]);
    }
  };

  const archiveUser = async () => {
    if (user) {
      const response = await fetch(
        `http://localhost:3000/api/user/archived?uid=${uid}&uid2=${user.uID}`
      );
      router.push(`/home?uid=${uid}`);
      const data = await response.json();
    }
  };
  const blockUser = async () => {
    if (user) {
      const response = await fetch(
        `http://localhost:3000/api/user/blocked?uid=${uid}&uid2=${user.uID}`
      );
      router.push(`/home?uid=${uid}`);
      const data = await response.json();
    }
  };

  useEffect(() => {
    console.log("uid", uid);
    getUserDetails();
  }, [dmId]);

  useEffect(() => {
    console.log("gId", gId);
    getUserDetails();
  }, [gId]);

  return (
    <div className={styles.container}>
      <div
        style={{ display: "flex", cursor: "pointer" }}
        onClick={() => {
          gId
            ? router.push(`contact-info?uid=${uid}&gId=${gId}`)
            : router.push(`contact-info?uid=${uid}&uid2=${user?.uID}`);
        }}
      >
        <Avatar
          alt={gId ? group?.gName : user?.name ?? "Name"}
          src={
            gId
              ? group?.imgSrc
              : user?.imgSrc ??
                "https://www.gravatar.com/avatar/82dd46c8fcb52e72641a80159b8e94e8.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
          }
          style={{ marginRight: 15, cursor: "pointer" }}
        />
        <div>
          <h1 style={{ margin: "0" }}>
            {gId ? group?.gName : user?.name ?? "Name"}
          </h1>
          <p style={{ margin: "0", fontSize: "0.8rem" }}>online</p>
        </div>
      </div>
      <div
        style={{ display: "flex", marginRight: "2rem", alignItems: "center" }}
      >
        <div className={styles.dropdown}>
          <IconButton style={{ color: "#AEBAC1" }}>
            <MoreVertIcon />
            <div className={styles.dropdownContent}>
              <p onClick={() => archiveUser()}>Archive</p>
              <p onClick={() => blockUser()}>Block</p>
            </div>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default ChatViewHeader;
