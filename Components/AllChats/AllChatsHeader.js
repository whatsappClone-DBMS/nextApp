import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Avatar from "@mui/material/Avatar";
import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { useRouter } from "next/router";
import Link from "next/link";
import RateReviewIcon from "@mui/icons-material/RateReview";
import HomeIcon from "@mui/icons-material/Home";

function AllChatsHeader({ uid }) {
  const [user, setUser] = useState({});
  const router = useRouter();
  const { dmId } = router.query;
  const today = new Date();

  const getUserDetails = async () => {
    if (uid) {
      const response = await fetch(`http://localhost:3000/api/user/${uid}`);
      const data = await response.json();

      setUser(data[0]);
    }
  };

  const logout = async () => {
    if (uid) {
      const response = await fetch(
        `http://localhost:3000/api/logout?uid=${uid}&time=${
          today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        }`
      );
      router.push(`/`);
      const data = await response.json();
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [uid]);
  return (
    <div className={styles.header}>
      <IconButton
        onClick={() => {
          router.push(`/profile?uid=${uid}&dmId=${dmId}`);
        }}
      >
        <Avatar
          alt={user?.name}
          src={
            user?.imgSrc ??
            "https://www.gravatar.com/avatar/82dd46c8fcb52e72641a80159b8e94e8.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
          }
        />
      </IconButton>

      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          style={{ color: "#AEBAC1" }}
          onClick={() => {
            router.push(`/home?uid=${uid}`);
          }}
        >
          <HomeIcon />
        </IconButton>
        <IconButton
          style={{ color: "#AEBAC1" }}
          onClick={() => {
            router.push(`/groups?uid=${uid}`);
          }}
        >
          <PeopleIcon />
        </IconButton>
        <IconButton
          style={{ color: "#AEBAC1" }}
          onClick={() => {
            router.push(`/stories?uid=${uid}`);
          }}
        >
          <CircleOutlinedIcon />
        </IconButton>
        <IconButton
          style={{ color: "#AEBAC1" }}
          onClick={() => {
            router.push(`/create-dm?uid=${uid}`);
          }}
        >
          <RateReviewIcon />
        </IconButton>
        <div className={styles.dropdown}>
          <IconButton style={{ color: "#AEBAC1" }}>
            <KeyboardArrowDownIcon />
            <div className={styles.dropdownContent}>
              <Link href={`/settings?uid=${uid}&dmId=${dmId}`}>Settings</Link>
              <Link href={`/profile?uid=${uid}&dmId=${dmId}`}>Profile</Link>
              <p
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </p>
            </div>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default AllChatsHeader;
