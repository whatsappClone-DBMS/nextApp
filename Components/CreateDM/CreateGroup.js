import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { Avatar, Button, IconButton, TextField } from "@mui/material";
import Input from "@mui/material/Input";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { useRouter } from "next/router";
import AddIcon from "@mui/icons-material/Add";
import Chats from "../AllChats/Chats";

function CreateGroup({ uid }) {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [groupMembers, setGroupMembers] = useState([]);
  const addPerson = async () => {
    if (number != "") {
      var flag = true;
      const response = await fetch(`http://localhost:3000/api/login/${number}`);
      const data = await response.json();
      if (data[0]) {
        console.log("data of number", data);
        // Check if chats already exists and uid is not the same!
        if (data[0]?.uID != uid) {
          console.log("atif bkl", uid);
          setGroupMembers([...groupMembers, data[0].uID]);
        } else {
          setError("Cannot create a chat with yourself!");
        }

        // router.push(`/chat?uid=${uid}&dmId=${data[0].dmID}`);
      } else {
        setError("User Does not exist");
      }
    }
  };

  useEffect(() => {
    console.log("uid", uid);
  }, [uid]);

  return (
    <div style={{ width: "100%", marginTop: "2rem" }}>
      <p style={{ textAlign: "center", lineHeight: 2 }}>
        Or <br />
        Create A New Group
      </p>
      <div>
        <div
          className={styles.input}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <p style={{ margin: 0, marginRight: "0.7rem" }}>+91</p>
          <input
            type="text"
            placeholder="Enter Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className={styles.input}
            style={{ border: "none", padding: 0 }}
          />
          <IconButton style={{ border: "2px solid #3b4f5c" }}>
            <AddIcon style={{ color: "#3b4f5c", fontSize: "2rem" }} />
          </IconButton>
        </div>

        <div
          className={styles.btn}
          onClick={() => {
            // addPerson();
          }}
        >
          Create Group
        </div>
        {groupMembers.length > 0 &&
          groupMembers.map((member) => <Chats uid={member} />)}
        <p style={{ textAlign: "center", color: "#04a784" }}>{error}</p>
      </div>
    </div>
  );
}

export default CreateGroup;
