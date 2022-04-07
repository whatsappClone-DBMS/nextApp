import nc from "next-connect";
import { allDMs, oneDM, updateDmArray } from "../../../controller/chats";

function Handler(req, res) {
  const Handler = nc();
  res.removeHeader("x-powered-by");
  res.removeHeader("set-cookie");
  res.removeHeader("Date");
  res.removeHeader("Connection");
  const { uid, dmId, mId } = req.query;

  if (uid) {
    Handler.get(allDMs(req, res, uid));
  } else if (dmId && mId) {
    console.log("dmId and Mid");
    Handler.get(updateDmArray(req, res, dmId, mId));
  } else if (dmId) {
    Handler.get(oneDM(req, res, dmId));
  }

  return Handler;
}

export default Handler;
