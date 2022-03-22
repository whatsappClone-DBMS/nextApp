import React from 'react'
import styles from './styles.module.css'
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

function LogIn() {
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1>Login</h1>
            <div className={styles.input}>
                <h3>Mobile Number</h3>
                <div className={styles.inputBox}>
                    <PhoneIphoneIcon sx={{fontSize:"1.5rem"}}/>
                    <input placeholder="Mobile Number"></input>
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
            <p>Don't Have An Account? <span><a style={{textDecoration:"underline 1px"}}>Sign Up</a></span></p>
            <button className={styles.button}><h3>Login</h3></button>
        </div>
    </div>
  )
}

export default LogIn