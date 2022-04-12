import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Avatar, IconButton, Input } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import Chats from "../AllChats/Chats";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

function ContactInfo({ uid2, gId }) {
  const [user, setUser] = useState();
  const [group, setGroup] = useState();
  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);
  const [mobileNumber, setMobileNumber] = useState();
  const [disabled, setDisabled] = useState(true);
  const [disabledName, setDisabledName] = useState(true);
  const [status, setStatus] = useState("");
  const [imgSrc, setImgSrc] = useState();
  const [uploadData, setUploadData] = useState();
  const [show, setShow] = useState(false);

  const router = useRouter();
  const getContactInfo = async () => {
    if (uid2) {
      const response = await fetch(`http://localhost:3000/api/user/${uid2}`);
      const data = await response.json();
      console.log("aryan", data[0]);
      setUser(data[0]);
    } else if (gId) {
      const response = await fetch(
        `http://localhost:3000/api/chats/groups?gId=${gId}`
      );
      const data = await response.json();
      console.log("groups Data", data);
      setGroup(data[0]);
      setStatus(data[0].gDesc);
      setName(data[0].gName);
      setMembers(JSON.parse(data[0]?.gMembers));
    }
  };
  const getMobileNumber = async () => {
    if (uid2) {
      const response = await fetch(
        `http://localhost:3000/api/user/users?uid=${uid2}`
      );
      const data = await response.json();
      console.log("avi gandu", data[0]);
      setMobileNumber(data[0].mobileNumber);
    }
  };
  useEffect(() => {
    if (uid2) {
      getContactInfo();
      getMobileNumber();
    }
  }, [uid2]);

  useEffect(() => {
    if (gId) {
      getContactInfo();
    }
  }, [gId]);

  const updateGroupData = async () => {
    if (name != "" && status != "") {
      const response = await fetch(
        `http://localhost:3000/api/groupData?gId=${gId}&name=${name}&status=${status}`
      );
      const data = await response.json();
      if (data) {
        setGroup(data[0]);
        setStatus(data[0].gDesc);
        setName(data[0].gName);
      } else {
        alert("Something went wrong.");
      }
    }
  };

  const updateDP = async (secure_url) => {
    console.log("kinshuk");
    if (name != "" && status != "") {
      const response = await fetch(
        `http://localhost:3000/api/groupData?gId=${gId}&imgSrc=${secure_url}`
      );
      const data = await response.json();
      if (data) {
        setGroup(data[0]);
      } else {
        alert("Something went wrong.");
      }
    } else {
      setImgSrc(secure_url);
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
      updateDP(data.secure_url);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div
          onClick={() => {
            router.back();
          }}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <CloseIcon
            sx={{ marginLeft: "1rem", marginRight: "1rem", fontSize: "1rem" }}
          />
        </div>
        <h3>Contact Info</h3>
      </div>
      <div className={styles.box1}>
        {gId ? (
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
                alt={gId ? group?.gName : user?.name ?? "Your Name"}
                src={
                  gId
                    ? imgSrc
                    : group?.imgSrc ??
                      "https://www.gravatar.com/avatar/82dd46c8fcb52e72641a80159b8e94e8.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
                }
                sx={{ width: 200, height: 200, cursor: gId && "pointer" }}
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
        ) : (
          <Avatar
            alt={gId ? group?.gName : user?.name ?? "Your Name"}
            src={
              gId
                ? group?.imgSrc
                : user?.imgSrc ??
                  "https://www.gravatar.com/avatar/82dd46c8fcb52e72641a80159b8e94e8.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
            }
            sx={{ width: 200, height: 200, cursor: gId && "pointer" }}
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
        )}

        <h1>{gId ? group?.gName : user?.name ?? "Name"}</h1>
        <p style={{ color: "#8696A0", marginTop: "-1rem" }}>
          {!gId
            ? "+91 " + mobileNumber ?? "Your Number"
            : `${members.length} Participants`}
        </p>
      </div>
      {gId ? (
        <div className={styles.box2}>
          <div
            style={{
              color: "#8696A0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p style={{ margin: 0 }}>Group Name</p>
            <IconButton
              onClick={() => {
                setDisabledName(!disabledName);
                updateGroupData();
              }}
            >
              {disabledName ? (
                <EditIcon
                  sx={{
                    cursor: "pointer",
                    color: "#D9DEE0",
                    marginRight: "1rem",
                  }}
                />
              ) : (
                <DoneIcon
                  sx={{
                    cursor: "pointer",
                    color: "#D9DEE0",
                    marginRight: "1rem",
                  }}
                />
              )}
            </IconButton>
          </div>
          <div className={styles.editInfo}>
            {disabledName ? (
              <h3 style={{ margin: 0 }}>{name ?? "Group Name..."}</h3>
            ) : (
              <Input
                style={{
                  flex: 1,
                  color: "#fff",
                  width: "90%",
                  marginBottom: "1rem",
                }}
                disabled={false}
                focused={true}
                color="success"
                id="component-helper"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-describedby="component-helper-text"
                inputProps={{ color: "#fff" }}
              />
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className={styles.box2}>
        <div
          style={{
            color: "#8696A0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ margin: 0 }}>{gId ? "Group Description" : "About"}</p>
          {gId && (
            <IconButton
              onClick={() => {
                setDisabled(!disabled);
                updateGroupData();
              }}
            >
              {disabled ? (
                <EditIcon
                  sx={{
                    cursor: "pointer",
                    color: "#D9DEE0",
                    marginRight: "1rem",
                  }}
                />
              ) : (
                <DoneIcon
                  sx={{
                    cursor: "pointer",
                    color: "#D9DEE0",
                    marginRight: "1rem",
                  }}
                />
              )}
            </IconButton>
          )}
        </div>
        <div className={styles.editInfo}>
          {disabled ? (
            <h3 style={{ margin: 0 }}>
              {gId ? status : user?.status ?? "Status"}
            </h3>
          ) : (
            <Input
              style={{
                flex: 1,
                color: "#fff",
                width: "90%",
                marginBottom: "1rem",
              }}
              disabled={false}
              focused={true}
              color="success"
              id="component-helper"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-describedby="component-helper-text"
              inputProps={{ color: "#fff" }}
            />
          )}
        </div>
      </div>
      {gId && (
        <div className={styles.box2}>
          <p style={{ color: "#8696A0" }}>Members</p>
          <div
            className={styles.chatsContainer}
            style={{ overflowY: "scroll" }}
          >
            <div style={{ overflowY: "scroll" }}>
              {!members ? (
                <div>
                  <p>No Members </p>
                </div>
              ) : (
                members?.map((item) => {
                  return (
                    <div>
                      <Chats uid={item} flag={true} />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactInfo;
