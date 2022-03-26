import React from "react";
import styles from "./styles.module.css";
import Avatar from "@mui/material/Avatar";
import ChatIcon from "@mui/icons-material/Chat";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import RateReviewIcon from '@mui/icons-material/RateReview';


function AllChatsHeader() {
  return (
    <div className={styles.header}>
      <IconButton>
        <Avatar
          alt="Remy Sharp"
          src="http://sc01.alicdn.com/kf/HTB1jA_RXrj1gK0jSZFuq6ArHpXab.jpg"
        />
      </IconButton>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton style={{ color: "#AEBAC1" }}>
          <CircleOutlinedIcon />
        </IconButton>
        <IconButton style={{ color: "#AEBAC1" }}>
          <RateReviewIcon/>
        </IconButton>
        <IconButton style={{ color: "#AEBAC1" }}>
          <KeyboardArrowDownIcon sx={{fontSize:"1.8rem"}}/>
        </IconButton>
      </div>
    </div>
  );
}

export default AllChatsHeader;
