import nc from "next-connect";
import { allDMs, oneDM, updateDmArray } from "../../../controller/chats";

function Handler(req, res) {
  const Handler = nc();
  const { uid, dmId, mId } = req.query;

  if (uid) {
    Handler.get(allDMs(req, res, uid));
  } else if (dmId && mId) {
    Handler.get(updateDmArray(req, res, dmId, mId));
  } else if (dmId) {
    Handler.get(oneDM(req, res, dmId));
  }

  return Handler;
}

export default Handler;
