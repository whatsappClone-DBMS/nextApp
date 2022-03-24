import nc from "next-connect";
import { dm } from "../../../controller/chats";
import { login } from "../../../controller/login";

function Handler(req, res) {
  const Handler = nc();
  const { uid } = req.query;
  Handler.get(dm(req, res, uid));
  return Handler;
}

export default Handler;
