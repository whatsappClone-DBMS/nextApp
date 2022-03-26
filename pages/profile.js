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
      <ChatView dmId={dmId} uid={uid} />
    </div>
  );
}
