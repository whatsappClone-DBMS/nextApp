import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Avatar from "@mui/material/Avatar";
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { useRouter } from "next/router";
import Link from "next/link";

function AllChatsHeader({ uid }) {
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
    <div className={styles.header}>
      <IconButton>
        <Avatar
          alt={user?.name}
          src={
            user?.imgSrc ??
            "http://sc01.alicdn.com/kf/HTB1jA_RXrj1gK0jSZFuq6ArHpXab.jpg"
          }
        />
      </IconButton>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton style={{ color: "#AEBAC1" }}>
          <ChatIcon />
        </IconButton>
        <IconButton style={{ color: "#AEBAC1" }}>
          <CircleOutlinedIcon />
        </IconButton>
        <div className={styles.dropdown}>
          <IconButton style={{ color: "#AEBAC1" }}>
            <KeyboardArrowDownIcon />
            <div className={styles.dropdownContent}>
              <Link href="#">Settings</Link>
              <Link href={`/profile?uid=${uid}`}>Profile</Link>
              <Link href="/">Logout</Link>
            </div>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default AllChatsHeader;
