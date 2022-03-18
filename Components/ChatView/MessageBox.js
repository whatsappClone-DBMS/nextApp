import React from 'react'
import styles from "./styles.module.css";
import SendIcon from '@mui/icons-material/Send';


function MessageBox() {
  return (
    <div className={styles.messageContainer}>
        <input className={styles.textMessage}
        style={{marginLeft:"1rem"}}
        placeholder="Type a message"
        >
        </input>
        <SendIcon sx={{marginRight:"2rem"}}/>
    </div>
  )
}

export default MessageBox