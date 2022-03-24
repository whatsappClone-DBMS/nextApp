import React from 'react'
import Avatar from "@mui/material/Avatar";
import styles from '../styles/Home.module.css'


function Story() {
  return (
    <div>
        <div className={styles.storyContainer}>
            <div className={styles.storyHeader}>
                <Avatar
                alt="Remy Sharp"
                src={"http://sc01.alicdn.com/kf/HTB1jA_RXrj1gK0jSZFuq6ArHpXab.jpg"}
                sx={{ width: 50, height: 50, cursor: "pointer" }}
                style={{ marginLeft: "auto", marginRight: "auto" }}/>
            </div>
        </div>
    </div>
  )
}

export default Story