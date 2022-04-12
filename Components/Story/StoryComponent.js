import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import styles from "./styles.module.css";
import { useRouter } from "next/router";

function StoryComponent({ uid, imgSrc, seenBy, User }) {
  const [user, setUser] = useState({});
  const router = useRouter();

  const getUserDetails = async () => {
    if (uid) {
      const response = await fetch(`http://localhost:3000/api/user/${uid}`);
      const data = await response.json();
      setUser(data[0]);
    }
  };

  useEffect(() => {
    console.log("uid", uid);
    getUserDetails();
  }, [uid]);

  return (
    <div
      className={styles.component}
      onClick={() => {
        router.push(`/stories?uid=${User}&storyImg=${imgSrc}`);
      }}
    >
      <Avatar
        alt={user?.name ?? "Tony"}
        src={
          imgSrc ??
          "https://www.gravatar.com/avatar/82dd46c8fcb52e72641a80159b8e94e8.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
        }
        sx={{ width: 40, height: 40, cursor: "pointer" }}
      />
      <div className={styles.nameFlex} style={{ marginLeft: "0.5rem" }}>
        <p className={styles.name}>{user?.name ?? "Name"}</p>
        <p className={styles.message}>Recently Uploaded</p>
      </div>
    </div>
  );
}

export default StoryComponent;
