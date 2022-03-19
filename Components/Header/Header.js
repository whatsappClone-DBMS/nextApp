import React from "react";
import styles from "./styles.module.css";

function Header() {
  return (
    <div className={styles.container}>
      <img
        src="/assets/Icon.svg"
        height="50px"
      ></img>
      <h1 style={{ marginLeft: "10px" }}>WhatsApp</h1>
    </div>
  );
}

export default Header;
