import React, { useState } from "react";
import styles from "./styles.module.css";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { useRouter } from "next/router";
import Link from "next/link";

function LogIn() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    if (mobileNumber != "" && password != "") {
      if (mobileNumber.length == 10) {
        const response = await fetch(
          `http://localhost:3000/api/login/${mobileNumber}`
        );
        const data = await response.json();
        console.log(data);

        if (!data) {
          setError("User Does Not Exist. Please Sign Up!");
        }
        if (data[0]?.password == password) {
          router.push(`/home?uid=${data[0].uID}`);
          setError("");
        } else {
          setError("Incorrect Password!");
        }
        if (!data[0]) {
          setError("User Does Not Exist. Please Sign Up!");
        }
      } else {
        setError("Your Mobile Number needs to be exactly 10 digits long!");
      }
    } else {
      setError("Please Enter your credentials!");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Login</h1>
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
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <VisibilityIcon sx={{ fontSize: "1.5rem" }} />
          </div>
        </div>
        <Link href="/signup">
          <p>
            Don't Have An Account?{" "}
            <span>
              <a style={{ textDecoration: "underline 1px" }}>Sign Up</a>
            </span>
          </p>
        </Link>
        <button className={styles.button} onClick={handleLogin}>
          <h3>Login</h3>
        </button>
        <p style={{ textAlign: "center", color: "#08A684" }}>{error}</p>
      </div>
    </div>
  );
}

export default LogIn;

export async function getServerSideProps() {
  //   Fetch data from external API
  //   const response = await fetch(`http://localhost:3000/api/login/${9899659815}`);
  //   const data = await response.json();
  //   return { props: { data } };
}
