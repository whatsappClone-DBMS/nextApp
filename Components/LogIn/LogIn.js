import React from 'react'
import styles from './styles.module.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';


function LogIn() {
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1>Login</h1>
            <div className={styles.input}>
                <h3>Username</h3>
                <div className={styles.inputBox}>
                    <PersonOutlineIcon sx={{fontSize:"1.5rem"}}/>
                    <input placeholder="Username"></input>
                </div>
            </div>
            <div className={styles.input}>
                <h3>Password</h3>
                <div className={styles.inputBox}>
                    <LockIcon sx={{fontSize:"1.5rem"}}/>
                    <input placeholder="Password" type="password"></input>
                    <VisibilityIcon sx={{fontSize:"1.5rem"}}/>
                </div>
            </div>
            <p>Don't Have An Account? <span><a>Sign Up</a></span></p>
            <button className={styles.button}><h3>Login</h3></button>
        </div>
    </div>
  )
}

export default LogIn