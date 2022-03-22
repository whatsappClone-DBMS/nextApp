import nc from "next-connect";
import { useRouter } from "next/router";
import { createUserData } from "../../controller/users/userData";

function Handler(req, res) {
  const Handler = nc();
  const { uid, name } = req.query;
  Handler.get(createUserData(req, res, uid, name));
  return Handler;
}

export default Handler;
