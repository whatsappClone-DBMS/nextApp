import nc from "next-connect";
import { updateLastSeen } from "../../controller/users/userData";

function Handler(req, res) {
  const Handler = nc();
  const { uid, time } = req.query;
  if (uid && time) {
    Handler.get(updateLastSeen(req, res, uid, time));
  }

  return Handler;
}

export default Handler;
