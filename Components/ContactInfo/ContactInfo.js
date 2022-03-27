import React, { useState, useEffect} from 'react'
import styles from "./styles.module.css";
import { Avatar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


function ContactInfo({uid2}) {
  const [user, setUser] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const getContactInfo = async() => {
    if(uid2){
      const response = await fetch(`http://localhost:3000/api/user/${uid2}`);
      const data = await response.json();
      console.log("aryan", data[0]);
      setUser(data[0]);
    }
  };
  const getMobileNumber = async() => {
    if(uid2){
      const response = await fetch(`http://localhost:3000/api/user/users`);
      const data = await response.json();
      for(let i = 0; i < data.length; i++){
        if (data[i]["uID"] === 1){
          console.log('oye', data[i]["mobileNumber"])
          setMobileNumber(data[i]["mobileNumber"])
        }
      }
    }
  }
  useEffect(() => {
    getContactInfo();
    getMobileNumber();
  }, [uid2]);
  
  return (
    <div className={styles.container}>
        <div className={styles.navbar}>
            <CloseIcon sx={{marginLeft:"1rem", marginRight:"1rem", fontSize:"1rem"}}/>
            <h3>Contact Info</h3>
        </div>
        <div className={styles.box1}>
            <Avatar
            alt={user?.name ?? "Your Name"}
            src = {user?.imgSrc ?? "http://sc01.alicdn.com/kf/HTB1jA_RXrj1gK0jSZFuq6ArHpXab.jpg"}
            sx={{ width: 200, height: 200, cursor: "pointer" }}
            style={{ marginLeft: "auto", marginRight: "auto" }}/>
            <h1>{user?.name?? "Name"}</h1>
            <p style={{color:"#8696A0", marginTop:"-1rem"}}>{mobileNumber?? "Your Number"}</p>
        </div>
        <div className={styles.box2}>
            <p style={{color:"#8696A0"}}>About</p>
            <h3>{user?.status?? "Status"}</h3>
        </div>
    </div>
  )
}

export default ContactInfo