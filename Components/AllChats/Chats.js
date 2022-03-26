import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
function Chats({ uid }) {
  const [user, setUser] = useState({});
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
    <div
      className={styles.component}
      onClick={() => {
        console.log("dmID");
      }}
    >
      <Avatar
        alt={user?.name ?? "Name..."}
        src={user?.imgSrc ?? "Name..."}
        sx={{ width: 45, height: 45 }}
        style={{ marginRight: 15 }}
      />
      <div className={styles.nameFlex}>
        <p className={styles.name}>{user?.name ?? "Name..."}</p>
        <p className={styles.message}>Click To Open</p>
      </div>
      <div className={styles.timeFlex}>
        <p className={styles.time}>11:30 pm</p>
        <p className={styles.unread}>3</p>
      </div>
    </div>
  );
}

export default Chats;
