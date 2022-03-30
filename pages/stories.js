import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import styles from "../styles/Home.module.css";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import StoryComponent from "../Components/Story/StoryComponent";
import { useRouter } from "next/router";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Image from "next/image";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function Story() {
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);
  const [imgSrc, setImgSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [stories, setStories] = useState([]);
  const router = useRouter();
  const { uid, storyImg } = router.query;

  const getUserDetails = async () => {
    if (uid) {
      const response = await fetch(`http://localhost:3000/api/user/${uid}`);
      const data = await response.json();
      console.log("User Detailsss", data);
      setUser(data[0]);
    }
  };

  const getAllStories = async () => {
    const response = await fetch(`http://localhost:3000/api/stories`);
    const data = await response.json();
    console.log("User Detailsss", data);
    setStories(data);
  };

  const uploadStory = async (secure_url) => {
    console.log("kinshuk");

    const response = await fetch(
      `http://localhost:3000/api/stories?uid=${user?.uID}&imgSrc=${secure_url}`
    );
    const data = await response.json();
    if (data) {
      setImgSrc(secure_url);
    } else {
      alert("Something went wrong.");
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
    console.log("oye", data);
    if (data) {
      uploadStory(data.secure_url);
    }
  }

  useEffect(() => {
    console.log("uid", uid);
    getUserDetails();
    getAllStories();
  }, [uid]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.storyContainer}>
        <div className={styles.storyHeader}>
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
                    fontSize: 22,
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
                sx={{
                  width: 40,
                  height: 40,
                  cursor: "pointer",
                  border: show ? "1.5px solid #02b38d" : "0px solid #333",
                }}
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

          <p style={{ marginLeft: "0.5rem" }}>My Status</p>
        </div>
        <p style={{ marginLeft: "0.5rem" }}>Recent</p>
        {stories.map((story, index) => (
          <StoryComponent
            user={uid}
            key={index}
            uid={story.uID}
            imgSrc={story.imgSrc}
            seenBy={story.seenBy}
          />
        ))}
      </div>
      <div style={{ marginTop: "1rem" }}></div>
      <div className={styles.storyPage}>
        {storyImg ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <span
              style={{
                position: "absolute",
                color: "#fff",
                fontSize: "1rem",
                top: "2rem",
                right: "2rem",
              }}
            >
              <IconButton onClick={() => router.push(`/stories?uid=${uid}`)}>
                <CloseIcon
                  sx={{
                    cursor: "pointer",
                    color: "#fff",
                    opacity: "1",
                    fontSize: 32,
                    position: "absolute",
                    zIndex: 100,
                  }}
                />
              </IconButton>
            </span>
            <img src={storyImg} style={{ minHeight: 500, width: "auto" }} />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "22rem",
            }}
          >
            <CircleOutlinedIcon sx={{ fontSize: "7rem", color: "#6D7275" }} />
            <p style={{ color: "#919597", fontSize: "1rem" }}>
              Click on a contact to view their status updates
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Story;
