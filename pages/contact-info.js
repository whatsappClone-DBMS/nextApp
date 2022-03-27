import AllChats from "../Components/AllChats/AllChats";
import ChatView from "../Components/ChatView/ChatView";
import styles from "../styles/Home2.module.css";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ContactInfo from "../Components/ContactInfo/ContactInfo";


function contactInfo() {
    const router = useRouter();
    const { uid, uid2 } = router.query;
    return (
        <div className={styles.container}>
        <AllChats uid={uid} />
        <ContactInfo uid2={uid2}/>
        </div>
  )
}

export default contactInfo