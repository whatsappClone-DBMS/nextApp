import React from 'react'
import { Avatar } from "@mui/material";
import styles from "./styles.module.css";

function StoryComponent() {
  return (
    <div className={styles.component}>
      <Avatar
          alt="Remy Sharp"
          src={"https://www.gravatar.com/avatar/82dd46c8fcb52e72641a80159b8e94e8.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"}
          sx={{ width: 40, height: 40, cursor: "pointer" }}/>
      <div className={styles.nameFlex} style={{marginLeft:"0.5rem"}}>
        <p className={styles.name}>Aryan Teng</p>
        <p className={styles.message}>today at 10:20 pm</p>
      </div>
    </div>
  )
}

export default StoryComponent