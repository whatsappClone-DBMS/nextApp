import React from "react";
import styles from "./styles.module.css";
import ReceiverBubble from "./ReceiverBubble";
import SenderBubble from "./SenderBubble";

function MessageWindow({ dmId }) {
  const [messages, setMessages] = useState();
  var personUid = 0;
  const getChats = async () => {
    if (dmId) {
      const responseDM = await fetch(
        `http://localhost:3000/api/chats/dm?dmId=${dmId}`
      );
      const DMdata = await responseDM.json();
      console.log("DMdataaaa", DMdata);
      // if (DMdata[0]) {
      //   const response = await fetch(
      //     `http://localhost:3000/api/chats/messages?mid=${dmId}`
      //   );
      //   const DMdata = await response.json();
      //   console.log("DMdataaaa", DMdata);
      // }
    }
  };

  useEffect(() => {
    console.log("uid", uid);
    getChats();
  }, [uid]);

  return (
    <div className={styles.container}>
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
      <ReceiverBubble message="hi" time="12:09 am" />
      <SenderBubble message="hi" time="12:09 am" />
    </div>
  );
}

export default MessageWindow;
