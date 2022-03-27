import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { Avatar, IconButton } from "@mui/material";
import Input from "@mui/material/Input";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { useRouter } from "next/router";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

function Profile({ uid }) {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Hi There! I'm Using WhatsApp!");
  const [imgSrc, setImgSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [disabled, setDisabled] = useState(true);
  const [show, setShow] = useState(false);
  const [disabled2, setDisabled2] = useState(true);
  const nameInput = useRef(null);

  const router = useRouter();
  const getUserDetails = async () => {
    if (uid) {
      const response = await fetch(`http://localhost:3000/api/user/${uid}`);
      const data = await response.json();
      console.log("User Details", data);
      setUser(data[0]);
      setName(data[0]?.name ?? "Avi");
      setStatus(data[0]?.status);
    }
  };

  const updateProfileData = async () => {
    if (name != "" && status != "") {
      const response = await fetch(
        `http://localhost:3000/api/profileData?uid=${user?.uID}&name=${name}&status=${status}`
      );
      const data = await response.json();
      if (data) {
        setUser(data[0]);
      } else {
        alert("Something went wrong.");
      }
    } else {
      setImgSrc(
        user?.imgSrc ??
          "https://www.gravatar.com/avatar/82dd46c8fcb52e72641a80159b8e94e8.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
      );
      setName(user?.name);
      setStatus(user?.status);
    }
  };

  const updateDP = async () => {
    console.log("kinshuk");
    if (name != "" && status != "") {
      const response = await fetch(
        `http://localhost:3000/api/profileData?uid=${user?.uID}&imgSrc=${imgSrc}`
      );
      const data = await response.json();
      if (data) {
        setUser(data[0]);
      } else {
        alert("Something went wrong.");
      }
    } else {
      setImgSrc(
        user?.imgSrc ??
          "https://www.gravatar.com/avatar/82dd46c8fcb52e72641a80159b8e94e8.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
      );
      setName(user?.name);
      setStatus(user?.status);
    }
  };

  const handleFileChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImgSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
    handleOnSubmit(changeEvent);
    // var file = e.target.files[0];

    // let reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = function () {
    //   setImgSrc(reader.result);
    // };
    // const form = event.currentTarget;
    // const fileInput = Array.from(form.elements).find(
    //   ({ name }) => name === "file"
    // );

    // var url = await uploadImage(file);
    // setImgSrc(url);
  };

  async function handleOnSubmit(event) {
    console.log("hehe");
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );
    const formData = new FormData();
    console.log("formDataaa", fileInput);

    for (const file of fileInput.files) {
      formData.append("file", file);
    }
    formData.append("upload_preset", "my-uploads");
    const data = await fetch(
      "https://api.cloudinary.com/v1_1/simply-sites1/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setImgSrc(data.secure_url);
    setUploadData(data);
    updateDP();
  }

  useEffect(() => {
    console.log("uid", uid);
    getUserDetails();
  }, [uid]);

  return (
    <div className={styles.chatsContainer}>
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <IconButton
            onClick={() => {
              router.push(`/home?uid=${uid}`);
            }}
          >
            <ArrowBackIcon sx={{ cursor: "pointer", color: "#D9DEE0" }} />
          </IconButton>
          <p
            style={{
              marginLeft: "1rem",
              fontSize: "1.2rem",
              color: "#D9DEE0",
            }}
          >
            Profile
          </p>
        </div>
      </div>
      <div className={styles.body}>
        <form
          method="post"
          onChange={(event) => handleFileChange(event)}
          // onSubmit={(event) => handleOnSubmit(event)}
        >
          <label
            htmlFor="file"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
            onMouseEnter={() => setShow(!show)}
            onMouseLeave={() => setShow(!show)}
          >
            {show ? (
              <CameraAltIcon
                sx={{
                  cursor: "pointer",
                  color: "#999",
                  opacity: "1",
                  fontSize: 64,
                  position: "absolute",
                  zIndex: 100,
                }}
              />
            ) : (
              <></>
            )}
            <Avatar
              alt={user?.name ?? "Your Name"}
              src={
                imgSrc ??
                "https://www.gravatar.com/avatar/82dd46c8fcb52e72641a80159b8e94e8.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
              }
              sx={{ width: 200, height: 200, cursor: "pointer" }}
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
          </label>

          <input
            type="file"
            id="file"
            name="file"
            // onChange={(event) => handleFileChange(event)}
            accept=".png,.jpg,.jpeg,.webp"
            style={{ display: "none" }}
          />
        </form>

        <p style={{ color: "#008069" }}>Your name</p>
        <div className={styles.editInfo}>
          {disabled ? (
            name ?? user?.name
          ) : (
            <Input
              style={{ flex: 1, color: "#fff" }}
              disabled={false}
              focused={true}
              color="success"
              id="component-helper"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-describedby="component-helper-text"
              ref={nameInput}
              inputProps={{ color: "#fff" }}
            />
          )}

          <IconButton
            onClick={() => {
              setDisabled(!disabled);
              updateProfileData();
            }}
          >
            {disabled ? (
              <EditIcon sx={{ cursor: "pointer", color: "#D9DEE0" }} />
            ) : (
              <DoneIcon sx={{ cursor: "pointer", color: "#D9DEE0" }} />
            )}
          </IconButton>
        </div>
        <p
          style={{
            opacity: "0.7",
            fontSize: "0.85rem",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          This is not your username or pin. This name will be visible to your
          WhatsApp contacts.
        </p>
        <p style={{ color: "#008069" }}>About</p>
        <div className={styles.editInfo}>
          {disabled2 ? (
            status ?? user?.status ?? "Hi There! I'm Using WhatsApp!"
          ) : (
            <Input
              style={{ flex: 1, color: "#fff" }}
              disabled={false}
              focused={true}
              color="success"
              id="component-status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-describedby="component-helper-text"
              inputProps={{ color: "#fff" }}
            />
          )}

          <IconButton
            onClick={() => {
              setDisabled2(!disabled2);
              updateProfileData();
            }}
          >
            {disabled2 ? (
              <EditIcon sx={{ cursor: "pointer", color: "#D9DEE0" }} />
            ) : (
              <DoneIcon sx={{ cursor: "pointer", color: "#D9DEE0" }} />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Profile;
