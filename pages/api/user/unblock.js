import nc from "next-connect";
import { unBlockUser } from "../../../controller/users/userData";

function Handler(req, res) {
  const Handler = nc();
  const { uid, uid2 } = req.query;
  if (uid2) {
    Handler.get(unBlockUser(req, res, uid, uid2));
  }
  return Handler;
}

export default Handler;
