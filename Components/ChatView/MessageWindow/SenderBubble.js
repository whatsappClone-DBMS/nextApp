import React, { useState } from "react";
import styles from "./styles.module.css";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Link from "next/link";
import { useRouter } from "next/router";

function SenderBubble({ message, time, mId, dmId }) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  function toggle() {
    setShow(!show);
  }

  const deleteMessage = async () => {
    setShow(!show);
    const responseDM = await fetch(
      `http://localhost:3000/api/chats/deleteMessage?mId=${mId}&dmId=${dmId}`
    );
    router.reload();
    const data = await responseDM.json();
  };

  return (
    <div className={styles.senderBubble}>
      {message}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ marginLeft: 10, fontSize: "0.55rem", opacity: 0.7 }}>
          {time}
        </span>
        <span className={styles.dropdown}>
          <IconButton style={{ color: "#AEBAC1" }} onClick={toggle}>
            <KeyboardArrowDownIcon
              style={{ fontSize: "0.6rem", opacity: 0.7 }}
            />
            <div
              className={styles.dropdownContent}
              style={{ display: show ? "block" : "none" }}
              onClick={deleteMessage}
            >
              <Link href="#" passHref={true}>
                Unsend
              </Link>
            </div>
          </IconButton>
        </span>
      </div>
    </div>
  );
}

export default SenderBubble;
