import React, {useState, useEffect} from "react";
import styles from "./styles.module.css";
import { Avatar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

function Profile({ uid }) {
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
    <div className={styles.chatsContainer}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <ArrowBackIcon sx={{ cursor: "pointer" }} />
          <p
            style={{
              marginLeft: "1rem",
              fontSize: "1.2rem",
              color: "#fff",
              opacity: "0.6",
            }}
          >
            Profile
          </p>
        </div>
      </div>
      <div className={styles.body}>
        <Avatar
          alt="Remy Sharp"
          src={user.imgSrc}
          sx={{ width: 200, height: 200, cursor: "pointer" }}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
        <p style={{ color: "#025D4B" }}>Your name</p>
        <div className={styles.editInfo}>
          {user.name}
          <EditIcon sx={{ cursor: "pointer" }} />
        </div>
        <p
          style={{
            opacity: "0.7",
            fontSize: "0.85rem",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          This is not your username or pin. This name will be visible to your
          WhatsApp contacts.
        </p>
        <p style={{ color: "#025D4B" }}>About</p>
        <div className={styles.editInfo}>
          {user.status}
          <EditIcon sx={{ cursor: "pointer" }} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
