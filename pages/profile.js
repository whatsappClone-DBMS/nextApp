import ChatView from "../Components/ChatView/ChatView";
import Profile from "../Components/Profile/Profile";
import styles from "../styles/Home2.module.css";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const router = useRouter();
  const { uid, dmId } = router.query;

  return (
    <div className={styles.container}>
      <Profile uid={uid} />
      {dmId ? (
        <ChatView dmId={dmId ?? -1000} uid={uid} />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "70vw",
            backgroundColor: "#212E35",
          }}
        >
          <img src="assets/DefaultChat.svg" style={{ maxWidth: "450px" }} />
        </div>
      )}
    </div>
  );
}
