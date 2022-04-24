import nc from "next-connect";
import { deleteMessage, deleteGroupMessage } from "../../../controller/chats";

function Handler(req, res) {
  const Handler = nc();
  const { dmId, mId, gId } = req.query;
  if (dmId && mId) {
    Handler.get(deleteMessage(req, res, dmId, mId));
  } else {
    Handler.get(deleteGroupMessage(req, res, dmId, gId));
  }
  return Handler;
}

export default Handler;
