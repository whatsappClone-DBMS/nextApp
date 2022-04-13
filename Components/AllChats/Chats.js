import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
function Chats({ uid, flag, dmID }) {
  const [user, setUser] = useState({});
  const router = useRouter();
  const { dmId } = router.query;

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

  useEffect(() => {
    if (dmId && dmID == dmId) {
      flag = true;
    }
  }, [dmId]);

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
        {flag ? <></> : <p className={styles.message}>Click To Open</p>}
      </div>
      <div className={styles.timeFlex}>
        {flag ? (
          <></>
        ) : (
          <>
            <p className={styles.time}>11:30 pm</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Chats;
