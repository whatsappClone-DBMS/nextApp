import React from 'react'
import styles from "./styles.module.css";
import { Avatar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


function ContactInfo() {
  return (
    <div className={styles.container}>
        <div className={styles.navbar}>
            <CloseIcon sx={{marginLeft:"1rem", marginRight:"1rem", fontSize:"1rem"}}/>
            <h3>Contact Info</h3>
        </div>
        <div className={styles.box1}>
            <Avatar
            alt="Remy Sharp"
            src={"http://sc01.alicdn.com/kf/HTB1jA_RXrj1gK0jSZFuq6ArHpXab.jpg"}
            sx={{ width: 200, height: 200, cursor: "pointer" }}
            style={{ marginLeft: "auto", marginRight: "auto" }}/>
            <h1>Avi Vashishta IIITD</h1>
            <p style={{color:"#8696A0", marginTop:"-1rem"}}>+91 98996 59815</p>
        </div>
        <div className={styles.box2}>
            <p style={{color:"#8696A0"}}>About</p>
            <h3>Don't study me, you won't graduate!</h3>
        </div>
    </div>
  )
}

export default ContactInfo