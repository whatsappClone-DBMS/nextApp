import nc from "next-connect";
import { archiveUser, getArchived } from "../../../controller/users/userData";

function Handler(req, res) {
  const Handler = nc();
  const { uid, uid2 } = req.query;
  if (uid2) {
    Handler.get(archiveUser(req, res, uid, uid2));
  } else {
    Handler.get(getArchived(req, res, uid));
  }
  return Handler;
}

export default Handler;
