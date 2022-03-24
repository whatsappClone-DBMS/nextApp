import React from 'react'
import { Avatar } from "@mui/material";
import styles from "./styles.module.css";

function StoryComponent() {
  return (
    <div className={styles.component}>
      <Avatar
          alt="Remy Sharp"
          src={"http://sc01.alicdn.com/kf/HTB1jA_RXrj1gK0jSZFuq6ArHpXab.jpg"}
          sx={{ width: 40, height: 40, cursor: "pointer" }}/>
      <div className={styles.nameFlex} style={{marginLeft:"0.5rem"}}>
        <p className={styles.name}>Aryan Teng</p>
        <p className={styles.message}>today at 10:20 pm</p>
      </div>
    </div>
  )
}

export default StoryComponent