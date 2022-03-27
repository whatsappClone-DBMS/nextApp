import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/router";

function ChatViewHeader({ uid, dmId }) {
  const [user, setUser] = useState({});
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
    }
  };

  useEffect(() => {
    console.log("uid", uid);
    getUserDetails();
  }, [dmId]);

  return (
    <div className={styles.container}>
      <div style={{ display: "flex" }}
      onClick={()=>{
        router.push(`contact-info?uid=${uid}&uid2=${user?.uID}`)
      }
      }
      >
        <Avatar
          alt={user?.name ?? "Name"}
          src={
            user?.imgSrc ??
            "http://sc01.alicdn.com/kf/HTB1jA_RXrj1gK0jSZFuq6ArHpXab.jpg"
          }
          style={{ marginRight: 15 }}
        />
        <div>
          <h1 style={{ margin: "0" }}>{user?.name ?? "Name"}</h1>
          <p style={{ margin: "0", fontSize: "0.8rem" }}>online</p>
        </div>
      </div>
      <div
        style={{ display: "flex", marginRight: "2rem", alignItems: "center" }}
      >
        <IconButton style={{ color: "#AEBAC1" }}>
          <SearchIcon />
        </IconButton>
        <IconButton style={{ color: "#AEBAC1" }}>
          <MoreVertIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatViewHeader;
