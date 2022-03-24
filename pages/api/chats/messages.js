import nc from "next-connect";
import { allMessages } from "../../../controller/chats";

function Handler(req, res) {
  const Handler = nc();
  const { mId } = req.query;
  Handler.get(allMessages(req, res, mId));
  return Handler;
}

export default Handler;
