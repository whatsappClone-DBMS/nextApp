import AllChats from "../Components/AllChats/AllChats";
import ChatView from "../Components/ChatView/ChatView";
import Profile from "../Components/Profile/Profile";
import styles from "../styles/Home2.module.css";

export default function HomeAfterLogin() {
  return (
    <div className={styles.container}>
      <Profile/>
      <ChatView />
    </div>
  );
}
