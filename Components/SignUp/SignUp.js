import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import styles from "./styles.module.css";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { useRouter } from "next/router";

function SignUp() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSignUp = async () => {
    if (mobileNumber != "" && password != "" && confirmPassword != "") {
      if (password != confirmPassword) {
        setError("Passwords Do Not Match!");
      } else {
        if (mobileNumber.length == 10) {
          const response = await fetch(
            `http://localhost:3000/api/signup?mobileNumber=${mobileNumber}&password=${password}`
          );
          const data = await response.json();
          console.log("signupppp", data);

          if (!data) {
            setError("User Does Not Exist. Please Sign Up!");
          }
        } else {
          setError("Your Mobile Number needs to be exactly 10 digits long!");
        }
      }
    } else {
      setError("Please Enter your credentials!");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* <h1>Sign Up</h1>
        <div className={styles.input}>
          <h3>Full Name</h3>
          <div className={styles.inputBox}>
            <PersonIcon sx={{ fontSize: "1.5rem" }} />
            <input placeholder="Full Name"></input>
          </div>
        </div> */}
        <div className={styles.input}>
          <h3>Mobile Number</h3>
          <div className={styles.inputBox}>
            <PhoneIphoneIcon sx={{ fontSize: "1.5rem" }} />
            <input
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Mobile Number"
            ></input>
          </div>
        </div>
        <div className={styles.input}>
          <h3>Password</h3>
          <div className={styles.inputBox}>
            <LockIcon sx={{ fontSize: "1.5rem" }} />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            ></input>
            <VisibilityIcon sx={{ fontSize: "1.5rem" }} />
          </div>
        </div>
        <div className={styles.input}>
          <h3>Confirm Password</h3>
          <div className={styles.inputBox}>
            <LockIcon sx={{ fontSize: "1.5rem" }} />
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              type="password"
            ></input>
            <VisibilityIcon sx={{ fontSize: "1.5rem" }} />
          </div>
        </div>
        <button
          style={{ marginTop: "2rem" }}
          className={styles.button}
          onClick={handleSignUp}
        >
          <h3>Sign Up</h3>
        </button>
        <p style={{ textAlign: "center", color: "#08A684" }}>{error}</p>
      </div>
    </div>
  );
}

export default SignUp;
