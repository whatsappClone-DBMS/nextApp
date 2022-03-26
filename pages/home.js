import AllChats from "../Components/AllChats/AllChats";
import ChatView from "../Components/ChatView/ChatView";
import styles from "../styles/Home2.module.css";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ContactInfo from "../Components/ContactInfo/ContactInfo";

export default function HomeAfterLogin() {
  const router = useRouter();
  const { uid, dmId } = router.query;

  useEffect(() => {
    // if (!uid) {
    //   router.push("/");
    // }
  }, [uid]);

  return (
    <div className={styles.container}>
      <AllChats uid={uid} />
      <ContactInfo />
      {/* <ChatView dmId={dmId} uid={uid} /> */}
    </div>
  );
}
