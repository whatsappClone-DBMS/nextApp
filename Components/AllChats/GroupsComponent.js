import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
function GroupsComponent({ gId }) {
  const [group, setGroup] = useState({});
  const getGroupDetails = async () => {
    if (gId) {
      const response = await fetch(
        `http://localhost:3000/api/groups?gId=${gId}`
      );
      const data = await response.json();
      console.log("groups Data", data);
      setGroup(data[0]);
    }
  };

  useEffect(() => {
    console.log("uid", gId);
    getGroupDetails();
  }, [gId]);

  return (
    <div
      className={styles.component}
      onClick={() => {
        console.log("dmID");
      }}
    >
      <Avatar
        alt={group?.name ?? "Name..."}
        src={group?.imgSrc ?? "Name..."}
        sx={{ width: 45, height: 45 }}
        style={{ marginRight: 15 }}
      />
      <div className={styles.nameFlex}>
        <p className={styles.name}>{group?.name ?? "Name..."}</p>
        <p className={styles.message}>Click To Open</p>
      </div>
      <div className={styles.timeFlex}>
        <p className={styles.time}>11:30 pm</p>
        <p className={styles.unread}>3</p>
      </div>
    </div>
  );
}

export default GroupsComponent;
