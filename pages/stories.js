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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function Story() {
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);
  const [imgSrc, setImgSrc] = useState();
  const [time, setTime] = useState("");
  const [uploadData, setUploadData] = useState();
  const [stories, setStories] = useState([]);
  const router = useRouter();
  const { uid, storyImg } = router.query;
  const today = new Date();

  const getUserDetails = async () => {
    if (uid) {
      const response = await fetch(`http://localhost:3000/api/user/${uid}`);
      const data = await response.json();

      setUser(data[0]);
    }
  };

  const getAllStories = async () => {
    const response = await fetch(`http://localhost:3000/api/stories`);
    const data = await response.json();

    setStories(data);
  };

  const uploadStory = async (secure_url) => {
    const response = await fetch(
      `http://localhost:3000/api/stories?uid=${
        user?.uID
      }&imgSrc=${secure_url}&time=${
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
      }`
    );
    const data = await response.json();
    if (data) {
      setImgSrc(secure_url);
      router.push(`/stories?uid=${user.uID}&storyImg=${secure_url}`);
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
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );
    const formData = new FormData();

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

    if (data) {
      uploadStory(data.secure_url);
      router.push(`/stories?uid=${uid}&storyImg=${data.secure_url}`);
    }
  }

  function tConvert(timeString) {
    var hourEnd = timeString?.indexOf(":");
    var H = +timeString?.substr(0, hourEnd);
    var h = H % 12 || 12;
    var ampm = H < 12 ? " AM" : " PM";
    timeString = h + timeString?.substr(hourEnd, 3) + ampm;
    return timeString;
  }

  useEffect(() => {
    getUserDetails();
    getAllStories();
  }, [uid]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.storyContainer}>
        <IconButton
          onClick={() => router.push(`/home?uid=${user?.uID}`)}
          style={{ color: "#6d7275", marginTop: 20 }}
        >
          <ArrowBackIcon style={{ color: "#6d7275" }} />
        </IconButton>
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

          <p
            style={{ marginLeft: "0.5rem", cursor: "pointer" }}
            onClick={() => {
              if (imgSrc) {
                router.push(`/stories?uid=${uid}&storyImg=${imgSrc}`);
              }
            }}
          >
            My Status
          </p>
        </div>
        <p style={{ marginLeft: "0.5rem" }}>Recent</p>
        {stories.map((story, index) => (
          <StoryComponent
            User={uid}
            key={index}
            uid={story.uID}
            imgSrc={story.imgSrc}
            time={tConvert(story.time)}
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
            <img
              src={storyImg}
              style={{
                width: "auto",
                maxWidth: "70vw",
                height: "auto",
                minHeight: "500px",
              }}
            />
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
