import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

function GroupReceiverBubble({ uid, message, time }) {
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
    <div className={styles.GroupReceiverBubble}>
      <>
        <p style={{ fontWeight: "bold" }}>{user?.name}</p>
        <br />
        {message}
      </>
      <span style={{ marginLeft: 10, fontSize: "0.55rem", opacity: 0.7 }}>
        {time}
      </span>
    </div>
  );
}

export default ReceiverBubble;
