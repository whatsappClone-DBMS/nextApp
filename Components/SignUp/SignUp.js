import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import styles from './styles.module.css'
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';


function SignUp() {
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1>Sign Up</h1>
            <div className={styles.input}>
                <h3>Full Name</h3>
                <div className={styles.inputBox}>
                    <PersonIcon sx={{fontSize:"1.5rem"}}/>
                    <input placeholder="Full Name"></input>
                </div>
            </div>
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
            <div className={styles.input}>
                <h3>Confirm Password</h3>
                <div className={styles.inputBox}>
                    <LockIcon sx={{fontSize:"1.5rem"}}/>
                    <input placeholder="Confirm Password" type="password"></input>
                    <VisibilityIcon sx={{fontSize:"1.5rem"}}/>
                </div>
            </div>
            <button style={{marginTop:"2rem"}} className={styles.button}><h3>Sign Up</h3></button>
        </div>
    </div>
  )
}

export default SignUp