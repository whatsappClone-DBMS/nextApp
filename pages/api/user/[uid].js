import nc from "next-connect";
import { useRouter } from "next/router";
import { getUser } from "../../../controller/users/users";
function Handler(req, res) {
  const Handler = nc();
  const { uid } = req.query;
  Handler.get(getUser(req, res, uid));
  return Handler;
}

export default Handler;
