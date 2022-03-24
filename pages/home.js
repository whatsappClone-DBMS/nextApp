import AllChats from "../Components/AllChats/AllChats";
import ChatView from "../Components/ChatView/ChatView";
import Profile from "../Components/Profile/Profile";
import styles from "../styles/Home2.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function HomeAfterLogin({ data }) {
  const router = useRouter();
  const { uid } = router.query;
  const [selectedChat, setSelectedChat] = useState("");
  // useEffect(() => {
  //   if (data) {
  //     console.log("Dataaaa");
  //     console.log(data);
  //   }
  // }, [data]);

  return (
    <div className={styles.container}>
      <AllChats
        uid={uid}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
      {/* <Profile uid={uid} /> */}
      <ChatView selectedChat={selectedChat} />
    </div>
  );
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const response = await fetch("http://localhost:3000/api/user/users");
//   const data = await response.json();
//   return { props: { data } };
// }
