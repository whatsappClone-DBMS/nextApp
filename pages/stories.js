import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import styles from '../styles/Home.module.css'
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import StoryComponent from "../Components/Story/StoryComponent"
import { useRouter } from "next/router";


function Story() {
  const [user, setUser] = useState();
  const router = useRouter();
  const {uid} = router.query;
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
    <div className={styles.wrapper}>
        <div className={styles.storyContainer}>
            <div className={styles.storyHeader}>
                <Avatar
                alt={user?.name?? "Your Name"}
                src={user?.imgSrc?? "https://www.gravatar.com/avatar/82dd46c8fcb52e72641a80159b8e94e8.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"}
                sx={{ width: 40, height: 40, cursor: "pointer" }}/>
                <p style={{marginLeft:"0.5rem"}}>My Status</p>
            </div>
            <p style={{marginLeft:"0.5rem"}}>Recent</p>
            <StoryComponent/>
            <StoryComponent/>
            <StoryComponent/>
            <StoryComponent/>
            <StoryComponent/>
            <StoryComponent/>
            <StoryComponent/>
            <StoryComponent/>
            <StoryComponent/>
        </div>
        <div style={{marginTop:"1rem"}}></div>
        <div className={styles.storyPage}>
            <div style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center",
                marginTop:"22rem"
            }}>
                <CircleOutlinedIcon sx = {{fontSize:"7rem", color:"#6D7275"}}/>
                <p style={{color:"#919597", fontSize:"1rem"}}>Click on a contact to view their status updates</p>
            </div>
        </div>
    </div>
  )
}

export default Story