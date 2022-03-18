import React from "react";
import styles from "./styles.module.css";

function Header() {
  return (
    <div className={styles.container}>
      <img
        src="/assets/Icon.svg"
        height="50px"
        style={{ marginRight: 20, marginLeft: 20 }}
      ></img>
      <h1 style={{ marginLeft: "5px" }}>WhatsApp</h1>
    </div>
  );
}

export default Header;
