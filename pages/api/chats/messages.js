import nc from "next-connect";
import { allMessages, createMessage } from "../../../controller/chats";

function Handler(req, res) {
  const Handler = nc();
  const { mId, sender, receiver, text, date, time } = req.query;
  if (mId) {
    Handler.get(allMessages(req, res, mId));
  } else {
    Handler.get(createMessage(req, res, sender, receiver, text, date, time));
  }

  return Handler;
}

export default Handler;
