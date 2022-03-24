import React from 'react'
import Avatar from "@mui/material/Avatar";
import styles from '../styles/Home.module.css'
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";


function Story() {
  return (
    <div className={styles.wrapper}>
        <div className={styles.storyContainer}>
            <div className={styles.storyHeader}>
                <Avatar
                alt="Remy Sharp"
                src={"http://sc01.alicdn.com/kf/HTB1jA_RXrj1gK0jSZFuq6ArHpXab.jpg"}
                sx={{ width: 40, height: 40, cursor: "pointer" }}/>
                <p style={{marginLeft:"0.5rem"}}>My Status</p>
            </div>
        </div>
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