import AllChats from "../Components/AllChats/AllChats";
import ChatView from "../Components/ChatView/ChatView";
import styles from "../styles/Home2.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
      <ChatView dmId={dmId} uid={uid} />
    </div>
  );
}
