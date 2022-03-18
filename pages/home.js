import AllChats from "../Components/AllChats/AllChats";
import ChatView from "../Components/ChatView/ChatView";
import styles from "../styles/Home2.module.css";

export default function HomeAfterLogin() {
  return (
    <div className={styles.container}>
      <AllChats />
      <ChatView />
    </div>
  );
}
