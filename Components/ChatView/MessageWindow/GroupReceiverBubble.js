import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

function GroupReceiverBubble({ uid, message, time }) {
  const [user, setUser] = useState({});
  const getUserDetails = async () => {
    if (uid) {
      const response = await fetch(`http://localhost:3000/api/user/${uid}`);
      const data = await response.json();
      setUser(data[0]);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [uid]);

  return (
    <div className={styles.groupReceiverBubble}>
      <div
        style={{
          margin: "0",
          fontSize: "0.9rem",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ margin: "0", color: "#FC9775" }}>{user?.name}</p>
        <p
          style={{
            marginLeft: 10,
            fontSize: "0.6rem",
            opacity: 0.7,
          }}
        >
          {time}
        </p>
      </div>
      {message}
    </div>
  );
}

export default GroupReceiverBubble;
