import nc from "next-connect";
import { blockedUser, getBlocked } from "../../../controller/users/userData";

function Handler(req, res) {
  const Handler = nc();
  const { uid, uid2 } = req.query;
  if (uid2) {
    Handler.get(blockedUser(req, res, uid, uid2));
  } else {
    Handler.get(getBlocked(req, res, uid));
  }
  return Handler;
}

export default Handler;
