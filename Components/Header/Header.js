import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

function Header() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <img
          src="/assets/Icon.svg"
          height="50px"
          style={{ cursor: "pointer" }}
        />
      </Link>
      <Link href="/">
        <h1 style={{ marginLeft: "10px", cursor: "pointer" }}>WhatsApp</h1>
      </Link>
    </div>
  );
}

export default Header;
