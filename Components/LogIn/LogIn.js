import React from 'react'
import styles from './styles.module.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';


function LogIn() {
  return (
    <div className={styles.container}>
        <h1>Log In</h1>
        <div className={styles.input}>
            <h3>Username</h3>
            <input className={styles.inputBox} placeholder="Username">
                <PersonOutlineIcon/>
            </input>
        </div>
        <div className={styles.input}>
            <h3>Password</h3>
            <input className={styles.inputBox} placeholder="Password">
                <LockIcon/>
                <VisibilityIcon/>
            </input>
        </div>
    </div>
  )
}

export default LogIn